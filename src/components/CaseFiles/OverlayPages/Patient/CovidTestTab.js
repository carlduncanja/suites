import React, {useContext, useEffect, useState} from 'react';
import styled from '@emotion/native';
import {Text, View} from 'react-native';
import {MenuOption, MenuOptions} from 'react-native-popup-menu';
import Row from '../../../common/Row';
import Record from '../../../common/Information Record/Record';
import {PageContext} from '../../../../contexts/PageContext';
import {useSnackbar} from '../../../Snackbar/CustomSnackbarProvider';
import {updatePatient} from "../../../../api/network";
import ConfirmationComponent from "../../../ConfirmationComponent";
import {useModal} from "react-native-modalfy";


const DEFAULT_COVID_RESULTS = {
    testResults: 'Untested'
}

function CovidTestTab({patientId, covidResults = DEFAULT_COVID_RESULTS, onPatientUpdated}) {

    const modal = useModal();
    const snackBar = useSnackbar();
    const INITIAL_COVID_STATE = {...covidResults};


    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;
    const [isUpdated, setUpdated] = useState(false);
    const [covidResult, setCovidResult] = useState(covidResults);

    useEffect(() => {
        let message;
        let isSuccess = false;
        const testResults = covidResults.testResults;

        console.log('covid test: ', testResults);

        if (testResults === 'Untested') {
            message = 'Patient has not been tested for covid. Update patient status after completing covid test.';
            isSuccess = true;
        } else if (testResults === 'Positive') {
            message = 'Patient has tested positive for covid-19. Follow safety measures to manage patient.';
        }
        snackBar.showSnackbar(message, 4000, null, isSuccess);


    }, []);


    useEffect(() => {

        // if finished editing, persist changes.
        if (!isEditMode && isUpdated) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            setCovidResult(INITIAL_COVID_STATE)
                            setUpdated(false);
                            modal.closeAllModals()
                        }}
                        onAction={() => {
                            persistChanges()
                            modal.closeModal('ConfirmationModal')
                        }}
                        message="Would you like to save changes?"//general message you can send to be displayed
                        action="Yes"
                    />
                )
            })

        }
    }, [isEditMode])

    const onCovidResultsUpdate = (field, value) => {
        setUpdated(true);
        setCovidResult({
            ...covidResult,
            [field]: value
        })
    }

    const persistChanges = () => {
        updatePatient(patientId, {covid: covidResult})
            .then(data => {
                setUpdated(false);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                onPatientUpdated()
                                modal.closeAllModals();
                            }}
                            message="Successfully Updated Covid Results"//general message you can send to be displayed
                            action="Yes"
                        />
                    )
                })
            })
            .catch(error => {
                console.log('Failed to update patients covid records')
            })
    }

    return (
        <View style={{width: 196}}>
            <Row>
                <Record
                    recordTitle="Covid Test Results"
                    recordValue={covidResult?.testResults}
                    editMode={isEditMode}
                    editable={true}
                    useDropdown={true}
                    onRecordUpdate={(res) => onCovidResultsUpdate('testResults', res)}
                    options={(
                        <MenuOptions>
                            <MenuOption value="Untested" text="Untested"/>
                            <MenuOption value="Negative" text="Negative"/>
                            <MenuOption value="Positive" text="Positive"/>
                        </MenuOptions>
                    )}
                />
            </Row>
        </View>

    );
}

export default CovidTestTab;
