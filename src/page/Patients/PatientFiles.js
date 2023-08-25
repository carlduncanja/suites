import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import { useModal } from 'react-native-modalfy';
import moment from 'moment';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ListItem from '../../components/common/List/ListItem';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import ActionItem from '../../components/common/ActionItem';
import AddIcon from '../../../assets/svg/addIcon';
import ArchiveIcon from '../../../assets/svg/archiveIcon';
import DraftItem from '../../components/common/List/DraftItem';

import { setCaseFiles } from '../../redux/actions/caseFilesActions';
import { deleteCaseFile, getCaseFiles, removeCaseFiles, removeCaseFilesId } from '../../api/network';

import {
    useNextPaginator,
    usePreviousPaginator,
    selectAll,
    checkboxItemPress, handleUnauthorizedError,
} from '../../helpers/caseFilesHelpers';
import { currencyFormatter, formatDate } from '../../utils/formatter';

import NavPage from '../../components/common/Page/NavPage';
import DataItem from '../../components/common/List/DataItem';
import MultipleTextDataItem from '../../components/common/List/MultipleTextDataItem';
import { emptyFn, LONG_PRESS_TIMER } from "../../const";
import { PageSettingsContext } from '../../contexts/PageSettingsContext';
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import { removeDraft } from "../../redux/actions/draftActions";
import Button from '../../components/common/Buttons/Button';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { userPassword } from '../../const/suitesEndpoints';
import { getPatients, deletePatient, } from '../../api/network';
import patient from '../../../assets/svg/newCasePatient';
const ButtonContainer = styled.View`
    width: 105px;
    height: 26px;
    border: 1px solid #A0AEC0;
    box-sizing: border-box;
    border-radius: 6px;
    padding-top: 2px;
`;

const listHeaders = [
    {
        name: 'Name',
        aligment: 'flex-start'
    },
    {
        name: 'Gender',
        aligment: 'flex-start'
    },
    {
        name: "Contact #",
        aligment: 'flex-start'
    },
    {
        name: 'TRN',
        aligment: "flex-start"
    }
]

function PatientFiles(props) {
    //######## const
    const modal = useModal();
    const theme = useTheme();


    // States
    const [isFetchingPatients, setFetchingPatients] = useState(false);
    const [patientData, setPatientData] = useState([])

    //pagination
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(() => {
        fetchPatientFiles(1)
    }, [])



    const fetchPatientFiles = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPagePosition)
        setFetchingPatients(true)

        getPatients('', 10, 1)
            .then(patientResults => {
                const { data = [], pages = 0 } = patientResults
                setPatientData(data)
                console.log("the data for real ", data)
            })
            .catch(error => {
                console.log("failed to get the data", error)
            })
            .finally(_ => {
                setFetchingPatients(false)
            })
    }
    const patientItem = item => {
        const {
            firstName,
            middleName ,
            surname,
            gender,
            phones,
            trn
        } = item || {} 
        
        const genderLetter= gender == 'Male' ? "M" : "F"
       //const phone = phones[1].
       return(
        <> 
        <DataItem text={` ${firstName} ${middleName} ${surname}`}/>
        <DataItem text={genderLetter}  color={"--color-blue-700"}/>
        <DataItem text={8768957533} color={"--color-blue-700"}/>
        <DataItem text={trn} color={"--color-blue-700"}/>
        </>
       )
    }
    const renderFn = item => {
        return <>

            <ListItem
                hasCheckBox={true}
                itemView={patientItem(item)}

            />
        </>

    }

    return (

        <NavPage
            isFetchingData={isFetchingPatients}
            routeName='Patients'
            placeholderText="Search Patient by name"
            listData={patientData}
            listItemFormat={renderFn}
            TopButton={() => (
                <ButtonContainer theme={theme}>
                    <Button
                        title="Archives"
                        color={theme.colors['--color-gray-500']}
                        font="--text-sm-regular"
                        buttonPress={console.log("gaza will rain")}
                    />
                </ButtonContainer>)}
            listHeaders={listHeaders}
        />


    )

}

const mapStateToProps = state => {

}
const mapDispatcherToProp = {}

export default connect(mapStateToProps, mapDispatcherToProp)(PatientFiles)