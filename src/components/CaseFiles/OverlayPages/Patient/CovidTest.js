import React, {useContext, useState} from 'react';
import styled from '@emotion/native';
import {Text, View} from 'react-native';
import {MenuOption, MenuOptions} from 'react-native-popup-menu';
import Row from '../../../common/Row';
import Record from '../../../common/Information Record/Record';
import { PageContext } from '../../../../contexts/PageContext';

function CovidTest({testResult = 'Untested'}) {
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;
    const [covidResult, setCovidResult] = useState(testResult);

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
