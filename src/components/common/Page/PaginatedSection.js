import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import { RECORDS_PER_PAGE_MAIN } from "../../../const";
import Footer from "./Footer";
import Page from "./Page";
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
 * @typedef {Object} PagSectionProps
 * @extends import("./Footer").FooterProps
 * @extends import("./Page").PageProps
 */

/**
 *
 * @param {PagSectionProps} props
 * @returns {JSX.Element}
 */
function PaginatedSection({
    changeText = () => {},
    emptyTitle,
    inputText = "",
    itemsSelected = [],
    listData = [],
    listHeaders = [],
    listItemFormat = () => {},
    navigation,
    onRefresh = () => {},
    onSelectAll = () => {},
    placeholderText = "",
    routeName = "",
    TopButton = null,

    currentPage,
    setCurrentPage,
    fetchSectionDataCb,
    hasActionButton = true,
    hasActions = true,
    hasPaginator = true,
    isDisabled = false,
    isFetchingData,
    toggleActionButton = () => {},
}) {
    const [totalPages, setTotalPages] = useState(1);
    const [areArrowsDisabled, setAreArrowsDisabled] = useState({
        left: true,
        right: true,
    });

    const isLeftArrowDisabled = (nextPage) => nextPage === 1;

    const isRightArrowDisabled = (nextPage) => nextPage === totalPages;

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
            });
    };

    useEffect(() => {
        fetchSectionDataWrapper(currentPage).then(({ pages }) => {
            if (pages > 1)
                setAreArrowsDisabled((flags) => ({
                    ...flags,
                    right: false,
                }));
        });
        setTotalPages(Math.ceil(listData.length / RECORDS_PER_PAGE_MAIN));
    }, [routeName]);

    return (
        <NavPageWrapper>
            <NavPageContainer>
                <Page
                    changeText={changeText}
                    emptyTitle={emptyTitle}
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
