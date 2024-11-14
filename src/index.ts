class BankAccount {
  private id: number;
  private balance: number;
  private interestRate: number;
  private interestCeiling: number;
  private favoriteAccounts: BankAccount[] = [];

  constructor(
    id: number,
    balance: number,
    interestRate: number,
    interestCeiling: number
  ) {
    this.id = id;
    this.balance = balance;
    this.interestRate = interestRate;
    this.interestCeiling = interestCeiling;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance - amount < 0) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }

  transferMoney(amount: number, account: BankAccount): void {
    this.withdraw(amount);
    account.deposit(amount);
  }

  getMonthlyInterest(): number {  
    if (this.balance > this.interestCeiling) {
      return this.interestCeiling * this.interestRate;
    } else {
      return this.balance * this.interestRate;
    }
  }

  addAccountToFavorites(account: BankAccount): void {
    this.favoriteAccounts.push(account);
  }

  getFavoritesAccounts(): BankAccount[] {
    return this.favoriteAccounts;
  }

  removeFavoriteAccountById(id: number): void {
    const indexToRemove = this.favoriteAccounts.findIndex(
      (account: BankAccount) => account.id === id
    );
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
try{
  account1.withdraw(25000);
} catch(err: unknown){
  console.log('Error: ', (err as Error).message);
}

//display the amount of monthly interest on BankAccount1
console.log("Account 1 monthly interests ", account1.getMonthlyInterest());

//display the balance of bankAccount1
console.log("Balance Account 1  ", account1.getBalance());

//remove the bankAccount2 from bankAccount1 favorites
account1.removeFavoriteAccountById(2);