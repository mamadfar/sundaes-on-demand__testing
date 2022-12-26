import {ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";
import {OrderDetailsProvider} from "../contexts/OrderDetails";

const renderWithContext = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, {wrapper: OrderDetailsProvider, ...options});

// re-export everything
export * from "@testing-library/react";

// Override render method
export {renderWithContext as render};
