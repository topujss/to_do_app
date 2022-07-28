/**
 * random id generate
 */
const randomId = () => Math.floor(Math.random() * 10000) + '_' + Date.now();

/**
 * sent alert
 */
const alertSimple = (sms, color = 'danger') => {
  return `<p class="alert alert-${color} d-flex justify-content-between">${sms}<button data-bs-dismiss="alert" class="btn-close btn-sm"></button></p>`;
};

/**
 * time runner
 */
const timerRunner = (endTime) => {
  // getting real time and doing negative
  let run = Math.floor(Math.abs(endTime - Date.now()));

  // get time accordingly by run var
  let total_sec = Math.floor(run / 1000),
    total_min = Math.floor(total_sec / 60),
    total_hr = Math.floor(total_min / 60),
    total_day = Math.floor(total_hr / 24);

  // get specific time from total time
  let hr = total_hr - total_day * 24,
    min = total_min - total_day * 24 * 60 - hr * 60,
    sec = total_sec - total_day * 24 * 60 * 60 - hr * 60 * 60 - min * 60;

  // lastly return time
  if (endTime > Date.now()) {
    return `${total_day} Day ${hr} Hour ${min} Min ${sec} Sec`;
  } else {
    return `[ <strong class="text-danger">Time over</strong> ]`;
  }
};

/**
 * create LS data
 */
const createLsdata = (key, data) => {
  // store data to an empty array
  let listing = [];

  // checking if key exists if true make parse and store to localStorage.
  localStorage.getItem(key) && (listing = JSON.parse(localStorage.getItem(key)));

  // push now data to listing
  listing.push(data);

  // passing listing data to localStorage and by making json string
  localStorage.setItem(key, JSON.stringify(listing));
};

/**
 * creating apply ls data
 */
const applyLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return false;
  }
};

/**
 * update LS data
 */
const updataLsData = (key, list) => localStorage.setItem(key, JSON.stringify(list));

/**
 * progress bar
 */
const pBar = (startTime, endTime) => {
  const run = endTime - startTime;
  const now = endTime - Date.now();

  // making progress bar after getting time
  const pWidth = Math.floor((100 * now) / run);

  let wid = '';

  if (pWidth >= 0 && pWidth <= 33) {
    wid = `width:${pWidth}%; background-color:red;`;
  } else if (pWidth >= 34 && pWidth <= 66) {
    wid = `width:${pWidth}%; background-color:orange;`;
  } else if (pWidth >= 67 && pWidth <= 100) {
    wid = `width:${pWidth}%; background-color:green;`;
  } else {
    wid = `width:100%; background-color:red;`;
  }

  return wid;
};
