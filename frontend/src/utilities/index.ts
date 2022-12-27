// Format number as currency
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(amount);
};
