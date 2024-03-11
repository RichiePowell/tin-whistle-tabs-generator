export type Note = {
  fingers: number[];
  description: string;
};

export type TinWhistleKey = "D" | "C";
export type TinWhistleKeys = {
  [key in TinWhistleKey]: {
    [note: string]: Note;
  };
};
