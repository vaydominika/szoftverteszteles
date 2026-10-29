package hu.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    @Test void initialStateUsesJavaDefaults() {
        User user = new User();
        assertAll(() -> assertNull(user.getUserName()), () -> assertNull(user.getPassword()),
            () -> assertEquals(0, user.getId()), () -> assertEquals(0, user.getLoginCount()), () -> assertFalse(user.isLoggedIn()));
    }
    @Test void loginAndLogoutMaintainCounter() {
        User user = new User();
        user.login(); assertTrue(user.isLoggedIn()); assertEquals(1, user.getLoginCount());
        user.logout(); assertFalse(user.isLoggedIn()); assertEquals(1, user.getLoginCount());
        user.login(); assertTrue(user.isLoggedIn()); assertEquals(2, user.getLoginCount());
    }
    @Test void passwordUpdateRequiresActualLoginAndPermission() {
        User user = new User();
        assertThrows(IllegalStateException.class, () -> user.updatePwd("new-password", true));
        user.login();
        assertThrows(IllegalStateException.class, () -> user.updatePwd("new-password", false));
        assertNull(user.getPassword());
        user.updatePwd("new-password", true);
        assertEquals("new-password", user.getPassword());
        user.logout();
        assertThrows(IllegalStateException.class, () -> user.updatePwd("other", true));
        assertEquals("new-password", user.getPassword());
    }
    @Test void blankPasswordIsRejectedWithoutChangingState() {
        User user = new User(); user.login(); user.updatePwd("valid", true);
        assertThrows(IllegalArgumentException.class, () -> user.updatePwd(null, true));
        assertThrows(IllegalArgumentException.class, () -> user.updatePwd(" ", true));
        assertEquals("valid", user.getPassword());
    }
}
