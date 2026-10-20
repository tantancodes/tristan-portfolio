// Stand-ins for the `framer` exports the vendored components import.
// addPropertyControls / ControlType only build Framer's editor panel, so here they do nothing.
// useIsStaticRenderer / RenderTarget tell a component whether it's on Framer's design canvas;
// on a real website it never is, so they always report a live "preview" page.
export function addPropertyControls() {}
export const ControlType = new Proxy({}, { get: (_, key) => key });
export function useIsStaticRenderer() {
  return false;
}
export const RenderTarget = {
  canvas: "CANVAS",
  export: "EXPORT",
  thumbnail: "THUMBNAIL",
  preview: "PREVIEW",
  current: () => "PREVIEW",
};
