const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");
const calculate = (n1, operator, n2) => {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

  if (operator === "add") {
    return n1 + n2;
  } else if (operator === "subtract") {
    return n1 - n2;
  } else if (operator === "multiply") {
    return n1 * n2;
  } else if (operator === "divide") {
    return n1 / n2;
  }
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target; //butten target aus MouseEvent
    const action = key.dataset.action; //data-action attribut
    const keyContent = key.textContent; // inhalt des buttens der gedrückt wurde
    const displayedNum = display.textContent; // holt sich das was im display div steht
    const previousKeyType = calculator.dataset.previousKeyType; // auslesen ob vorher ein operator gedrückt wurde

    calculator
      .querySelectorAll(".key--operator")
      .forEach((k) => k.classList.remove("is-depressed"));

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent += keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== "operator") {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      if (previousKeyType === "operator") {
        display.textContent = "0.";
      } else if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      }
      calculator.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});
