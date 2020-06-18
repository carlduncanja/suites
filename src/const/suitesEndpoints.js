// ##### Auth
export const loginEndpoint = `/login`
export const registrationEndpoint = `/register`
export const guestLoginEndpoint = `/login/guest`

// ##### Appointments
export const appointmentsEndpoint = `/appointments/`
export const appointmentEndpoint = (id) => `/appointments/${id}`;

// ##### Theatre
export const
    theatresEndpoint =  "/theatres";
export const theatreEndpoint =  (id) => `/theatres/${id}`;

// ##### INVENTORY
export const inventoriesEndpoint = "/inventories";
export const inventoryEndpoint = (id) => `/inventories/${id}`;

export const physiciansEndpoint = "/physicians";
export const physicianEndpoint = (id) => `/physicians/${id}`;

export const proceduresEndpoint = "/procedures";
export const procedureEndpoint = (id) => `/procedures/${id}`;

export const equipmentsEndpoint = "/equipments";
export const equipmentEndpoint = (id) => `/equipments/${id}`;
export const equipmentTypesEndpoint = "/equipment-types"

// ##### CASE FILES 
export const caseFilesEndpoint = "/cases";
export const caseFileEndpoint = (id) => `/cases/${id}`;
export const updateChargeSheetEndpoint = (id) => `/cases/${id}/chargesheets`

// ##### STORAGE
export const storageLocationsEndpoint = "/storage-locations";
export const storageLocationEndpoint = (id) => `/storage-locations/${id}`;

// ##### SUPPLIERS
export const suppliersEndpoint = "/suppliers";
export const supplierEndpoint = (id) => `/suppliers/${id}`;

// ##### PURCHASE ORDERS
export const purchaseOrdersEndpoint = "/purchase_orders";
export const purchaseOrderEndpoint = (id) => `/purchase_orders/${id}`;


// ##### CATEGORIES
export const categoriesEndpoint = "/categories/items";





