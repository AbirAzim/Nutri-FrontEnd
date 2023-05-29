interface Data {
  [key: string]: any;
}

export interface BlockType {
  id: string;
  type: string;
  data: Data;
  tunes: {
    anchorTune: {
      anchor: string;
    };
    alignmentTuneTool: {
      alignment: string;
    };
    footnotes: FootnotesType[];
  };
  nestedBlocks?: BlockType[];
}

export interface FootnotesType {
  id: string;
  content: string;
  superscript: number;
}
