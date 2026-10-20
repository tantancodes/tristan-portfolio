// Types for the vendored JS component. All timing/cursor props are required in practice:
// inside Framer they get defaults from the editor panel, here nothing fills them in.
import type { CSSProperties, ReactElement } from "react";

export type TypewriterEffectProps = {
  words: { word: string }[];
  typingSpeed: number;
  deletingSpeed: number;
  pauseDuration: number;
  cursorColor: string;
  cursorWidth: number;
  cursorHeight: number;
  font?: CSSProperties;
  textColor?: string;
  style?: CSSProperties;
};

export default function TypewriterEffect(props: TypewriterEffectProps): ReactElement;
