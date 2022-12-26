import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {pricePerItem} from "../contants";

// Format number as currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(amount);
};

const OrderDetails = createContext<any>(null);

// Create custom hook to check whether we're inside a provider
export const useOrderDetails = () => {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
    }
    return context;
};

const calculateSubtotal = (optionType: "scoops" | "toppings", optionCounts: any) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
      optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props: any) => {

    const [optionCounts, setOptionCounts] = useState<any>({
        scoops: new Map(),
        toppings: new Map(),
    });

    const zeroCurrency = formatCurrency(0);

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        const updateItemCount = (itemName: any, newItemCount: any, optionType: any) => {
            const newOptionCounts = {...optionCounts};
            // Update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        };
        // Getter: object containing option counts for scoops and toppings, subtotals and totals
        // Setter: updateOptionCount
        return [{...optionCounts, totals}, updateItemCount];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props}/>;
};
