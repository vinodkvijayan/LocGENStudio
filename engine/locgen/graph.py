"""Prompt graph runner.

A prompt is a dict of node id -> {class_type, inputs}. An input is either a
plain value or a link [node_id, output_slot]. Sinks (nodes nothing else reads)
are executed; links pull dependencies. Outputs are cached per node id.
"""

from __future__ import annotations

from inspect import Parameter, signature
from typing import Any, Callable

from locgen.nodes import NODE_CLASS_MAPPINGS


class GraphError(Exception):
    def __init__(self, message: str, node_id: str | None = None):
        super().__init__(message)
        self.node_id = node_id


def is_link(value: Any, prompt: dict) -> bool:
    return (
        isinstance(value, list)
        and len(value) == 2
        and isinstance(value[0], str)
        and value[0] in prompt
        and isinstance(value[1], (int, float))
        and not isinstance(value[1], bool)
    )


def validate(prompt: dict) -> None:
    if not isinstance(prompt, dict) or not prompt:
        raise GraphError("Prompt is empty.")
    for node_id, node in prompt.items():
        if not isinstance(node, dict) or "class_type" not in node:
            raise GraphError(f"Node {node_id} has no class_type.", str(node_id))
        if node["class_type"] not in NODE_CLASS_MAPPINGS:
            raise GraphError(f"Unknown node {node['class_type']}.", str(node_id))
        inputs = node.get("inputs", {})
        if not isinstance(inputs, dict):
            raise GraphError(f"Node {node_id} inputs must be an object.", str(node_id))
        for value in inputs.values():
            if isinstance(value, list) and len(value) == 2 and isinstance(value[0], str):
                if value[0] not in prompt:
                    raise GraphError(f"Node {node_id} links to missing node {value[0]}.", str(node_id))


def _call(fn: Callable, inputs: dict, node_id: str) -> tuple:
    sig = signature(fn)
    kwargs = {}
    for name, param in sig.parameters.items():
        if name == "self":
            continue
        if name in inputs:
            kwargs[name] = inputs[name]
        elif param.default is Parameter.empty:
            raise GraphError(f"Node {node_id} is missing input {name}.", node_id)
    result = fn(**kwargs)
    if not isinstance(result, tuple):
        raise GraphError(f"Node {node_id} did not return a tuple.", node_id)
    return result


def execute(prompt: dict) -> dict[str, dict]:
    validate(prompt)
    cache: dict[str, tuple] = {}
    images: dict[str, dict] = {}

    def eval_node(node_id: str, stack: tuple[str, ...]) -> tuple:
        if node_id in cache:
            return cache[node_id]
        if node_id in stack:
            raise GraphError(f"Cycle at node {node_id}.", node_id)
        node = prompt[node_id]
        raw = node.get("inputs", {})
        resolved = {}
        for key, value in raw.items():
            if is_link(value, prompt):
                source, slot = value[0], int(value[1])
                outputs = eval_node(source, stack + (node_id,))
                if slot >= len(outputs):
                    raise GraphError(f"Node {source} has no output slot {slot}.", node_id)
                resolved[key] = outputs[slot]
            else:
                resolved[key] = value
        cls = NODE_CLASS_MAPPINGS[node["class_type"]]
        try:
            result = _call(cls().run, resolved, node_id)
        except GraphError:
            raise
        except Exception as exc:
            raise GraphError(f"{node['class_type']}: {exc}", node_id) from exc
        cache[node_id] = result
        if node["class_type"] == "SaveImage" and result:
            images[node_id] = {"images": result[0]}
        return result

    referenced: set[str] = set()
    for node in prompt.values():
        for value in node.get("inputs", {}).values():
            if is_link(value, prompt):
                referenced.add(value[0])
    sinks = [node_id for node_id in prompt if node_id not in referenced] or list(prompt)
    for node_id in sinks:
        eval_node(node_id, ())
    if not images:
        raise GraphError("The graph finished without a SaveImage output.")
    return images
