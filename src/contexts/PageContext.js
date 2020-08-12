import {createContext} from 'react';

export const PageContext = createContext({
    pageState:
        {
            isEditMode: false,
            isLoading: false
        },
    setPageState: () => {
    }
})

