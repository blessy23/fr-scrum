const dateFormat = require('dateformat');
const now = new Date();

const routes = {
  '/': 'Home',
  '/scrum': `DailyScrum -  ${dateFormat(now, "dddd, mmmm dS, yyyy")}`,
  '/eod-status': `EOD status on ${dateFormat(now, "dddd, mmmm dS, yyyy")}`,
  '/daily-status': `Daily Status on -  ${dateFormat(now, "dddd, mmmm dS, yyyy")}`,
  '/weekly-status': `Weekly Status`,
  '/scrum-history': `Scrum History`,
};

export default routes;
