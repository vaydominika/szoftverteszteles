package hu.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {
    private BankAccount account;
    @BeforeEach void setUp() { account = new BankAccount(); }
    @Test void startsEmpty() { assertEquals(0.0, account.getBalance()); }
    @Test void depositsAccumulate() {
        account.deposit(500); account.deposit(1500); account.deposit(200);
        assertEquals(2200.0, account.getBalance());
    }
    @Test void withdrawalsAndDepositsMayAlternate() {
        account.deposit(1000); account.withdraw(200); account.deposit(500); account.withdraw(300);
        assertEquals(1000.0, account.getBalance());
    }
    @Test void repeatedWithdrawalsReduceBalance() {
        account.deposit(5000); account.withdraw(1000); account.withdraw(500); account.withdraw(2000);
        assertEquals(1500.0, account.getBalance());
    }
    @Test void mayWithdrawEntireBalance() {
        account.deposit(1000); account.withdraw(1000);
        assertEquals(0.0, account.getBalance());
    }
    @Test void handlesDecimalAmounts() {
        account.deposit(100.50); account.withdraw(50.25);
        assertEquals(50.25, account.getBalance(), 1e-9);
    }
    @Test void insufficientFundsLeaveBalanceUnchanged() {
        account.deposit(500);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(501));
        assertEquals(500.0, account.getBalance());
    }
    @ParameterizedTest @ValueSource(doubles = {0, -1, Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void invalidAmountsLeaveBalanceUnchanged(double amount) {
        account.deposit(100);
        assertThrows(IllegalArgumentException.class, () -> account.deposit(amount));
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(amount));
        assertEquals(100.0, account.getBalance());
    }
    @Test void invalidDepositHasUsefulMessage() {
        assertEquals("Amount must be positive and finite", assertThrows(IllegalArgumentException.class, () -> account.deposit(-1)).getMessage());
    }
    @Test void overflowDoesNotChangeBalance() {
        account.deposit(Double.MAX_VALUE);
        assertThrows(IllegalArgumentException.class, () -> account.deposit(Double.MAX_VALUE));
        assertEquals(Double.MAX_VALUE, account.getBalance());
    }
}
