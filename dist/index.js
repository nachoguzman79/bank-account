"use strict";
class BankAccount {
    constructor(balance, interestRate, interestCeiling) {
        this.balance = balance;
        this.interestRate = interestRate;
        this.interestCeiling = interestCeiling;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        if (this.balance - amount < 0) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
    }
    getBalance() {
        return this.balance;
    }
    transferMoney(amount, account) {
        this.withdraw(amount);
        account.deposit(amount);
    }
    getMensualInterest() {
        if (this.balance > this.interestCeiling) {
            return this.interestCeiling * this.interestRate;
        }
        else {
            return this.balance * this.interestRate;
        }
    }
}
const account1 = new BankAccount(40000, 0.01, 50000);
account1.deposit(10000);
console.log("balance", account1.getBalance());
account1.withdraw(50000);
console.log("balance after withdraw", account1.getBalance());
try {
    account1.withdraw(1);
}
catch (err) {
    console.log(err.message);
}
console.log(account1.getMensualInterest());
