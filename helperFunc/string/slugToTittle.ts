const slugToTitle = (str: string) => {
  return str
    .split("-")
    .join(" ")
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export function slugify(text: string) {
  // Convert to lowercase and replace non-alphanumeric characters with dashes
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug;
}

export default slugToTitle;
