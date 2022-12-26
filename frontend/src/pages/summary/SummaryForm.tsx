import React, {useState} from "react";
import {Button, Form, Popover, OverlayTrigger} from "react-bootstrap";

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Popover right</Popover.Header>
        <Popover.Body>
            No ice cream will actually be delivered.
        </Popover.Body>
    </Popover>
);

const CheckboxLabel = (
    <div>I agree to  <OverlayTrigger placement="right" overlay={popover} defaultShow={false}><span style={{color: "blue"}}>Terms and Conditions</span></OverlayTrigger></div>
);


export const SummaryForm = () => {
    const [TCChecked, setTCChecked] = useState(false);

    return (
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check type="checkbox" checked={TCChecked} onChange={e => setTCChecked(e.target.checked)}
                            label={CheckboxLabel}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!TCChecked}>Confirm order</Button>
        </Form>
    );
};
