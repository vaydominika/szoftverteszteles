import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class ShippingCostTest {
    @ParameterizedTest
    @CsvSource({
        "10000, 0, HU, false, 1500.0",
        "10000, 4.99, HU, false, 1500.0",
        "10000, 5, HU, false, 2500.0",
        "10000, 5.01, HU, false, 2500.0",
        "10000, 19.99, HU, false, 2500.0",
        "10000, 20, HU, false, 2500.0",
        "10000, 20.01, HU, false, 5000.0",
        "19999, 1, HU, false, 1500.0",
        "20000, 1, HU, false, 1500.0",
        "20001, 1, HU, false, 0.0",
        "20001, 1, HU, true, 0.0",
        "10000, 1, DE, false, 3000.0",
        "20001, 1, DE, false, 3000.0",
        "10000, 1, HU, true, 2250.0",
        "10000, 10, DE, true, 7500.0",
        "10000, 1, hu, false, 1500.0",
        "20001, 1, hu, false, 0.0",
        "10000, 1, Hu, false, 1500.0",
        "10000, 1, de, false, 3000.0",
        "-1, 1, HU, false, error",
        "10000, -1, HU, false, error",
        "20001, -1, HU, false, error",
        "0, 1, HU, false, 1500.0",
        "10000, 21, DE, false, 10000.0",
        "10000, 1, , false, error",
        "10000, 1, HUN, false, error",
        "10000, 1, 12, false, error"
    })
    void shippingFollowsSpecification(double order, double weight, String country, boolean express, String expected) {
        if (expected.equals("error")) {
            assertThrows(IllegalArgumentException.class, () -> ShippingCost.calculateShippingCost(order, weight, country, express));
        } else {
            assertEquals(Double.parseDouble(expected), ShippingCost.calculateShippingCost(order, weight, country, express), 1e-7);
        }
    }

    @Test
    void invalidInputCannotBypassValidationWithFreeShipping() {
        assertThrows(IllegalArgumentException.class, () -> ShippingCost.calculateShippingCost(30000, Double.NaN, "HU", true));
        assertThrows(IllegalArgumentException.class, () -> ShippingCost.calculateShippingCost(Double.POSITIVE_INFINITY, 1, "HU", false));
        assertThrows(IllegalArgumentException.class, () -> ShippingCost.calculateShippingCost(1000, 1, null, false));
    }
}
