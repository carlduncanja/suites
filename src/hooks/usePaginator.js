export const useNextPaginator = (currentPage, recordsPerPage, currentListMin, currentListMax ) => {
    return (
        {
            "currentPage":currentPage +1,
            "currentListMin" : currentListMin + recordsPerPage,
            "currentListMax": currentListMax + recordsPerPage
        }
    )
}

export const usePreviousPaginator = (currentPage, recordsPerPage, currentListMin, currentListMax ) => {
    return (
        {
            "currentPage":currentPage -1,
            "currentListMin" : currentListMin - recordsPerPage,
            "currentListMax": currentListMax - recordsPerPage
        }
    )
}