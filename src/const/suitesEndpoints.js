// ##### Auth
export const loginEndpoint = '/auth/login';
export const logoutEndpoint = '/auth/logout';
export const registrationEndpoint = '/auth/register';
export const guestLoginEndpoint = '/auth/login/guest';

// ##### Users
export const users = '/users';
export const user = userId => `/users/${userId}`;
export const userPassword = userId => `/users/${userId}/changePassword`;

export const roles = '/users/roles';
export const role = roleId => `/users/roles/${roleId}`;

// ##### Appointments
export const appointmentsEndpoint = '/appointments/';
export const appointmentEndpoint = id => `/appointments/${id}`;

// ##### Theatre
export const theatresEndpoint = '/theatres';
export const theatreEndpoint = id => `/theatres/${id}`;

// ##### INVENTORY
export const inventoriesEndpoint = '/inventories';
// export const inventoriesGroupEndpoint = './inventory_groups';
export const inventoryEndpoint = id => `/inventories/${id}`;
export const inventoryVariantEndpoint = id => `/inventories/${id}/variants`;
export const inventoryGroups = '/inventory_groups';
export const inventoryGroupsBulkUpload = '/inventory_groups/bulk_upload';
export const inventoryGroup = groupId => `/inventory_groups/${groupId}`;
export const inventoryGroupVariants = groupId => `/inventory_groups/${groupId}/variants`;
export const inventoryGroupVariant = (groupId, variantId) => `/inventory_groups/${groupId}/variants/${variantId}`;
export const inventoryLocationEndpoint = (groupId, variantId) => `/inventory_groups/${groupId}/variants/${variantId}/storage`;

// ##### INVENTORY TRANSFERS
export const inventoryGroupVariantTransfers = (groupId, variantId) => `/inventory_groups/${groupId}/variants/${variantId}/transfers`;
export const inventoryGroupVariantTransfer = (groupId, variantId, transferId) => `/inventory_groups/${groupId}/variants/${variantId}/transfers/${transferId}`;
export const inventoryGroupVariantTransferState = (groupId, variantId, transferId) => `/inventory_groups/${groupId}/variants/${variantId}/transfers/${transferId}/state`;

// ##### PHYSICIANS
export const physiciansEndpoint = '/physicians';
export const physicianEndpoint = id => `/physicians/${id}`;

// ##### PROCEDURES
export const proceduresEndpoint = '/procedures';
export const proceduresUploadEndpoint = '/procedures/bulk_upload';
export const procedureEndpoint = id => `/procedures/${id}`;

// ##### EQUIPMENTS
export const equipmentsEndpoint = '/equipments';
export const equipmentEndpoint = id => `/equipments/${id}`;
export const equipmentTypesEndpoint = '/equipment-types';
export const equipmentTypeEndpoint = id => `/equipment-types/${id}`;
export const updateEquipmentTypeEndpoint = id => `/equipment-types/${id}`;
export const updateEquipmentEndpoint = id => `/equipments/${id}`;
export const assignEquipmentToLocation = (typeId, equipmentId) => `/equipment-types/${typeId}/equipments/${equipmentId}/assign`;

// ##### CASE FILES
export const deleteCaseFileEndpoint = id => `/cases/${id}/remove`;
export const deleteCaseFilesEndpiont = '/cases/'
export const caseFilesEndpoint = '/cases';
export const archivedCaseFilesEndpoint = '/cases/archived';
export const removeCaseFilesEndpoint = '/cases/archive';
export const restoreArchivedCasesEndpoint = '/cases/restore';
export const caseFileEndpoint = id => `/cases/${id}`;
export const simpleCaseProcedureUpdateEndpoint = (caseId, procedureId) => `/cases/${caseId}/procedures/${procedureId}/simple`;
export const updateChargeSheetEndpoint = id => `/cases/${id}/chargesheets`;
export const chargeSheetApprovalEndpoint = caseId => `/cases/${caseId}/chargesheets/approval`;
export const chargeSheetWithdrawChangesEndpoint = caseId => `/cases/${caseId}/chargesheets/withdraw`;
export const chargeSheetDiscountItemUpdateEndpoint = (chargeSheetId, caseProcedureId) => `/cases/${chargeSheetId}/discount/${caseProcedureId}`;
export const chargeSheetApplyPaymentEndpoint = caseId => `/cases/${caseId}/chargesheets/payment`;
export const chargeSheetInvoiceApplyPaymentEndpoint = (caseId, invoiceId) => `/cases/${caseId}/invoices/${invoiceId}/payment`;
export const createInvoice = id => quotationId => `/cases/${id}/quotations/${quotationId}/invoices`;
export const suggestedStartTimeEndpoint = '/cases/appointment/suggestions';
export const validateCaseProcedureEndpoint = '/cases/appointment/isvalid';
export const caseQuotationEndpoint = caseId => `/cases/${caseId}/quotations`;
export const caseInvoicesEndpoint = caseId => `/cases/${caseId}/invoices`;
export const quotationEndpoint = (caseId, quotationId) => `/cases/${caseId}/quotations/${quotationId}`;
export const updateQuotationStatusEndpoint = (caseId, quotationId) => `/cases/${caseId}/quotations/${quotationId}/status`;
export const caseProcedureAppointmentEndpoint = (caseId, procedureAppointmentId) => `/cases/${caseId}/procedures/${procedureAppointmentId}`;
export const caseProcedureAppointmentsEndpoint = caseId => `/cases/${caseId}/procedures/`;
export const caseStaffEndpoint = caseId => `/cases/staff/${caseId}`;

// ##### STORAGE
export const storageLocationsEndpoint = '/storage-locations';
export const storageLocationEndpoint = id => `/storage-locations/${id}`;

// ##### SUPPLIERS
export const suppliersEndpoint = '/Suppliers';
export const supplierEndpoint = id => `/suppliers/${id}`;
export const supplierProductsEndpoint = id => `/suppliers/${id}/products`;
export const variantSuppliersEndpoint = '/Suppliers/products';
export const updateProductsEndpoint = id => productId => `/suppliers/${id}/products/${productId}`;
export const archiveSupplierEndpoint = id => `/suppliers/${id}/archive`;
export const archiveSuppliersEndpoint = '/suppliers/archive';
export const getArchivedSuppliersEndPoint = '/Suppliers/archived';
export const restoreArchivedSuppliersEndpoint = '/suppliers/restore';

// ##### PURCHASE ORDERS
export const purchaseOrdersEndpoint = '/purchase_orders';
export const purchaseOrdersArchiveEndpoint = '/purchase_orders/archive';
export const purchaseOrderEndpoint = id => `/purchase_orders/${id}`;
export const createOrderInvoice = id => `/purchase_orders/${id}/invoice`;
export const updatePurchaseOrderStatusEndpoint = id => `/purchase_orders/${id}/status`;
export const updatePurchaseOrderEndpoint = id => `/purchase_orders/${id}/orders`;
export const updatePurchaseOrderDetailsEndpoint = id => `/purchase_orders/${id}`;
export const updatePurchaseOrderDocument = id => `/purchase_orders/${id}/document`;
export const purchaseOrderInvoice = id => `/purchase_orders/${id}/generate-invoice`;

// ##### CATEGORIES
export const categoriesEndpoint = '/categories/';
export const updateCategoryEndpoint = id => `/categories/${id}`;

// ##### PATIENTS
export const patientEndpoint = id => `/patients/${id}`;

// ##### ALERTS
export const alertsEndpoint = '/alerts';
export const closeAlertEndpoint = id => `/alerts/${id}/close`;

// ##### CONFIGURATIONS
export const configEndpoint = '/configurations';
export const updateBufferEndpoint = '/configurations/buffer';

// #### INVOICES
export const invoicesEndpoint = '/invoices';
export const invoiceEndpoint = id => `/invoices/${id}`;
export const updateInvoiceDetailsEndpoint = id => `/invoices/${id}`

// #### EMAIL
export const emailEndpoint = '/email/send';

// #### LIFESTYLES
export const lifestylesEndpiont = '/lifestyle_types'
export const ItemsLifeStyleEndpiont = (id) => `/lifestyle_types/${id}/items`
export const DeleteLifeStyleitems = `/lifestyle_types/delete/items`

// #### HEALTH INSURERS
export const healthInsurerEndpoint = '/health_insurer'
export const updateHealthInsurerEndpoint = id => `/health_insurer/${id}`
