// BlogHelper.ts

import type { Blog } from "../types/Blog";

export function bsortByRecent(blogs: Blog[]): Blog[] {
  return [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
