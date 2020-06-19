import React, {useState, useContext, useEffect} from "react";
import {View, StyleSheet, Text, ActivityIndicator, Alert} from "react-native";
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import CaseFileOverlayMenu from './CaseFileOverlayMenu';
import {colors} from "../../styles";

import PatientSelectedIcon from '../../../assets/svg/overlayPatientSelected';
import PatientDisabledIcon from '../../../assets/svg/overlayPatientDisabled';

import ProcedureSelectedIcon from '../../../assets/svg/overlayProcedureSelected';
import ProcedureDisabledIcon from '../../../assets/svg/overlayProcedureDisabled';

import MedicalSelectedIcon from '../../../assets/svg/overlayMedicalHistorySelected';
import MedicalDisabledIcon from '../../../assets/svg/overlayMedicalHistoryDisabled';

import StaffSelectedIcon from '../../../assets/svg/overlayMedicalStaffSelected';
import StaffDisabledIcon from '../../../assets/svg/overlayMedicalStaffDisabled';

import ChargeSheetSelectedIcon from '../../../assets/svg/overlayChargeSheetSelected';
import ChargeSheetDisabledIcon from '../../../assets/svg/overlayChargeSheetDisabled';

import {Patient, Procedures, MedicalStaff, MedicalHistory, ChargeSheet} from "./navigation/screens";

import {
    getCaseFileById,
    updateChargeSheet,
    createInvoiceViaQuotation,
    updateCaseQuotationStatus
} from "../../api/network";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import {useModal} from "react-native-modalfy";
import ActionItem from "../common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RemoveIcon from "../../../assets/svg/remove2";
import DeleteIcon from "../../../assets/svg/deleteIcon";
import {QUOTATION_STATUS} from "../../const";
import EditIcon from "../../../assets/svg/editIcon";
import {createInvoice} from "../../const/suitesEndpoints";


const CaseFileBottomSheet = ({caseItem, isOpenEditable}) => {

    const modal = useModal();

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [updateInfo, setUpdateInfo] = useState([])
    const [selectedCaseId, setSelectedCaseId] = useState("")
    const [selectedQuotes, setSelectedQuotes] = useState([])

    const overlayMenu = [
        {
            name: "Patient",
            overlayTabs: ["Details", "Insurance", "Diagnosis", "Patient Risk"],
            selectedIcon: <PatientSelectedIcon/>,
            disabledIcon: <PatientDisabledIcon/>
        },
        {
            name: "Medical Staff",
            overlayTabs: ["Details"],
            selectedIcon: <StaffSelectedIcon/>,
            disabledIcon: <StaffDisabledIcon/>
        },
        {
            name: "Medical History",
            overlayTabs: ["General", "Family History", "Lifestyle", "Other"],
            selectedIcon: <MedicalSelectedIcon/>,
            disabledIcon: <MedicalDisabledIcon/>
        },
        {
            name: "Procedures",
            overlayTabs: ["Details"],
            selectedIcon: <ProcedureSelectedIcon/>,
            disabledIcon: <ProcedureDisabledIcon/>
        },
        {
            name: "Charge Sheet",
            overlayTabs: ["Consumables", "Equipment", "Billing", "Quotation", "Invoices"],
            selectedIcon: <ChargeSheetSelectedIcon/>,
            disabledIcon: <ChargeSheetDisabledIcon/>
        }
    ]

    const initialMenuItem = overlayMenu[0].name
    const initialCurrentTabs = overlayMenu[0].overlayTabs
    const intialSelectedTab = initialCurrentTabs[0]

    const {_id, patient, caseNumber} = caseItem
    let name = patient ? `${patient.firstName} ${patient.surname}` : ""
    // patient ? name = `${patient.firstName} ${patient.surname}` : name = ""

    // ############### State

    const [selectedTab, setSelectedTab] = useState(intialSelectedTab)
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs)
    const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem)

    const [isEditMode, setEditMode] = useState(isOpenEditable)
    const [selectedCase, setSelectedCase] = useState({})
    const [isFetching, setFetching] = useState(false);

    // ############### Lifecycle Methods
    useEffect(() => {
        fetchCase(_id)
    }, []);

    // ############### Event Handlers
    const handleTabPressChange = (tab) => {
        if (isEditMode === false) {
            setSelectedTab(tab)
        }
    }

    const handleOverlayMenuPress = (selectedItem) => {
        const selectedMenu = overlayMenu.filter(item => item.name === selectedItem)
        const menuItem = selectedMenu[0].name
        const currentTabs = selectedMenu[0].overlayTabs
        const selectedTab = currentTabs[0]
        setSelectedMenuItem(menuItem)
        setCurrentTabs(currentTabs)
        setSelectedTab(selectedTab)
    }

    const onEditPress = (tab) => {
        setEditMode(!isEditMode)

        if(isEditMode === true){
            // console.log("Record: ", selectedCaseId)
            updateCase()
            setTimeout(() => {
                fetchCase(_id)
            }, 500)
        }

    }

    const handleEditDone = (id) => (data) => {
        setUpdateInfo(data)
        setSelectedCaseId(id)
    }

    const updateCase = () => {
        updateChargeSheet(selectedCaseId, updateInfo)
            .then((data) => {
                console.log("Updated Record:", data)
            })
            .catch(error => {
                console.log("Failed to update chargesheet", error)
            })
    }

    const handleQuotes = (quotes) => {
        // const quoteIds = quotes.map(item => item._id)
        setSelectedQuotes(quotes)
    }

    /**
     * Displays floating actions
     */
    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "CASE ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }


    // ############### Helper Function
    const fetchCase = (id) => {
        setFetching(true);
        getCaseFileById(id)
            .then(data => {
                setSelectedCase(data)
            })
            .catch(error => {
                console.log("Failed to get case", error)
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    /**
     * Get the list of actions based on the current tab and sections
     */
    const getFabActions = () => {
        let title = "Actions";
        let floatingAction = [];

        console.log("getFabActions: selected tab", selectedTab);
        switch (selectedTab) {
            case "Consumables": {
                const addNewLineItemAction = <ActionItem title={"Update Consumable"} icon={<AddIcon/>} onPress={_ => {
                }}/>;
                const removeLineItemAction = <ActionItem title={"Remove Consumable"} icon={<DeleteIcon/>}
                                                         onPress={_ => {
                                                         }}/>;
                floatingAction.push(addNewLineItemAction, /*removeLineItemAction*/)
                title = "CONSUMABLE'S ACTIONS"
                break;
            }
            case "Equipment": {
                const addNewLineItemAction = <ActionItem title={"Update Equipments"} icon={<AddIcon/>} onPress={_ => {
                }}/>;
                const removeLineItemAction = <ActionItem title={"Remove Equipment"} icon={<RemoveIcon/>} onPress={_ => {
                }}/>;
                floatingAction.push(addNewLineItemAction, /*removeLineItemAction*/)
                title = "EQUIPMENT'S ACTIONS"
                break;
            }
            case 'Quotation' : {
                // Generate Actions depending on the quotation that was selected.
                if (selectedQuotes.length === 1) {
                    const quotation = selectedQuotes[0];
                    // check the status and generate actions depending on status

                    console.log("quotation", quotation);

                    switch (quotation.status) {
                        case QUOTATION_STATUS.DRAFT:
                            floatingAction.push(
                                <ActionItem
                                    title="Open Quotation" icon={<EditIcon/>}
                                    onPress={updateQuotationStatus(_id, quotation._id, QUOTATION_STATUS.OPEN)}
                                />
                            )

                            break;
                        case QUOTATION_STATUS.OPEN:
                            floatingAction.push(
                                <ActionItem
                                    title="Cancel Quotation"
                                    icon={<EditIcon/>}
                                    onPress={updateQuotationStatus(_id, quotation._id, QUOTATION_STATUS.OPEN)}
                                />
                            )

                            floatingAction.push(
                                <ActionItem
                                    title="Create Invoice"
                                    icon={<EditIcon/>}
                                    onPress={onCreateInvoice(_id, quotation._id)}
                                />
                            )
                            break;
                        case QUOTATION_STATUS.CANCELLED:
                            break;
                        case QUOTATION_STATUS.BILLED:
                            break;

                    }

                    // const update = <ActionItem title="Create Invoice" icon={<AddIcon/>}
                    //                            onPress={onCreateInvoice}/>

                } else if (selectedQuotes.length > 1) {
                    // const createInvoice = <ActionItem title="Create Invoice" icon={<AddIcon/>}
                    //                                   onPress={onCreateInvoice}/>
                }


                // floatingAction.push(createInvoice)
                title = "QUOTATION ACTIONS"
                break;
            }
        }


        return <ActionContainer
            floatingActions={floatingAction}
            title={title}
        />

    }

    // const onCreateInvoice = () => {
    //     selectedQuotes.forEach( item => {
    //         createInvoiceViaQuotation(_id, item)
    //             .then((data) => {
    //                 console.log("Invoice Record:", data)
    //             })
    //             .catch(error => {
    //                 Alert.alert(
    //                     "Unsuccessful creation",
    //                     "Invoice can only be generated for quotations in `Open` status.",
    //                     [
    //                         {
    //                             text : 'Ok',
    //                             onPress : () => console.log("Ok pressed")
    //                         }
    //                     ],
    //                     {
    //                         cancelable : false
    //                     }
    //
    //                 )
    //                 console.log("Failed to create invoice", error)
    //             })
    //     })

    const onCreateInvoice = (caseId, quotationId) => {
        createInvoiceViaQuotation(caseId, quotationId)
            .then((data) => {
                console.log("Invoice Record:", data)
            })
            .catch(error => {
                console.log("Failed to create invoice", error)
                Alert.alert("Sorry", 'Failed to generate invoice, please try again');
            })
    }

    const updateQuotationStatus = (caseId, quotationId, status) => {
        updateCaseQuotationStatus(caseId, quotationId, status)
            .then((data) => {
                console.log("Invoice Record:", data)
                // todo upate invoice in state.

            })
            .catch(error => {
                console.log("Failed to update status", error)
                Alert.alert("Sorry", "Failed to open quotation, please try again.")
            })
    }


    // ############### Data

    const getOverlayContent = () => {
        const {patient = {}, staff = {}, chargeSheet = {}, caseProcedures = [], quotations = [], invoices = []} = selectedCase
        const {medicalInfo = {}} = patient

        switch (selectedMenuItem) {
            case "Patient" :
                return <Patient
                    patient={patient}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />

            case "Medical Staff" :
                return <MedicalStaff
                    staff={staff}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />
            case "Medical History" :
                return <MedicalHistory
                    medicalInfo={medicalInfo}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />
            case "Procedures" :
                return <Procedures
                    procedures={caseProcedures}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />

            case "Charge Sheet" :
                return <ChargeSheet
                    chargeSheet={chargeSheet}
                    procedures={caseProcedures}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                    quotations={quotations}
                    invoices={invoices}
                    handleEditDone={handleEditDone}
                    handleQuotes={handleQuotes}
                />

            default :
                return <View/>

        }

    }

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <>
                        <SlideOverlay
                            overlayId={caseNumber}
                            overlayTitle={name}
                            onTabPressChange={handleTabPressChange}
                            currentTabs={currentTabs}
                            selectedTab={selectedTab}
                            isEditMode={isEditMode}
                            overlayContent={
                                <View style={{flex: 1, padding: 25, paddingTop: 30}}>
                                    {getOverlayContent()}
                                </View>
                            }
                            onEditPress={onEditPress}
                        />

                        <View style={styles.footer}>
                            <CaseFileOverlayMenu
                                selectedMenuItem={selectedMenuItem}
                                overlayMenu={overlayMenu}
                                handleTabPress={handleOverlayMenuPress}
                            />
                        </View>

                        <View style={styles.actionWrapper}>
                            <FloatingActionButton
                                isDisabled={isFloatingActionDisabled}
                                toggleActionButton={toggleActionButton}
                            />
                        </View>

                    </>
            }
        </View>
    )
}
CaseFileBottomSheet.propTypes = {};
CaseFileBottomSheet.defaultProps = {};

export default CaseFileBottomSheet

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    actionWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 40
    }
})
