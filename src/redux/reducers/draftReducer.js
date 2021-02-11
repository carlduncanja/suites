import initialState from './initialState';
import {SAVE_DRAFT, DELETE_DRAFT} from '../actions/draftActions';

export default (state = initialState.draft, action) => {
    const {type, payload} = action;

    switch (type) {
        case SAVE_DRAFT: {
            const {data} = payload;

            // data here is an array of a single object; that unnecessary, fix at some point
            const draft = data.length ? data[0] : {};
            draft.isDraft = true;
            const draftId = draft.id;


            // check if draft id already exists in redux state, overwrite if so
            const exists = state.find(draft => draft.id === draftId);
            if (exists) {
                const drafts = [...state];
                const updatedDrafts = drafts.map(draft => data.find(d => d.id === draft.id) || draft);

                return [...updatedDrafts];
            }

            return [...state, ...data];
        }
        case DELETE_DRAFT: {
            const {data} = payload; // id to remove

            // remove draft from drafts array
            const updatedDrafts = state.filter(item => item.id !== data);

            return [...updatedDrafts];
        }
        default:
            return state;
    }
};
