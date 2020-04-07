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
            // patient: {},
            // medicalStaff: {},
            // medialHistory: {},
            // procedures: {},
            // chargeSheet: {},
            // diagnosis: [
            //     {}
            // ]
            title: "Julie Melissa Brown",
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
                bmi: 21,
                addresses: [
                    {
                        addressLine1: "12 Ruthven Road, Kingston 1",
                        addressLine2: "Apartment 6"
                    }
                ],
                insurance: [
                    {
                        name: "Sagicor Life",
                        coverageLimit: 45000.00,
                        policyNumber: 7311239 - 122,
                    }
                ],
                contactInfo: [
                    {
                        phones: [
                            {
                                "cellNumber": 8763726172,
                                "homeNumber": 8769926172,
                                "workNumber": 8767128320
                            }
                        ],
                        emails: [
                            {
                                "primary":"julie.brown@yahoo.com",
                                "alternate":"julie345@gmail.com",
                                "work":""
                            }
                        ]
                    }
                ],
                emergencyContacts: [
                    {
                        name: "Juliana Brown",
                        phone: 8763726280,
                        emails: "juliana.brown@gmail.com",
                        relationship: "Mother"
                    },
                    {
                        name: "Lucas Brown",
                        phone: 8763727180,
                        emails: "lucas.brown@gmail.com",
                        relationship: "Father"
                    }
                ],
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
                        //Tentative
                        cost : 64000.45
                    }
                },
                {
                    type: "Physician",
                    staff: {
                        firstName: "M",
                        lastName: "Walsh",
                        // ... Additional Info
                        //Tentative
                        cost : 58000.90
                    }
                }
            ],
            medical: {
                medicalHistory: [
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
                    },
                    {
                        types: "preExistingConditions",
                        relative: "Mother",
                        condition: "Diabetes"
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
                equipment: [
                    {
                        "itemName":"Bags",
                        "type":"Blood Products",
                        "quantity":5,
                        "unitPrice":1382.84
                    },
                    {
                        "itemName":"Scalpel",
                        "type":"Incision",
                        "quantity":3,
                        "unitPrice":2291.24
                    },
                    {
                        "itemName":"Glasses",
                        "type":"Vision",
                        "quantity":1,
                        "unitPrice":3129.88
                    }
                ],
                consumables: [
                    {
                        "type":"Anaesthesia",
                        "itemName":"Agents",
                        "quantity":1,
                        "unitPrice":"$4,128.28"
                    },
                    {
                        "type":"Anaesthesia",
                        "quantity":4,
                        "unitPrice":"$2,291.24",
                        "itemName":"Atracurium",
                    },
                    {
                        "itemName":"Atropine",
                        "type":"Anaesthesia",
                        "quantity":1,
                        "unitPrice":"$454.20"
                    },
                ],
                invoices: [
                    {
                        "invoiceNumber":"000976",
                        "status":"Complete",
                        // "date":"13/12/2019",
                        // "value":"$312,000.45",
                        "reportDetails":{
                            billingDetails:{
                                billedTo:{
                                    name: "Julie Melissa Brown",
                                    addressLine1:"23 Bedford Avenue",
                                    addressLine2:"Kingston 8",
                                    addressLine3:"JMKIN08"
                                },
                                purchaseOrderNo: "000976",
                                reportDate: new Date(2019,11,18),
                            },
                            reportExpenses:{
                                procedures:[
                                    {
                                        charge: "Coronory Artery Graft",
                                        cost: 64000.45
                                    },
                                    {
                                        charge: "Coronory Bypass Graft",
                                        cost: 48000.45
                                    },
                                ],
                                physicians:[
                                    {
                                        charge: "Dr.Mansingh",
                                        cost: 64000.45
                                    },
                                ],
                                labWork:[
                                    {
                                        charge: "Blood Gases",
                                        cost: 16000.45
                                    },
                                    {
                                        charge: "X-Ray",
                                        cost: 16000.45
                                    }
                                ],
                                equipments:[

                                ],
                                consumables:[
                                    {
                                        itemName:"Morphine",
                                        quantity:2,
                                        unitPrice:4582.48
                                    },
                                    {
                                        itemName:"Morphine",
                                        quantity:2,
                                        unitPrice:4582.48
                                    },
                                    {
                                        itemName:"Propotal",
                                        quantity:4,
                                        unitPrice: 4582.48,
                                    },
                                    {
                                        itemName:"Pethidine",
                                        quantity:1,
                                        unitPrice:4582.48,
                                    }
                                ],
                                discount: 0.1,
                                tax: 0.2
                            }
                            

                        }
                    },
                    // {
                    //     "invoiceNumber":"IN-000972",
                    //     "status":"Complete",
                    //     "date":"13/12/2019",
                    //     "value":"$12,000.45",
                    //     "invoiceDetails":{}
                    // },
                    // {
                    //     "invoiceNumber":"IN-000576",
                    //     "status":"Incomplete",
                    //     "date":"13/12/2019",
                    //     "value":"$22,000.45",
                    //     "invoiceDetails":{}
                    // }
                ],
                quotation:[
                    {
                        "quotationNumber":"QU-1240512",
                        "reportDetails":{
                            billingDetails:{
                                billedTo:{
                                    name: "Julie Melissa Brown",
                                    addressLine1:"23 Bedford Avenue",
                                    addressLine2:"Kingston 8",
                                    addressLine3:"JMKIN08"
                                },
                                billedFor:"Medical Services",
                                reportDate: new Date(2019,11,18),
                            },
                            reportExpenses:{
                                procedures:[
                                    {
                                        charge: "Coronory Artery Graft",
                                        cost: 64000.45
                                    },
                                    {
                                        charge: "Coronory Bypass Graft",
                                        cost: 48000.45
                                    },
                                ],
                                physicians:[
                                    {
                                        charge: "Dr.Mansingh",
                                        cost: 64000.45
                                    },
                                ],
                                labWork:[
                                    {
                                        charge: "Blood Gases",
                                        cost: 16000.45
                                    },
                                    {
                                        charge: "X-Ray",
                                        cost: 16000.45
                                    }
                                ],
                                equipments:[

                                ],
                                consumables:[
                                    {
                                        itemName:"Morphine",
                                        quantity:2,
                                        unitPrice:4582.48
                                    }
                                ],
                                discount: 0.1,
                                tax: 0.2
                            }
                        },
                    },
                    // {
                    //     "quotationNumber":"QU-1240602",
                    //     "date":"12/18/2019",
                    //     "value":"$20,863.45",
                    //     "quotationDetails":{}
                        
                    // },
                    // {
                    //     "quotationNumber":"QU-1245612",
                    //     "date":"12/18/2019",
                    //     "value":"$320,863.45",
                    //     "quotationDetails":{}
                    // },
                ]
            },
            diagnosis: [
                {
                    type:"signsAndSymptoms",
                    diagnosisData : "High blood pressure: Over 130"
                },
                {
                    type:"signsAndSymptoms",
                    diagnosisData : "Severe pain around the wrist"
                },
                {
                    type:"examination",
                    diagnosisData : "The patient complains of chest pains. Based on apparent swelling, the patient may be showing signs of Coronary Heart Disease."
                },
                {
                    type:"diagnosticEvaluations",
                    diagnosisData : {
                        "name":"XrayScan.jpg",
                        "image":"icon.png"
                    },
                },
                {
                    type:"diagnosticEvaluations",
                    diagnosisData : {
                        "name":"XrayScan87429.jpg",
                        "image":"icon.png"
                    },
                },
                {
                    type:"laboratoryInvestigations",
                    diagnosisData : ""
                },
                {
                    type:"provisionalDiagnosis",
                    diagnosisData : ""
                },
                {
                    type:"finalDiagnosis",
                    diagnosisData : ""
                },
                {
                    type:"medicationPrescribed",
                    diagnosisData : ""
                },
                {
                    type:"implantedDevices",
                    diagnosisData : ""
                },
            ],
            caseProcedures: [
                {
                    title:"Coronary Byapass Graft",
                    location: {
                        name: "Surgery Theatre 6"
                    },
                    appointment: {
                        startTime : new Date (2019, 10, 12, 13),
                        duration : "3 Hours" 
                    },
                    
                    //.... List procedure fields
                    equipments: [
                        {
                            item:"Augmentin",
                            type:"Antibiotics",
                            quantity:1,
                            unitPrice:672.90
                        },
                        {
                            item:"Atracurium",
                            type:"Anesthetic",
                            quantity:1,
                            unitPrice:8913.10
                        },
                        {
                            item:"Gentamicin",
                            type:"Antibiotics",
                            quantity:1,
                            unitPrice:900.89
                        }
                    ],
                    //Tentative
                    cost: 48000.45,
                    consumables: [
                        {
                            item:"Lab Chole",
                            type:"Anaesthesia",
                            quantity:2,
                            unitPrice:2045.69,
                        },
                        {
                            item:"Bags",
                            type:"Anaesthesia",
                            quantity: 1,
                            unitPrice: 109.87,
                        },
                        {
                            item:"GU Tower",
                            type:"Anaesthesia",
                            quantity: 2,
                            unitPrice: 671.80,
                        },
                        {
                            item:"Atracium",
                            type:"Anaesthesia",
                            quantity: 4,
                            unitPrice: 2914.09,
                        },
                        {
                            item:"Bags",
                            type:"Anaesthesia",
                            quantity: 1,
                            unitPrice: 109.87,
                        },
                        {
                            item:"GU Tower",
                            type:"Anaesthesia",
                            quantity: 2,
                            unitPrice: 671.80,
                        },
                        {
                            item:"Gloves",
                            type:"Anaesthesia",
                            quantity: 4,
                            unitPrice: 2914.09,
                        }
                    ],
                    lastModified: new Date(2019,10,12),

                    hasRecovery: true,
                    recovery: {
                        location: {
                            "name": "Surgery Theatre 6"
                        },
                        appointment: {
                            startTime : new Date (2019, 10, 12, 16),
                            duration : "12 Hours" 
                        }
                    }
                },

                {
                    title : "Angioplasty",
                    location: {
                        name: "Surgery Theatre 5"
                    },
                    appointment: {
                        startTime : new Date (2020, 5, 12, 13),
                        duration : "3 Hours" 
                    },
    
                    //.... List procedure fields
                    equipments: [
                        {
                            item:"Augmentin",
                            type:"Antibiotics",
                            quantity:1,
                            unitPrice:672.90
                        },
                        {
                            item:"Atracurium",
                            type:"Anesthetic",
                            quantity:2,
                            unitPrice:8913.10
                        },
                        {
                            item:"Gentamicin",
                            type:"Antibiotics",
                            quantity:3,
                            unitPrice:900.89
                        }
                    ],
                    //Tentative
                    cost:78200.73,
                    consumables: [
                        {
                            item:"Lab Chole",
                            type:"Anaesthesia",
                            quantity:2,
                            unitPrice:2045.69,
                        },
                        {
                            item:"Bags",
                            type:"Anaesthesia",
                            quantity:1,
                            unitPrice:109.87,
                        },
                        {
                            item:"GU Tower",
                            type:"Anaesthesia",
                            quantity:2,
                            unitPrice:671.80,
                        },
                        {
                            item:"Atracium",
                            type:"Anaesthesia",
                            quantity:4,
                            unitPrice:2914.09,
                        }
                    ],
                    lastModified: new Date(2020,9,10),


                    hasRecovery: true,
                    recovery: {
                        location: {
                            "name": "Angioplasty"
                        },
                        appointment: {
                            startTime : new Date (2020, 5, 12, 16),
                            duration : "12 Hours" 
                        }
                    }
                }
            ],
            patientRisks: [
                {
                    riskLevel: "moderate",
                    notes: "There may be additional cardiovascular blockages"
                }
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
 * @type {{SIGNS_AND_SYMPTOMS: string, EXAMINATION: string, DIAGNOSTIC_EVALUATIONS: string, LABORATORY_INVESTIGATIONS: string, PROVISIONAL_DIAGNOSIS: string, FINAL_DIAGNOSIS: string, MEDICATION_PRESCRIBED: string, IMPLANTED_DEVICES: string}}
 */

 const diagnosisTypes = {
    SIGNS_AND_SYMPTOMS : "signsAndSymptoms",
    EXAMINATION: 'examination',
    DIAGNOSTIC_EVALUATIONS: 'diagnosticEvaluations',
    LABORATORY_INVESTIGATIONS: 'laboratoryInvestigations',
    PROVISIONAL_DIAGNOSIS: 'provisionalDiagnosis',
    FINAL_DIAGNOSIS:'finalDiagnosis',
    MEDICATION_PRESCRIBED:'medicationPrescribed',
    IMPLANTED_DEVICES:'implantedDevices'
 }

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

// export default caseFiles;
