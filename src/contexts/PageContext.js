import {createContext} from 'react';

export const PageContext = createContext({
    isEditMode: false,
    setEditMode: () => {}
})

