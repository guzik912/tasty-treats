module.exports = (data, sortBy) => {
  return sortBy.toLowerCase() === 'asc'
    ? data.sort((a, b) => a.timestamp - b.timestamp)
    : sortBy.toLowerCase() === 'desc'
    ? data.sort((a, b) => b.timestamp - a.timestamp)
    : data;
};
