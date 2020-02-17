import React, { useState, createContext } from 'react';

export const CaseFileContext = createContext()

export const CaseFileContextProvider = (props) => {
    const [bmiScale, setBmi] = useState(require('../assets/db.json').caseFiles.bmiScale)
    
    const state = {bmiScale}
    return (  
        <CaseFileContext.Provider value={{state}}>
            {props.children}
        </CaseFileContext.Provider>
    );
}
 


