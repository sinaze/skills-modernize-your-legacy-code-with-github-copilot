const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

// Path to balance.json
const BALANCE_PATH = path.join(__dirname, 'balance.json');

function getBalance() {
  const data = JSON.parse(readFileSync(BALANCE_PATH, 'utf8'));
  return typeof data.balance === 'number' ? data.balance : parseFloat(data.balance);
}

function setBalance(newBalance) {
  writeFileSync(BALANCE_PATH, JSON.stringify({ balance: Number(newBalance).toFixed(2) }), 'utf8');
}

function credit(amount) {
  const current = getBalance();
  const newBalance = parseFloat(current) + parseFloat(amount);
  setBalance(newBalance);
  return newBalance;
}

function debit(amount) {
  const current = getBalance();
  if (parseFloat(amount) > parseFloat(current)) {
    throw new Error('Insufficient funds for this debit.');
  }
  const newBalance = parseFloat(current) - parseFloat(amount);
  setBalance(newBalance);
  return newBalance;
}

function resetBalance() {
  setBalance(1000.00);
}

module.exports = {
  getBalance,
  setBalance,
  credit,
  debit,
  resetBalance
};
