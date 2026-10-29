package hu.example.mocking;

public class User {
    public User() { }
    public User(int id, String userName, String password, boolean loggedIn, UserDatabase database) { }
    public int getId() { return 0; } public String getUserName() { return null; }
    public String getPassword() { return null; } public boolean isLoggedIn() { return false; }
    public void updatePwd(String password) { }
}
