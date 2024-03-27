interface BaseLine {
  type: string;
  content: string | string[] | NoteDetail[]; // Content can be a string, an array of strings or an array of NoteDetail
}

interface HeaderLine extends BaseLine {
  type: "header";
  content: string; // A header line contains a single string as content
}

interface CommentLine extends BaseLine {
  type: "comment";
  content: string; // Similar to header, a comment line contains a single string as content
}

interface LyricsLine extends BaseLine {
  type: "lyrics";
  content: string[]; // Lyrics are split into an array of words
}

type NoteDetail = {
  note: string;
  sharp: boolean;
  octaveShift: number; // 0 for no shift, 1 for '+', 2 for '++'
};

interface NotesLine extends BaseLine {
  type: "notes";
  content: NoteDetail[];
}

type ParsedLine = HeaderLine | CommentLine | LyricsLine | NotesLine;
