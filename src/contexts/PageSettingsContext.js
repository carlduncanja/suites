import {createContext} from 'react';

export const PageSettingsContext = createContext({
    pageSettingState:
        {isDisabled: false, },
    setPageSettingState: () => {
    }
});
