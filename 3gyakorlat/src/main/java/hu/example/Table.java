package hu.example;

public class Table {
    private final int width, length, height, numberOfLegs;
    private final boolean adjustable;
    private int currentHeight;
    private String color;
    public Table(int width, int length, int height, String color, int legs) {
        this(width, length, height, height, color, legs, false);
    }
    public Table(int width, int length, int height, int currentHeight, String color, int legs) {
        this(width, length, height, currentHeight, color, legs, true);
    }
    private Table(int width, int length, int height, int currentHeight, String color, int legs, boolean adjustable) {
        if (width <= 0 || length <= 0 || legs <= 0) throw new IllegalArgumentException("Positive dimensions and legs required");
        validateHeight(height); validateHeight(currentHeight);
        this.width = width; this.length = length; this.height = height;
        this.currentHeight = currentHeight; this.numberOfLegs = legs; this.adjustable = adjustable;
        repaint(color);
    }
    public int getWidth() { return width; } public int getLength() { return length; }
    public int getHeight() { return height; } public int getCurrentHeight() { return currentHeight; }
    public int getNumberOfLegs() { return numberOfLegs; } public String getColor() { return color; }
    public boolean isAdjustable() { return adjustable; }
    public void setHeight(int value) {
        if (!adjustable) throw new UnsupportedOperationException("Table is not adjustable");
        validateHeight(value); currentHeight = value;
    }
    private static void validateHeight(int value) {
        if (value < 0 || value > 200) throw new IllegalArgumentException("Height must be between 0 and 200");
    }
    public long area() { return (long) width * length; }
    public long getPerimeter() { return 2L * (width + (long) length); }
    public int getCapacity() { return 2 * (width / 60 + length / 60); }
    public void repaint(String color) {
        if (color == null || color.isBlank()) throw new IllegalArgumentException("Color required");
        this.color = color;
    }
    public boolean isStable() { return numberOfLegs >= 3; }
    public boolean isFoldable() { return adjustable && numberOfLegs >= 4; }
}
