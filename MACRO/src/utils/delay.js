const delay = async (min = 800, max = 1800) => {
  const time = Math.floor(Math.random() * (max - min)) + min;
  return new Promise(res => setTimeout(res, time));
};

module.exports = { delay };