document.querySelector("#loan-form").addEventListener("submit", calculateLoan);

function calculateLoan(e) {
  e.preventDefault();
  // Input Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  //Result Varialbes
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedIntrst = parseFloat(interest.value) / 100 / 12;
  const calculatedPmnts = parseFloat(years.value) * 12;
  //Compute monthly payment
  const x = Math.pow(1 + calculatedIntrst, calculatedPmnts);
  const monthlyPmnt = (principal * x * calculatedIntrst) / (x - 1);

  if (isFinite(monthlyPmnt)) {
    monthlyPayment.value = monthlyPmnt.toFixed(2);
    totalPayment.value = (monthlyPmnt * calculatedPmnts).toFixed(2);
    totalInterest.value = (monthlyPmnt * calculatedPmnts - principal).toFixed(
      2
    );
    document.querySelector("#loader").removeAttribute("hidden");
    document.querySelector("#result").setAttribute("hidden", "hidden");
    setTimeout(function () {
      document.querySelector("#loader").setAttribute("hidden", "hidden");
      document.querySelector("#result").removeAttribute("hidden");
    }, 3000);
  } else {
    showError("Please check your number");
  }
}

function showError(error) {
  const card = document.querySelector(".error-heading");
  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.appendChild(document.createTextNode(error));
  card.insertBefore(alert, card.firstChild);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
}
