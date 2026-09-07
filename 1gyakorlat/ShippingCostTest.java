public class ShippingCostTest {
    public static double calculateShippingCost(double orderValue, double weight,
                                               String country, boolean express) {
        double shippingCost = 0;
        if ("HU".equals(country) && orderValue >= 20000) {
            return 0;
        }
        if (weight < 5) {
            shippingCost = 1500;
        } else if (weight > 5 && weight < 20) {
            shippingCost = 2500;
        } else {
            shippingCost = 5000;
        }
        if (!"HU".equals(country)) {
            shippingCost = shippingCost * 2;
        }
        if (express) {
            shippingCost = shippingCost + 50;
        }
        return shippingCost;
    }

    // A null expected value indicates that an error is expected for invalid input.
    private record TestCase(double orderValue, double weight, String country,
                            boolean express, Double expected, double manual) {}

    public static void main(String[] args) {
        TestCase[] cases = {
            new TestCase(10000, 0, "HU", false, 1500.0, 1500),
            new TestCase(10000, 4.99, "HU", false, 1500.0, 1500),
            new TestCase(10000, 5, "HU", false, 2500.0, 5000),
            new TestCase(10000, 5.01, "HU", false, 2500.0, 2500),
            new TestCase(10000, 19.99, "HU", false, 2500.0, 2500),
            new TestCase(10000, 20, "HU", false, 2500.0, 5000),
            new TestCase(10000, 20.01, "HU", false, 5000.0, 5000),
            new TestCase(19999, 1, "HU", false, 1500.0, 1500),
            new TestCase(20000, 1, "HU", false, 1500.0, 0),
            new TestCase(20001, 1, "HU", false, 0.0, 0),
            new TestCase(20001, 1, "HU", true, 0.0, 0),
            new TestCase(10000, 1, "DE", false, 3000.0, 3000),
            new TestCase(20001, 1, "DE", false, 3000.0, 3000),
            new TestCase(10000, 1, "HU", true, 2250.0, 1550),
            new TestCase(10000, 10, "DE", true, 7500.0, 5050),
            new TestCase(10000, 1, "hu", false, 1500.0, 3000),
            new TestCase(20001, 1, "hu", false, 0.0, 3000),
            new TestCase(10000, 1, "Hu", false, 1500.0, 3000),
            new TestCase(10000, 1, "de", false, 3000.0, 3000),
            new TestCase(-1, 1, "HU", false, null, 1500),
            new TestCase(10000, -1, "HU", false, null, 1500),
            new TestCase(20001, -1, "HU", false, null, 0),
            new TestCase(0, 1, "HU", false, 1500.0, 1500),
            new TestCase(10000, 21, "DE", false, 10000.0, 10000),
            new TestCase(10000, 1, "", false, null, 3000),
            new TestCase(10000, 1, "HUN", false, null, 3000),
            new TestCase(10000, 1, "12", false, null, 3000),
        };
        int failures = 0;
        int manualMismatches = 0;
        for (int i = 0; i < cases.length; i++) {
            TestCase test = cases[i];
            Double actual = null;
            try {
                actual = calculateShippingCost(test.orderValue(), test.weight(),
                                               test.country(), test.express());
            } catch (IllegalArgumentException exception) {
            }
            boolean passed = java.util.Objects.equals(test.expected(), actual);
            if (!passed) failures++;
            if (actual == null || Double.compare(actual, test.manual()) != 0) {
                manualMismatches++;
            }
            System.out.printf("T%02d: expected=%s, actual=%s, %s%n", i + 1,
                    test.expected() == null ? "error" : test.expected(),
                    actual == null ? "error" : actual,
                    passed ? "passed" : "FAILED");
        }
        System.out.printf("%d cases, %d passed, %d failed.%n",
                          cases.length, cases.length - failures, failures);
        System.out.printf("Mismatches with manual calculations: %d.%n", manualMismatches);
        if (failures > 0 || manualMismatches > 0) System.exit(1);
    }
}
