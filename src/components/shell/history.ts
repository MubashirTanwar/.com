"use client";

/** Counts client-side navigations so a close button knows whether "back" stays on this site. */
let depth = 0;
export const markNavigation = () => {
  depth += 1;
};
export const canGoBack = () => depth > 1;
