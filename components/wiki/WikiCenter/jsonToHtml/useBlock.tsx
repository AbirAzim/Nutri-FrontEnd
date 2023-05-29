import { BlockType } from "../../../../type/editorjsBlockType";

const useBlock = (): ((block: BlockType) => { [key: string]: string }) => {
  let props: {
    [s: string]: any;
  } = {};

  const handleBlockData = (block: BlockType) => {
    const { id, tunes } = block;
    if (block) {
      const anchor = tunes?.anchorTune?.anchor;
      const anchorId = anchor ? anchor : id;
      props.id = anchorId;
      if (anchor) {
        props["data-anchor"] = anchor;
      }
      return props;
    }
  };

  return handleBlockData;
};

export default useBlock;
