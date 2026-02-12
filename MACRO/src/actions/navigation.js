const { SITE } = require('../config/site.js');
const { delay } = require('../utils/delay');

const goHome = async (page) => {
  await page.goto(SITE.HOME);
  await delay();
};

module.exports = { goHome };