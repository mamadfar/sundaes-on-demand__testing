import React from "react";
import Options, {OPTION_TYPE} from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";

const OrderEntry = () => {

    const [{totals}] = useOrderDetails();

    return (
        <div>
            <Options optionType={OPTION_TYPE.SCOOPS}/>
            <Options optionType={OPTION_TYPE.TOPPINGS}/>
            <h2>Grand total: ${totals.grandTotal}</h2>
        </div>
    );
};

export default OrderEntry;
