package hu.example;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
 
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertTrue;
 
class CalculatorTest {
    //Arrange
    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
 
    @Test
    @DisplayName("2 + 3 = 5")
    void addTwoNumbers() { 
        //Act
        int result = calculator.add(2, 3);
        //Assert
 
        assertEquals(5, result);
    }

    @Test
    @DisplayName("10 - 3 = 7")
    void subtractionWorks() {
        assertEquals(7, calculator.subtract(10, 3));
    }

    @Test
    @DisplayName("4 * 5 = 20")
    void multiplicationWorks() {
        assertEquals(20, calculator.multiply(4, 5));
    }

    @Test
    @DisplayName("10 / 0 = Division by zero")
    void divisionByZeroThrowsException() {
 
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> calculator.divide(10, 0));
        assertEquals("Division by zero", exception.getMessage());
    }

    @Test
    @DisplayName("10 > 0, 10 < 100, 10 = 10")
    void severalAssertions() {

        int result = calculator.multiply(2, 5);

        assertAll(
            () -> assertTrue(result > 0, "result must be greater than 0"),
            () -> assertTrue(result < 100, "result must be less than 100"),
            () -> assertEquals(10, result, "result must be equal to 10")
        );
    }

    @Test
    void powerWorks() {
        assertEquals(8.0, calculator.power(2, 3), 1e-9);
        assertEquals(1.0, calculator.power(5, 0), 1e-9);
        assertEquals(0.5, calculator.power(2, -1), 1e-9);
    }

    @Test
    void divisionKeepsFractionalPart() {
        assertEquals(3.5, calculator.divide(7, 2), 1e-9);
        assertEquals(-2.5, calculator.divide(-5, 2), 1e-9);
        assertEquals(0.0, calculator.divide(0, 3), 1e-9);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 10, 100})
    void squareOfPositiveNumberIsPositive(int number) {
        assertTrue(calculator.power(number, 2) > 0);
    }
}
