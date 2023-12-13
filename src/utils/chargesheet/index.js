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
  if (!templateResourceList || !templateResourceList.length) return [];
  const isInventoryList = resourceType === "inventory";
  return templateResourceList?.map((resource) => ({
    _id: isInventoryList ? resource[resourceType]._id : resource._id,
    amount: resource.amount,
    ...(isInventoryList && {
      cost: resource.inventory.unitCost,
    }),
  }));
};

export const calculateAdditionalResourcesCost = (
  templateResourceList,
  updatedResourceList,
  resourceType = "inventory"
) => {
  let surplusCost = 0;
  if (!updatedResourceList?.length) return surplusCost;

  updatedResourceList.forEach((updatedConsumable) => {
    const matchingTemplateConsumable = templateResourceList.find(
      (templateConsumable) =>
        templateConsumable._id === updatedConsumable[resourceType]
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
  additionalEquipmentCost,
  amountPaid,
  overtimeCost,
  serviceCost,
  totalDiscount
) => {
  return (
    serviceCost +
    overtimeCost +
    additionalConsumablesCost +
    additionalEquipmentCost -
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
  if (!templateResourceList || !templateResourceList.length) return {};
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

/** This is used to populate the "Additional Quantity" column on the Consumables
 *  and Equipment tab in the chargesheet.
 */
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

/** Used for resources, consumables or equipment, which are added to the list.
 *  These resources were not included in procedure template.
 */
export const getNewResourceMap = (templateResourceMap, updatedResourceMap) => {
  const additionalQtyMap = {};
  for (id in updatedResourceMap) {
    if (!templateResourceMap[id]) {
      additionalQtyMap[id] = updatedResourceMap[id].amount;
    }
  }
  return additionalQtyMap;
};
