import { useState } from "react";
import type { Job } from "@/lib/studio/model";
import { useStudio } from "@/lib/studio/store";

export function JobsView() {
  const jobs = useStudio((s) => s.jobs);
  const [openId, setOpenId] = useState<string | null>(jobs[0]?.id ?? null);

  return (
    <div className="h-full overflow-auto bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-xs tracking-widest text-muted uppercase">Queue</p>
        <h2 className="mt-1 font-display text-4xl text-fg">Local runs</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-muted">
          Run samples the linked weights on this PC. Diffusion models, LoRAs, text encoders and VAEs are read from the models root. If the local engine is not running yet, the graph is kept here until it is.
        </p>
        {jobs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-line bg-surface px-4 py-8">
            <p className="font-display text-2xl text-fg">No jobs yet</p>
            <p className="mt-2 text-sm text-muted">Link the models folder, then press Run. The finished image shows up on this card.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {jobs.map((job) => (
              <li key={job.id} className="rounded-2xl border border-line bg-surface">
                <button type="button" className="w-full px-4 py-3 text-left" onClick={() => setOpenId(openId === job.id ? null : job.id)}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm text-fg">{job.workflowName}</p>
                    <p className="text-xs tracking-widest text-signal uppercase">{job.status}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.summary}</p>
                  <p className="mt-2 text-xs text-muted">{job.message}</p>
                </button>
                {openId === job.id ? <JobBody job={job} /> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function JobBody({ job }: { job: Job }) {
  return (
    <div className="border-t border-line px-4 py-3">
      {job.imageUrl ? (
        <img src={job.imageUrl} alt="" className="mb-3 max-h-96 w-full rounded-xl bg-bg object-contain" />
      ) : null}
      <p className="text-xs text-muted">{job.chain.join(" → ")}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="h-10 rounded-full bg-fg px-4 text-sm font-medium text-bg"
          onClick={() => navigator.clipboard?.writeText(job.promptJson)}
        >
          Copy JSON
        </button>
        <button
          type="button"
          className="h-10 rounded-full border border-line px-4 text-sm text-fg"
          onClick={() => download(`${job.workflowName.replace(/\s+/g, "-").toLowerCase()}.json`, job.promptJson)}
        >
          Download
        </button>
      </div>
      <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-bg p-3 text-xs leading-relaxed text-fg">{job.promptJson}</pre>
    </div>
  );
}

function download(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
