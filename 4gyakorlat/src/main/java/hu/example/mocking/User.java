package hu.example.mocking;

import java.util.Objects;
public class User {
    private int id;
    private String userName, password;
    private boolean loggedIn;
    private UserDatabase database;
    public User() { }
    public User(int id, String userName, String password, boolean loggedIn, UserDatabase database) {
        this.id = id; this.userName = userName; this.password = password;
        this.loggedIn = loggedIn; this.database = Objects.requireNonNull(database);
    }
    public int getId() { return id; } public String getUserName() { return userName; }
    public String getPassword() { return password; } public boolean isLoggedIn() { return loggedIn; }
    public void updatePwd(String password) {
        if (!loggedIn) throw new IllegalStateException("Login required");
        if (password == null || password.isBlank()) throw new IllegalArgumentException("Password required");
        database.setPassword(id, password);
        this.password = password;
    }
}
