export const GENERATOR_SUBJECTS = [
  { id: "boy", label: "Boy", phrase: "a young man" },
  { id: "girl", label: "Girl", phrase: "a young woman" },
  { id: "couple", label: "Couple", phrase: "two people together as a couple" },
  { id: "family", label: "Family", phrase: "a family group" },
  { id: "creator", label: "Creator", phrase: "a social media creator" },
] as const;

export const GENERATOR_SCENES = [
  { id: "neon-street", label: "Neon street", phrase: "on a neon-lit city street at night with soft rain reflections" },
  { id: "cricket-stadium", label: "Cricket stadium", phrase: "inside a cricket stadium with dramatic crowd bokeh and stadium lights" },
  { id: "wedding-venue", label: "Wedding venue", phrase: "at an elegant wedding venue with soft decor lighting" },
  { id: "beach-sunset", label: "Beach sunset", phrase: "on a beach at sunset with warm golden light" },
  { id: "festival", label: "Festival", phrase: "at a respectful festival setting with soft color powder in the air" },
  { id: "dark-studio", label: "Dark studio", phrase: "in a dark studio with controlled rim light and clean backdrop" },
  { id: "miniature", label: "Miniature", phrase: "in a miniature diorama scene with tilt-shift depth" },
] as const;

export const GENERATOR_STYLES = [
  {
    id: "cinematic",
    label: "Cinematic",
    phrase: "cinematic RSP-style photo edit, shallow depth of field, subtle film grain, photorealistic skin texture",
  },
  {
    id: "chibi",
    label: "Chibi cartoon",
    phrase: "cute chibi cartoon illustration style, clean lines, vibrant colors, social-ready composition",
  },
  {
    id: "horror",
    label: "Horror mood",
    phrase: "moody horror-inspired portrait lighting, dramatic shadows, cinematic tension, still photorealistic face detail",
  },
  {
    id: "instagram-poster",
    label: "Instagram poster",
    phrase: "bold Instagram poster layout, high contrast, clean typography space, viral social media composition",
  },
  {
    id: "lofi-dusk",
    label: "Lofi dusk filter",
    phrase: "lofi dusk color grade, muted purple shadows, warm highlights, soft nostalgic mood",
  },
  {
    id: "3d-render",
    label: "3D render",
    phrase: "high-quality 3D render look, smooth materials, studio lighting, ultra-detailed",
  },
] as const;

export const GENERATOR_MODELS = [
  { id: "chatgpt", label: "ChatGPT", tip: "Paste into ChatGPT image generation with a clear reference photo if you need likeness." },
  { id: "gemini", label: "Gemini", tip: "Use Gemini image tools; keep prompts short and test one variable at a time." },
  { id: "bing", label: "Bing Image Creator", tip: "Works well with descriptive lighting and aspect ratio in the same prompt block." },
  { id: "grok", label: "Grok", tip: "Use the full prompt plus negatives; avoid trademark or celebrity names." },
] as const;

export const GENERATOR_LANGUAGES = [
  { id: "en", label: "English", suffix: "" },
  {
    id: "hinglish",
    label: "Hindi–English mix",
    suffix: "viral Instagram DP aesthetic, high-detail social media edit, 4:5 aspect ratio",
  },
] as const;

export type GeneratorSubjectId = (typeof GENERATOR_SUBJECTS)[number]["id"];
export type GeneratorSceneId = (typeof GENERATOR_SCENES)[number]["id"];
export type GeneratorStyleId = (typeof GENERATOR_STYLES)[number]["id"];
export type GeneratorModelId = (typeof GENERATOR_MODELS)[number]["id"];
export type GeneratorLanguageId = (typeof GENERATOR_LANGUAGES)[number]["id"];

export type GeneratorInput = {
  subject: GeneratorSubjectId;
  scene: GeneratorSceneId;
  style: GeneratorStyleId;
  model: GeneratorModelId;
  language: GeneratorLanguageId;
};

const DEFAULT_NEGATIVE =
  "watermark, logo, text overlay, blurry face, extra fingers, deformed hands, plastic skin, celebrity likeness, copyrighted characters";

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function randomGeneratorInput(): GeneratorInput {
  return {
    subject: pick(GENERATOR_SUBJECTS).id,
    scene: pick(GENERATOR_SCENES).id,
    style: pick(GENERATOR_STYLES).id,
    model: pick(GENERATOR_MODELS).id,
    language: pick(GENERATOR_LANGUAGES).id,
  };
}

export function buildGeneratorOutput(input: GeneratorInput) {
  const subject = GENERATOR_SUBJECTS.find((s) => s.id === input.subject)!;
  const scene = GENERATOR_SCENES.find((s) => s.id === input.scene)!;
  const style = GENERATOR_STYLES.find((s) => s.id === input.style)!;
  const model = GENERATOR_MODELS.find((m) => m.id === input.model)!;
  const language = GENERATOR_LANGUAGES.find((l) => l.id === input.language)!;

  const promptParts = [
    `Create a portrait of ${subject.phrase} ${scene.phrase},`,
    style.phrase + ",",
    "natural expression, balanced composition, high detail,",
    language.suffix || "photorealistic where applicable, 4:5 aspect ratio, no watermark",
  ].filter(Boolean);

  const prompt = promptParts.join(" ").replace(/\s+/g, " ").trim();

  const caption = `RSP-style ${style.label.toLowerCase()} edit — ${subject.label.toLowerCase()} · ${scene.label.toLowerCase()}. AI-assisted photo edit; adjust prompt before posting. #rspediting #aiedit`;

  const hashtags = [
    "#rspediting",
    "#aiphotoediting",
    "#aieditor",
    "#photoedit",
    "#instagramdp",
    "#capcutedit",
  ].join(" ");

  const modelNote = `Suggested tool: ${model.label}. ${model.tip}`;

  return {
    prompt,
    negativePrompt: DEFAULT_NEGATIVE,
    caption,
    hashtags,
    modelNote,
    fullCopy: [prompt, "", `Negative prompt: ${DEFAULT_NEGATIVE}`, "", `Caption: ${caption}`, "", hashtags, "", modelNote].join(
      "\n",
    ),
  };
}
