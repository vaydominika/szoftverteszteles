package hu.example;

public class BankAccount {
    private double balance;
    public double getBalance() { return balance; }
    public void deposit(double amount) {
        validateAmount(amount);
        if (!Double.isFinite(balance + amount)) throw new IllegalArgumentException("Balance overflow");
        balance += amount;
    }
    public void withdraw(double amount) {
        validateAmount(amount);
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }
    private static void validateAmount(double amount) {
        if (!Double.isFinite(amount) || amount <= 0) throw new IllegalArgumentException("Amount must be positive and finite");
    }
}
