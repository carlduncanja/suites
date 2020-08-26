// ##### Auth
export const loginEndpoint = `/auth/login`
export const logoutEndpoint = `/auth/logout`
export const registrationEndpoint = `/register`
export const guestLoginEndpoint = `/auth/login/guest`

// ##### Appointments
export const appointmentsEndpoint = `/appointments/`
export const appointmentEndpoint = (id) => `/appointments/${id}`;

// ##### Theatre
export const theatresEndpoint = "/theatres";
export const theatreEndpoint = (id) => `/theatres/${id}`;

// ##### INVENTORY
export const inventoriesEndpoint = "/inventories";
// export const inventoriesGroupEndpoint = './inventory_groups';
export const inventoryEndpoint = (id) => `/inventories/${id}`;
export const inventoryVariantEndpoint = (id) => `/inventories/${id}/variants`;
export const inventoryGroups = `/inventory_groups`;
export const inventoryGroup = (groupId) => `/inventory_groups/${groupId}`;
export const inventoryGroupVariants = (groupId) => `/inventory_groups/${groupId}/variants`;
export const inventoryGroupVariant = (groupId, variantId) => `/inventory_groups/${groupId}/variants/${variantId}`;

// ##### INVENTORY TRANSFERS
export const inventoryGroupVariantTransfers = (groupId, variantId) => `/inventory_groups/${groupId}/variants/${variantId}/transfers`;
export const inventoryGroupVariantTransfer = (groupId, variantId, transferId) => `/inventory_groups/${groupId}/variants/${variantId}/transfers/${transferId}`;


// ##### PHYSICIANS
export const physiciansEndpoint = "/physicians";
export const physicianEndpoint = (id) => `/physicians/${id}`;

// ##### PROCEDURES
export const proceduresEndpoint = "/procedures";
export const procedureEndpoint = (id) => `/procedures/${id}`;

// ##### EQUIPMENTS
export const equipmentsEndpoint = "/equipments";
export const equipmentEndpoint = (id) => `/equipments/${id}`;
export const equipmentTypesEndpoint = "/equipment-types"

// ##### CASE FILES
export const caseFilesEndpoint = "/cases";
export const caseFileEndpoint = (id) => `/cases/${id}`;
export const updateChargeSheetEndpoint = (id) => `/cases/${id}/chargesheets`;
export const createInvoice = (id) => (quotationId) => `/cases/${id}/quotations/${quotationId}/invoices`;
export const suggestedStartTimeEndpoint = '/cases/appointment/suggestions'
export const validateCaseProcedureEndpoint = '/cases/appointment/isvalid';
export const caseQuotationEndpoint = (caseId) => `/cases/${caseId}/quotations`
export const updateQuotationStatusEndpoint = (caseId, quotationId) => `/cases/${caseId}/quotations/${quotationId}/status`
export const caseProcedureAppointmentEndpoint = (caseId, procedureAppointmentId) => `/cases/${caseId}/procedures/${procedureAppointmentId}`

// ##### STORAGE
export const storageLocationsEndpoint = "/storage-locations";
export const storageLocationEndpoint = (id) => `/storage-locations/${id}`;

// ##### SUPPLIERS
export const suppliersEndpoint = "/suppliers";
export const supplierEndpoint = (id) => `/suppliers/${id}`;
export const supplierProductsEndpoint = (id) => `/suppliers/${id}/products`
export const updateProductsEndpoint = (id) => (productId) => `/suppliers/${id}/products/${productId}`
export const archiveSupplierEndpoint = (id) => `/suppliers/${id}/archive`
export const getArchivedSuppliersEndPoint = "/suppliers/archived"

// ##### PURCHASE ORDERS
export const purchaseOrdersEndpoint = "/purchase_orders";
export const purchaseOrderEndpoint = (id) => `/purchase_orders/${id}`;
export const createOrderInvoice = (id) => `/purchase_orders/${id}/invoice`;
export const updatePurchaseOrderStatusEndpoint = (purchaseOrderId) => `/purchase_orders/${purchaseOrderId}/status`;
export const updatePurchaseOrderEndpoint = (purchaseOrderId) => `/purchase_orders/${purchaseOrderId}/orders`;

// ##### CATEGORIES
export const categoriesEndpoint = "/categories/items";





