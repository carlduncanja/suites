import { ThemeProvider } from "emotion-theming";
import Paginator from ".";
import { screen, render, fireEvent } from "@testing-library/react-native";
import { root } from "../../../../styles";

describe("Paginator tests", () => {
    it("renders the page buttons and the left & right arrows", () => {
        render(
            <ThemeProvider theme={root}>
                <Paginator currentPage={1} totalPages={1} />
            </ThemeProvider>
        );

        expect(screen.getByText("1")).toBeVisible();
        expect(screen.getByTestId("pag-left-arrow")).toBeVisible();
        expect(screen.getByTestId("pag-right-arrow")).toBeVisible();
    });

    it("the left and right arrows are disabled when there is only one page", () => {
        render(
            <ThemeProvider theme={root}>
                <Paginator currentPage={1} totalPages={1} />
            </ThemeProvider>
        );

        expect(screen.getByTestId("pag-left-arrow")).toBeDisabled();
        expect(screen.getByTestId("pag-right-arrow")).toBeDisabled();
    });

    it("disables the left arrow if the current page is the lowest", () => {
        render(
            <ThemeProvider theme={root}>
                <Paginator currentPage={1} totalPages={4} />
            </ThemeProvider>
        );

        expect(screen.getByTestId("pag-left-arrow")).toBeDisabled();
    });

    it("disables the right arrow if the current page is the highest", () => {
        render(
            <ThemeProvider theme={root}>
                <Paginator currentPage={4} totalPages={4} />
            </ThemeProvider>
        );

        expect(screen.getByTestId("pag-right-arrow")).toBeDisabled();
    });

    it("updates the button numbers when the user presses the right arrow", async () => {
        render(
            <ThemeProvider theme={root}>
                <Paginator
                    currentPage={7}
                    totalPages={10}
                    isNextDisabled={false}
                />
            </ThemeProvider>
        );

        fireEvent.press(screen.getByTestId("pag-right-arrow"));

        expect(screen.getByText("7")).toBeVisible();
        expect(screen.queryByText("1")).toBeNull();
    });
});
