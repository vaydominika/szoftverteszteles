package hu.example;

public class Triangle {
    private final long a, b, c;
    public Triangle(int a, int b, int c) {
        if (a <= 0 || b <= 0 || c <= 0 || (long) a + b <= c || (long) a + c <= b || (long) b + c <= a) {
            throw new ArithmeticException("Triangle cannot be constructed");
        }
        this.a = a; this.b = b; this.c = c;
    }
    public boolean isIsosceles() { return a == b || a == c || b == c; }
    public boolean isEquilateral() { return a == b && b == c; }
    public boolean isRightAngled() { return a*a + b*b == c*c || a*a + c*c == b*b || b*b + c*c == a*a; }
    public long getPerimeter() { return a + b + c; }
    public double getArea() {
        double s = getPerimeter() / 2.0;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}
