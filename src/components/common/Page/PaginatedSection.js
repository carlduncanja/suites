import React, { useState, useEffect } from "react";
import Page from "./Page";
import Footer from "./Footer";
import styled from "@emotion/native";
const NavPageWrapper = styled.View`
    width: 100%;
`;
const NavPageContainer = styled.View`
    display: flex;
    align-items: "center";
`;

/**
 * @typedef SectionDataAndPages
 * @property {Array} data
 * @property {number} pages
 */

/**
 * @callback getSectionDataCb
 * @returns {SectionDataAndPages}
 */

/**
 * @callback VoidCallback
 * @returns {void}
 */

/**
 * @callback JSXCallback
 * @returns {JSX.Element}
 */

/**
 * @typedef {PageProps & FooterProps} NavPageProps
 */

/**
 *
 * @param {NavPage} props
 * @returns {JSX.Element}
 */
function PaginatedSection({
    changeText = () => {},
    emptyTitle,
    hasEmpty = false,
    hasList,
    inputText = "",
    itemsSelected = [],
    listData = [],
    listHeaders = [],
    listItemFormat = () => {},
    navigation,
    onRefresh = () => {},
    onSelectAll = () => {},
    placeholderText = "", //for what?
    routeName = "",
    TopButton = null,

    sectionRecords = [],
    fetchSectionDataCb, // returns the data and the number of pages;
    hasActionButton = true,
    hasActions = true,
    hasPaginator = true,
    isDisabled = false,
    toggleActionButton = () => {},
}) {
    const recordsPerPage = 12;

    const [isFetchingData, setFetchingData] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] =
        useState(recordsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRightArrowDisabled, setIsRightArrowDisabled] = useState(false);
    const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useState(true);

    const isLArrowDisabled = (pages) =>
        !(currentPage === pages || currentPage < pages);

    const isRArrowDisabled = (pages) =>
        !(currentPage === 1 || currentPage < pages);

    const onPressRightButton = () => {
        if (currentPage < totalPages) {
            const {
                currentPage: nextPage,
                currentListMin: nextListMin,
                currentListMax: nextListMax,
            } = useNextPaginator(
                currentPage,
                recordsPerPage,
                currentPageListMin,
                currentPageListMax
            );
            setCurrentPage(nextPage);
            setCurrentPageListMin(nextListMin);
            setCurrentPageListMax(nextListMax);
            fetchSectionDataCb(nextPage);
        }
    };

    const onPressLeftButton = () => {
        if (currentPage === 1) return;

        const {
            currentPage: nextPage,
            currentListMin: nextListMin,
            currentListMax: nextListMax,
        } = usePreviousPaginator(
            currentPage,
            recordsPerPage,
            currentPageListMin,
            currentPageListMax
        );
        setCurrentPage(nextPage);
        setCurrentPageListMin(nextListMin);
        setCurrentPageListMax(nextListMax);
        fetchSuppliersData(nextPage);
    };

    /** Initial fetch */
    useEffect(() => {
        if (!sectionRecords.length) {
            setFetchingData(true);
            fetchSectionDataCb(currentPage)
                .then(({ pages, data }) => {
                    if (data.length > 0) setTotalPages(pages);
                    setIsLeftArrowDisabled(isLArrowDisabled(pages));
                    setIsRightArrowDisabled(isRArrowDisabled(pages));
                })
                .catch((error) => {
                    console.error(
                        `Failed to get data for ${routeName} `,
                        error
                    );
                    setTotalPages(1);
                    setIsLeftArrowDisabled(true);
                    setIsRightArrowDisabled(true);
                })
                .finally(() => {
                    setFetchingData(false);
                });
        } else {
            setTotalPages(Math.ceil(sectionRecords.length / recordsPerPage));
        }
    }, []);

    useEffect(() => {}, [sectionRecords]);

    return (
        <NavPageWrapper>
            <NavPageContainer>
                <Page
                    changeText={changeText}
                    emptyTitle={emptyTitle}
                    hasEmpty={hasEmpty}
                    hasList={hasList}
                    inputText={inputText}
                    isFetchingData={isFetchingData}
                    itemsSelected={itemsSelected}
                    listData={listData}
                    listHeaders={listHeaders}
                    listItemFormat={listItemFormat}
                    navigation={navigation}
                    onRefresh={onRefresh}
                    onSelectAll={onSelectAll}
                    placeholderText={placeholderText}
                    routeName={routeName}
                    TopButton={TopButton}
                />

                <Footer
                    currentPage={currentPage}
                    goToNextPage={onPressRightButton}
                    goToPreviousPage={onPressLeftButton}
                    hasActionButton={hasActionButton}
                    hasActions={hasActions}
                    hasPaginator={hasPaginator}
                    isDisabled={isDisabled}
                    isNextDisabled={isRightArrowDisabled}
                    isPreviousDisabled={isLeftArrowDisabled}
                    toggleActionButton={toggleActionButton}
                    totalPages={totalPages}
                />
            </NavPageContainer>
        </NavPageWrapper>
    );
}

export default PaginatedSection;
