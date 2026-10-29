package hu.example;

public class User {
    private String userName, password;
    private int id, loginCount;
    private boolean loggedIn;
    public String getUserName() { return userName; } public String getPassword() { return password; }
    public int getId() { return id; } public int getLoginCount() { return loginCount; }
    public boolean isLoggedIn() { return loggedIn; }
    public void login() { loggedIn = true; loginCount++; }
    public void logout() { loggedIn = false; }
    public void updatePwd(String password, boolean isLoggedIn) {
        if (!loggedIn || !isLoggedIn) throw new IllegalStateException("Login required");
        if (password == null || password.isBlank()) throw new IllegalArgumentException("Password required");
        this.password = password;
    }
}
