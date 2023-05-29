import React, { memo } from "react";
import { useQuery } from "@apollo/client";
import { GET_WIDGET_TYPE } from "../../../graphql/Widget";
import GridWidget from "./GridWidget.component";
import SliderWidget from "./SliderWidget.component";

interface WidgetProps {
  slug: string;
  column?: number;
  elements?: (item: any) => React.ReactNode;
}
const Widget = (props: WidgetProps) => {
  const { slug, column, elements } = props;
  const { data } = useQuery(GET_WIDGET_TYPE, {
    variables: {
      slug: slug,
    },
    skip: !slug,
  });
  if (data?.getWidgetTypeBySlug === "Grid")
    return <GridWidget name={slug} elements={elements} />;
  else return <SliderWidget name={slug} column={column} />;
};

export default memo(Widget);
