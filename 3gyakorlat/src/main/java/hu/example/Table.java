package hu.example;

public class Table {
    public Table(int width, int length, int height, String color, int legs) { }
    public Table(int width, int length, int height, int currentHeight, String color, int legs) { }
    public int getWidth() { return 0; } public int getLength() { return 0; }
    public int getHeight() { return 0; } public int getCurrentHeight() { return 0; }
    public int getNumberOfLegs() { return 0; } public String getColor() { return null; }
    public boolean isAdjustable() { return false; } public void setHeight(int value) { }
    public long area() { return 0; } public long getPerimeter() { return 0; }
    public int getCapacity() { return 0; } public void repaint(String color) { }
    public boolean isStable() { return false; } public boolean isFoldable() { return false; }
}
