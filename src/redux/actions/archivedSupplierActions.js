export const SET_ARCHIVED_SUPPLIERS = "SET_ARCHIVED_SUPPLIERS";

export const SetArchivedSuppliers = (archivedSuppliers) => ({
    type: SET_ARCHIVED_SUPPLIERS,
    payload: {
        data: archivedSuppliers
    }
});