import React, { useContext} from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Card from '../../../common/CardList/Card';
import { currencyFormatter } from '../../../../utils/formatter'; 
import Record from '../../../common/Information Record/Record';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Row from '../../../common/Row';
import FrameInsuranceCard from '../../../common/Frames/FrameCards/FrameInsuranceCard';
import Table from '../../../common/Table/Table';
import DataItem from '../../../common/List/DataItem';
import ListItem from '../../../common/List/ListItem';
import {PageContext} from '../../../../contexts/PageContext';
import {useModal} from 'react-native-modalfy';
import NewProcedureOverlayContainer from '../../../../page/Schedule/SchedulePage/NewProcedureOverlayContainer';
import ConfirmationComponent from '../../../ConfirmationComponent';

const Insurance = ({tabDetails}) => { 
    const theme = useTheme();
    const modal = useModal();
    const {name, coverageLimit, policyNumber, procedures} = tabDetails
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const InsuranceWrapper = styled.View`
        width: 100%;
        height: 100%;
    `;
    const InsuranceContainer = styled.View`
        width: 100%;
        height: 30%;
    `;

    const Divider = styled.View`
        height : 1px;
        width : 100%;
        background-color: ${theme.colors['--color-gray-400']};
        border-radius : 2px;
        margin-bottom : ${theme.space['--space-20']};
    `;

    const PreAuthorization = styled.View`
    flex: 1;
`;

const Headers = [
    {
        name: 'Procedure',
        alignment: 'flex-start',
        flex: 2
    },
    {
        name: 'Physician',
        alignment: 'flex-start',
        flex: 1.5
    },
    {
        name: 'Status',
        alignment: 'flex-start',
        flex: 1,
    }
];
const ListItemWrapper = styled.View`
    display: flex;
    flex-direction: row;
`;

const archivedItemFormat = item => (
    <ListItemWrapper>
        <DataItem flex={2} align="flex-start" text={item?.procedure?.name}  fontStyle="--text-base-regular"/>
        <DataItem flex={1.5} align="flex-start" text={item?.appointment?.subject} color="--color-blue-600" fontStyle="--text-base-regular"/>
        <DataItem flex={1} align="flex-start" text={"Pending"} color="--color-red-700" fontStyle="--text-base-regular"/>
    </ListItemWrapper>
);

const PreAuthTitle = styled.Text(({theme}) => ({
    ...theme.font['--text-xl-medium'],
    color: theme.colors['--color-gray-800'],
    marginBottom: 24,
}));

const handleProcedurePress = item => () => {
    console.log('Report Item: ', item);
    modal.openModal('BottomSheetModal', {
        content: <NewProcedureOverlayContainer />,
        initialSnap: 2,
        snapPoints: [650, 500, 0]
    });

    modal.openModal('ConfirmationModal', {
        content: (
            <ConfirmationComponent
                isWarning={true}
                onCancel={() => {
                    modal.closeAllModals();
                }}
                onAction={() => {
                    modal.closeAllModals();
                    // updateAlerts();
                }}
            />
        ),
        onClose: () => {
            modal.closeAllModals();
        },
    });
};


const renderListFn = item => (
    <ListItem
        hasCheckBox={false}
        onItemPress={handleProcedurePress(item)}
        itemView={archivedItemFormat(item)}
    />
);

    return(
        <InsuranceWrapper>
            <InsuranceContainer>
                <FrameInsuranceCard insuranceDetails = {tabDetails}/>
            </InsuranceContainer>
            <PreAuthorization>
                <PreAuthTitle>Pre-Authorizations</PreAuthTitle>
                    <Table
                    isCheckbox={false}
                    data={procedures}
                    listItemFormat={!isEditMode ? archivedItemFormat : renderListFn}
                    headers={Headers}
                    // toggleHeaderCheckbox={toggleHeaderCheckbox}
                    // itemSelected={checkBoxList}
                    />
            </PreAuthorization>
        </InsuranceWrapper>
    )
}
 
export default Insurance;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom:15
    },

    titleText: {
        fontSize: 25,
        fontWeight: 'normal',
        marginBottom: 10
      },
})