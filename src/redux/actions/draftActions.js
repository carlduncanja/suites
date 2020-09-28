export const SAVE_DRAFT = 'SAVE_DRAFT';
export const DELETE_DRAFT = 'DELETE_DRAFT';

export const saveDraft = patientData => ({
    type: SAVE_DRAFT,
    payload: {data: patientData}
});

export const removeDraft = id => ({
    type: DELETE_DRAFT,
    payload: {data: id}
});
