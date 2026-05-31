"use client";

import { useCallback, useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  GENERATOR_LANGUAGES,
  GENERATOR_MODELS,
  GENERATOR_SCENES,
  GENERATOR_STYLES,
  GENERATOR_SUBJECTS,
  buildGeneratorOutput,
  randomGeneratorInput,
  type GeneratorInput,
} from "@/lib/generator";

const STEPS = ["Subject", "Scene", "Style", "Model", "Copy"] as const;

const defaultInput: GeneratorInput = {
  subject: "boy",
  scene: "neon-street",
  style: "cinematic",
  model: "chatgpt",
  language: "en",
};

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              value === opt.id
                ? "border-accent bg-accent/10 text-accent font-medium"
                : "border-black/10 bg-card text-muted hover:border-accent/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function PromptGenerator() {
  const [input, setInput] = useState<GeneratorInput>(defaultInput);

  const output = useMemo(() => buildGeneratorOutput(input), [input]);

  const handleRandom = useCallback(() => {
    setInput(randomGeneratorInput());
  }, []);

  const patch = useCallback(<K extends keyof GeneratorInput>(key: K, value: GeneratorInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div id="generator" className="scroll-mt-24">
      <div className="flex flex-wrap gap-2 mb-6">
        {STEPS.map((step, i) => (
          <span
            key={step}
            className="rounded-full border border-black/8 bg-card px-3 py-1 text-xs text-muted"
          >
            <span className="font-medium text-accent">{String(i + 1).padStart(2, "0")}</span> {step}
          </span>
        ))}
      </div>

      <div className="rounded-2xl border border-black/8 bg-card p-5 sm:p-8 shadow-sm space-y-6">
        <OptionGroup
          label="Subject"
          options={GENERATOR_SUBJECTS}
          value={input.subject}
          onChange={(id) => patch("subject", id)}
        />
        <OptionGroup
          label="Scene"
          options={GENERATOR_SCENES}
          value={input.scene}
          onChange={(id) => patch("scene", id)}
        />
        <OptionGroup
          label="Style"
          options={GENERATOR_STYLES}
          value={input.style}
          onChange={(id) => patch("style", id)}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <OptionGroup
            label="Model"
            options={GENERATOR_MODELS}
            value={input.model}
            onChange={(id) => patch("model", id)}
          />
          <OptionGroup
            label="Language"
            options={GENERATOR_LANGUAGES}
            value={input.language}
            onChange={(id) => patch("language", id)}
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleRandom}
            className="rounded-lg border border-black/10 bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/40"
          >
            Random idea
          </button>
          <CopyButton text={output.fullCopy} />
        </div>
      </div>

      <div className="mt-8 space-y-6" aria-live="polite">
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-ink">Generated prompt</h3>
              <CopyButton text={output.prompt} />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-black/8 bg-ink p-4 text-sm text-surface whitespace-pre-wrap font-mono leading-relaxed">
              {output.prompt}
            </pre>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-ink">Negative prompt</h3>
              <CopyButton text={output.negativePrompt} />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-black/8 bg-surface p-4 text-sm text-muted whitespace-pre-wrap font-mono leading-relaxed">
              {output.negativePrompt}
            </pre>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-ink">Caption & hashtags</h3>
              <CopyButton text={`${output.caption}\n\n${output.hashtags}`} />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-black/8 bg-surface p-4 text-sm text-muted whitespace-pre-wrap leading-relaxed">
              {output.caption}
              {"\n\n"}
              {output.hashtags}
            </pre>
          </div>

          <p className="text-sm text-muted">{output.modelNote}</p>

        </div>
    </div>
  );
}
