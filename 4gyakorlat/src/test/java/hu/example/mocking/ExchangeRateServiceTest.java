package hu.example.mocking;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExchangeRateServiceTest {
    @Test void configuredRateAndDefaultRateAreIndependent() {
        ExchangeRateService rates = mock(ExchangeRateService.class);
        when(rates.getRate("EUR", "HUF")).thenReturn(400.0);
        assertEquals(400.0, rates.getRate("EUR", "HUF"));
        assertEquals(0.0, rates.getRate("USD", "HUF"));
        verify(rates).getRate("EUR", "HUF");
        verify(rates).getRate("USD", "HUF");
        verifyNoMoreInteractions(rates);
    }
}
