"use strict";
class BankAccount {
    constructor(id, balance, interestRate, interestCeiling) {
        this.favoriteAccounts = [];
        this.id = id;
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
    getMonthlyInterest() {
        if (this.balance > this.interestCeiling) {
            return this.interestCeiling * this.interestRate;
        }
        else {
            return this.balance * this.interestRate;
        }
    }
    addAccountToFavorites(account) {
        this.favoriteAccounts.push(account);
    }
    getFavoritesAccounts() {
        return this.favoriteAccounts;
    }
    removeFavoriteAccountById(id) {
        const indexToRemove = this.favoriteAccounts.findIndex((account) => account.id === id);
        if (indexToRemove === -1) {
            throw new Error('Account not found in favorites');
        }
        this.favoriteAccounts.splice(indexToRemove, 1);
    }
}
const account1 = new BankAccount(1, 40000, 0.01, 50000);
const account2 = new BankAccount(2, 100000, 0.01, 50000);
account1.addAccountToFavorites(account2);
//transfer €20000 from account1 to it's favorite bank account
account1.transferMoney(20000, account1.getFavoritesAccounts()[0]);
//withdraw €25000 from bank account1
try {
    account1.withdraw(25000);
}
catch (err) {
    console.log('Error: ', err.message);
}
//display the amount of monthly interest on BankAccount1
console.log("Account 1 monthly interests ", account1.getMonthlyInterest());
//display the balance of bankAccount1
console.log("Balance Account 1  ", account1.getBalance());
//remove the bankAccount2 from bankAccount1 favorites
account1.removeFavoriteAccountById(2);
