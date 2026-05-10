const incomeInput = document.getElementById("income");
const expensesInput = document.getElementById("expenses");
const calculateBtn = document.getElementById("calculate-btn");
const result = document.getElementById("result");
const recordsList = document.getElementById("records-list");

const totalIncomeDisplay = document.getElementById("total-income");
const totalExpensesDisplay = document.getElementById("total-expenses");
const totalProfitDisplay = document.getElementById("total-profit");

// GET SAVED RECORDS
let records = JSON.parse(localStorage.getItem("farmRecords")) || [];

// DISPLAY SAVED RECORDS WHEN PAGE LOADS
showRecords();
updateSummary();

// BUTTON CLICK EVENT
calculateBtn.addEventListener("click", () => {
  const income = Number(incomeInput.value);
  const expenses = Number(expensesInput.value);

  // VALIDATION
  if (income === 0 || expenses === 0) {
    alert("Please enter income and expenses");
    return;
  }

  // CALCULATE PROFIT OR LOSS
  const total = income - expenses;

  let status = "";

  result.classList.remove("profit");
  result.classList.remove("loss");

  if (total > 0) {
    result.textContent = `Profit: KES ${total}`;
    result.classList.add("profit");

    status = "Profit";
  } else if (total < 0) {
    result.textContent = `Loss: KES ${Math.abs(total)}`;
    result.classList.add("loss");

    status = "Loss";
  } else {
    result.textContent = "No Profit No Loss";

    status = "Neutral";
  }

  // CREATE RECORD OBJECT
  const record = {
    income,
    expenses,
    total,
    status,
    date: new Date().toLocaleDateString(),
  };

  // ADD RECORD TO ARRAY
  records.push(record);

  // SAVE TO LOCAL STORAGE
  localStorage.setItem("farmRecords", JSON.stringify(records));

  // UPDATE UI
  showRecords();
  updateSummary();

  // CLEAR INPUTS
  incomeInput.value = "";
  expensesInput.value = "";
});