import React, { useState, useEffect, useContext } from 'react';
import Page from '../components/common/Page/Page';
import { connect } from 'react-redux';
import {setCaseFiles} from "../redux/actions/caseFilesActions";
import {getCaseFiles} from "../api/network";
import { SuitesContext } from '../contexts/SuitesContext';
import {appActions} from '../redux/reducers/suitesAppReducer';
import { transformToCamel } from '../hooks/useTextEditHook';
import { useNextPaginator, usePreviousPaginator } from '../hooks/usePaginator';

const listHeaders = require('../../assets/db.json').caseFiles.caseFilesInformation.headers

const CaseFiles = (props) => {
     // Redux props
    const { caseFiles,setCaseFiles,navigation} = props

    const [textInput, setTextInput] = useState("") 
    const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false)
    const [state, dispatch] = useContext(SuitesContext)
    const changeText = (text) =>{setTextInput(text)}
    const routeName = navigation.state.routeName

    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 10;
    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [currentPageListMin, setCurrentPageListMin] = useState(0) 
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage) 

    useEffect(()=>{
        const floatingActions = require('../../assets/db.json').floatingActions.filter(actionsObj => actionsObj.page === transformToCamel(routeName))
        dispatch({
            type:appActions.SETFLOATINGACTIONS,
            newState: {
                actionTitle:floatingActions[0].actionTitle,
                actions:floatingActions[0].actions
            }
        })
    })
        
    useEffect(() => {
        if (!caseFiles.length) {
            setFetchingCaseFiles(true);
            getCaseFiles()
                .then(data => {
                    setCaseFiles(data);
                    setTotalPages(Math.ceil(data.length/recordsPerPage))
                    // dispatch({
                    //     type: appActions.SETTOTALPAGES,
                    //     newState: {totalPages : Math.ceil(data.length/state.paginatorValues.recordsPerPage)}
                    // });
                })
                .catch(error => {
                    console.log("failed to get case files", error);
                })
                .finally(_ => {
                    setFetchingCaseFiles(false)
                })
        }
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages){
            let {currentPage,currentListMin,currentListMax} = useNextPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin)
            setCurrentPageListMax(currentListMax)
        }
    }

    const goToPreviousPage = () =>{
        let {currentPage,currentListMin,currentListMax} = usePreviousPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin)
        setCurrentPageListMax(currentListMax)
    }

    return (
        <Page
            isFetchingData = {isFetchingCaseFiles}
            placeholderText = {"Search by any heading or entry below"}
            changeText = {changeText}
            inputText = {textInput}
            routeName = {routeName}
            listData = {caseFiles}
            listHeaders = {listHeaders}
            totalPages = {totalPages}
            currentPagePosition = {currentPagePosition}
            currentPageListMin = {currentPageListMin}
            currentPageListMax = {currentPageListMax}
            goToNextPage = {goToNextPage}
            goToPreviousPage = {goToPreviousPage}
        />
    );
}

const mapStateToProps = (state) => ({
    caseFiles: state.caseFiles
});

const mapDispatcherToProp = {
    setCaseFiles
};


export default connect(mapStateToProps, mapDispatcherToProp) (CaseFiles);
