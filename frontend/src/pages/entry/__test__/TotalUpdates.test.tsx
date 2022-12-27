import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options, {OPTION_TYPE} from "../Options";
import OrderEntry from "../OrderEntry";
import {getByRole} from "@testing-library/react";

describe("Subtotal changes", () => {
    const user = userEvent.setup();

    it("Update scoop subtotal when scoops change", async () => {
        render(<Options optionType={OPTION_TYPE.SCOOPS}/>);

        // Make sure total starts out $0.00
        const scoopsSubtotal = screen.getByText("Scoops total: $", {exact: false});
        expect(scoopsSubtotal).toHaveTextContent("0.00");

        // Update vanilla scoops to  and check the subtotal
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");
        expect(scoopsSubtotal).toHaveTextContent("2.00");

        // Update chocolate scoops to 2 and check subtotal
        const chocolatesInput = await screen.findByRole("spinbutton", {name: "Chocolate"});
        await user.clear(chocolatesInput);
        await user.type(chocolatesInput, "2");
        expect(scoopsSubtotal).toHaveTextContent("6.00");
    });

    it("Update topping subtotal when toppings change", async () => {
        // Render parent component
        render(<Options optionType={OPTION_TYPE.TOPPINGS}/>);

        // Make sure total starts out at $0.00
        const toppingsSubtotal = screen.getByText("Toppings total: $", {exact: false});
        expect(toppingsSubtotal).toHaveTextContent("0.00");

        // Add cherries and check subtotal
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
        expect(cherriesCheckbox).not.toBeChecked();

        await user.click(cherriesCheckbox);
        expect(cherriesCheckbox).toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent("1.50");

        // Add hot fudge and check subtotal
        const hotFudgeCheckbox = await screen.findByRole("checkbox", {name: "Hot fudge"});
        expect(hotFudgeCheckbox).not.toBeChecked();

        await user.click(hotFudgeCheckbox);
        expect(hotFudgeCheckbox).toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent("3.00");

        await user.click(hotFudgeCheckbox);
        expect(hotFudgeCheckbox).not.toBeChecked();
        expect(toppingsSubtotal).toHaveTextContent("1.50");
    });
});

describe("Grand total", () => {
    const user = userEvent.setup();

    beforeEach(() => {
        render(<OrderEntry/>);
    });
    // it("Grand total starts at $0.00", () => {
    //     const grandTotal = screen.getByRole("heading", {name: /grand total: [$]\$/i});
    //     expect(grandTotal).toHaveTextContent("0.00");
    // });
    it("Grand total updates properly if scoop is added first", async () => {
        const grandTotal = screen.getByRole("heading", {name: /grand total: [$]\$/i});
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});

        expect(grandTotal).toHaveTextContent("0.00");

        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");

        expect(grandTotal).toHaveTextContent("4.00");

        expect(cherriesCheckbox).not.toBeChecked();
        await user.click(cherriesCheckbox);
        expect(cherriesCheckbox).toBeChecked();
        expect(grandTotal).toHaveTextContent("5.50");
    });
    it("Grand total updates properly if topping is added first", async () => {
        const grandTotal = screen.getByRole("heading", {name: /grand total: [$]\$/i});
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});

        expect(cherriesCheckbox).not.toBeChecked();

        await user.click(cherriesCheckbox);
        expect(cherriesCheckbox).toBeChecked();
        expect(grandTotal).toHaveTextContent("1.50");

        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");

        expect(grandTotal).toHaveTextContent("5.50");
    });
    it("Grand total updates properly if item is removed", async () => {
        const grandTotal = screen.getByRole("heading", {name: /grand total: [$]\$/i});
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});

        await user.click(cherriesCheckbox);

        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");

        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        expect(grandTotal).toHaveTextContent("3.50");

        await user.click(cherriesCheckbox);

        expect(grandTotal).toHaveTextContent("2.00");
    });
});
