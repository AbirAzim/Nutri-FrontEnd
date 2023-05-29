function updateName(name: string, namesList: string[]): string {
  let count = 0;
  let updatedName = name;

  // check if name already exists in the namesList
  while (namesList.includes(updatedName)) {
    count++;
    updatedName = `${name}(${count})`;
  }

  return updatedName;
}

export default updateName;
