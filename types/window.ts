export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  mouseOffset?: { x: number; y: number };
};

export enum Window {
  DevTools,
  Image,
  Video,
}
