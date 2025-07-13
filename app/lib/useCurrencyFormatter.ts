"use client";

export const useCurrencyFormatter = () => {
  const formatCurrency = (value: number, currency: string) => {
    if (!currency || typeof currency !== "string") {
      console.warn("Currency is missing or invalid. Falling back to default format.");
      return `$${value.toFixed(2)}`;
    }

    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(value);
    } catch (error) {
      console.warn(`Unsupported currency: "${currency}". Falling back to default format.`);
      return `${currency.toUpperCase()} ${value.toFixed(2)}`;
    }
  };

  return { formatCurrency };
};
