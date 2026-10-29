package hu.example;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorParameterizedTest {

    private final Calculator calculator = new Calculator();

    @ParameterizedTest
    @CsvSource({
        "1, 2, 3",
        "3, 4, 7",
        "-1, 1, 0",
        "10, 20, 30"
    })
    void additionWorks(
            int a,
            int b,
            int expected) {

        assertEquals(
            expected,
            calculator.add(a, b)
        );
    }
}
