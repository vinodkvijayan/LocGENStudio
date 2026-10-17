function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

function inline(value: string): string {
  let text = escapeHtml(value);
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label: string, href: string) => {
    if (href.startsWith("https://") || href.startsWith("http://")) {
      return `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
    }
    return `<a href="${href}" data-doc="${href}">${label}</a>`;
  });
  return text;
}

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(escapeHtml(lines[i]));
        i += 1;
      }
      html.push(`<pre><code>${buf.join("\n")}</code></pre>`);
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].split("|").slice(1, -1).map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
        i += 1;
      }
      const head = rows[0] ?? [];
      const body = rows.slice(1);
      html.push(
        `<div class="docs-table"><table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${body
          .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i += 1;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\.\s/, ""))}</li>`);
        i += 1;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,3}\s|```|\| |- |\d+\.\s)/.test(lines[i])) {
      para.push(lines[i]);
      i += 1;
    }
    html.push(`<p>${inline(para.join(" "))}</p>`);
  }

  return html.join("");
}
