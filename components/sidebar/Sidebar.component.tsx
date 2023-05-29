/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCollectionDetailsId,
  setShowAllRecipes,
} from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import { updateSidebarActiveMenuName } from "../../redux/slices/utilitySlice";
import Tooltip from "../../theme/toolTip/CustomToolTip";
import styles from "./sidebar.module.scss";

export type sidebarActiveMenuNameType =
  | "Home"
  | "Blends"
  | "Plans"
  | "Challenges"
  | "Wiki"
  | "Blogs"
  | "Shop";

export const PAGES: {
  logo: string;
  link: string;
  content: sidebarActiveMenuNameType;
}[] = [
  { logo: "/icons/home.svg", link: "/", content: "Home" },
  { logo: "/icons/juicer.svg", link: "/discovery", content: "Blends" },

  {
    logo: "/icons/calender__sidebar.svg",
    link: "",
    content: "Plans",
  },
  {
    logo: "/icons/whistle.svg",
    link: "",
    content: "Challenges",
  },
  { logo: "/icons/books.svg", link: "/wiki", content: "Wiki" },
  { logo: "/icons/book_light.svg", link: "", content: "Blogs" },
  { logo: "/icons/store.svg", link: "", content: "Shop" },
];

export default function SidebarComponent(props) {
  const { sidebarActiveMenuName } = useAppSelector((state) => state.utility);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (link: string, menuName: sidebarActiveMenuNameType) => {
    if (link) {
      if (menuName === "Home") {
        dispatch(setCollectionDetailsId(""));
        dispatch(setOpenCollectionsTary(false));
        dispatch(setShowAllRecipes(false));
      }
      dispatch(updateSidebarActiveMenuName(menuName));
      router?.push(link);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src="/logo_small.svg" width={150} height={150} alt="logo" />
      </div>
      <ul className={styles.list}>
        {PAGES &&
          PAGES.map((page, i) => (
            <Tooltip key={"sidebaritem" + i} content={page?.content}>
              <li
                className={
                  sidebarActiveMenuName === page.content ? styles.active : ""
                }
                onClick={() => handleClick(page?.link, page?.content)}
              >
                <span>
                  {" "}
                  <img src={page.logo} alt={page.logo} />{" "}
                </span>
              </li>
            </Tooltip>
          ))}
      </ul>
    </div>
  );
}
