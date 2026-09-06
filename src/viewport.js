// Match the visible browser area, including mobile browser chrome changes.
let pending;
function fitViewport() {
  cancelAnimationFrame(pending);
  pending = requestAnimationFrame(() => {
    const viewport = window.visualViewport;
    // Keep native pinch zoom available without fighting its scale.
    if (viewport && viewport.scale !== 1) return;
    const root = document.documentElement;
    root.style.setProperty('--screen-width', `${viewport?.width || window.innerWidth}px`);
    root.style.setProperty('--screen-height', `${viewport?.height || window.innerHeight}px`);
  });
}
window.addEventListener('resize', fitViewport, { passive: true });
window.visualViewport?.addEventListener('resize', fitViewport, { passive: true });
document.addEventListener('fullscreenchange', fitViewport);
fitViewport();
