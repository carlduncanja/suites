import React, { useState, useEffect } from "react";
import Page from "./Page";
import Footer from "./Footer";
import styled from "@emotion/native";
import { RECORDS_PER_PAGE } from "../../../const";
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

    fetchSectionDataCb, // returns the data and the number of pages;
    hasActionButton = true,
    hasActions = true,
    hasPaginator = true,
    isDisabled = false,
    toggleActionButton = () => {},
}) {
    const [isFetchingData, setFetchingData] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [areArrowsDisabled, setAreArrowsDisabled] = useState({
        left: true,
        right: true,
    });

    const isLeftArrowDisabled = (nextPage) => nextPage === 1;

    const isRightArrowDisabled = (nextPage) => {
        return nextPage === totalPages;
    };

    const onPressPageNumber = async (nextPage) => {
        setCurrentPage(nextPage);
        setAreArrowsDisabled({
            left: isLeftArrowDisabled(nextPage),
            right: isRightArrowDisabled(nextPage),
        });
        fetchSectionDataWrapper(nextPage);
    };

    const onPressRightButton = async () => {
        if (!(currentPage < totalPages)) return;
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setAreArrowsDisabled({
            left: isLeftArrowDisabled(nextPage),
            right: isRightArrowDisabled(nextPage),
        });
        fetchSectionDataWrapper(nextPage);
    };

    const onPressLeftButton = async () => {
        if (currentPage === 1) return;

        const nextPage = currentPage - 1;
        setCurrentPage(nextPage);
        setAreArrowsDisabled({
            left: isLeftArrowDisabled(nextPage),
            right: isRightArrowDisabled(nextPage),
        });
        fetchSectionDataWrapper(nextPage);
    };

    const fetchSectionDataWrapper = async (page) => {
        setFetchingData(true);
        return fetchSectionDataCb(page)
            .then(({ pages, data }) => {
                if (data.length > 0) {
                    setTotalPages(pages);
                }
                return { pages, data };
            })
            .catch((error) => {
                console.error(`Failed to get data for ${routeName} `, error);
                setTotalPages(1);
                setAreArrowsDisabled({ left: true, right: true });
            })
            .finally(() => {
                setFetchingData(false);
            });
    };

    /** Initial fetch */
    useEffect(() => {
        if (!listData.length) {
            fetchSectionDataWrapper(currentPage).then(({ pages }) => {
                if (pages > 1)
                    setAreArrowsDisabled((flags) => ({
                        ...flags,
                        right: false,
                    }));
            });
        } else {
            setTotalPages(Math.ceil(listData.length / RECORDS_PER_PAGE));
        }
    }, [routeName]);

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
                    isNextDisabled={areArrowsDisabled.right}
                    isPreviousDisabled={areArrowsDisabled.left}
                    onPressPageNumber={onPressPageNumber}
                    toggleActionButton={toggleActionButton}
                    totalPages={totalPages}
                />
            </NavPageContainer>
        </NavPageWrapper>
    );
}

export default PaginatedSection;
