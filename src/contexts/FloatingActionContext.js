import {createContext} from 'react';
import {emptyFn} from "../const";

export const PageContext = createContext({
    isDisabled: false,
    getFabAction: emptyFn
})

