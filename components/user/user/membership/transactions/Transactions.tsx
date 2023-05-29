import React from "react";
import { useTable, useSortBy } from "react-table";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import styles from "./Transaction.module.scss";

function Transactions() {
  const data = React.useMemo(
    () => [
      {
        activity: " 30 day challenge",
        type: "Event",
        date: "26/06/2021",
        amount: "200",
      },
      {
        activity: " 25 day challenge",
        type: "Black Friday",
        date: "03/12/2021",
        amount: "800",
      },
      {
        activity: " 20 day challenge",
        type: "Christmas",
        date: "25/12/2021",
        amount: "270",
      },
      {
        activity: " 15 day challenge",
        type: "Weekend",
        date: "04/03/2021",
        amount: "500",
      },
      {
        activity: " 10 day challenge",
        type: "Hourly",
        date: "06/06/2021",
        amount: "2000",
      },
      {
        activity: " 5 day challenge",
        type: "Home delivary",
        date: "04/03/2021",
        amount: "50",
      },
      {
        activity: " 100 day challenge",
        type: "weekdays",
        date: "06/01/2021",
        amount: "2500",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Activity",
        accessor: "activity", // accessor is the "key" in the data
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className={styles.transactionContainer}>
      <div className={styles.transactionHeader}>
        <div>
          <p className={styles.firstLabel}>Membership Plan</p>
          <p className={styles.secondLabel}>Free</p>
        </div>
        <div>
          <p className={styles.firstLabel}>Membership Renewal</p>
          <p className={styles.secondLabel}>June 15,2021</p>
        </div>
        <div></div>
      </div>
      <div className={styles.tableWraper}>
        <table {...getTableProps()} className={styles.tableContainer}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span className={styles.arrowIcon}>
                      {column.isSortedDesc ? <BiDownArrow /> : <BiUpArrow />}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  key={index}
                  {...row.getRowProps()}
                  className={styles.tableBody}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
