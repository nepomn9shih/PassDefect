export const isTouchDevice = (): boolean => {
  return (
    // 'ontouchstart' in window ||
    // navigator.maxTouchPoints > 0 ||
    // // @ts-expect-error for older IE compatibility
    // navigator.msMaxTouchPoints > 0
    hasCoarsePointer()
  );
};

// '@media (hover: none) and (pointer: coarse)' typically means a touchscreen
export const hasCoarsePointer = (): boolean => {
    try {
        return window.matchMedia('(pointer: coarse)').matches;
    } catch {
        return false;
    }
};