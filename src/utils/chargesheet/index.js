/**
 *
 * @param {*} caseProcedure
 * @param {*} resourceType - "inventories" or "equipments"
 * @returns
 */
export const getUpdatedProcedureResourceList = (
  caseProcedure,
  resourceType = "inventories"
) => caseProcedure[0]?.[resourceType];

/**
 *
 * @param {*} templateResourceList
 * @param {*} resourceType - "inventory" or "equipment"
 * @returns
 */
export const getTemplateResources = (
  templateResourceList,
  resourceType = "inventory"
) => {
  if (!templateResourceList) return {};
  return templateResourceList?.map((resource) => ({
    _id: resource[resourceType]._id,
    amount: resource.amount,
    ...(resourceType === "inventory" && {
      cost: resource.inventory.unitCost,
    }),
  }));
};

export const calculateAdditionalConsumablesCost = (
  templateInventoryList,
  updatedInventoryList
) => {
  let surplusCost = 0;
  if (!updatedInventoryList?.length) return surplusCost;

  updatedInventoryList.forEach((updatedConsumable) => {
    const matchingTemplateConsumable = templateInventoryList.find(
      (templateConsumable) =>
        templateConsumable._id === updatedConsumable.inventory
    );
    if (!matchingTemplateConsumable) {
      surplusCost += updatedConsumable.amount * updatedConsumable.cost;
    } else if (updatedConsumable.amount > matchingTemplateConsumable.amount) {
      surplusCost +=
        (updatedConsumable.amount - matchingTemplateConsumable.amount) *
        matchingTemplateConsumable.cost;
    }
  });
  return surplusCost;
};

export const calculateOutstandingBalance = (
  additionalConsumablesCost,
  amountPaid,
  overtimeCost,
  serviceCost,
  totalDiscount
) => {
  return (
    serviceCost +
    overtimeCost +
    additionalConsumablesCost -
    totalDiscount -
    amountPaid
  );
};

/**
 * Argument must be value returned by `getTemplateConsumables`
 * @param {*} templateResourceList
 */
export const createTemplateResourceMap = (templateResourceList) => {
  const map = {};
  templateResourceList?.forEach((resource) => {
    map[resource._id] = resource.amount;
  });
  return map;
};

/**
 *
 * @param {*} updatedResourceList
 * @param {*} resourceType - "inventory" or "equipment"
 * @returns
 */
export const createUpdatedResourceMap = (
  updatedResourceList,
  resourceType = "inventory"
) => {
  const map = {};
  updatedResourceList?.forEach((resource) => {
    map[resource[resourceType]] = resource.amount;
  });
  return map;
};

export const createDefaultAdditionalResourcesMap = (
  templateResourceMap,
  updatedResourceMap
) => {
  const map = {};
  for (id in updatedResourceMap) {
    if (templateResourceMap[id]) {
      map[id] = Math.max(0, updatedResourceMap[id] - templateResourceMap[id]);
    } else {
      map[id] = 0;
    }
  }
  return map;
};

export const isNewResource = (resourceId, templateResourceMap) => {
  return !!!templateResourceMap[resourceId];
};

export const getAdditionalResourceMap = (
  templateResourceMap,
  updatedResourceMap
) => {
  const additionalQtyMap = {};
  for (id in updatedResourceMap) {
    if (!templateResourceMap[id]) {
      additionalQtyMap[id] = updatedResourceMap[id].amount;
    }
  }
  return additionalQtyMap;
};
