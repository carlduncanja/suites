import InitialState from "./initialState";
import { SAVE_DRAFT } from "../actions/draftActions";

export default (state = InitialState.draft, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_DRAFT: {
      const { data } = payload;
      return data;
    }
    default:
      return state;
  }
};
