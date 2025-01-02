const form = document.getElementById('finance-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const totalIncomeElement = document.getElementById('total-income');
const totalExpenseElement = document.getElementById('total-expense');
const totalBalanceElement = document.getElementById('total-balance');
const transactionList = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Update Summary
function updateSummary() {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  totalIncomeElement.textContent = `Rp ${totalIncome.toLocaleString()}`;
  totalExpenseElement.textContent = `Rp ${totalExpense.toLocaleString()}`;
  totalBalanceElement.textContent = `Rp ${totalBalance.toLocaleString()}`;
}

// Render Transactions
function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.className = transaction.type;
    li.innerHTML = `
      ${transaction.description} - Rp ${transaction.amount.toLocaleString()}
      <button onclick="deleteTransaction(${index})">Hapus</button>
    `;
    transactionList.appendChild(li);
  });
}

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseInt(amountInput.value);
  const type = typeSelect.value;

  if (description === '' || isNaN(amount) || amount <= 0) {
    alert('Masukkan data yang valid!');
    return;
  }

  transactions.push({ description, amount, type });
  localStorage.setItem('transactions', JSON.stringify(transactions));

  descriptionInput.value = '';
  amountInput.value = '';
  updateSummary();
  renderTransactions();
}

// Delete Transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateSummary();
  renderTransactions();
}

// Initialize App
form.addEventListener('submit', addTransaction);
updateSummary();
renderTransactions();
