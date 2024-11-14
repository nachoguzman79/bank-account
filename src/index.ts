class BankAccount {
  private balance: number;
  private interestRate: number;
  private interestCeiling : number;

  constructor(balance: number, interestRate:number, interestCeiling:number) {
    this.balance = balance;
    this.interestRate = interestRate;
    this.interestCeiling = interestCeiling;
  }

  deposit(amount: number): void{
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
    this.withdraw(amount)
    account.deposit(amount)
     }

     getMensualInterest(): number {
      if (this.balance > this.interestCeiling) {
        return this.interestCeiling * this.interestRate 
      } else{
        return this.balance * this.interestRate
      }

     }
}

const account1 = new BankAccount(40000, 0.01, 50000);



console.log(account1.getMensualInterest());