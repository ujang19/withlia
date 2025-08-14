export const site = "https://withlia.example";

export const meta = {
  title: "WithLia – Mindful AI-Powered Marketing",
  description:
    "Ecosystem marketing bertenaga AI: framework 7 hari, mentor, komunitas.",
  image: "/og.jpg"
} as const;

export type MetaInput = Partial<{
  title: string;
  description: string;
  image: string;
  url: string;
}>;

export const buildTitle = (title?: string) =>
  title ? `${title} · WithLia` : meta.title;

export const absoluteUrl = (path = "/") =>
  new URL(path, site).toString();