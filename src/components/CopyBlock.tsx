import { CopyButton } from "@/components/CopyButton";

export function CopyBlock({ text, label = "Prompt" }: { text: string; label?: string }) {
  if (text.startsWith("N/A")) {
    return null;
  }

  return (
    <div className="my-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
        <CopyButton text={text} />
      </div>
      <pre className="overflow-x-auto rounded-lg border border-black/8 bg-ink p-4 text-sm text-surface whitespace-pre-wrap font-mono leading-relaxed">
        {text}
      </pre>
    </div>
  );
}
