/**
 *  Mocked data for suites casefiles endpoints
 */


export default [
    {
        "id": "#350219385001",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21",

        "caseFileDetails": {
            patient: {},
            medicalStaff: {},
            medialHistory: {},
            procedures: {},
            chargeSheet: {},
            diagnosis: [
                {}
            ]
        }
    },
    {
        "id": "#902849827402",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#8927465150003",
        "name": "Meghan Ann James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385004",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827405",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515006",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385007",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827408",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515009",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385010",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827411",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515012",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385013",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827414",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515015",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385016",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827417",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515018",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385019",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827420",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515021",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385022",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827423",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515024",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#350219385025",
        "name": "Julie Brown",
        "balance": "-$ 115,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#902849827426",
        "name": "John Taylor",
        "balance": "-$ 11,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    },
    {
        "id": "#892746515027",
        "name": "Meghan James",
        "balance": "-$ 203,002.25",
        "staff": "Dr. Mansingh",
        "nextVisit": "2019-11-21"
    }
];


/**
 *
 * @type {{PROCEDURES: string, IMPLANTED_DEVICES: string, IMMUNISATIONS: string, MEDICATIONS: string, PRE_EXISTING_CONDITIONS: string, ALLERGIES: string}}
 */
const medicalHistoryTypes = {
    ALLERGIES: "allergies",
    PRE_EXISTING_CONDITIONS: "preExistingConditions",
    IMMUNISATIONS: "immunisations",
    MEDICATIONS: "medications",
    PROCEDURES: "procedures",
    IMPLANTED_DEVICES: "implantedDevices",
};


/**
 *
 * @type {{alcohol: [string], tobacco: [string], drug: [string]}}
 */
const lifeStyleTypes = {
    drug: ['Percoset'],
    alcohol: ['Beer'],
    tobacco: ['snuff'],
};

const caseFiles = [
    {
        id: String,
        patient: {
            firstName: "Julie",
            middleName: "Mellisa",
            lastName: "Brown",
            height: "5'3",
            dob: new Date(1990, 2, 14),
            trn: 123876012,
            Gender: "Male",
            ethnicity: "Black",
            BloodType: "AB",
            weight: 120,
            bmi: 213,
            insurance: [
                {
                    name: "Sagicor Life",
                    coverageLimit: 45000.00,
                    policyNumber: 7311239 - 122,
                }
            ],
            contactInfo: [
                {
                    phones: [],
                    emails: []
                }
            ],
            emergencyContacts: [
                {
                    name: "Juliana Brown",
                    phone: 8763726280,
                    emails: "juliana.brown@gmail.com",
                    relationShip: "Mother"
                },
                {
                    name: "Lucas Brown",
                    phone: 8763727180,
                    emails: "lucas.brown@gmail.com",
                    relationShip: "Father"
                }
            ],
            addresses: [
                {
                    addressLine1: "12 Ruthven Road, Kingston 1",
                    addressLine2: "Apartment 6"
                }
            ]
        },
        medicalStaff: [
            {
                type: "Nurse",
                staff: {
                    firstName: "Janet",
                    lastName: "Abraham",
                    // ... Additional Info
                }
            },
            {
                type: "Nurse",
                staff: {
                    firstName: "Monifa",
                    lastName: "Cartwright",
                    // ... Additional Info
                }
            },
            {
                type: "Physician",
                staff: {
                    firstName: "Hans",
                    lastName: "Mansingh",
                    // ... Additional Info
                }
            },
            {
                type: "Physician",
                staff: {
                    firstName: "M",
                    lastName: "Walsh",
                    // ... Additional Info
                }
            }
        ],
        medical: {
            medialHistory: [
                {
                    types: "allergies",
                    description: "peanut"
                },
                {
                    types: "allergies",
                    description: "pollen"
                },
                {
                    types: "allergies",
                    description: "shellfish"
                },
                {
                    types: "preExistingConditions",
                    description: "Asthma"
                }
            ],
            familyHistory: [
                {
                    types: "preExistingConditions",
                    relative: "GrandMother",
                    condition: "Asthma"
                }
            ],
            lifeStyleHistory: [
                {
                    categories: "drug",
                    name: 'percoset',
                    frequency: "irregular",
                    amount: 5,
                    unit: 'bottle',
                    unitOfMeasure: 'oz',
                    measurement: 0,
                    usage: "currently using",
                    startDate: new Date(2020, 1, 1)
                },
                {
                    categories: "alcohol",
                    name: 'beer',
                    frequency: "irregular",
                    amount: 5,
                    unit: 'bottle',
                    unitOfMeasure: 'oz',
                    measurement: 0,
                    usage: "currently using",
                    startDate: new Date(2020, 1, 1)
                },
                {
                    categories: "tobacco",
                    name: 'snuff',
                    frequency: "irregular",
                    amount: 5,
                    unit: 'pack',
                    unitOfMeasure: 'oz',
                    measurement: 0,
                    usage: "currently using",
                    startDate: new Date(2020, 1, 1)
                }
            ]
        },
        chargeSheet: {
            inventory: [],
            equipment: [],
            consumables: [],
            invoices: []
        },
        diagnosis: [{}],
        caseProcedures: [
            {
                location: {
                    name: ""
                },
                appointment: {},

                //.... List procedure fields
                equipment: [],

                hasRecovery: Boolean,
                recovery: {
                    location: {},
                    appointment: {}
                }
            }
        ],
        patientRisks: [
            {
                riskLevel: String,
                notes: String
            }
        ]
    }
];

export default caseFiles;
