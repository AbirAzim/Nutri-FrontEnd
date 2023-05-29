import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { GET_GRID_WIDGET } from "../../../graphql/Widget";
import styles from "./GridWidget.module.scss";

interface GridWidgetProps {
  name: string;
  elements: (item: any) => React.ReactNode;
}
const GridWidget: React.FC<GridWidgetProps> = (props) => {
  const { name, elements } = props;
  const { data } = useQuery(GET_GRID_WIDGET, {
    variables: {
      slug: name,
    },
    skip: name === "",
  });

  const widget = data?.getWidgetsForClient;
  return (
    <div className="row">
      {widget &&
        widget?.widgetCollections?.map((item) =>
          elements ? (
            elements(item)
          ) : (
            <p>WIDGET - NO FRONTEND THEME - {item.displayName}</p>
          ),
        )}
    </div>
  );
};

GridWidget.defaultProps = {
  name: "",
};

export default GridWidget;
