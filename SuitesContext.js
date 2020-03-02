import { createContext } from 'react';

export const initialState = {
    screenDimensions: {},
    tabSelected: { "tabSelected": "schedule", "status": true },

}

export const SuitesContext = createContext(initialState);