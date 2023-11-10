import Details from "./Details";
import { render, screen, renderHook } from "@testing-library/react-native";
import { ModalProvider } from "react-native-modalfy";
import { ThemeProvider } from "emotion-theming";
import { root } from "../../../../styles";
import { useGetModalStack } from "../../../../hooks/forTests";

const tabDetails = {
    "_id": "5eb5b1d50e90f7c743439106",
    "active": "active",
    "address": [],
    "bloodType": "A",
    "cases": [],
    "contactInfo": {
        "emails": [
            { "email": "h.mansingh@gmail.com", "type": "primary" },
            { "email": "", "type": "other" },
            { "email": "h.mansingh@suites.net", "type": "work" }
        ],
        "emergencyContact": [
            {
                "_id": "5ea05969a75843f64322d911",
                "email": "d.mansingh@gmail.com",
                "name": "Dorothy Mansingh",
                "phone": "876 372 6280",
                "relation": "Mom"
            }, {
                "_id": "5ea05969a75843f64322d912",
                "email": "h.mansingh@gmail.com",
                "name": "Hasan Mansingh",
                "phone": "876 372 7180",
                "relation": "Date"
            }
        ],
        "phones": [
            {
                "phone": "876 372 2372",
                "type": "cell"
            }, {
                "phone": "876 992 2172",
                "type": "home"
            }, {
                "phone": "876 735 2320",
                "type": "work"
            }
        ]
    },
    "dob": "1962-03-02T05:00:00.000Z",
    "ethnicity": "American",
    "firstName": "Julie",
    "gender": "Female",
    "height": "15.24",
    "insurance": {
        "_id": "6542a1ea3c20603428b85211",
        "coverageLimit": "45000",
        "id": "5eb9af06b947d9585e2ddccd",
        "name": "Sagicor Life",
        "policyNumber": "7311239122"
    },
    "medicalInfo": {
        "diagnosis": [],
        "familyHistory": [],
        "lifestyles": [],
        "medicalHistory": [],
        "risk": []
    },
    "middleName": "Melissa",
    "nextVisit": null,
    "patientNumber": "0000000001",
    "surname": "Brown",
    "trn": "192389122",
    "weight": "128"
}

describe("Details.js tests", () => {

    beforeEach(async () => {
        const { result } = renderHook(() => useGetModalStack());
        render(
            <ThemeProvider theme={root}>
                <ModalProvider stack={result.current}>
                    <Details
                        tabDetails={tabDetails}
                        onUpdated={() => { }}
                    />
                </ModalProvider>
            </ThemeProvider>
        )
    })

    it("renders cell phone number appropriately", () => {
        expect(screen.getByTestId('Cell Phone Number-value').children[0]).toBe("876-372-2372")
    })

    it("renders home phone number appropriately", () => {
        expect(screen.getByTestId('Home Phone Number-value').children[0]).toBe("876-992-2172")
    })
})