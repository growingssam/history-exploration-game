// Scene percentages, measured against the actual background artwork.
// Include a margin around both the drawing and its existing touch target.
export const HERO_WIDTH_PERCENT = 12;
export const HERO_CLEARANCE_PERCENT = 2;
export const protectedForeground = {
  bronze: { left: 33, right: 64, stopLeft: 18 },
  joseon: { left: 30, right: 67, stopLeft: 15 },
};

export function safeHeroPosition(era, position) {
  const area = protectedForeground[era];
  if (!area) return position;
  const left = Number.parseFloat(position.left);
  if (!Number.isFinite(left)) return position;
  const overlaps = left < area.right + HERO_CLEARANCE_PERCENT &&
    left + HERO_WIDTH_PERCENT + HERO_CLEARANCE_PERCENT > area.left;
  return overlaps ? { ...position, left: `${area.stopLeft}%` } : position;
}
