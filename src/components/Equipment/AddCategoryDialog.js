import React, { useEffect, useState } from 'react';
import { useModal } from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import CreatePageHeader from '../common/DetailsPage/CreatePageHeader';
import CreatePreviousDoneFooter from '../common/DetailsPage/CreatePreviousDoneFooter';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import ConfirmationComponent from '../ConfirmationComponent';
import _ from "lodash";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { addEquipment } from '../../redux/actions/equipmentActions';

import { createEquipmentType, getCategories } from "../../api/network";

const PageWrapper = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${({ theme }) => theme.colors['--default-shade-white']}; 
`;
const TabsContainer = styled.View`
    height : 58px;
    justify-content : flex-end;
    background-color: ${({ theme }) => theme.colors['--color-gray-200']};
`;

const ContentWrapper = styled.View`
    height : 800px;
    padding : ${({ theme }) => theme.space['--space-28']};
`;
const ContentContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const FooterWrapper = styled.View`
    position : absolute;
    bottom: 0; 
    left : 0;
    right : 0;
`;

const Divider = styled.View`
    border-width : 1px;
    border-color : ${({ theme }) => theme.colors['--color-gray-300']};
    margin-top : ${({ theme }) => theme.space['--space-20']};
    margin-bottom : ${({ theme }) => theme.space['--space-32']};
`;


function AddCategoryDialog({ navigation, route }) {

    const { onCancel, onCreated } = route.params;
    const modal = useModal();
    const dialogTabs = ['Details'];
    const theme = useTheme();

    // ######### STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);

    const [fields, setFields] = useState({
        equipmentName: '',
        categoryType: ''
    });

    const [errorFields, setErrorFields] = useState({});

     // Category Search
     const [categorySearchValue, setCategorySearchValue] = useState();
     const [categorySearchResults, setCategorySearchResult] = useState([]);
     const [categorySearchQuery, setCategorySearchQuery] = useState({});

         // Handle category search
    useEffect(() => {

        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            fetchCategory()
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCategory, 300);

        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search() 

    }, [categorySearchValue]);

    const fetchCategory = () => {
        getCategories(categorySearchValue, 5)
            .then((data = []) => {
                setCategorySearchResult(data || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

    const onPositiveClick = () => {
        console.log("Clicked")
        let isValid = validateGroup()

        if (!isValid) { return }

        goToConfirmationScreen();
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = { ...fields }
        setFields({
            ...updatedFields,
            [fieldName]: value
        })


        const updatedErrors = { ...errorFields }
        delete updatedErrors[fieldName]
        setErrorFields(updatedErrors)

    };

    const validateGroup = () => {
        let isValid = true
        let requiredFields = ['equipment', 'category']

        let errorObj = { ...errorFields } || {}

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                // console.log(`${requiredField} is required`)
                isValid = false
                errorObj[requiredField] = "Value is required.";
            } else {
                delete errorObj[requiredField]
            }
        }

        setErrorFields(errorObj)
        console.log("Error obj: ", errorObj)

        return isValid
    }


    const goToConfirmationScreen = () => {
        setTimeout(() => {

            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={true}
                            onCancel={() => modal.closeModals('ConfirmationModal')}
                            onAction={onActionSave}
                            message="Do you want to save your changes?"
                        />
                        ,
                        onClose: () => { modal.closeModals('ConfirmationModal') }
                    })
        }, 200)
    };

    const onActionSave = () => {
        createGroupCall()
    };

    const errorScreen = () => {
        setTimeout(() => {
            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={true}
                            onCancel={() => modal.closeAllModals()}
                            message="There was an issue performing this action"
                        />
                        ,
                        onClose: () => { modal.closeModals('ConfirmationModal') }
                    })
        }, 200)
    }

    const createGroupCall = () => {
        // console.log("Fields: ", fields);
        const updatedFields = {
            ...fields
        }
        createEquipmentType(updatedFields)
            .then(data => {
                modal.closeAllModals();
                setTimeout(() => {
                    onCreated(data)
                }, 400);
            })
            .catch(error => {
                console.log("failed to create equipment group", error);
                errorScreen()
            })
            .finally()
    };

    const detailsTab = (

        <>

            <Row>
                <FieldContainer>
                    <InputField2
                        label={"Equipment"}
                        onChangeText={onFieldChange('equipmentName')}
                        value={fields['equipmentName']}
                        onClear={() => onFieldChange('equipmentName')('')}
                        hasError={errorFields['equipmentName']}
                        errorMessage="Equipment name must be filled."
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"category"}
                        onChangeText={onFieldChange('categoryType')}
                        value={fields['categoryType']}
                        onClear={() => onFieldChange('categoryType')('')}
                        hasError={errorFields['categoryType']}
                        errorMessage="category field must be filled."
                    />
                </FieldContainer>
            </Row>

        </>
    );

    return (

        <PageWrapper theme={theme}>

            <CreatePageHeader
                title="Create Item Group"
                onClose={onCancel}
            />

            <TabsContainer theme={theme}>
                <DialogTabs
                    tabs={['Details']}
                    tab={0}
                />
            </TabsContainer>

            <ContentWrapper theme={theme}>
                <ContentContainer>
                    {detailsTab}
                </ContentContainer>
            </ContentWrapper>

            <FooterWrapper>
                <CreatePreviousDoneFooter
                    onFooterPress={onPositiveClick}
                />
            </FooterWrapper>
        </PageWrapper>
    );


}

const mapDispatcherToProps = {
    addEquipment
};

export default connect(null, mapDispatcherToProps)(AddCategoryDialog);
