import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options, {OPTION_TYPE} from "../Options";

describe("Total and subtotal changes", () => {
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
});
