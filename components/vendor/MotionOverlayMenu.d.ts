// Types for the vendored JS component (only the props this site uses; see the file for the rest).
import type { CSSProperties, ReactElement } from "react";

type MenuLink = { label: string; link?: string; newTab?: boolean };

export type MotionOverlayMenuProps = {
  logo?: "mark" | "image" | "none";
  brand?: string;
  brandLink?: string;
  links?: MenuLink[];
  secondary?: MenuLink[];
  note?: string;
  noteLink?: string;
  menuLabel?: string;
  closeLabel?: string;
  showLabel?: boolean;
  showNumbers?: boolean;
  align?: "left" | "center";
  reveal?: "circle" | "wipe" | "fade";
  stagger?: number;
  duration?: number;
  hoverShift?: number;
  dimOthers?: boolean;
  brandFont?: CSSProperties;
  linkFont?: CSSProperties;
  headerColor?: string;
  barBackground?: string;
  barBorder?: string;
  overlayBackground?: string;
  overlayText?: string;
  overlayBar?: string;
  accent?: string;
  glow?: string;
  barRadius?: string;
  barShadow?: boolean;
  barBlur?: number;
  blur?: number;
  headerPadding?: string;
  overlayPadding?: string;
  style?: CSSProperties;
};

export default function MotionOverlayMenu(props: MotionOverlayMenuProps): ReactElement;
