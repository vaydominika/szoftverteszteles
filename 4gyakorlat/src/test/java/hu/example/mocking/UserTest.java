package hu.example.mocking;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserTest {
    @Mock User user;
    @Mock UserDatabase database;
    @Test void mockDataCanBeStubbedAndVerified() {
        when(user.getId()).thenReturn(123);
        when(user.getUserName()).thenReturn("TesztElek");
        when(user.getPassword()).thenReturn("TOPSECRET");
        when(user.isLoggedIn()).thenReturn(true);
        assertAll(() -> assertEquals(123, user.getId()), () -> assertEquals("TesztElek", user.getUserName()),
            () -> assertEquals("TOPSECRET", user.getPassword()), () -> assertTrue(user.isLoggedIn()));
        verify(user).getId(); verify(user).getUserName(); verify(user).getPassword(); verify(user).isLoggedIn();
        verifyNoMoreInteractions(user);
    }
    @Test void passwordUpdateCallsDatabaseWithUserId() {
        User real = new User(123, "TesztElek", "old", true, database);
        real.updatePwd("new");
        verify(database).setPassword(123, "new"); verifyNoMoreInteractions(database);
        assertAll(() -> assertEquals(123, real.getId()), () -> assertEquals("TesztElek", real.getUserName()),
            () -> assertTrue(real.isLoggedIn()), () -> assertEquals("new", real.getPassword()));
    }
    @Test void databaseErrorPropagatesAndKeepsOldPassword() {
        User real = new User(123, "TesztElek", "old", true, database);
        doThrow(new UnsupportedOperationException("offline")).when(database).setPassword(123, "new");
        assertThrows(UnsupportedOperationException.class, () -> real.updatePwd("new"));
        verify(database).setPassword(123, "new");
        assertEquals("old", real.getPassword());
    }
    @Test void loggedOutUserCannotWriteToDatabase() {
        User real = new User(123, "TesztElek", "old", false, database);
        assertThrows(IllegalStateException.class, () -> real.updatePwd("new"));
        verifyNoInteractions(database);
        assertEquals("old", real.getPassword());
    }
    @Test void invalidPasswordDoesNotReachDatabase() {
        User real = new User(123, "TesztElek", "old", true, database);
        assertThrows(IllegalArgumentException.class, () -> real.updatePwd(null));
        assertThrows(IllegalArgumentException.class, () -> real.updatePwd(" "));
        verifyNoInteractions(database);
        assertEquals("old", real.getPassword());
    }
}
