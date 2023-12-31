let submit = document.querySelector(".form >span");
let inputs = document.querySelectorAll(".form input");
let [years, months, days] = document.querySelectorAll(
  ".results span:first-child"
);
let [dayDiv, monthDiv, yearDiv] = document.querySelectorAll(".form > div");

submit.onclick = () => {
  let inputvals = [...inputs].map((i) => i.value);
  let [dInput, mInput, yInput] = inputvals;
  if (yInput < 100) yInput = `00${yInput}`;
  let dateOfBirth = new Date(`${yInput}-${mInput}-${dInput}`);
  if (!isValid(dInput, mInput - 1, yInput) || dateOfBirth > new Date()) {
    inputs.forEach((ele) => {
      if (ele.value == "") {
        errorMesg(ele.parentElement, "This field is required");
      } else if (dInput > 31) {
        errorMesg(dayDiv, "Must be a valid day");
      } else if (mInput > 12) {
        errorMesg(monthDiv, "Must be a valid month");
      } else if (dateOfBirth > new Date()) {
        errorMesg(yearDiv, "Must be a date in the past");
      } else {
        errorMesg(dayDiv , "Must be a valid date");
        errorMesg(monthDiv);
        errorMesg(yearDiv);
      }
    });
  } else {
    inputs.forEach((el) => {
      styles(el.parentElement);
    });
    calcAge(dateOfBirth);
  }
};



function calcAge(dob) {
  let age = new Date() - dob;
  let yearCount = Math.trunc(age / 3.154e10);
  let yearFloat = age / 3.154e10 - yearCount;
  let monthsCount = Math.trunc(yearFloat * 12);
  let monthFloat = age / 2.628e9 - Math.trunc(age / 2.628e9);
  let dayscount = Math.trunc(monthFloat * 30.417);
  countUp(yearCount , monthsCount , dayscount)
}

function countUp(yCount , mCount , dCount){
  years.innerHTML = 0
  months.innerHTML = 0;
  days.innerHTML = 0;
  let yearUp = setInterval(() => {
    years.innerHTML = +years.innerHTML + 1;
    if (years.innerHTML == yCount){
      let monthUp = setInterval(() => {
        months.innerHTML = +months.innerHTML + 1;
        if (months.innerHTML == mCount) {
          let dayUp = setInterval(() => {
            days.innerHTML = +days.innerHTML + 1;
            if (days.innerHTML == dCount) {
              clearInterval(dayUp);
            }
          }, 40);
          clearInterval(monthUp);
        }
      }, 40);
      clearInterval(yearUp)
    }
  }, 40);
  ;
}

function errorMesg(ele, message = "") {
  ele.children[0].style.color = "hsl(0, 100%, 67%)";
  ele.children[1].style.borderColor = "hsl(0, 100%, 67%)";
  ele.children[2].innerHTML = message;
}

function daysInMonth(m, y) {
  // m is 0 indexed: 0-11
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
}

function isValid(d, m, y) {
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

function styles(ele) {
  ele.children[0].style.color = "hsl(0, 0%, 8%)";
  ele.children[1].style.borderColor = "hsl(0, 0%, 86%)";
  ele.children[2].innerHTML = "";
}

inputs.forEach((el)=>{
  el.onpaste = () =>{
    return false
  }
  el.ondrop = () => {
    return false;
  };
})