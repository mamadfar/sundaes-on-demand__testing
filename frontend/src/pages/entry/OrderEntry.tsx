import React from "react";
import Options, {OPTION_TYPE} from "./Options";

const OrderEntry = () => {
    return (
        <div>
            <Options optionType={OPTION_TYPE.SCOOPS}/>
            <Options optionType={OPTION_TYPE.TOPPINGS}/>
        </div>
    );
};

export default OrderEntry;
