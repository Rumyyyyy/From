const { naturalScroll } = require('./naturalScroll');
const { visitReviewTab } = require('./reviewVisit');

function chance(percent) {
  return Math.random() * 100 < percent;
}

async function runRandomActions(page) {
  try {
    if (chance(60)) {
      await naturalScroll(page);
    }

    if (chance(40)) {
      await visitReviewTab(page);
    }
  } catch (e) {
    console.log('⚠️ 랜덤 행동 실패 (무시)');
  }
}

module.exports = { runRandomActions };
