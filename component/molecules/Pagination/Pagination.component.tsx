import React, { useEffect } from "react";
import styles from "./Pagination.module.scss";

interface PaginationState {
  pageState: [number, any];
  data: any;
  setItems: any;
  itemPerPage: number;
}
const Pagination = (props: PaginationState) => {
  const { pageState, data, setItems, itemPerPage } = props;
  const [currentPage, setCurrentPage] = pageState;

  useEffect(() => {
    // Get current posts
    const indexOfLastItem = currentPage * itemPerPage; //5
    const indexOfFirstItem = indexOfLastItem - itemPerPage; // 5-5
    const currentPosts = data?.slice(indexOfFirstItem, indexOfLastItem) || [];
    setItems(currentPosts);
  }, [currentPage, data, itemPerPage, setItems]);

  return (
    <ul className={styles.pagination}>
      <a href="#">
        <li>&lt;</li>
      </a>
      <a className={styles["is-active"]} href="#">
        <li>1</li>
      </a>
      <a href="#">
        <li>2</li>
      </a>
      <a href="#">
        <li>3</li>
      </a>
      <a href="#">
        <li>4</li>
      </a>
      <a href="#">
        <li>5</li>
      </a>
      <a href="#">
        <li>6</li>
      </a>
      <a href="#">
        <li>&gt;</li>
      </a>
    </ul>
  );
};

export default Pagination;
