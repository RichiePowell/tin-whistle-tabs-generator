interface INotesData extends Array<Array<INoteData>> {}
interface INoteData {
  note: string;
  octave: string;
  class: string;
}

export default INotesData;