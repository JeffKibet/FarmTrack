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

// SHOW RECORDS
function showRecords() {

    recordsList.innerHTML = "";

    records.forEach((record, index) => {

        const li = document.createElement("li");

        if (record.status === "Profit") {
             li.innerHTML = `
                <strong>Date:</strong> ${record.date} <br>
                <strong>Income:</strong> KES ${record.income} <br>
                <strong>Expenses:</strong> KES ${record.expenses} <br>
                <strong style="color:green;">
                    Profit: KES ${record.total}
                </strong>
                <br><br>
                <button onclick="deleteRecord(${index})">
                    Delete
                </button>
            `;
            } else if (record.status === "Loss") {

            li.innerHTML = `
                <strong>Date:</strong> ${record.date} <br>
                <strong>Income:</strong> KES ${record.income} <br>
                <strong>Expenses:</strong> KES ${record.expenses} <br>
                <strong style="color:red;">
                    Loss: KES ${Math.abs(record.total)}
                </strong>
                <br><br>
                <button onclick="deleteRecord(${index})">
                    Delete
                </button>
            `;
            } else {

            li.innerHTML = `
                <strong>Date:</strong> ${record.date} <br>
                No Profit No Loss
                <br><br>
                <button onclick="deleteRecord(${index})">
                    Delete
                </button>
            `;
        }
         recordsList.appendChild(li);

    });

}

// UPDATE SUMMARY CARDS
function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;
  let totalProfit = 0;

  records.forEach((record) => {
    totalIncome += record.income;
    totalExpenses += record.expenses;
    totalProfit += record.total;
  });

  totalIncomeDisplay.textContent = `KES ${totalIncome}`;
  totalExpensesDisplay.textContent = `KES ${totalExpenses}`;
  totalProfitDisplay.textContent = `KES ${totalProfit}`;
}
// DELETE RECORD
function deleteRecord(index) {

    records.splice(index, 1);

    localStorage.setItem("farmRecords", JSON.stringify(records));

    showRecords();
    updateSummary();

}