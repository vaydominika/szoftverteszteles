package hu.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class TableTest {
    private Table fixed() { return new Table(80, 130, 75, "white", 4); }
    private Table adjustable(int legs) { return new Table(80, 130, 75, 100, "white", legs); }
    @Test void constructorsKeepDimensionsAndAdjustmentState() {
        Table table = fixed();
        assertAll(() -> assertEquals(80, table.getWidth()), () -> assertEquals(130, table.getLength()),
            () -> assertEquals(75, table.getHeight()), () -> assertEquals(75, table.getCurrentHeight()),
            () -> assertFalse(table.isAdjustable()), () -> assertEquals("white", table.getColor()),
            () -> assertEquals(4, table.getNumberOfLegs()));
        assertTrue(adjustable(4).isAdjustable());
        assertEquals(100, adjustable(4).getCurrentHeight());
    }
    @ParameterizedTest @ValueSource(ints = {0, 100, 200})
    void adjustableHeightAcceptsBoundaries(int height) {
        Table table = adjustable(4); table.setHeight(height);
        assertEquals(height, table.getCurrentHeight());
        assertEquals(75, table.getHeight());
    }
    @ParameterizedTest @ValueSource(ints = {-1, 201})
    void invalidHeightDoesNotChangeState(int height) {
        Table table = adjustable(4);
        assertThrows(IllegalArgumentException.class, () -> table.setHeight(height));
        assertEquals(100, table.getCurrentHeight());
    }
    @Test void fixedTableCannotChangeHeight() {
        Table table = fixed();
        assertThrows(UnsupportedOperationException.class, () -> table.setHeight(100));
        assertEquals(75, table.getCurrentHeight());
    }
    @Test void geometryAndSeatsUseWholePlacesOnEachSide() {
        assertEquals(10400, fixed().area());
        assertEquals(420, fixed().getPerimeter());
        assertEquals(6, fixed().getCapacity());
        assertEquals(4, new Table(100, 100, 75, "white", 4).getCapacity());
        assertEquals(0, new Table(59, 59, 75, "white", 4).getCapacity());
    }
    @Test void repaintChangesColor() { Table table = fixed(); table.repaint("blue"); assertEquals("blue", table.getColor()); }
    @Test void stabilityAndFoldabilityHaveIndependentConditions() {
        assertTrue(adjustable(3).isStable());
        assertFalse(adjustable(2).isStable());
        assertTrue(adjustable(4).isFoldable());
        assertFalse(adjustable(3).isFoldable());
        assertFalse(fixed().isFoldable());
    }
    @Test void rejectsInvalidConstructionAndColor() {
        assertThrows(IllegalArgumentException.class, () -> new Table(0, 100, 75, "white", 4));
        assertThrows(IllegalArgumentException.class, () -> new Table(100, -1, 75, "white", 4));
        assertThrows(IllegalArgumentException.class, () -> new Table(100, 100, 201, "white", 4));
        assertThrows(IllegalArgumentException.class, () -> new Table(100, 100, 75, 201, "white", 4));
        assertThrows(IllegalArgumentException.class, () -> new Table(100, 100, 75, "white", 0));
        Table table = fixed();
        assertThrows(IllegalArgumentException.class, () -> table.repaint(" "));
        assertThrows(IllegalArgumentException.class, () -> table.repaint(null));
        assertEquals("white", table.getColor());
    }
}
