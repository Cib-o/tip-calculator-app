const billElement = document.getElementById("bill");
const customTipElement = document.getElementById("custom-tip");
const numOfPeopleElement = document.getElementById("number-of-people")
const notAllowedText = document.querySelectorAll(".not-allowed");
const resetButton = document.getElementById("reset-btn");
const tipAmountElement = document.getElementById("tip-amount");
const totalAmountElement = document.getElementById("total-amount");

const inputElements = document.querySelectorAll("input");
const buttons = document.querySelectorAll("button");

let bill = 0;
let tipPercent = 0;
let numPeople = 0;

inputElements.forEach(element => {
  if (element.id === "bill") {
    element.addEventListener("change", event => {
      if (event.target.value <= 0) {
        element.value = "0";
        element.style.outline = "2px solid rgba(225, 116, 87, 1)";
        element.style.outlineColor = "rgba(225, 116, 87, 1)";

        notAllowedText[0].style.display = "block";

        resetButton.setAttribute("disabled", "true");
        resetButton.style.backgroundColor = "rgb(13, 104, 109)";
        resetButton.style.cursor = "not-allowed";
      } else {
        bill = element.value;
        calculate(bill, tipPercent, numPeople);

        element.style = "";

        notAllowedText[0].style.display = "none";

        resetButton.removeAttribute("disabled");
        resetButton.style.backgroundColor = "rgb(159, 232, 223)";
        resetButton.style.cursor = "pointer";
      }
    });
  } else if (element.id === "number-of-people") {
    element.addEventListener("change", event => {
      if (event.target.value <= 0) {
        element.value = "0";
        element.style.outline = "2px solid rgba(225, 116, 87, 1)";
        element.style.outlineColor = "rgba(225, 116, 87, 1)";

        notAllowedText[1].style.display = "block";
      } else {
        numPeople = element.value;
        calculate(bill, tipPercent, element.value);

        element.style = "";
        notAllowedText[1].style.display = "none";
      }
    });
  } else if (element.id === "custom-tip") {
    element.addEventListener("change", event => {
      if (event.target.value < 0) {
        customTipElement.value = "0";
      } else {
        tipPercent = element.value;
        calculate(bill, tipPercent, numPeople);
      }
    });
  }
});

buttons.forEach(element => {
  element.addEventListener("click", event => {
    tipPercent = event.target.innerHTML.slice(0, -1);
    calculate(bill, tipPercent, numPeople);

    customTipElement.value = "";
  });
});

function calculate(b, t, n) {
  if (!b || !t || !n) return;

  let tipAmountPerson = ((b * t) / 100) / n;
  let totalPerson = (b / n) + tipAmountPerson;

  tipAmountElement.innerHTML = "$" + tipAmountPerson.toFixed(2);
  totalAmountElement.innerHTML = "$" + totalPerson.toFixed(2);
}

function reset() {
  if (billElement.value != "") billElement.value = "";
  if (numOfPeopleElement.value != "") numOfPeopleElement.value = "";
  if (customTipElement.value != "") customTipElement.value = "";

  resetButton.setAttribute("disabled", "true");
  resetButton.style.backgroundColor = "rgb(13, 104, 109)";
  resetButton.style.cursor = "not-allowed";
  numOfPeopleElement.style = "";
  notAllowedText[1].style.display = "none";

  tipAmountElement.innerHTML = "$0.00";
  totalAmountElement.innerHTML = "$0.00";
}