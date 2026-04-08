const account = require('./account');
const fs = require('fs');
const path = require('path');

describe('Account Management System', () => {
  const BALANCE_PATH = path.join(__dirname, 'balance.json');

  beforeEach(() => {
    // Reset balance to 1000.00 before each test
    account.resetBalance();
  });

  test('TC-01: View current account balance', () => {
    expect(account.getBalance()).toBeCloseTo(1000.00, 2);
  });

  test('TC-02: Credit account with valid amount', () => {
    const newBalance = account.credit(200.00);
    expect(newBalance).toBeCloseTo(1200.00, 2);
    expect(account.getBalance()).toBeCloseTo(1200.00, 2);
  });

  test('TC-03: Debit account with valid amount', () => {
    const newBalance = account.debit(100.00);
    expect(newBalance).toBeCloseTo(900.00, 2);
    expect(account.getBalance()).toBeCloseTo(900.00, 2);
  });

  test('TC-04: Debit account with insufficient funds', () => {
    expect(() => account.debit(2000.00)).toThrow('Insufficient funds for this debit.');
    expect(account.getBalance()).toBeCloseTo(1000.00, 2);
  });

  test('TC-07: Data persistence after credit', () => {
    account.credit(150.00);
    // Simulate reload
    const persisted = parseFloat(JSON.parse(fs.readFileSync(BALANCE_PATH, 'utf8')).balance);
    expect(persisted).toBeCloseTo(1150.00, 2);
  });

  test('TC-08: Data persistence after debit', () => {
    account.debit(250.00);
    // Simulate reload
    const persisted = parseFloat(JSON.parse(fs.readFileSync(BALANCE_PATH, 'utf8')).balance);
    expect(persisted).toBeCloseTo(750.00, 2);
  });
});
