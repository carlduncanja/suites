export const SAVE_DRAFT = "SAVE_DRAFT";

export const saveDraft = (patientData) => ({
  type: SAVE_DRAFT,
  payload: {
    data: patientData,
  },
});
