"use client";

export const useCurrencyFormatter = () => {
  const formatCurrency = (value?: number, currency?: string) => {
    const safeValue = typeof value === "number" && !isNaN(value) ? value : 0;
    const safeCurrency = currency && typeof currency === "string" ? currency : "USD";

    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: safeCurrency,
        minimumFractionDigits: 2,
      }).format(safeValue);
    } catch (error) {
      console.warn(`Unsupported currency: "${safeCurrency}". Falling back to default format.`);
      return `${safeCurrency.toUpperCase()} ${safeValue.toFixed(2)}`;
    }
  };

  return { formatCurrency };
};
