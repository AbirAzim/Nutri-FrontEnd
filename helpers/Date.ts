export const UTCDate = (date, splitter: string = "-") => {
  const parts = date.split(splitter);
  if (splitter === "/") {
    return new Date(parts[2], parts[0] - 1, parts[1]);
  }
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

export const getDateOnly = (date: Date) => {
  const d = new Date();
  let diff = d.getTimezoneOffset();

  let difference = -diff / 60;
  return new Date(date.setHours(difference, 0, 0, 0)).toISOString();
};

export const getDateISO = (date: Date) => {
  const d = new Date();
  let diff = d.getTimezoneOffset();

  let difference = -diff / 60;
  return new Date(date.setHours(difference, 0, 0, 0));
};

export const toIsoString = (date) => {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      return (num < 10 ? "0" : "") + num;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ":" +
    pad(Math.abs(tzo) % 60)
  );
};