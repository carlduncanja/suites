import React,{ useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import Row from "../common/Row";
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import { formatDate } from "../../utils/formatter"; 
import { formatAmount } from "../../helpers/caseFilesHelpers";
import { transformToSentence } from "../../hooks/useTextEditHook";
import DateInputField from '../common/Input Fields/DateInputField';
import LineDivider from "../common/LineDivider";
import styled, {css} from '@emotion/native'; 
import {useTheme} from 'emotion-theming'; 
import { PageContext } from "../../contexts/PageContext";
import ConfirmationComponent from '../ConfirmationComponent';
import { updatePurchaseOrder } from '../../api/network';
import {useModal} from "react-native-modalfy";
import FieldContainer from "../common/FieldContainerComponent";


const LineDividerContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;




const OrderDetailsTab = ({order = {}, onUpdate, fields = {}, onFieldChange = ()=>{} }) =>{ 

    const theme = useTheme();
    const modal = useModal();
    const baseStateRef = useRef();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const {
        orderDate = "",
        deliveryDate = "",
        customRepeatingFrequency = "",
        nextOrderDate = "",
        repeating = false,
        repeatingType = "",
        status  = "",
        total = 0,
        supplier = {},
        invoice = "",
        storageLocation = {},
        type = "",
        configStatus = "",
        approvedBy =  "",
        receivedBy = "",
        requestedBy = ""
    } = order

    // console.log("Order: ",deliveryDate)

    const { description = "", representatives = [] } = supplier;
    const { name = "" } = storageLocation;

    const [isUpdated, setUpdated] = useState(false)

    // const onFieldChange = (fieldName) => (value) => {
    //     setFields({
    //         ...fields,
    //         [fieldName]: value
    //     })
    //     setUpdated(true)
    //     console.log("Field name and value: ", fieldName, value);
    // };

    useEffect(() => {
        baseStateRef.current = {
            description,
            deliveryDate
        }
        return () => {
            baseStateRef.current = {}
        }
    }, []);

    // useEffect(() => {
    //     if (isUpdated && !isEditMode) {
    //         modal.openModal('ConfirmationModal', {
    //             content: (
    //                 <ConfirmationComponent
    //                     error={false}//boolean to show whether an error icon or success icon
    //                     isEditUpdate={true}
    //                     onCancel={() => {
    //                         // resetState()
    //                         setPageState({...pageState, isEditMode: true})
    //                         modal.closeAllModals();
    //                     }}
    //                     onAction={() => {
    //                         modal.closeAllModals();
    //                         updatePO();
    //                     }}
    //                     message="Do you want to save changes?"//general message you can send to be displayed
    //                     action="Yes"
    //                 />
    //             ),
    //             onClose: () => {
    //                 console.log('Modal closed');
    //             },
    //         });
    //     }
    // },[isEditMode])

    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    };

    // const updatePO = () =>{
    //     const data = {
    //         ...order,
    //         description : fields['description'],
    //         deliveryDate : fields['deliveryDate'],
    //     };

    //     console.log("Data: ", order?._id, data);

    //     // updatePurchaseOrder(order?._id, data)
    //     //     .then( _ => {
    //     //         console.log("Updated: ")
    //     //         onUpdate()
    //     //         modal.openModal('ConfirmationModal', {
    //     //             content: (
    //     //                 <ConfirmationComponent
    //     //                     error={false}//boolean to show whether an error icon or success icon
    //     //                     isEditUpdate={false}
    //     //                     onCancel={() => {
    //     //                         modal.closeAllModals();
    //     //                     }}
    //     //                     onAction={() => {
    //     //                         modal.closeAllModals();
    //     //                     }}
    //     //                     message="Changes were successful."//general message you can send to be displayed
    //     //                     action="Yes"
    //     //                 />
    //     //             ),
    //     //             onClose: () => {
    //     //                 console.log('Modal closed');
    //     //             },
    //     //         });
    //     //     })
    //     //     .catch(error => {
    //     //         console.log("Failed to update order", error)
    //     //         modal.openModal('ConfirmationModal', {
    //     //             content: (
    //     //                 <ConfirmationComponent
    //     //                     error={true}//boolean to show whether an error icon or success icon
    //     //                     isEditUpdate={false}
    //     //                     onCancel={() => {
    //     //                         modal.closeAllModals();
    //     //                     }}
    //     //                     onAction={() => {
    //     //                         modal.closeAllModals();
    //     //                         resetState()
    //     //                     }}
    //     //                     message="Something went wrong when applying changes."//general message you can send to be displayed
    //     //                     action="Yes"
    //     //                 />
    //     //             ),
    //     //             onClose: () => {
    //     //                 console.log('Modal closed');
    //     //             },
    //     //         });
    //     //     })
    //     //     .finally(_ => {
    //     //         // setLoading(false)
    //     //     })
    // }

    return (
        <>
            
            <Row>
                <Record
                    recordTitle = "Description"
                    recordValue  = {fields['description']}
                    editMode = {isEditMode}
                    editable = {true}
                    useTextArea = {true}
                    onRecordUpdate = {onFieldChange('description')}
                    onClearValue = {()=>{onFieldChange('description')('')}}
                    
                />
            </Row>

            <Row>
                <ResponsiveRecord
                    recordTitle = "Invoice"
                    recordValue = {invoice || ""}
                />

                <Record
                    recordTitle = "Order Total"
                    recordValue = {formatAmount(total) || 0}
                />

                <Record
                    recordTitle = "Status"
                    recordValue = {transformToSentence(status) || ""}
                />
            </Row>

            <Row>
                <Record
                    recordTitle = "Ordered On"
                    recordValue = {formatDate(nextOrderDate, "DD/MM/YYYY") || "--"}
                />
                
                
                <Record
                    recordTitle = "Delivered On"
                    recordValue = {isEditMode ? fields['deliveryDate'] : formatDate(deliveryDate,'DD/MM/YYYY') }
                    editMode = {isEditMode}
                    editable = {true}
                    useDateField = {true}
                    onClearValue = {()=>{onFieldChange('deliveryDate')('')}}
                    onRecordUpdate = {(date)=>{onFieldChange('deliveryDate')(date) }}
               />

                <ResponsiveRecord
                    recordTitle = "Storage Location"
                    recordValue = {name || "--"}
                />
            </Row>

            <Row>
                <ResponsiveRecord
                    recordTitle = "Requested by"
                    recordValue = {requestedBy}
                />

                <ResponsiveRecord
                    recordTitle = "Approved by"
                    recordValue = {approvedBy}
                />

                <ResponsiveRecord
                    recordTitle = "Received by"
                    recordValue = {receivedBy}
                />
           </Row>

            <LineDividerContainer theme={theme}>
                <LineDivider/>
            </LineDividerContainer>
            

            <Row>
                <Record
                    recordTitle = "Type"
                    recordValue = {repeating ? "Repeating" : "Non Repeating"}
                />
                <Record
                    recordTitle = "Repeats"
                    recordValue = {repeatingType}
                />
                <Record
                    recordTitle = "Configuration Status"
                    recordValue = {configStatus}
                    valueColor = "#38A169"
                />
                
            </Row>

            {/* <View style={styles.row}>
                <View style={{flex:1}}>
                    <Record
                        recordTitle = "Description"
                        recordValue  = {decscription}
                    />
                </View>
            </View>

           <View style={styles.row}>
               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Invoice"
                        recordValue = {invoice}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Order Total"
                        recordValue = {formatAmount(total)}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Status"
                        recordValue = {transformToSentence(status)}
                   />
               </View>
           </View>

           <View style={styles.row}>
               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Ordered On"
                        recordValue = {formatDate(orderDate, "DD/MM/YYYY")}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <Record
                        recordTitle = "Delivered On"
                        recordValue = {formatDate(deliveryDate, "DD/MM/YYYY")}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Storage Location"
                        recordValue = {name}
                   />
               </View>
           </View>

           <View style={styles.row}>
               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Requested by"
                        recordValue = {requestedBy}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Approved by"
                        recordValue = {approvedBy}
                   />
               </View>

               <View style={styles.inputWrapper}>
                   <ResponsiveRecord
                        recordTitle = "Received by"
                        recordValue = {receivedBy}
                   />
               </View>
           </View> */}

           
            {/* <View style={[styles.row,{justifyContent:"flex-start"}]}>
               <View style={[styles.inputWrapper,{flex:0, width:'33%'}]}>
                   <Record
                        recordTitle = "Type"
                        recordValue = {type}
                   />
               </View>

               <View style={[styles.inputWrapper,{flex:0}]}>
                   <Record
                        recordTitle = "Configuration Status"
                        recordValue = {configStatus}
                        valueColor = "#38A169"
                   />
               </View>
           </View>
 */}

        </>
    )
}

export default OrderDetailsTab

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        alignItems:"flex-start"
    },
    inputWrapper: {
        flex:1,
        paddingRight:15,
    }
})