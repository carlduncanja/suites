import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'; 
import {ActivityIndicator, Alert, StyleSheet, View} from "react-native";
import {colors} from "../../styles";
import SlideOverlay from "../../components/common/SlideOverlay/SlideOverlay";
import CaseFileOverlayMenu from "../../components/CaseFiles/CaseFileOverlayMenu";
import FloatingActionButton from "../../components/common/FloatingAction/FloatingActionButton";
import {useModal} from "react-native-modalfy";
import PatientSelectedIcon from "../../../assets/svg/overlayPatientSelected";
import PatientDisabledIcon from "../../../assets/svg/overlayPatientDisabled";
import StaffSelectedIcon from "../../../assets/svg/overlayMedicalStaffSelected";
import StaffDisabledIcon from "../../../assets/svg/overlayMedicalStaffDisabled";
import MedicalSelectedIcon from "../../../assets/svg/overlayMedicalHistorySelected";
import MedicalDisabledIcon from "../../../assets/svg/overlayMedicalHistoryDisabled";
import ProcedureSelectedIcon from "../../../assets/svg/overlayProcedureSelected";
import ProcedureDisabledIcon from "../../../assets/svg/overlayProcedureDisabled";
import ChargeSheetSelectedIcon from "../../../assets/svg/overlayChargeSheetSelected";
import ChargeSheetDisabledIcon from "../../../assets/svg/overlayChargeSheetDisabled";
import {
    createInvoiceViaQuotation,
    getCaseFileById,
    updateCaseQuotationStatus,
    updateChargeSheet
} from "../../api/network";
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import DeleteIcon from "../../../assets/svg/deleteIcon";
import RemoveIcon from "../../../assets/svg/remove2";
import {QUOTATION_STATUS} from "../../const";
import EditIcon from "../../../assets/svg/editIcon";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import {
    ChargeSheet,
    MedicalHistory,
    MedicalStaff,
    Patient,
    Procedures
} from "../../components/CaseFiles/navigation/screens";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addNotification} from "../../redux/actions/NotificationActions";


function CasePage({route, addNotification}) {
    const modal = useModal();

    const {caseId, isEdit} = route.params;


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
    const initialSelectedTab = initialCurrentTabs[0]

    // ############### State

    const [selectedTab, setSelectedTab] = useState(initialSelectedTab)
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs)
    const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem)

    const [isEditMode, setEditMode] = useState(isEdit)
    const [selectedCase, setSelectedCase] = useState({})
    const [isFetching, setFetching] = useState(false);

    // ############### Lifecycle Methods
    useEffect(() => {
        fetchCase(caseId)
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
        // if (isEditMode === true) {
        //     if (updateInfo.length !== 0) {
        //         // console.log("Record: ", updateInfo)
        //         updateCaseChargeSheet()
        //     } else {
        //         console.log("No data added")
        //     }
        //
        //     setTimeout(() => {
        //         fetchCase(caseId)
        //     }, 500)
        // }
    }

    const handleEditDone = (data) => {
        setUpdateInfo(data)
        // setSelectedCaseId(id)
    }

    const updateCaseChargeSheet = (updateInfo) => {
        console.log("Selectedcase: ", updateInfo)
        updateChargeSheet(caseId, updateInfo)
            .then((data) => {
                console.log("Updated Record:", data)
            })
            .catch(error => {
                console.log("Failed to update chargesheet", error)
                Alert.alert("Sorry", "Failed to update case file");
            })
            .finally(_ => {
                fetchCase(caseId)
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
                                    onPress={updateQuotationStatus(caseId, quotation._id, QUOTATION_STATUS.OPEN)}
                                />
                            )

                            break;
                        case QUOTATION_STATUS.OPEN:
                            floatingAction.push(
                                <ActionItem
                                    title="Cancel Quotation"
                                    icon={<EditIcon/>}
                                    onPress={updateQuotationStatus(caseId, quotation._id, QUOTATION_STATUS.OPEN)}
                                />
                            )

                            floatingAction.push(
                                <ActionItem
                                    title="Create Invoice"
                                    icon={<EditIcon/>}
                                    onPress={onCreateInvoice(caseId, quotation._id)}
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

    const onCreateInvoice = (caseId, quotationId) => () => {
        modal.closeAllModals()
        createInvoiceViaQuotation(caseId, quotationId)
            .then((data) => {
                console.log("Invoice Record:", data)

                addNotification("Inventory items have been removed.", "Inventory")

                fetchCase(caseId)
            })
            .catch(error => {
                console.log("Failed to create invoice", error)
                Alert.alert("Sorry", 'Failed to generate invoice, please try again');
            })
            .finally(_ => {
                modal.closeAllModals()
            })
    }

    const updateQuotationStatus = (caseId, quotationId, status) => () => {
        updateCaseQuotationStatus(caseId, quotationId, status)
            .then((data) => {
                console.log("Invoice Record:", data)

                // update the quotation in state
                const updatedCase = {...selectedCase}
                let {quotations} = updatedCase;

                quotations = quotations.map(item => {
                    return item._id === quotationId
                        ? {...item, status}
                        : {...item}
                })

                updatedCase.quotations = quotations;
                setSelectedCase(updatedCase);

            })
            .catch(error => {
                console.log("Failed to update status", error)
                Alert.alert("Sorry", "Failed to open quotation, please try again.")
            })
            .finally(_ => {
                modal.closeAllModals();
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
                    onUpdateChargeSheet={(data) => updateCaseChargeSheet(data)}
                    handleEditDone={handleEditDone}
                    handleQuotes={handleQuotes}
                />
            default :
                return <View/>
        }

    }

    const {patient, caseNumber} = selectedCase;
    const name = patient ? `${patient.firstName} ${patient.surname}` : ""


    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    : <>
                        <SlideOverlay
                            overlayId={caseNumber}
                            overlayTitle={name}
                            onTabPressChange={handleTabPressChange}
                            currentTabs={currentTabs}
                            selectedTab={selectedTab}
                            isEditMode={isEditMode}
                            onEditPress={onEditPress}
                            overlayContent={
                                <View style={{flex: 1, padding: 25, paddingTop: 30, backgroundColor: 'white'}}>
                                    {getOverlayContent()}
                                </View>
                            }
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
    );
}

CasePage.propTypes = {};
CasePage.defaultProps = {};

const mapDispatchTopProp = dispatch => bindActionCreators({
    addNotification
}, dispatch);


export default connect(null, mapDispatchTopProp)(CasePage);


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
