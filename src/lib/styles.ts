import type { CSSProperties } from "react";

export const gridBG = (c: string = "rgba(17,17,17,0.06)"): CSSProperties => ({
  backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
  backgroundSize: "24px 24px, 24px 24px",
  backgroundPosition: "-1px -1px, -1px -1px"
});

export const brand = {
  blue: "var(--blue)",
  orange: "var(--orange)",
  navy: "var(--navy)"
} as const;

export type SectionProps = {
  class?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
};