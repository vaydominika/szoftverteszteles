package hu.example.mocking;

import hu.example.BankAccount;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BankServiceTest {
    @Test void successfulDepositNotifiesAfterUpdatingBalance() {
        NotificationService notifications = mock(NotificationService.class);
        BankAccount account = new BankAccount();
        doAnswer(call -> { assertEquals(1000.0, account.getBalance()); return null; })
            .when(notifications).send("Deposit successful");
        new BankService(notifications).deposit(account, 1000);
        assertEquals(1000.0, account.getBalance());
        verify(notifications, times(1)).send("Deposit successful");
        verifyNoMoreInteractions(notifications);
    }
}
