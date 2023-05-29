import { useQuery } from "@apollo/client";
import { id } from "date-fns/locale";
import ejs from "ejs";
import { useRouter } from "next/router";
import { type } from "os";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ContentTray from "../../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import { GET_SLIDER_WIDGET } from "../../../graphql/Widget";
import useThemeMethod from "../../../hooks/modules/useThemeMethod";
import styles from "./SliderWidget.module.scss";

interface SliderWidgetProps {
  name: string;
  column?: number;
}

const SliderWidget = (props: SliderWidgetProps) => {
  const { name } = props;
  const { data } = useQuery(GET_SLIDER_WIDGET, {
    variables: {
      slug: name,
    },
    skip: !name,
  });

  const widget = data?.getWidgetsForClient;
  return (
    <Fragment>
      {widget &&
        widget?.widgetCollections?.map((collection: any) => (
          <WidgetCollection
            key={collection?._id}
            widget={name}
            collection={collection}
          />
        ))}
    </Fragment>
  );
};

const WidgetCollection = ({ widget, collection }) => {
  const { data, filter, icon, themeLink, displayName, showTabMenu, slug } =
    collection;

  const [tab, setTab] = useState("");
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (!themeLink) return;
    fetch(themeLink)
      .then((r) => r.text())
      .then((t) => {
        setHtml(t);
      });
  }, [themeLink]);

  const { filterType, values } = filter;
  const results = data[data?.collectionType] || [];
  const items =
    tab === "All"
      ? results
      : results.filter((recipe) => {
          const filterProps = recipe[filterType];
          console.log(filterProps);
          if (Array.isArray(filterProps)) {
            return filterProps.includes(tab);
          } else if (typeof filterProps === "object") {
            const filter = values.find((val) => val.label === tab);
            return filterProps._id === filter?.value;
          } else {
            return filterProps === tab;
          }
        });

  return (
    <ContentTray
      key={id}
      id={collection?._id}
      allUrl={`/${widget}/${slug}`}
      heading={displayName}
      hasFilter={showTabMenu}
      filters={values.map((value) => value.label)}
      tabState={[tab, setTab]}
      image={icon}
      customHTML={items.length === 0}
    >
      {items?.map((item) => (
        <Slide key={item?._id} item={item} html={html} />
      ))}
    </ContentTray>
  );
};

const Slide = ({ item, html }) => {
  const router = useRouter();
  const ref = useThemeMethod();

  return (
    <div
      ref={ref}
      className={styles.slider__card}
      onClick={() => router.push(`/recipe_details/${item?._id}`)}
      dangerouslySetInnerHTML={{
        __html: ejs.render(html, { data: item, methods: {} }),
      }}
    />
  );
};

export default SliderWidget;
