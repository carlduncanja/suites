import React from 'react';


export const paginatorReducer = (state, action) => {
    switch(action.type){
        case 'GO_TO_PREVIOUS_PAGE':
            return state.currentPage !== 1 ? {
                ...state,
                currentPage: state.currentPage - 1,
                sliceArrayStart: state.sliceArrayStart - state.recordsPerPage,
                sliceArrayEnd: state.sliceArrayEnd - state.recordsPerPage
            } :
            {
                ...state
            }

            
        case 'GO_TO_NEXT_PAGE':
            return state.currentPage !== state.totalPages && {
                ...state,
                currentPage: state.currentPage + 1,
                sliceArrayStart: state.sliceArrayStart + state.recordsPerPage,
                sliceArrayEnd: state.sliceArrayEnd + state.recordsPerPage
            }
        case 'SET_TOTAL_PAGES':
            return {...state,totalPages:Math.ceil(action.listData.length/state.recordsPerPage)}
        default:
            return state
    }
}

