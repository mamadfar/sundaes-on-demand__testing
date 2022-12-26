import {render, screen} from "../../../test-utils/testing-library-utils";
import Options, {OPTION_TYPE} from "../Options";

describe("Simulate scoops and topping API", () => {
    it("Displays image for each scoop option from the server", async () => {
        render(<Options optionType={OPTION_TYPE.SCOOPS}/>);

        // find the images
        const scoopImages: ReadonlyArray<HTMLImageElement> = await screen.findAllByRole("img", {name: /scoop$/i});
        expect(scoopImages).toHaveLength(2);

        // confirm alt text of images
        const altsText: ReadonlyArray<string> = scoopImages.map((scoopImage: HTMLImageElement) => scoopImage.alt);
        expect(altsText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
    });
    it('Displays image for each topping option from the server', async () => {
        render(<Options optionType={OPTION_TYPE.TOPPINGS}/>);

        const toppingImages: ReadonlyArray<HTMLImageElement> = await screen.findAllByRole("img", {name: /topping$/i});
        expect(toppingImages).toHaveLength(3);

        const altsText: ReadonlyArray<string> = toppingImages.map(item => item.alt);
        expect(altsText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
    });
});
