import moment from 'moment';
export const getCurrentDate = () => ( (new Date()).toISOString().slice(0,10).replace(/-/g,""));
const getWeekFirstDay = () => {
  const curr = new Date; // get current date
  return curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week  
}

export const getMonday = () => {
  const curr = new Date;
  return (new Date(curr.setDate(curr.getDate() - curr.getDay()+ 1))).toISOString().slice(0,10).replace(/-/g,"");
}

export const getFriday = () => {
  const curr = new Date;
  return  (new Date(curr.setDate(curr.getDate() - curr.getDay()+ 6))).toISOString().slice(0,10).replace(/-/g,"");
}

export function getLastWorkingDay(){
  let workday = moment();
  let day = workday.day();
  let diff = 1;  // returns yesterday
  if (day == 0 || day == 1){  // is Sunday or Monday
    diff = day + 2;  // returns Friday
  }
  return workday.subtract(diff, 'days');
}