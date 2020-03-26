import React, { useState, useEffect, useContext } from 'react';
import Page from '../components/common/Page/Page';
import { connect } from 'react-redux';
import {setCaseFiles} from "../redux/actions/caseFilesActions";
import {getCaseFiles} from "../api/network";
import { SuitesContext } from '../contexts/SuitesContext';
import {appActions} from '../redux/reducers/suitesAppReducer';
import { transformToCamel } from '../hooks/useTextEditHook';

const listHeaders = require('../../assets/db.json').caseFiles.caseFilesInformation.headers

const CaseFiles = (props) => {
     // Redux props
    const { caseFiles,setCaseFiles,navigation} = props

    const [textInput, setTextInput] = useState("") 
    const [isFetchingCaseFiles, setFetchingCaseFiles] = useState(false)
    const [state, dispatch] = useContext(SuitesContext)
    const changeText = (text) =>{setTextInput(text)}
    const routeName = navigation.state.routeName
    
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
                    dispatch({
                        type: appActions.SETTOTALPAGES,
                        newState: {totalPages : Math.ceil(data.length/state.paginatorValues.recordsPerPage)}
                    });
                })
                .catch(error => {
                    console.log("failed to get case files", error);
                })
                .finally(_ => {
                    setFetchingCaseFiles(false)
                })
        }
    }, []);

    return (
        <Page
            isFetchingData = {isFetchingCaseFiles}
            placeholderText = {"Search by any heading or entry below"}
            changeText = {changeText}
            inputText = {textInput}
            routeName = {routeName}
            listData = {caseFiles}
            listHeaders = {listHeaders}
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
