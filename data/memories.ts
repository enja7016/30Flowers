export type Memory = {
  text: string;
  img?: string;
};

export const memories: Partial<Record<number, Memory>> = {
  1: { text: "Your first memory goes here." },
  2: { text: "Another special moment to keep forever." },
  3: { text: "One more memory to personalize." },
};

export const fallbackMemory: Memory = {
  text: "A beautiful memory.",
};

