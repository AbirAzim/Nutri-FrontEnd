import React, { useEffect, useMemo } from "react";
import styles from "./ServerPagination.module.scss";

interface PaginationState {
  limit: number;
  pageState: [number, any];
  totalPage: number;
  activeBgColor?: "default" | "primary" | "secondary";
}
const Pagination = (props: PaginationState) => {
  const { limit, pageState, totalPage, activeBgColor = "default" } = props;
  const [currentPage, setCurrentPage] = pageState;

  const pages = useMemo(() => {
    const pages = [];
    let startPage, endPage;
    if (currentPage <= limit) {
      startPage = 1;
      endPage = totalPage < limit ? totalPage : limit;
    } else {
      if (totalPage - currentPage < 5) {
        startPage = totalPage - 5;
        endPage = totalPage;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={
            currentPage === i
              ? `${styles["is-active"]} ${styles[activeBgColor]}`
              : ""
          }
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(i);
          }}
        >
          <li>{i}</li>
        </button>,
      );
    }
    return pages;
  }, [activeBgColor, currentPage, limit, setCurrentPage, totalPage]);

  if (totalPage === 0) return null;

  return (
    <ul className={styles.pagination}>
      {currentPage > limit && (
        <button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          <li>&lt;</li>
        </button>
      )}
      {pages}
      {totalPage > limit && currentPage + 2 < totalPage && (
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          <li>&gt;</li>
        </button>
      )}
    </ul>
  );
};

export default Pagination;
