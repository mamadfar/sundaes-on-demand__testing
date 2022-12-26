import React, {FC} from 'react';
import {IOption} from "./Options";
import {Col, Form, Row} from "react-bootstrap";

const ScoopOption: FC<IOption> = ({name, imagePath,  updateItemCount}) => {

    const handleUpdateChange = (e: any) => {
        updateItemCount(name, e.target.value);
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: "center"}}>
            <img style={{width: "75%"}} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`}/>
            <Form.Group controlId={`${name}-count`} as={Row} className="mt-2">
                <Form.Label column xs="6" className="text-end">{name}</Form.Label>
                <Col xs="5" className="text-start">
                    <Form.Control type="number" defaultValue={0} onChange={handleUpdateChange}/>
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ScoopOption;
