// ShipSolo 学员版：前端埋点事件模板
// 只保留事件名和字段约定，不包含任何生产 Measurement ID 或密钥。

export type AnalyticsEventName =
  | "pageview"
  | "cta_click"
  | "tool_start"
  | "tool_complete"
  | "pricing_click"
  | "signup"
  | "purchase_start";

export type AnalyticsPayload = {
  project?: string;
  page?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  plan?: string;
  tool?: string;
  status?: "success" | "failed" | "blocked";
};

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  // Plausible 示例：window.plausible?.(name, { props: payload });
  // GA4 示例：window.gtag?.("event", name, payload);
  console.info("analytics:event", name, payload);
}

export const requiredEvents: AnalyticsEventName[] = [
  "pageview",
  "cta_click",
  "tool_start",
  "tool_complete",
  "pricing_click",
  "signup",
  "purchase_start",
];
