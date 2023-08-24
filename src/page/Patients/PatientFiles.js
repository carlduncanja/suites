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
    const recordsPerPage = 10;


    // States
    const [searchValue, setSearchValue] = useState('');
    const [isFetchingPatients, setFetchingPatients] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    // pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    console.log('i am 83953h59hgjrk', currentPagePosition)

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchPatientFiles(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPatientFiles, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onSearchChange = input => {
        setSearchValue(input);
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {
                currentPage,
                currentListMin,
                currentListMax
            } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchPatientFiles(currentPage);
        }
    };


    const goToPreviousPage = () => {
        const {
            currentPage,
            currentListMin,
            currentListMax
        } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchPatientFiles(currentPage);
    };

    const fetchPatientFiles = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPagePosition)
        setFetchingPatients(true)

        getPatients(searchValue, 10, currentPosition)
            .then(patientResults => {
                const { data = [], pages = 0 } = patientResults
                if (pages === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                } else if (currentPosition === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(false);
                } else if (currentPosition === pages) {
                    setNextDisabled(true);
                    setPreviousDisabled(false);
                } else if (currentPosition < pages) {
                    setNextDisabled(false);
                    setPreviousDisabled(false);
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }
                setPatientData(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
                console.log("failed to get the data", error)
            })
            .finally(_ => {
                setFetchingPatients(false)
            })
    }
    const patientItem = item => {
        const {
            firstName,
            middleName,
            surname,
            gender,
            phones,
            trn
        } = item || {} 

       return(
        <> 
        <DataItem text={` ${firstName} ${middleName} ${surname}`}/>
        <DataItem text={gender}/>
        <DataItem text={8768957533}/>
        <DataItem text={trn} />
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
            changeText={onSearchChange}
            inputText={searchValue}
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

            totalPages={totalPages}
            currentPage={currentPagePosition}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            hasPaginator={true}
            hasActionButton={true}
            hasActions={true}
            isNextDisabled={isNextDisabled}
            isPreviousDisabled={isPreviousDisabled}
        />


    )

}

const mapStateToProps = state => {

}
const mapDispatcherToProp = {}

export default connect(mapStateToProps, mapDispatcherToProp)(PatientFiles)