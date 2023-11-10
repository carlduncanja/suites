import { formatPhoneNumber } from "./formatter";

describe("Formatting utils tests", () => {
    describe("formatPhoneNumber() tests", () => {
        it("Formats 10-digit numbers correctly", () => {
            const unformatted = "8761234567";
            const formatted = formatPhoneNumber(unformatted);
            expect(formatted).toBe("876-123-4567")
        })

        it("Formats 11-digit numbers correctly", () => {
            const unformatted = "18761234567";
            const formatted = formatPhoneNumber(unformatted);
            expect(formatted).toBe("1-876-123-4567")
        })
    })
})