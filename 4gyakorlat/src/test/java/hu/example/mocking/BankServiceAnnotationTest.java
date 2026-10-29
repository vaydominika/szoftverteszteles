package hu.example.mocking;

import hu.example.BankAccount;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BankServiceAnnotationTest {
    @Mock NotificationService notifications;
    @InjectMocks BankService service;
    @Test void depositUsesInjectedDependency() {
        BankAccount account = new BankAccount();
        service.deposit(account, 500);
        assertEquals(500.0, account.getBalance());
        verify(notifications).send("Deposit successful");
    }
    @ParameterizedTest @ValueSource(doubles = {0, -100, Double.NaN, Double.POSITIVE_INFINITY})
    void rejectedDepositDoesNotNotify(double amount) {
        BankAccount account = new BankAccount(); account.deposit(100);
        assertThrows(IllegalArgumentException.class, () -> service.deposit(account, amount));
        assertEquals(100.0, account.getBalance());
        verify(notifications, never()).send(anyString());
        verifyNoInteractions(notifications);
    }
    @Test void notificationFailureIsPropagatedAfterDeposit() {
        BankAccount account = new BankAccount();
        doThrow(new IllegalStateException("offline")).when(notifications).send(anyString());
        assertThrows(IllegalStateException.class, () -> service.deposit(account, 100));
        assertEquals(100.0, account.getBalance());
        verify(notifications).send("Deposit successful");
    }
}
