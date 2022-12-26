import React, {FC} from "react";
import {Alert} from "react-bootstrap";

const AlertBanner: FC<{message?: string, variant?: string}> = ({message = "An unexpected error occurred. Please try gain later.", variant ="danger"}) => {
    return (
        <Alert variant={variant} style={{backgroundColor: "red"}}>{message}</Alert>
    );
};

export default AlertBanner;
