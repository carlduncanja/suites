import {
  calculateAdditionalConsumablesCost,
  calculateOutstandingBalance,
  createTemplateResourceMap,
  createUpdatedResourceMap,
  createDefaultAdditionalResourcesMap,
  getTemplateResources,
  getUpdatedProcedureResourceList,
} from ".";

const templateInventoryList = [
  {
    _id: "6548fb07fa66c2461fbfbfb3",
    amount: 10,
    inventory: {
      _id: "63f505047aa2a9acf1fec68c",
      active: "active",
      inventoryGroup: [],
      inventoryLocations: [],
      name: "3CC",
      product: null,
      unitCost: 925,
    },
  },
  {
    _id: "6548fb07fa66c2461fbfbfb4",
    amount: 10,
    inventory: {
      _id: "63f5054b71cef3d7c8c4705b",
      active: "active",
      inventoryGroup: [],
      inventoryLocations: [],
      name: "5CC",
      product: null,
      unitCost: 925,
    },
  },
];

describe("Testing chargeSheetUtils", () => {
  it("Should format updated inventory list properly", () => {
    const updatedCaseProcedure = [
      {
        caseProcedureId: "6548fb07fa66c2461fbfbfaf",
        discounts: [],
        equipments: [],
        inventories: [
          {
            _id: "6548fb07fa66c2461fbfbfb5",
            amount: 6,
            cost: 925,
            inventory: "63f505047aa2a9acf1fec68c",
            name: "3CC",
            type: "Needles",
          },
          {
            _id: "6548fb07fa66c2461fbfbfb6",
            amount: 4,
            cost: 925,
            inventory: "63f5054b71cef3d7c8c4705b",
            name: "5CC",
            type: "Needles",
          },
        ],
        lineItems: [],
        physicians: [],
        procedure: {
          cost: 9250,
          name: "Abdominal Libectomy  (Dec 6 - 9:45 am)",
        },
        procedures: [],
        services: [],
      },
    ];

    const updatedConsumables =
      getUpdatedProcedureResourceList(updatedCaseProcedure);
    expect(updatedConsumables[0]).toHaveProperty("_id");
    expect(updatedConsumables[0]).toHaveProperty("amount");
    expect(updatedConsumables[0]).toHaveProperty("cost");
  });

  it("Should format template inventory list properly", () => {
    const templateConsumables = getTemplateResources(templateInventoryList);
    expect(templateConsumables[0]).toHaveProperty("_id");
    expect(templateConsumables[0]).toHaveProperty("amount");
    expect(templateConsumables[0]).toHaveProperty("cost");
  });
  describe("Testing calculateSurplusInventoryCost", () => {
    it("Should return $0 when the actual inventory used is less than specified on the template", () => {
      const updatedCaseProcedure = [
        {
          caseProcedureId: "6548fb07fa66c2461fbfbfaf",
          discounts: [],
          equipments: [],
          inventories: [
            {
              _id: "6548fb07fa66c2461fbfbfb5",
              amount: 6,
              cost: 925,
              inventory: "63f505047aa2a9acf1fec68c",
              name: "3CC",
              type: "Needles",
            },
            {
              _id: "6548fb07fa66c2461fbfbfb6",
              amount: 4,
              cost: 925,
              inventory: "63f5054b71cef3d7c8c4705b",
              name: "5CC",
              type: "Needles",
            },
          ],
          lineItems: [],
          physicians: [],
          procedure: {
            cost: 9250,
            name: "Abdominal Libectomy  (Dec 6 - 9:45 am)",
          },
          procedures: [],
          services: [],
        },
      ];

      const updatedConsumables =
        getUpdatedProcedureResourceList(updatedCaseProcedure);
      const templateConsumables = getTemplateResources(templateInventoryList);
      const cost = calculateAdditionalConsumablesCost(
        templateConsumables,
        updatedConsumables
      );
      expect(cost).toBe(0);
    });

    it("Should return appropriate cost when the actual inventory used greater than the amount specified on the template", () => {
      const updatedCaseProcedure = [
        {
          caseProcedureId: "6548fb07fa66c2461fbfbfaf",
          discounts: [],
          equipments: [],
          inventories: [
            {
              _id: "6548fb07fa66c2461fbfbfb5",
              amount: 12,
              cost: 925,
              inventory: "63f505047aa2a9acf1fec68c",
              name: "3CC",
              type: "Needles",
            },
            {
              _id: "6548fb07fa66c2461fbfbfb6",
              amount: 4,
              cost: 925,
              inventory: "63f5054b71cef3d7c8c4705b",
              name: "5CC",
              type: "Needles",
            },
          ],
          lineItems: [],
          physicians: [],
          procedure: {
            cost: 9250,
            name: "Abdominal Libectomy  (Dec 6 - 9:45 am)",
          },
          procedures: [],
          services: [],
        },
      ];

      const updatedConsumables =
        getUpdatedProcedureResourceList(updatedCaseProcedure);
      const templateConsumables = getTemplateResources(templateInventoryList);
      const cost = calculateAdditionalConsumablesCost(
        templateConsumables,
        updatedConsumables
      );
      expect(cost).toBe(1850);
    });

    it("Should return appropriate cost when the template specified no consumables", () => {
      const updatedCaseProcedure = [
        {
          caseProcedureId: "6548fb07fa66c2461fbfbfaf",
          discounts: [],
          equipments: [],
          inventories: [
            {
              _id: "6548fb07fa66c2461fbfbfb5",
              amount: 12,
              cost: 925,
              inventory: "63f505047aa2a9acf1fec68c",
              name: "3CC",
              type: "Needles",
            },
            {
              _id: "6548fb07fa66c2461fbfbfb6",
              amount: 4,
              cost: 925,
              inventory: "63f5054b71cef3d7c8c4705b",
              name: "5CC",
              type: "Needles",
            },
          ],
          lineItems: [],
          physicians: [],
          procedure: {
            cost: 9250,
            name: "Abdominal Libectomy  (Dec 6 - 9:45 am)",
          },
          procedures: [],
          services: [],
        },
      ];

      const updatedConsumables =
        getUpdatedProcedureResourceList(updatedCaseProcedure);
      const templateConsumables = getTemplateResources([]);
      const cost = calculateAdditionalConsumablesCost(
        templateConsumables,
        updatedConsumables
      );
      expect(cost).toBe(14800);
    });

    it("Should calculate the correct outstanding balance", () => {
      const additonalInvCost = 50;
      const amountPaid = 20;
      const overtimeCost = 5;
      const serviceCost = 100;
      const totalDisc = 0;

      const outstandingBalance = calculateOutstandingBalance(
        additonalInvCost,
        amountPaid,
        overtimeCost,
        serviceCost,
        totalDisc
      );
      expect(outstandingBalance).toBe(135);
    });
  });

  it("Testing createTemplateInventoryMap", () => {
    const templateConsumables = getTemplateResources(templateInventoryList);
    const templateInvMap = createTemplateResourceMap(templateConsumables);
    expect(templateInvMap).toHaveProperty(
      templateConsumables[0]._id,
      templateConsumables[0].amount
    );
    expect(templateInvMap).toHaveProperty(
      templateConsumables[1]._id,
      templateConsumables[1].amount
    );
  });

  it("Testing createUpdatedConsumablesMap", () => {
    const updatedCaseProcedure = [
      {
        caseProcedureId: "6548fb07fa66c2461fbfbfaf",
        discounts: [],
        equipments: [],
        inventories: [
          {
            _id: "6548fb07fa66c2461fbfbfb5",
            amount: 6,
            cost: 925,
            inventory: "63f505047aa2a9acf1fec68c",
            name: "3CC",
            type: "Needles",
          },
          {
            _id: "6548fb07fa66c2461fbfbfb6",
            amount: 4,
            cost: 925,
            inventory: "63f5054b71cef3d7c8c4705b",
            name: "5CC",
            type: "Needles",
          },
        ],
        lineItems: [],
        physicians: [],
        procedure: {
          cost: 9250,
          name: "Abdominal Libectomy  (Dec 6 - 9:45 am)",
        },
        procedures: [],
        services: [],
      },
    ];

    const updatedConsumables =
      getUpdatedProcedureResourceList(updatedCaseProcedure);
    const updatedConsumablesMap = createUpdatedResourceMap(updatedConsumables);

    expect(updatedConsumablesMap).toHaveProperty(
      updatedConsumables[0].inventory,
      updatedConsumables[0].amount
    );
    expect(updatedConsumablesMap).toHaveProperty(
      updatedConsumables[1].inventory,
      updatedConsumables[1].amount
    );
  });

  it("Testing getDefaultAdditionalInventoryMap", () => {
    const updatedCaseProcedure = [
      {
        caseProcedureId: "6548fb07fa66c2461fbfbfaf",
        discounts: [],
        equipments: [],
        inventories: [
          {
            _id: "6548fb07fa66c2461fbfbfb5",
            amount: 15,
            cost: 925,
            inventory: "63f505047aa2a9acf1fec68c",
            name: "3CC",
            type: "Needles",
          },
          {
            _id: "6548fb07fa66c2461fbfbfb6",
            amount: 4,
            cost: 925,
            inventory: "63f5054b71cef3d7c8c4705b",
            name: "5CC",
            type: "Needles",
          },
        ],
        lineItems: [],
        physicians: [],
        procedure: {
          cost: 9250,
          name: "Abdominal Libectomy  (Dec 6 - 9:45 am)",
        },
        procedures: [],
        services: [],
      },
    ];

    const updatedConsumables =
      getUpdatedProcedureResourceList(updatedCaseProcedure);
    const updatedConsumablesMap = createUpdatedResourceMap(updatedConsumables);

    const templateConsumables = getTemplateResources(templateInventoryList);
    const templateConsumablesMap =
      createTemplateResourceMap(templateConsumables);

    const defaultAddInvMap = createDefaultAdditionalResourcesMap(
      templateConsumablesMap,
      updatedConsumablesMap
    );

    expect(defaultAddInvMap).toHaveProperty(updatedConsumables[0].inventory, 5);
    expect(defaultAddInvMap).toHaveProperty(updatedConsumables[1].inventory, 0);
  });
});
