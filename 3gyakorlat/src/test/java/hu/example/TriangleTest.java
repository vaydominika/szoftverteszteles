package hu.example;

import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import static org.junit.jupiter.api.Assertions.*;

class TriangleTest {
    static Stream<Arguments> types() {
        return Stream.of(Arguments.of(5, 6, 7, false, false, false), Arguments.of(5, 5, 8, true, false, false),
            Arguments.of(6, 6, 6, true, true, false), Arguments.of(10, 8, 8, true, false, false),
            Arguments.of(3, 4, 5, false, false, true), Arguments.of(5, 3, 4, false, false, true),
            Arguments.of(4, 5, 3, false, false, true));
    }
    @ParameterizedTest @MethodSource("types")
    void classifiesTriangles(int a, int b, int c, boolean isosceles, boolean equilateral, boolean right) {
        Triangle triangle = new Triangle(a, b, c);
        assertAll(() -> assertEquals(isosceles, triangle.isIsosceles()), () -> assertEquals(equilateral, triangle.isEquilateral()),
            () -> assertEquals(right, triangle.isRightAngled()));
    }
    @ParameterizedTest @CsvSource({"1,2,3", "1,2,10", "0,3,3", "-1,3,3", "3,0,3", "3,3,-1"})
    void invalidSidesAreRejected(int a, int b, int c) {
        assertThrows(ArithmeticException.class, () -> new Triangle(a, b, c));
    }
    @Test void calculatesPerimeterAndArea() {
        Triangle triangle = new Triangle(3, 4, 5);
        assertEquals(12, triangle.getPerimeter());
        assertEquals(6.0, triangle.getArea(), 1e-9);
        assertEquals(Math.sqrt(3) * 9, new Triangle(6, 6, 6).getArea(), 1e-9);
    }
    @Test void largeSidesDoNotOverflowIntegerArithmetic() {
        Triangle triangle = new Triangle(30000, 40000, 50000);
        assertTrue(triangle.isRightAngled());
        assertEquals(600000000.0, triangle.getArea(), 1e-3);
        Triangle large = new Triangle(Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE);
        assertEquals(6442450941L, large.getPerimeter());
        assertFalse(large.isRightAngled());
    }
}
