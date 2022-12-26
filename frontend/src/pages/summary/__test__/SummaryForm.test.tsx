import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {SummaryForm} from "../SummaryForm";

const user = userEvent.setup();

describe("Check the terms section", () => {
    it("Make sure terms checkbox is unchecked and disable submit button at beginning", () => {
        render(<SummaryForm/>);

        const termCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const confirmButton = screen.getByRole("button", {name: /confirm order/i});

        expect(termCheckbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });
    it('Checked the checkbox make submit button enable and click again make it disable', async () => {
        render(<SummaryForm/>);

        const termCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const confirmButton = screen.getByRole("button", {name: /confirm order/i});

        await user.click(termCheckbox);
        expect(termCheckbox).toBeChecked();
        expect(confirmButton).toBeEnabled();

        await user.click(termCheckbox);
        expect(termCheckbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });
});

describe("Popover appear and disappear", () => {
    it('Popover responds to hover', async () => {
        render(<SummaryForm/>);

        // Popover starts out hidden
        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopover).not.toBeInTheDocument();

        // Popover appears upon mouseover of checkbox label
        const termsAndConditions = screen.getByText(/terms and conditions/i);
        await user.hover(termsAndConditions);
        const popover = screen.getByText(/no ice cream will actually be delivered/i);

        expect(popover).toBeInTheDocument();

        // Popover disappears when we mouse out
        await user.unhover(termsAndConditions);
        const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopoverAgain).not.toBeInTheDocument();
    });
});
