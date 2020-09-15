import React, {useContext, useState, useEffect, useRef} from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import InputField2 from '../common/Input Fields/InputField2';

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

const EditNameContainer = styled.View`
    flex : 1;
    flex-direction : column;
`;

const TextContainer = styled.View`
    height : 100px;
`;

const RecordText = styled.Text(({theme})=>({
    ...theme.font['--text-base-regular'],
    color : theme.colors['--color-gray-600'],
    marginBottom : 12
}));
 
function InventoryGroupGeneral({ 
    inventoryGroup = {}, 
    // onUpdate = () => {}, 
    fields = {}, 
    errorFields = {},
    onFieldChange = ()=>{}
 }){

    const baseStateRef = useRef();

    const { description = "", categories = [], name = ""} = inventoryGroup;
    const theme = useTheme();
    const modal = useModal();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    // const [isUpdated, setIsUpdated] = useState(false);

    // const [fields, setFields] = useState({
    //     description,
    //     name
    // });
    // const [errorFields, setErrorFields] = useState({});

    // useEffect(()=>{
    //     if(isUpdated && isEditMode === false){
    //         onFinishEdit();
    //     }
    // },[isEditMode])

    useEffect(() => {
        baseStateRef.current = {
            description,
            categories,
            name
        }
        return () => {
            baseStateRef.current = {}
        }
    }, [])


    // const onFieldChange = (fieldName) => (value) => {
    //     const updatedFields = {...fields}
    //     setFields({
    //         ...updatedFields,
    //         [fieldName]: value
    //     })
    //     setIsUpdated(true);
    //     // const updatedErrors = {...errorFields}
    //     // delete updatedErrors[fieldName]
    //     // setErrorFields(updatedErrors)

    // };

    const resetState = () => {
        setFields(baseStateRef.current);
        setIsUpdated(false);
    }

    // const onFinishEdit = () =>{
    //     let isValid = validateUpdate();

    //     if(!isValid){ return }

    //     goToConfirmationScreen();
    // }

    // const validateUpdate = () => {
    //     let isValid = true
    //     let requiredFields = ['name']
    
    //     let errorObj = {...errorFields} || {}

    //     for (const requiredField of requiredFields) {
    //         if(!fields[requiredField]){
    //             // console.log(`${requiredField} is required`)
    //             isValid = false
    //             errorObj[requiredField] = "Value is required.";
    //         }else{
    //             delete errorObj[requiredField]
    //         }
    //     }

    //     setErrorFields(errorObj)
    //     return isValid
    // }

    // const goToConfirmationScreen = () => {
    //     modal.openModal('ConfirmationModal',
    //         {
    //             content: <ConfirmationComponent
    //                 isEditUpdate = {true}
    //                 onCancel = {()=> {
    //                     modal.closeModals('ConfirmationModal');
    //                     setPageState({
    //                         ...pageState,
    //                         isEditMode : true
    //                     });
    //                 }}
    //                 onAction = {()=>updateInventoryGroup()}
    //                 message = "Do you want to save your changes?"
    //             />
    //             ,
    //             onClose: () => {modal.closeModals('ConfirmationModal')}
    //         })
    // }

    // const updateInventoryGroup = () => {
    //     let updatedGroup = {
    //         ...inventoryGroup,
    //         description : fields['description'],
    //         name : fields['name'],
    //     }
    //     updateInventoryGroupById(inventoryGroup?._id, updatedGroup)
    //         .then(data => {
    //             // addInventory(data)
    //             modal.closeAllModals();
    //             modal.openModal('ConfirmationModal',
    //             {
    //                 content: <ConfirmationComponent
    //                     isEditUpdate = {false}
    //                     isError = {false}
    //                     onCancel = {()=> modal.closeModals('ConfirmationModal')}
    //                     onAction = {()=> modal.closeModals('ConfirmationModal')}
    //                 />
    //                 ,
    //                 onClose: () => {modal.closeModals('ConfirmationModal')}
    //             })
    //         })
    //         .catch(error => {
    //             // todo handle error
    //             console.log("failed to update inventory group", error);
    //             modal.openModal('ConfirmationModal',
    //             {
    //                 content: <ConfirmationComponent
    //                     isEditUpdate = {false}
    //                     isError = {true}
    //                     onCancel = {()=> modal.closeModals('ConfirmationModal')}
    //                     onAction = {()=>modal.closeModals('ConfirmationModal')}
    //                 />
    //                 ,
    //                 onClose: () => {modal.closeModals('ConfirmationModal')}
    //             })
    //             // Alert.alert("Failed", "failed to create inventory group")
    //         })
    //         .finally(_=>{
    //             onUpdate();
    //         })
    //         // console.log("Save data: ", updatedGroup);
    //     // console.log("Group: ", inventoryGroup);
    // }

    return(
        <>
            <Row>
                {
                    isEditMode ?
                        <DescriptionContainer>
                            <RecordText theme = {theme}>Description</RecordText>
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

                {
                    isEditMode ?
                        <EditNameContainer>
                            <RecordText>Group Name</RecordText>
                            <InputField2
                                onChangeText={onFieldChange('name')}
                                value={fields['name']}
                                onClear={()=>onFieldChange('name')('')}
                                hasError = {errorFields['name']}
                                errorMessage = "Name must be provided."
                            />
                        </EditNameContainer>

                    :

                        <Record
                            recordTitle = "Group Name"
                            recordValue = {name}
                        />
                }
                
            </Row>
        </>
    )
}

export default InventoryGroupGeneral
