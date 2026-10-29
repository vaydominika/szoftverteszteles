public class ShippingCost {
    public static double calculateShippingCost(double orderValue, double weight, String country, boolean express) {
        if (!Double.isFinite(orderValue) || !Double.isFinite(weight) || orderValue < 0 || weight < 0
                || country == null || !country.matches("[A-Za-z]{2}")) {
            throw new IllegalArgumentException("Invalid shipping input");
        }
        boolean domestic = country.equalsIgnoreCase("HU");
        if (domestic && orderValue > 20000) return 0;
        double fee = weight < 5 ? 1500 : weight <= 20 ? 2500 : 5000;
        if (!domestic) fee *= 2;
        if (express) fee *= 1.5;
        return fee;
    }
}
