import PaginatorButtonsContainer from ".";
import { screen, render } from "@testing-library/react-native";

describe("PaginatorButtonsContainer.js tests", () => {
    it("renders only one button", () => {
        render(<PaginatorButtonsContainer totalPages={1} currentPage={1} />);

        expect(screen.getByText("1")).toBeVisible();
        expect(screen.queryByText("2")).toBeNull();
    });

    it("renders the final button and the ellipsis", () => {
        render(<PaginatorButtonsContainer totalPages={8} currentPage={1} />);

        expect(screen.getByText("1")).toBeVisible();
        expect(screen.getByTestId("pag-ellipsis")).toBeVisible();
        expect(screen.getByText("8")).toBeVisible();
        expect(screen.queryByText("9")).toBeNull();
    });
});
