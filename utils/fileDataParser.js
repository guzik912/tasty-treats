module.exports = (file, splitChar) => {
  const objSchema = ['name', 'email', 'message', 'subscribe'];
  const result = [];
  let splittedLinesOfFile = file.toString().split(/\r?\n/);

  for (let i = 0; i < splittedLinesOfFile.length - 1; i++) {
    const splittedLine = splittedLinesOfFile[i].split(splitChar);
    const obj = {};

    for (let j = 0; j < splittedLine.length; j++) {
      obj[objSchema[j]] = splittedLine[j];
    }

    result.push(obj);
  }

  return result;
};
