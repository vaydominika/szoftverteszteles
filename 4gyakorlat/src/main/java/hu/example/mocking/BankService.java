package hu.example.mocking;

import hu.example.BankAccount;
public class BankService {
    private final NotificationService notifications;
    public BankService(NotificationService notifications) { this.notifications = notifications; }
    public void deposit(BankAccount account, double amount) { }
}
