export interface BulbBrightnes {
  deviceId: string;
  ct?: number;
  br?: number;
  ltype: LightType;
}
type LightType =
  | "white"
  | "color"
  | "bright"
  | "goodNight"
  | "read"
  | "nightLight"
  | "party"
  | "leisure"
  | "soft"
  | "colorful";

export type BulbBrightnesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
} & BulbBrightnes;
