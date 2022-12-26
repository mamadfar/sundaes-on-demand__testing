enum PRICE_PER_ITEM {
    SCOOPS = 2,
    TOPPINGS = 1.5
}

interface IPricePerItem {
    scoops:PRICE_PER_ITEM.SCOOPS,
    toppings: PRICE_PER_ITEM.TOPPINGS
}

export const pricePerItem: IPricePerItem = {
    scoops: PRICE_PER_ITEM.SCOOPS,
    toppings: PRICE_PER_ITEM.TOPPINGS
};
