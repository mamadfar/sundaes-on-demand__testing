import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import {Row} from "react-bootstrap";
import AlertBanner from "../../components/AlertBanner";
import {pricePerItem} from "../../contants";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {formatCurrency} from "../../utilities";

export enum OPTION_TYPE {
    SCOOPS = "scoops",
    TOPPINGS = "toppings"
}

interface IOptions {
    optionType: OPTION_TYPE
}

export interface IOption {
    name: string,
    imagePath: string,
    updateItemCount: (itemName: any, newItemCount: any, optionType?: string) => void
}

const Options: FC<IOptions> = ({optionType}) => {
    const [items, setItems] = useState<ReadonlyArray<IOption>>([]);
    const [error, setError] = useState(false);

    const [orderDetails, updateItemCount] = useOrderDetails();

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).then(res => setItems(res.data)).catch(() => setError(true));
        // console.log(orderDetails.totals)
    }, [optionType, orderDetails]);

    if (error) return <AlertBanner/>;

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} updateItemCount={(itemName: any, newItemCount: any) => updateItemCount(itemName, newItemCount, optionType)}/>);

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>{title} total: {orderDetails.totals[optionType]}</p>
            <Row>{optionItems}</Row>
        </>
    );
};

export default Options;
