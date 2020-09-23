import React,{ useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import OverlayDialog from "../../components/common/Dialog/OverlayDialog";
import DialogTabs from "../../components/common/Dialog/DialogTabs";
import DialogDetailsTab from "../../components/Procedures/DialogDetailsTab";
import DialogLocationTab from "../../components/Procedures/DialogLocationTab";
import ConfirmationComponent from '../../components/ConfirmationComponent';
import CreatePageHeader from '../../components/common/DetailsPage/CreatePageHeader';
import CreatePreviousDoneFooter from '../../components/common/DetailsPage/CreatePreviousDoneFooter';

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";
 

import { createNewProcedure, updateProcedure,getTheatres, getPhysicians } from "../../api/network";
import { addProcedure } from "../../redux/actions/proceduresActions";
import {connect} from "react-redux";
import { duration } from "moment";
import _ from "lodash";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import DialogItems from "../../components/Procedures/DialogItems";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const PageWrapper = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']}; 
`;
const TabsContainer = styled.View`
    height : 58px;
    justify-content : flex-end;
    background-color: ${ ({theme}) => theme.colors['--color-gray-200']};
`;

const ContentWrapper = styled.View`
    height : 800px;
    padding : ${ ({theme}) => theme.space['--space-28']};
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
    border-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    margin-top : ${ ({theme}) => theme.space['--space-20']};
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

function AddItems({ addProcedure, navigation, route}){

    const modal = useModal();
    const theme = useTheme();
    const  { onCancel, onCreated, type } = route.params;
    const dialogTabs = type === 'Consumables' ? ['Consumables'] : ['Equipments'];
    const selectedIndex = 0;

    const headers = [
        {
            name : "Item Name",
            alignment : "flex-start"
        },
        {
            name : "Quantity",
            alignment : "center"
        },
        {
            name : "Unit Price",
            alignment : "center"
        },
        {
            name : "Action",
            alignment : "flex-end"
        },
    ]

    const [tabIndex, setTabIndex] = useState(selectedIndex);
    const [positiveText, setPositiveText] = useState("NEXT");

    const [consumables, setConsumables] = useState([]);
    const [equipments, setEquipments] = useState([]);

    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({})


    const handlePopovers = (popoverValue) => (popoverItem) =>{
        let updatedPopovers;
        if(!popoverItem){
            updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})

            // setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            // setPopoverList(updatedPopovers)
        }
        setPopoverList(updatedPopovers)
    }

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })

        // const updatedErrors = {...errors}
        // delete updatedErrors[fieldName]
        // console.log("Update error: ", errors)
        // setErrors(updatedErrors)
    };

    const onTabPress = (newTab) => {
        // let isValid = validateProcedure()
        // if(!isValid) {return}
        setTabIndex(dialogTabs.indexOf(newTab))
    }

    const onFooterPreviousPress = () =>{
        // let isValid = validateProcedure()
        // if(!isValid) {return}
        setTabIndex(tabIndex-1)
    }

    const onPositiveButtonPress = () =>{
        let updatedFields = {}

        if(tabIndex === dialogTabs.length - 1){
            let updatedConsumables = consumables.map(item => {return ({ inventory : item?._id, amount : item?.amount})}) || [];
            let updatedEquipments = equipments.map(item => {return ({ equipment : item?._id, amount : item?.amount})}) || [];
            
            type === 'Consumables' ?
                updatedFields = {
                    inventories : updatedConsumables,
                    // equipments : updatedEquipments
                }
                :
                updatedFields = {
                    // inventories : updatedConsumables,
                    equipments : updatedEquipments
                }
            onConfirmSave(updatedFields)


        }else if (tabIndex + 1 === dialogTabs.length - 1)
        {
            setPositiveText("DONE")
            setTabIndex(dialogTabs.length-1)
        }else
        {
            setTabIndex(tabIndex + 1)
        }
    }

    const onConfirmSave = (fields) => {
        modal.openModal('ConfirmationModal',{
            content: (
                <ConfirmationComponent
                    isError = {false}
                    isEditUpdate = {true}
                    onCancel = {()=> {
                        modal.closeModals('ConfirmationModal'); 
                    }}
                    onAction = {()=>{
                        modal.closeAllModals();
                        // console.log("Fields to add: ", fields);
                        onCreated(fields);
                        // updateProcedureCall(fields);
                    }}
                    message = "Do you want to save these changes ?"
                />
            ),
            onClose : () => { modal.closeAllModals(); }
        })
    }

    const getDialogContent = (tab) => {
        return type === 'Consumables' ?
            <DialogItems
                handleData = {(consumables)=>setConsumables([...consumables])}
                itemData = {consumables}
                itemType = "Consumables"
                headers = {headers}
            />
            :
            <DialogItems
                handleData = {(equipments)=>setEquipments([...equipments])}
                itemData = {equipments}
                itemType = "Equipments"
                headers = {headers}
            />
        // switch (tab) {
        //     case "Consumables":
        //         return <DialogItems
        //         handleData = {(consumables)=>setConsumables([...consumables])}
        //         itemData = {consumables}
        //         itemType = "Consumables"
        //         headers = {headers}
        //     />;

        //     case "Equipments":
        //         return <DialogItems
        //         handleData = {(equipments)=>setEquipments([...equipments])}
        //         itemData = {equipments}
        //         itemType = "Equipments"
        //         headers = {headers}
        //     />;
        //     default :
        //         return <View/>
        // }
    };


    return (
        <PageWrapper theme = {theme}>
            
            <CreatePageHeader
                title = "Create Procedure"
                onClose = {onCancel}
            />

            <TabsContainer theme = {theme}>
                <DialogTabs
                   tabs={dialogTabs}
                   tab={tabIndex}
                    onTabPress={onTabPress}
                />
            </TabsContainer>

            <ContentWrapper theme = {theme}>
                <ContentContainer>
                    {getDialogContent(dialogTabs[tabIndex])}
                </ContentContainer>
            </ContentWrapper>

        
            <FooterWrapper>
                <CreatePreviousDoneFooter
                    onFooterPress = {onPositiveButtonPress}
                    isFinished = {tabIndex === dialogTabs.length-1 ? true : false}
                    onFooterPreviousPress = {onFooterPreviousPress}
                    isPreviousDisabled = {tabIndex === 0 ? true : false}
                />
            </FooterWrapper>


        </PageWrapper>  
  
    )
}

AddItems.propTypes = {}
AddItems.defaultProps = {}

const mapDispatchToProp = {
    addProcedure
}

export default connect(null, mapDispatchToProp)(AddItems);


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    headingContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 47,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E8EF'
    },
    footer:{
        height: 57,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: '#E3E8EF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    footerText:{
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#3182CE",
    }
})

