// get all items
const todo_form = document.querySelector('#todo-form');
const msg = document.querySelector('#msg');
const listGroup = document.querySelector('ul.list-group');
const cardFooter = document.querySelector('.card-footer');

// submit form
todo_form.onsubmit = (e) => {
  e.preventDefault();

  // get from data by destructuring way
  const form_data = new FormData(e.target);
  const { cl_name, pj_name, date, time } = Object.fromEntries(form_data.entries());

  // set condition accordingly
  if (!cl_name || !pj_name || !date || !time) {
    msg.innerHTML = alertSimple('value is missing, please Check again!');
  } else {
    // make time
    const startTime = Date.now(),
      lastTime = new Date(date + ' ' + time),
      endTime = lastTime.getTime();

    // make rendom id
    const randomId = Math.floor(Math.random() * 10000) + '_' + Date.now();

    // sorting them
    let singleData = { cl_name, pj_name, startTime, endTime, randomId };

    // now pass data to ls
    createLsdata('todo', singleData);
    e.target.reset();
    showMe();
  }
};

// create function to show by html
const showMe = () => {
  // apply data from ls
  const allData = applyLsData('todo');

  // create an empty array
  let data = '';

  // no data condition
  // (!allData || allData.length) == 0 ? (data = '') : '';
  if (!allData || allData.length == 0) {
    data = [];
  }

  // ls data show code
  if (allData) {
    allData.reverse().map((pro) => {
      data += `
      <li class="list-group-item shadow">
        Client : <strong class="text-success">${pro.cl_name}</strong> | ${
        pro.pj_name
      } | Time left: <strong>${timerRunner(pro.endTime)}</strong>
        <button deleteList="${
          pro.randomId
        }" class="close text-warning bg-dark border-0 rounded-circle">&Cross;</button>
        <span style="${pBar(
          pro.startTime,
          pro.endTime
        )}" class="progess-bar progress-bar-striped progress-bar-animated mt-1" role="progressbar" ></span>
      </li>`;
    });
  }

  // console.log(pBar(84, 14));

  // show data
  listGroup.innerHTML = data;

  // footer show data
  cardFooter.innerHTML = `<p>Total number of project running is : <span>${
    allData ? allData.length : 'NULL'
  }</span></p>`;
};
showMe();

setInterval(() => {
  showMe();
}, 1000);

// delete feature
listGroup.onclick = (e) => {
  // const id = e;

  if (e.target.hasAttribute('deleteList')) {
    const id = e.target.getAttribute('deleteList');

    // apply all data
    const allData = applyLsData('todo');

    //get id from data
    const datay = allData.findIndex((data) => data.randomId == id);

    // remove id from data
    allData.splice(datay, 1);

    // now update data again
    updataLsData('todo', allData);

    // show data
    showMe();
  }
};
showMe();
