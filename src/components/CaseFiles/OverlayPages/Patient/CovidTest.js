import React, {useContext, useEffect, useState} from 'react';
import styled from '@emotion/native';
import {Text, View} from 'react-native';
import {MenuOption, MenuOptions} from 'react-native-popup-menu';
import Row from '../../../common/Row';
import Record from '../../../common/Information Record/Record';
import { PageContext } from '../../../../contexts/PageContext';
import { useSnackbar } from '../../../Snackbar/CustomSnackbarProvider';

function CovidTest({testResult = 'Untested'}) {
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;
    const snackBar = useSnackbar();
    const [covidResult, setCovidResult] = useState(testResult);

    useEffect(() => {
        let message;
        let isSuccess = false;
        if (testResult === 'Untested') {
            message = 'Patient has not been tested for covid. Update patient status after completing covid test.';
            isSuccess = true;
        } else if (testResult === 'Positive') {
            message = 'Patient has tested positive for covid-19. Follow safety measures to manage patient.';
        }
        snackBar.showSnackbar(message, 4000, null, isSuccess);
    }, []);

    return (
        <View style={{width: 196}}>
            <Row>
                <Record
                    recordTitle="Covid Test Results"
                    recordValue={covidResult}
                    editMode={isEditMode}
                    editable={true}
                    useDropdown={true}
                    onRecordUpdate={(res) => setCovidResult(res)}
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

export default CovidTest;
