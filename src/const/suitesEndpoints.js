// ##### Auth
export const loginEndpoint = `/login`
export const registrationEndpoint = `/register`
export const guestLoginEndpoint = `/login/guest`

// ##### Appointments
export const appointmentsEndpoint = `/appointments/`
export const appointmentEndpoint = () => `/appointments/${id}`;

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

export const caseFilesEndpoint = "/cases";
export const caseFileEndpoint = (id) => `/cases/${id}`;

// ##### STORAGE
export const storageLocationsEndpoint = "/storage-locations";
export const storageLocationEndpoint = (id) => `/storage-locations/${id}`;

// ##### SUPPLIERS
export const suppliersEndpoint = "/suppliers";
export const supplierEndpoint = (id) => `/suppliers/${id}`;

// ##### PURCHASE ORDERS
export const purchaseOrdersEndpoint = "/purchaseOrders";
export const purchaseOrderEndpoint = (id) => `/purchaseOrders/${id}`;


// ##### CATEGORIES
export const categoriesEndpoint = "/categories/items";





