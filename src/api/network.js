import suitesAxiosInstance, {
  documentGenerationInstance,
  documentManagementInstance,
} from "./index";
import { handleError, handleResponse } from "./apiUtils";
import { Buffer } from "buffer";
import {
  inventoryGroups,
  inventoryGroup,
  inventoriesEndpoint,
  inventoryGroupVariant,
  inventoryGroupVariants,
  inventoryGroupVariantTransfers,
  inventoryGroupVariantTransfer,
  inventoryGroupVariantTransferState,
  inventoryLocationEndpoint,
  theatresEndpoint,
  theatreEndpoint,
  physiciansEndpoint,
  physicianEndpoint,
  proceduresEndpoint,
  procedureEndpoint,
  caseFilesEndpoint,
  caseFileEndpoint,
  simpleCaseProcedureUpdateEndpoint,
  updateChargeSheetEndpoint,
  createInvoice,
  equipmentsEndpoint,
  equipmentEndpoint,
  equipmentTypesEndpoint,
  equipmentTypeEndpoint,
  updateEquipmentTypeEndpoint,
  storageLocationsEndpoint,
  suppliersEndpoint,
  supplierEndpoint,
  supplierProductsEndpoint,
  variantSuppliersEndpoint,
  updateProductsEndpoint,
  purchaseOrdersEndpoint,
  purchaseOrderEndpoint,
  updatePurchaseOrderEndpoint,
  createOrderInvoice,
  storageLocationEndpoint,
  categoriesEndpoint,
  loginEndpoint,
  forgotPasswordEndpoint,
  appointmentsEndpoint,
  appointmentEndpoint,
  appointmentTypeEndPiont,
  updateAppiontmentTypeEndpiont,
  validateCaseProcedureEndpoint,
  suggestedStartTimeEndpoint,
  updateQuotationStatusEndpoint,
  updatePurchaseOrderStatusEndpoint,
  logoutEndpoint,
  caseProcedureAppointmentEndpoint,
  archiveSupplierEndpoint,
  getArchivedSuppliersEndPoint,
  caseQuotationEndpoint,
  quotationEndpoint,
  caseInvoicesEndpoint,
  caseStaffEndpoint,
  chargeSheetApprovalEndpoint,
  chargeSheetWithdrawChangesEndpoint,
  caseProcedureAppointmentsEndpoint,
  registrationEndpoint,
  assignEquipmentToLocation,
  users,
  updateEquipmentEndpoint,
  purchaseOrdersArchiveEndpoint,
  updatePurchaseOrderDetailsEndpoint,
  addDocumentEndpoint,
  user,
  roles,
  role,
  patientEndpoint,
  allPatientsEndpoint,
  updatePatientRiskEndpoint,
  alertsEndpoint,
  closeAlertEndpoint,
  closeAllAlertsEndpoint,
  configEndpoint,
  updateBufferEndpoint,
  userPassword,
  chargeSheetApplyPaymentEndpoint,
  chargeSheetInvoiceApplyPaymentEndpoint,
  chargeSheetDiscountItemUpdateEndpoint,
  archivedCaseFilesEndpoint,
  removeCaseFilesEndpoint,
  restoreArchivedCasesEndpoint,
  archiveSuppliersEndpoint,
  restoreArchivedSuppliersEndpoint,
  updatePurchaseOrderDocument,
  purchaseOrderInvoice,
  inventoryGroupsBulkUpload,
  proceduresUploadEndpoint,
  deleteCaseFileEndpoint,
  deleteCaseFilesEndpiont,
  invoicesEndpoint,
  invoiceEndpoint,
  updateInvoiceDetailsEndpoint,
  emailEndpoint,
  updateCategoryEndpoint,
  confirmDeliveryEndpoint,
  lifestylesEndpiont,
  lifestyleItemsEndpiont,
  ItemsLifeStyleEndpiont,
  DeleteLifeStyleitems,
  healthInsurerEndpoint,
  updateHealthInsurerEndpoint,
  UpdateLifeStyleItems,
  verifyOtpEndpoint,
  resetPasswordEndpoint,
  casePatientEndpoint,
  requestQuotationEndpoint,
  sendToSupplierEndpoint,
  addPaymentEndpoint,
  revertPaymentEndpoint,
  addMedicalHistoryEndpoint,
  caseUpdateStaffEndpoint,
  getMedicalHistoryTypeEndpoint,
  addFamilyHistoryEndpoint,
  editFamilyHistoryEndpoint,
  deleteFamilyHistoryEndpoint,
  createPatientLifestyleEndpiont,
  deletePatientLifestyleEndpiont,
  updatePatientLifestyleEndpiont,
  getAllById,
  addConsumablesCall,
  deletePatientEndpoint,
  getPatientByIdEndpoint,
  addAppointmentToPatientEndPoint,
  endProcedureEndpoint,
  guestLoginEndpoint,
} from "../const/suitesEndpoints";
import {
  createDocumentLink,
  documentById,
  documentData,
  documentUpload,
} from "../const/documentGenerationEndpoints";

// ################# Auth Endpoints
export const login = async (email, password, pushToken) =>
  suitesAxiosInstance
    .post(loginEndpoint, { email, password, pushToken })
    .then(handleResponse)
    .catch(handleError);

export const loginGuest = async () =>
  suitesAxiosInstance
    .post(guestLoginEndpoint)
    .then(handleResponse)
    .catch(handleError);

export const logout = async (userId, pushToken) =>
  suitesAxiosInstance
    .put(logoutEndpoint, { user_id: userId, pushToken })
    .then(handleResponse)
    .catch(handleError);

export const forgotPassword = async (email) =>
  suitesAxiosInstance
    .post(forgotPasswordEndpoint, { email })
    .then(handleResponse)
    .catch(handleError);

export const verifyOtp = async (id, code) =>
  suitesAxiosInstance
    .post(verifyOtpEndpoint(id), { code })
    .then(handleResponse)
    .catch(handleError);

export const resetPassword = async (id, data) =>
  suitesAxiosInstance
    .post(resetPasswordEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

//################ Users Endpoint
export const getUsersCall = async (query, page, max) =>
  suitesAxiosInstance
    .get(users, { params: { query, page, max } })
    .then(handleResponse)
    .catch(handleError);

export const getUserCall = async (userId) =>
  suitesAxiosInstance.get(user(userId)).then(handleResponse).catch(handleError);

export const updateUserCall = async (userId, updateData) =>
  suitesAxiosInstance
    .put(user(userId), updateData)
    .then(handleResponse)
    .catch(handleError);

export const deleteUserCall = async (userIds) =>
  suitesAxiosInstance
    .delete(users, { data: { ids: userIds } })
    .then(handleResponse)
    .catch(handleError);

export const createRoleCall = async (data) =>
  suitesAxiosInstance.post(roles, data).then(handleResponse).catch(handleError);

export const getRolesCall = async (query, page, max) =>
  suitesAxiosInstance
    .get(roles, { params: { query, page, max } })
    .then(handleResponse)
    .catch(handleError);

export const getRole = async (roleId) =>
  suitesAxiosInstance.get(role(roleId)).then(handleResponse).catch(handleError);

export const updateRoleCall = async (roleId, updateData) =>
  suitesAxiosInstance
    .put(role(roleId), updateData)
    .then(handleResponse)
    .catch(handleError);

export const deleteRoleCall = async (roleIds) =>
  suitesAxiosInstance
    .delete(roles, { data: { ids: roleIds } })
    .then(handleResponse)
    .catch(handleError);

export const registrationCall = async (params) =>
  suitesAxiosInstance
    .post(registrationEndpoint, params)
    .then(handleResponse)
    .catch(handleError);

export const resetUserPassword = async (userId, updateData) =>
  suitesAxiosInstance
    .put(userPassword(userId), updateData)
    .then(handleResponse)
    .catch(handleError);

// ################# Appointments Endpoints
export const getAppointments = async (query, location, from, to, type, users) =>
  suitesAxiosInstance
    .get(appointmentsEndpoint, { params: { from, to, users } })
    .then(handleResponse)
    .catch(handleError);

export const getAppointmentRequest = (params = {}) =>
  suitesAxiosInstance
    .get(appointmentsEndpoint, { params })
    .then(handleResponse)
    .catch(handleError);

export const getAppointmentById = async (id) =>
  suitesAxiosInstance
    .get(appointmentEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const deleteAppointmentById = async (id) =>
  suitesAxiosInstance
    .delete(appointmentEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updateAppointmentById = async (id, data) =>
  suitesAxiosInstance
    .put(appointmentEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const endProcedure = async (id, data) =>
  suitesAxiosInstance
    .post(endProcedureEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const createAppointment = async (data) =>
  suitesAxiosInstance
    .post(appointmentsEndpoint, data)
    .then(handleResponse)
    .catch(handleError);

export const searchSchedule = async (query) => {
  if (!query) return [];
  query = query.toLowerCase();

  return suitesAxiosInstance
    .get("/appointments", { params: { query } })
    .then(handleResponse)
    .catch(handleError);
};

// ###### Appiontment Types

export const getAppointmentTypes = async () =>
  suitesAxiosInstance
    .get(appointmentTypeEndPiont)
    .then(handleResponse)
    .catch(handleError);

export const updateAppointmentTypes = async (id, data) =>
  suitesAxiosInstance
    .put(updateAppiontmentTypeEndpiont(id), data)
    .then(handleResponse)
    .catch(handleError);

// ################# Theatres Endpoints
export const getTheatres = async (query, max, page, isRecovery) =>
  suitesAxiosInstance
    .get(theatresEndpoint, { params: { query, max, page, isRecovery } })
    .then(handleResponse)
    .catch(handleError);

export const getTheatreById = async (id) =>
  suitesAxiosInstance
    .get(theatreEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updatedTheatreCall = async (id, data) =>
  suitesAxiosInstance
    .put(theatreEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const createTheatre = async (theatreForCreation) =>
  suitesAxiosInstance
    .post(theatresEndpoint, theatreForCreation)
    .then(handleResponse)
    .catch(handleError);

export const removeTheatres = async (data) =>
  suitesAxiosInstance
    .delete(theatresEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

// ################# Inventory Endpoints

export const getInventoriesGroup = async (query, max, page) =>
  suitesAxiosInstance
    .get(inventoryGroups, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const getInventoriesGroupBulkUploadRequest = async (formData) =>
  suitesAxiosInstance
    .post(inventoryGroupsBulkUpload, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(handleResponse)
    .catch(handleError);

export const getInventories = async (query, max, page) =>
  suitesAxiosInstance
    .get(inventoriesEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const getInventoryGroupById = async (id) =>
  suitesAxiosInstance
    .get(inventoryGroup(id))
    .then(handleResponse)
    .catch(handleError);

export const updateInventoryGroupById = async (id, data) =>
  suitesAxiosInstance
    .put(inventoryGroup(id), data)
    .then(handleResponse)
    .catch(handleError);

export const removeInventoryGroup = async (id) =>
  suitesAxiosInstance
    .delete(inventoryGroup(id))
    .then(handleResponse)
    .catch(handleError);

export const removeInventoryGroups = async (ids) =>
  suitesAxiosInstance
    .delete(inventoryGroups, { data: { ids } })
    .then(handleResponse)
    .catch(handleError);

export const removeInventoryVariants = async (ids) =>
  suitesAxiosInstance
    .delete(inventoriesEndpoint, { data: { ids } })
    .then(handleResponse)
    .catch(handleError);

export const getInventoryVariantByGroup = async (id, groupId) =>
  suitesAxiosInstance
    .get(inventoryGroupVariant(groupId, id))
    .then(handleResponse)
    .catch(handleError);

export const updateInventoryVariantCall = async (id, groupId, data) =>
  suitesAxiosInstance
    .put(inventoryGroupVariant(groupId, id), data)
    .then(handleResponse)
    .catch(handleError);

export const createInventories = async (inventoryForCreation) =>
  suitesAxiosInstance
    .post(inventoriesEndpoint, inventoryForCreation)
    .then(handleResponse)
    .catch(handleError);

export const createInventoryGroup = async (groupToCreate) =>
  suitesAxiosInstance
    .post(inventoryGroups, groupToCreate)
    .then(handleResponse)
    .catch(handleError);

export const createInventoryVariant = async (referenceId, itemToCreate) =>
  suitesAxiosInstance
    .post(inventoryGroupVariants(referenceId), itemToCreate)
    .then(handleResponse)
    .catch(handleError);

export const createTransfer = async (groupId, variantId, transferData) =>
  suitesAxiosInstance
    .post(inventoryGroupVariantTransfers(groupId, variantId), transferData)
    .then(handleResponse)
    .catch(handleError);

export const createInventoryLocation = async (groupId, variantId, data) =>
  suitesAxiosInstance
    .post(inventoryLocationEndpoint(groupId, variantId), data)
    .then(handleResponse)
    .catch(handleError);

export const removeTransferItem = async (groupId, variantId, transferId) =>
  suitesAxiosInstance
    .delete(inventoryGroupVariantTransfer(groupId, variantId, transferId))
    .then(handleResponse)
    .catch(handleError);

export const updateTransferState = async (
  groupId,
  variantId,
  transferId,
  data
) =>
  suitesAxiosInstance
    .put(
      inventoryGroupVariantTransferState(groupId, variantId, transferId),
      data
    )
    .then(handleResponse)
    .catch(handleError);

// ################# Case Files Endpoints
export const getCaseFiles = async (query, max, page) =>
  suitesAxiosInstance
    .get(caseFilesEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const removeCaseFilesId = async (data) =>
  suitesAxiosInstance
    .delete(caseFilesEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const getCaseFileById = async (id) =>
  suitesAxiosInstance
    .get(caseFileEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const getCaseFileByPatientId = async (id) =>
  suitesAxiosInstance
    .get(casePatientEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updateCaseFile = async (id, caseId) =>
  suitesAxiosInstance
    .put(caseFileEndpoint(id), caseId)
    .then(handleResponse)
    .catch(handleError);

export const simpleCaseProcedureUpdate = async (id, procedureId, data) =>
  suitesAxiosInstance
    .put(simpleCaseProcedureUpdateEndpoint(id, procedureId), data)
    .then(handleResponse)
    .catch(handleError);

export const getArchivedCaseFiles = async (query, max, page) =>
  suitesAxiosInstance
    .get(archivedCaseFilesEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const createCaseFile = async (caseFileForCreation) =>
  suitesAxiosInstance
    .post(caseFilesEndpoint, caseFileForCreation)
    .then(handleResponse)
    .catch(handleError);

export const deleteCaseStaff = async (caseId, data) =>
  suitesAxiosInstance
    .delete(caseStaffEndpoint(caseId), { data })
    .then(handleResponse)
    .catch(handleError);

export const addCaseStaff = async (caseId, data) =>
  suitesAxiosInstance
    .post(caseStaffEndpoint(caseId), data)
    .then(handleResponse)
    .catch(handleError);

export const editCaseStaff = async (caseId, data) =>
  suitesAxiosInstance
    .put(caseUpdateStaffEndpoint(caseId), data)
    .then(handleResponse)
    .catch(handleError);

export const isValidCaseProcedureAppointment = async (
  procedure,
  location,
  startTime,
  duration
) =>
  suitesAxiosInstance
    .get(validateCaseProcedureEndpoint, {
      params: { procedure, location, duration, startTime },
    })
    .then(handleResponse)
    .catch(handleError);

export const getSuggestedStartTimes = async (
  procedure,
  location,
  date,
  duration,
  numSuggestions
) =>
  suitesAxiosInstance
    .get(suggestedStartTimeEndpoint, {
      params: {
        procedure,
        location,
        duration,
        date,
        numSuggestions,
      },
    })
    .then(handleResponse)
    .catch(handleError);

export const updateChargeSheet = async (id, data) =>
  suitesAxiosInstance
    .put(updateChargeSheetEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const approveChargeSheetCall = async (id, params) =>
  suitesAxiosInstance
    .put(chargeSheetApprovalEndpoint(id), params)
    .then(handleResponse)
    .catch(handleError);

export const withdrawChargeSheetChangesCall = async (id) =>
  suitesAxiosInstance
    .put(chargeSheetWithdrawChangesEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const applyPaymentsChargeSheetCall = async (id, data) =>
  suitesAxiosInstance
    .put(chargeSheetApplyPaymentEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const applyPaymentsChargeSheetInvoiceCall = async (
  caseId,
  invoiceId,
  data
) =>
  suitesAxiosInstance
    .put(chargeSheetInvoiceApplyPaymentEndpoint(caseId, invoiceId), data)
    .then(handleResponse)
    .catch(handleError);

export const updateDiscountItem = async (
  chargeSheetId,
  caseProcedureId,
  data
) =>
  suitesAxiosInstance
    .put(
      chargeSheetDiscountItemUpdateEndpoint(chargeSheetId, caseProcedureId),
      data
    )
    .then(handleResponse)
    .catch(handleError);

export const updateCaseQuotationStatus = async (caseId, quotationId, status) =>
  suitesAxiosInstance
    .put(updateQuotationStatusEndpoint(caseId, quotationId), { status })
    .then(handleResponse)
    .catch(handleError);

export const generateQuotationCall = async (caseId) =>
  suitesAxiosInstance
    .post(caseQuotationEndpoint(caseId))
    .then(handleResponse)
    .catch(handleError);

export const removeQuotationCall = async (caseId, quotationsId) =>
  suitesAxiosInstance
    .delete(quotationEndpoint(caseId, quotationsId))
    .then(handleResponse)
    .catch(handleError);

export const removeCaseFiles = async (data) =>
  suitesAxiosInstance
    .delete(removeCaseFilesEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const deleteCaseFile = async (data) =>
  suitesAxiosInstance
    .delete(deleteCaseFileEndpoint(data))
    .then(handleResponse)
    .catch(handleError);

export const deleteCaseFiles = async (data) =>
  suitesAxiosInstance
    .delete(deleteCaseFilesEndpiont, { data })
    .then(handleResponse)
    .catch(handleError);

export const restoreArchivedCaseFiles = async (caseIds) =>
  suitesAxiosInstance
    .put(restoreArchivedCasesEndpoint, caseIds)
    .then(handleResponse)
    .catch(handleError);

export const generateInvoiceCall = async (caseId) =>
  suitesAxiosInstance
    .post(caseInvoicesEndpoint(caseId))
    .then(handleResponse)
    .catch(handleError);

export const createInvoiceViaQuotation = async (caseId, quotationId) =>
  suitesAxiosInstance
    .post(createInvoice(caseId)(quotationId))
    .then(handleResponse)
    .catch(handleError);

export const addConsumablesToStorage = async (caseId) =>
  suitesAxiosInstance
    .put(addConsumablesCall(caseId))
    .then(handleResponse)
    .catch(handleError);

// Case procedure appointments
export const removeCaseProcedureAppointment = async (caseId, caseProcedureId) =>
  suitesAxiosInstance
    .delete(caseProcedureAppointmentEndpoint(caseId, caseProcedureId))
    .then(handleResponse)
    .catch(handleError);

export const addProcedureAppointmentCall = async (
  caseId,
  procedureAppointment
) =>
  suitesAxiosInstance
    .post(caseProcedureAppointmentsEndpoint(caseId), procedureAppointment)
    .then(handleResponse)
    .catch(handleError);

export const updateCaseProcedureAppointmentCall = async (
  caseId,
  caseProcedureId,
  data
) =>
  suitesAxiosInstance
    .put(caseProcedureAppointmentEndpoint(caseId, caseProcedureId), data)
    .then(handleResponse)
    .catch(handleError);

// ################# Procedures Endpoints
export const getProcedures = async (query, max, page) =>
  suitesAxiosInstance
    .get(proceduresEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const getProcedureById = async (id) =>
  suitesAxiosInstance
    .get(procedureEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const createNewProcedure = async (procedureToCreate) =>
  suitesAxiosInstance
    .post(proceduresEndpoint, procedureToCreate)
    .then(handleResponse)
    .catch(handleError);

export const bulkUploadProcedureRequest = async (formData) =>
  suitesAxiosInstance
    .post(proceduresUploadEndpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(handleResponse)
    .catch(handleError);

export const updateProcedure = async (id, data) =>
  suitesAxiosInstance
    .put(procedureEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const removeProcedures = async (data) =>
  suitesAxiosInstance
    .delete(proceduresEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

// ################# Physicians Endpoints
export const getPhysicians = async (query, max, page) =>
  suitesAxiosInstance
    .get(physiciansEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const getPhysicianById = async (id) =>
  suitesAxiosInstance
    .get(physicianEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const createPhysician = async (physicianToCreate) =>
  suitesAxiosInstance
    .post(physiciansEndpoint, physicianToCreate)
    .then(handleResponse)
    .catch(handleError);

export const updatePhysician = async (id, data) =>
  suitesAxiosInstance
    .put(physicianEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const removePhysicians = async (data) =>
  suitesAxiosInstance
    .delete(physiciansEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const getAllPhysicianById = async (data) =>
  suitesAxiosInstance
    .get(getAllById, { params: { data } })
    .then(handleResponse)
    .catch(handleError);

// ################# Storage Endpoints
export const getStorage = async (query, max, page) =>
  suitesAxiosInstance
    .get(storageLocationsEndpoint, {
      params: {
        query,
        max,
        page,
      },
    })
    .then(handleResponse)
    .catch(handleError);

export const getStorageById = async (id) =>
  suitesAxiosInstance
    .get(storageLocationEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updateStorageLocationCall = async (id, data) =>
  suitesAxiosInstance
    .put(storageLocationEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const createStorageLocation = async (storageForCreation) =>
  suitesAxiosInstance
    .post(storageLocationsEndpoint, storageForCreation)
    .then(handleResponse)
    .catch(handleError);

export const removeStorageLocations = async (data) =>
  suitesAxiosInstance
    .delete(storageLocationsEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

// ################# Equipment Endpoint
export const getEquipment = async (query) =>
  suitesAxiosInstance
    .get(equipmentsEndpoint, { params: { query } })
    .then(handleResponse)
    .catch(handleError);

export const getEquipmentById = async (id) =>
  suitesAxiosInstance
    .get(equipmentEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updateEquipment = async (id, bodyToSend) =>
  suitesAxiosInstance
    .put(updateEquipmentEndpoint(id), bodyToSend)
    .then(handleResponse)
    .catch(handleError);

export const updateEquipmentType = async (id, bodyToSend) =>
  suitesAxiosInstance
    .put(updateEquipmentTypeEndpoint(id), bodyToSend)
    .then(handleResponse)
    .catch(handleError);

export const getEquipmentTypes = async (query, max, page) =>
  suitesAxiosInstance
    .get(equipmentTypesEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const removeEquipmentTypes = async (data) =>
  suitesAxiosInstance
    .delete(equipmentTypesEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const getEquipmentTypeById = async (id) =>
  suitesAxiosInstance
    .get(equipmentTypeEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const assignEquipmentGivenLocation = async (
  typeID,
  equipmentID,
  bodyToSend
) =>
  suitesAxiosInstance
    .post(assignEquipmentToLocation(typeID, equipmentID), bodyToSend)
    .then(handleResponse)
    .catch(handleError);

export const createEquipment = async (equipmentToCreate) =>
  suitesAxiosInstance
    .post(equipmentsEndpoint, equipmentToCreate)
    .then(handleResponse)
    .catch(handleError);

export const removeEquipment = async (ids) =>
  suitesAxiosInstance
    .delete(equipmentsEndpoint, { data: ids })
    .then(handleResponse)
    .catch(handleError);

export const createEquipmentType = async (equipmentTypeToCreate) =>
  suitesAxiosInstance
    .post(equipmentTypesEndpoint, equipmentTypeToCreate)
    .then(handleResponse)
    .catch(handleError);

// ################# Categories Endpoint

export const getCategories = async (type, max, query) =>
  suitesAxiosInstance
    .get(categoriesEndpoint, { params: { type, max, query } })
    .then(handleResponse)
    .catch(handleError);

export const addCategory = async (data) =>
  suitesAxiosInstance
    .post(categoriesEndpoint, data)
    .then(handleResponse)
    .catch(handleError);

export const deleteCategory = async (data) =>
  suitesAxiosInstance
    .delete(categoriesEndpoint, { data: { ids: data } })
    .then(handleResponse)
    .catch(handleError);

export const updateCategory = async (id, data) =>
  suitesAxiosInstance
    .put(updateCategoryEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

// ################# Suppliers Endpoints
export const deleteSuppliersId = async (data) =>
  suitesAxiosInstance
    .delete(suppliersEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const getSuppliers = async (query, max, page) =>
  suitesAxiosInstance
    .get(suppliersEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const createSupplier = async (supplierToCreate) =>
  suitesAxiosInstance
    .post(suppliersEndpoint, supplierToCreate)
    .then(handleResponse)
    .catch(handleError);

export const getSupplierById = async (id) =>
  suitesAxiosInstance
    .get(supplierEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updateSupplierCall = async (id, data) =>
  suitesAxiosInstance
    .put(supplierEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const getSupplierProducts = async (id, query, max) =>
  suitesAxiosInstance
    .get(supplierProductsEndpoint(id), { params: { query, max } })
    .then(handleResponse)
    .catch(handleError);

export const getVariantSupplierProducts = async (
  inventoryVariant,
  query,
  max,
  page
) =>
  suitesAxiosInstance
    .get(variantSuppliersEndpoint, {
      params: { query, max, page, inventoryVariant },
    })
    .then(handleResponse)
    .catch(handleError);

export const createSupplierProductsCall = async (id, data) =>
  suitesAxiosInstance
    .post(supplierProductsEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const updateSupplierProductsCall = async (supplierId, productId, data) =>
  suitesAxiosInstance
    .put(updateProductsEndpoint(supplierId)(productId), data)
    .then(handleResponse)
    .catch(handleError);

export const getArchivedSuppliers = async () =>
  suitesAxiosInstance
    .get(getArchivedSuppliersEndPoint)
    .then(handleResponse)
    .catch(handleError);

export const archiveSupplier = async (supplierId) =>
  suitesAxiosInstance
    .delete(archiveSupplierEndpoint(supplierId))
    .then(handleResponse)
    .catch(handleError);

export const archiveSuppliers = async (data) =>
  suitesAxiosInstance
    .delete(archiveSuppliersEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const restoreArchivedSuppliers = async (suppliersIds) =>
  suitesAxiosInstance
    .put(restoreArchivedSuppliersEndpoint, suppliersIds)
    .then(handleResponse)
    .catch(handleError);

export const removeSupplierProducts = async (supplierId, data) =>
  suitesAxiosInstance
    .delete(supplierProductsEndpoint(supplierId), { data })
    .then(handleResponse)
    .catch(handleError);

// ################# PurchaseOrders Endpoints
export const getPurchaseOrders = async (query, max, page, supplierId) =>
  suitesAxiosInstance
    .get(purchaseOrdersEndpoint, {
      params: { query, max, page, supplierId },
    })
    .then(handleResponse)
    .catch(handleError);

export const removePurchaseOrderCall = async (ids) =>
  suitesAxiosInstance
    .delete(purchaseOrdersEndpoint, { data: { ids } })
    .then(handleResponse)
    .catch(handleError);

export const updatePurchaseOrderStatus = async (purchaseOrderId, status) =>
  suitesAxiosInstance
    .put(updatePurchaseOrderStatusEndpoint(purchaseOrderId), { status })
    .then(handleResponse)
    .catch(handleError);

export const createPurchaseOrder = async (orderToCreate) =>
  suitesAxiosInstance
    .post(purchaseOrdersEndpoint, orderToCreate)
    .then(handleResponse)
    .catch(handleError);

export const getPurchaseOrderById = async (id) =>
  suitesAxiosInstance
    .get(purchaseOrderEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const createInvoiceViaOrders = async (quotationId) =>
  suitesAxiosInstance
    .post(createOrderInvoice(quotationId))
    .then(handleResponse)
    .catch(handleError);

export const updatePurchaseOrder = async (purchaseOrderId, data) =>
  suitesAxiosInstance
    .put(updatePurchaseOrderEndpoint(purchaseOrderId), data)
    .then(handleResponse)
    .catch(handleError);

export const updatePurchaseOrderDetails = async (purchaseOrderId, data) =>
  suitesAxiosInstance
    .put(updatePurchaseOrderDetailsEndpoint(purchaseOrderId), data)
    .then(handleResponse)
    .catch(handleError);

export const confirmDelivery = async (purchaseOrderId, data) =>
  suitesAxiosInstance
    .put(confirmDeliveryEndpoint(purchaseOrderId), data)
    .then(handleResponse)
    .catch(handleError);

export const removePurchaseOrders = async (data) =>
  suitesAxiosInstance
    .delete(purchaseOrdersEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const archivePurchaseOrders = async (data) =>
  suitesAxiosInstance
    .delete(purchaseOrdersArchiveEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

export const updateInvoiceDocument = async (purchaseOrderId, data) =>
  suitesAxiosInstance
    .put(updatePurchaseOrderDocument(purchaseOrderId), data)
    .then(handleResponse)
    .catch(handleError);

export const generatePurchaseOrderInvoice = async (purchaseOrderId, status) =>
  suitesAxiosInstance
    .put(purchaseOrderInvoice(purchaseOrderId), status)
    .then(handleResponse)
    .catch(handleError);

export const requestQuotation = async (purchaseOrderId, email) =>
  suitesAxiosInstance
    .post(requestQuotationEndpoint(purchaseOrderId), email)
    .then(handleResponse)
    .catch(handleError);

export const sendToSupplier = async (purchaseOrderId, email) =>
  suitesAxiosInstance
    .post(sendToSupplierEndpoint(purchaseOrderId), email)
    .then(handleResponse)
    .catch(handleError);

export const addDocumentToOrder = async (orderId, data) =>
  suitesAxiosInstance
    .put(addDocumentEndpoint(orderId), data)
    .then(handleResponse)
    .catch(handleError);

export const registerPayment = async (orderId, data) =>
  suitesAxiosInstance
    .put(addPaymentEndpoint(orderId), data)
    .then(handleResponse)
    .catch(handleError);

export const revertPayment = async (orderId, data) =>
  suitesAxiosInstance
    .put(revertPaymentEndpoint(orderId), data)
    .then(handleResponse)
    .catch(handleError);

// ################# Patients Endpoints
export const updatePatient = async (id, data) =>
  suitesAxiosInstance
    .put(patientEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const addProcedureToPatientCall = async (procedureAppointment) =>
  suitesAxiosInstance
    .post(addAppointmentToPatientEndPoint, procedureAppointment)
    .then(handleResponse)
    .catch(handleError);

export const createMedicalHistory = async (id, data) =>
  suitesAxiosInstance
    .post(addMedicalHistoryEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const getMedicalHistoryType = async (id) =>
  suitesAxiosInstance
    .get(getMedicalHistoryTypeEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const editMedicalHistory = async (id, data) =>
  suitesAxiosInstance
    .put(getMedicalHistoryTypeEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const createFamilyHistory = async (id, data) =>
  suitesAxiosInstance
    .post(addFamilyHistoryEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const editFamilyHistory = async (id, data) =>
  suitesAxiosInstance
    .put(editFamilyHistoryEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const deleteFamilyHistory = async (id, data) =>
  suitesAxiosInstance
    .post(deleteFamilyHistoryEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const getPatients = async (query, max, page) =>
  suitesAxiosInstance
    .get(allPatientsEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const getPatientbyId = async (id) =>
  suitesAxiosInstance
    .get(getPatientByIdEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updatePatientRisk = async (id, data) =>
  suitesAxiosInstance
    .put(updatePatientRiskEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);

export const deletePatient = async (data) =>
  suitesAxiosInstance
    .delete(deletePatientEndpoint, { data })
    .then(handleResponse)
    .catch(handleError);

// ################# Document Generation Endpoints

const credentials = Buffer.from(`${"devapiuser"}:${"openforme"}`).toString(
  "base64"
);
export const generateDocumentLink = async (data) =>
  documentGenerationInstance
    .post(createDocumentLink, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

export const uploadDocument = async (data) =>
  documentManagementInstance
    .post(documentUpload, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${credentials}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

export const getFiletData = async (id) =>
  documentManagementInstance
    .get(documentData(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);

export const getDocumentById = async (id) =>
  documentManagementInstance
    .get(documentById(id), { responseType: "blob" })
    .then(handleResponse)
    .catch(handleError);

// ################# Alerts Endpoints

export const getAlerts = async (status, max, page, query, from, to) =>
  suitesAxiosInstance
    .get(alertsEndpoint, { params: { status, max, page, query, from, to } })
    .then(handleResponse)
    .catch(handleError);

export const createAlert = async (data) =>
  suitesAxiosInstance
    .post(alertsEndpoint, data)
    .then(handleResponse)
    .catch(handleError);

export const closeAlert = async (id) =>
  suitesAxiosInstance
    .put(closeAlertEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const closeAllAlerts = async () =>
  suitesAxiosInstance
    .put(closeAllAlertsEndpoint)
    .then(handleResponse)
    .catch(handleError);

// ################# Configurations Endpoints

export const getConfigurations = async () =>
  suitesAxiosInstance
    .get(configEndpoint)
    .then(handleResponse)
    .catch(handleError);

export const updateBuffer = async (data) =>
  suitesAxiosInstance
    .put(updateBufferEndpoint, data)
    .then(handleResponse)
    .catch(handleError);

// ################# Invoices Endpoints
export const getInvoices = async (query, max, page, invoiceId) =>
  suitesAxiosInstance
    .get(invoicesEndpoint, { params: { query, max, page, invoiceId } })
    .then(handleResponse)
    .catch(handleError);

export const deleteInvoices = async (item) =>
  suitesAxiosInstance
    .put(invoicesEndpoint, item)
    .then(handleResponse)
    .catch(handleError);

export const getInvoiceById = async (id) =>
  suitesAxiosInstance
    .get(invoiceEndpoint(id))
    .then(handleResponse)
    .catch(handleError);

export const updateInvoiceDetails = async (invoiceId, data) =>
  suitesAxiosInstance
    .put(updateInvoiceDetailsEndpoint(invoiceId), data)
    .then(handleResponse)
    .catch(handleError);

// ################# Email Endpoint
export const sendEmail = async (body) =>
  suitesAxiosInstance
    .post(emailEndpoint, body)
    .then(handleResponse)
    .catch(handleError);

// ################# LIFESTYLES ENDPOINTS
export const getLifeStyles = async () =>
  suitesAxiosInstance
    .get(lifestylesEndpiont)
    .then(handleResponse)
    .catch(handleError);

export const addLifeStyleItems = async (id, data) =>
  suitesAxiosInstance
    .post(ItemsLifeStyleEndpiont(id), data)
    .then(handleResponse)
    .catch(handleError);

export const deleteLifeStyleItems = async (ids) =>
  suitesAxiosInstance
    .delete(DeleteLifeStyleitems, { data: { ids } })
    .then(handleResponse)
    .catch(handleError);

export const updateLifeStyleItems = async (id, data) =>
  suitesAxiosInstance
    .put(UpdateLifeStyleItems(id), data)
    .then(handleResponse)
    .catch(handleError);

export const getLifeStyleItems = async (query, max, page) =>
  suitesAxiosInstance
    .get(lifestyleItemsEndpiont, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const createPatientLifeStyle = async (data) =>
  suitesAxiosInstance
    .post(createPatientLifestyleEndpiont, data)
    .then(handleResponse)
    .catch(handleError);

export const deletePatientLifestyle = async (id) =>
  suitesAxiosInstance
    .delete(deletePatientLifestyleEndpiont(id))
    .then(handleResponse)
    .catch(handleError);

export const updatePatientLifestyle = async (id, data) =>
  suitesAxiosInstance
    .put(updatePatientLifestyleEndpiont(id), data)
    .then(handleResponse)
    .catch(handleError);

// ################# HEALTH INSURER ENDPOINTS

export const getHealthInsurers = async (query, max, page) =>
  suitesAxiosInstance
    .get(healthInsurerEndpoint, { params: { query, max, page } })
    .then(handleResponse)
    .catch(handleError);

export const createHealthInsurer = async (data) =>
  suitesAxiosInstance
    .post(healthInsurerEndpoint, data)
    .then(handleResponse)
    .catch(handleError);

export const deleteHealthInsurer = async (data) =>
  suitesAxiosInstance
    .put(healthInsurerEndpoint, data)
    .then(handleResponse)
    .catch(handleError);

export const updateHealthInsurer = async (id, data) =>
  suitesAxiosInstance
    .put(updateHealthInsurerEndpoint(id), data)
    .then(handleResponse)
    .catch(handleError);
