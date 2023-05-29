import React from "react";
import { BlockType } from "../../../../type/editorjsBlockType";
import Header from "./renderers/Header";
import Paragraph from "./renderers/Paragraph";
import Embed from "./renderers/Embed";
import Table from "./renderers/Table";
import List from "./renderers/List";
import Code from "./renderers/Code";
import ImageBlock from "./renderers/Image";
import Raw from "./renderers/Raw";
import Quote from "./renderers/Quote";
import Toggle from "./renderers/Toggle";
import Columns from "./renderers/Columns";
import Callout from "./renderers/Callout";

const JsonToHtml = (
  block: BlockType,
  addBlockPadding: boolean = true,
  showHeaderIcon: boolean = false,
) => {
  const { type } = block;

  switch (type) {
    case "header":
      return (
        <Header
          block={block}
          addBlockPadding={addBlockPadding}
          showIcon={showHeaderIcon}
        />
      );
    case "paragraph":
      return <Paragraph block={block} addBlockPadding={addBlockPadding} />;
    case "embed":
      return <Embed block={block} addBlockPadding={addBlockPadding} />;
    case "table":
      return <Table block={block} addBlockPadding={addBlockPadding} />;
    case "list":
      return <List block={block} addBlockPadding={addBlockPadding} />;
    case "code":
      return <Code block={block} addBlockPadding={addBlockPadding} />;
    case "image":
      return <ImageBlock block={block} addBlockPadding={addBlockPadding} />;
    case "raw":
      return <Raw block={block} addBlockPadding={addBlockPadding} />;
    case "quote":
      return <Quote block={block} addBlockPadding={addBlockPadding} />;
    case "toggle":
      return (
        <Toggle
          block={block}
          nestedBlocks={block?.nestedBlocks}
          addBlockPadding={addBlockPadding}
        />
      );
    case "columns":
      return <Columns block={block} addBlockPadding={addBlockPadding} />;
    case "callout":
      return <Callout block={block} addBlockPadding={addBlockPadding} />;

    default:
      return null;
  }
};

export default JsonToHtml;
