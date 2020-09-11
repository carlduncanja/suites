import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';

import styled, { css } from '@emotion/native'; 
import { useTheme } from 'emotion-theming'; 
import { PageContext } from '../../contexts/PageContext';
import { updateInventoryGroupById } from '../../api/network';
import TextArea from '../common/Input Fields/TextArea';
import ConfirmationComponent from '../ConfirmationComponent';
import { useModal } from 'react-native-modalfy';

const DescriptionContainer = styled.View`
    flex : 0.8;
`;

const TextContainer = styled.View`
    height : 100px;
`;

const DescriptionText = styled.Text(({theme})=>({
    ...theme.font['--text-base-regular'],
    color : theme.colors['--color-gray-600'],
    marginBottom : 12
}));

function InventoryGroupGeneral({ inventoryGroup = {}, onUpdate = () => {} }){

    const { description = "", categories = []} = inventoryGroup;
    const theme = useTheme();
    const modal = useModal();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    const [isUpdated, setIsUpdated] = useState(false);

    const [fields, setFields] = useState({
        'description' : description
    });

    useEffect(()=>{
        if(isUpdated && isEditMode === false){
            goToConfirmationScreen();
        }
    },[isEditMode])

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })
        setIsUpdated(true);
        // const updatedErrors = {...errorFields}
        // delete updatedErrors[fieldName]
        // setErrorFields(updatedErrors)

    };

    const goToConfirmationScreen = () => {
        modal.openModal('ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate = {true}
                    onCancel = {()=> {
                        modal.closeModals('ConfirmationModal');
                        setPageState({
                            ...pageState,
                            isEditMode : true
                        });
                    }}
                    onAction = {()=>updateInventoryGroup()}
                    message = "Do you want to save your changes?"
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')} 
            })
    }

    const updateInventoryGroup = () => {
        let updatedGroup = {
            ...inventoryGroup,
            description : fields['description'],
        }
        updateInventoryGroupById(inventoryGroup?._id, updatedGroup)
            .then(data => {
                // addInventory(data)
                modal.closeAllModals();
                modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate = {false}
                        isError = {false}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=> modal.closeModals('ConfirmationModal')}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')} 
                })
            })
            .catch(error => {
                // todo handle error
                console.log("failed to update inventory group", error);
                modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate = {false}
                        isError = {true}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=>modal.closeModals('ConfirmationModal')}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')} 
                })
                // Alert.alert("Failed", "failed to create inventory group")
            })
            .finally(_=>{
                onUpdate()
            })
            // console.log("Save data: ", updatedGroup);
        // console.log("Group: ", inventoryGroup);
    }

    return(
        <>
            <Row>
                {
                    isEditMode ?
                        <DescriptionContainer>
                            <DescriptionText theme = {theme}>Description</DescriptionText>
                            <TextContainer>
                                <TextArea
                                    onChangeText={onFieldChange('description')}
                                    value={fields['description']}
                                    multiline={true}
                                    numberOfLines={4}
                                    onClear={() => onFieldChange('description')('')}
                                />
                            </TextContainer>
                            
                        </DescriptionContainer>
                        :
                        <Record
                            recordTitle = "Description"
                            recordValue = {description}
                            flex = {0.8}
                        />
                }
                
            </Row>

            <Row>
                <ListTextRecord
                    recordTitle = "Category"
                    values = {categories}
                />
            </Row>
        </>
    )
}

export default InventoryGroupGeneral
