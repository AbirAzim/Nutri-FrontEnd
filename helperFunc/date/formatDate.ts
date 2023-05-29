const month_names_short = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: Date) {
  let month = "" + date?.getMonth();
  let day = "" + date?.getDate();
  let year = date?.getFullYear();

  // if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return {
    day,
    month: month_names_short[month],
    year,
  };
}

export default formatDate;
