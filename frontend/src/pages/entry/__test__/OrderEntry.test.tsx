import {render, screen, waitFor} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import {rest} from "msw";
import {server} from "../../../mocks/server";

it("Handles error for scoops and topping routes", async () => {
    server.resetHandlers(
        rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
            return res(ctx.status(500));
        }),
        rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );
    render(<OrderEntry/>);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole("alert");
        expect(alerts).toHaveLength(2);
    });
});
