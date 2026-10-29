package hu.example.mocking;

import hu.example.BankAccount;
import java.util.Objects;
public class BankService {
    private final NotificationService notifications;
    public BankService(NotificationService notifications) { this.notifications = Objects.requireNonNull(notifications); }
    public void deposit(BankAccount account, double amount) {
        account.deposit(amount);
        notifications.send("Deposit successful");
    }
}
