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
account1.removeFavoriteAccountById(2); // Fixed typo here
console.log(account1.getFavoritesAccounts().length);
