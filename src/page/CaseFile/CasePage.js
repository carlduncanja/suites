import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {useModal} from 'react-native-modalfy';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {colors} from '../../styles';
import SlideOverlay from '../../components/common/SlideOverlay/SlideOverlay';
import CaseFileOverlayMenu from '../../components/CaseFiles/CaseFileOverlayMenu';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import PatientSelectedIcon from '../../../assets/svg/overlayPatientSelected';
import PatientDisabledIcon from '../../../assets/svg/overlayPatientDisabled';
import StaffSelectedIcon from '../../../assets/svg/overlayMedicalStaffSelected';
import StaffDisabledIcon from '../../../assets/svg/overlayMedicalStaffDisabled';
import MedicalSelectedIcon from '../../../assets/svg/overlayMedicalHistorySelected';
import MedicalDisabledIcon from '../../../assets/svg/overlayMedicalHistoryDisabled';
import ProcedureSelectedIcon from '../../../assets/svg/overlayProcedureSelected';
import ProcedureDisabledIcon from '../../../assets/svg/overlayProcedureDisabled';
import ChargeSheetSelectedIcon from '../../../assets/svg/overlayChargeSheetSelected';
import ChargeSheetDisabledIcon from '../../../assets/svg/overlayChargeSheetDisabled';
import {
    createInvoiceViaQuotation,
    generateInvoiceCall,
    generateQuotationCall,
    generateDocumentLink,
    getCaseFileById,
    removeQuotationCall,
    updateCaseQuotationStatus,
    updateChargeSheet, approveChargeSheetCall, withdrawChargeSheetChangesCall
} from '../../api/network';
import ActionItem from '../../components/common/ActionItem';
import AddIcon from '../../../assets/svg/addIcon';
import DeleteIcon from '../../../assets/svg/deleteIcon';
import RemoveIcon from '../../../assets/svg/remove2';
import {QUOTATION_STATUS, ROLES} from '../../const';
import EditIcon from '../../../assets/svg/editIcon';
import DownloadIcon from '../../../assets/svg/DownloadIcon';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import {
    ChargeSheet,
    MedicalHistory,
    MedicalStaff,
    Patient,
    Procedures
} from '../../components/CaseFiles/navigation/screens';
import {addNotification} from '../../redux/actions/NotificationActions';
import CaseFilesBottomSheetContainer from '../../components/CaseFiles/CaseFilesBottomSheetContainer';
import CreateProcedureDialogContainer from '../../components/Procedures/CreateProcedureDialogContainer';
import {setCaseEdit} from '../../redux/actions/casePageActions';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import PageHeader from '../../components/common/DetailsPage/PageHeader';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import {PageContext} from '../../contexts/PageContext';
import AddNewItem from '../../components/CaseFiles/AddNewItem/AddNewItem';
import GenerateIcon from '../../../assets/svg/generateIcon';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import LongPressWithFeedback from '../../components/common/LongPressWithFeedback';
import WasteIcon from '../../../assets/svg/wasteIcon';
import {currencyFormatter, formatDate} from '../../utils/formatter';
import jwtDecode from "jwt-decode";
import AcceptIcon from "../../../assets/svg/acceptIcon";
import {CHARGE_SHEET_STATUSES} from "../../components/CaseFiles/navigation/screens/ChargeSheet";

const overlayMenu = [
    {
        name: 'Patient',
        overlayTabs: ['Details', 'Insurance', 'Diagnosis', 'Patient Risk'],
        selectedIcon: <PatientSelectedIcon/>,
        disabledIcon: <PatientDisabledIcon/>
    },
    {
        name: 'Medical Staff',
        overlayTabs: ['Details'],
        selectedIcon: <StaffSelectedIcon/>,
        disabledIcon: <StaffDisabledIcon/>
    },
    {
        name: 'Medical History',
        overlayTabs: ['Details', 'Family History', 'Lifestyle', 'Other'],
        selectedIcon: <MedicalSelectedIcon/>,
        disabledIcon: <MedicalDisabledIcon/>
    },
    {
        name: 'Procedures',
        overlayTabs: ['Details'],
        selectedIcon: <ProcedureSelectedIcon/>,
        disabledIcon: <ProcedureDisabledIcon/>
    },
    {
        name: 'Charge Sheet',
        overlayTabs: ['Consumables', 'Equipment', 'Billing', 'Quotation', 'Invoices'],
        selectedIcon: <ChargeSheetSelectedIcon/>,
        disabledIcon: <ChargeSheetDisabledIcon/>
    }
];

const initialMenuItem = overlayMenu[0].name;
const initialCurrentTabs = overlayMenu[0].overlayTabs;
const initialSelectedTab = initialCurrentTabs[0];

function CasePage({auth = {}, route, addNotification, navigation, ...props}) {
    const modal = useModal();
    const theme = useTheme();

    const {userToken} = auth;
    let authInfo = {}
    try {
        authInfo = jwtDecode(userToken);
    } catch (e) {
        console.log("failed to decode token", e);
    }

    const {caseId, isEdit} = route.params;

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [updateInfo, setUpdateInfo] = useState([]);
    const [selectedCaseId, setSelectedCaseId] = useState('');
    const [selectedQuoteIds, setSelectedQuoteIds] = useState([]);
    const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
    const [selectedEquipments, setSelectedEquipments] = useState([])

    // ############### State

    const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs);
    const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem);

    const [pageState, setPageState] = useState({});
    const [selectedCase, setSelectedCase] = useState({});

    // ############### Lifecycle Methods
    useEffect(() => {
        fetchCase(caseId);
    }, []);

    // ############### Event Handlers
    const handleTabPressChange = tab => {
        if (pageState.isEdit === false) {
            setSelectedTab(tab);
        }
    };

    const handleAcceptChargeSheetChange = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        chargeSheetApproval({approve: true})
                    }}
                    message="Do you want to accept changes submitted?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });

    }

    const handleRevertChargeSheetChanges = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        chargeSheetApproval({approve: false})
                    }}
                    message="Are you sure you want to revert changes submitted?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    }

    const handleWithdrawChargeSheetChanges = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        chargeSheetWithdrawChanges({approve: false})
                    }}
                    message="Are you sure you want to withdraw changes submitted?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    }


    const handleOverlayMenuPress = selectedItem => {
        if (pageState.isEditMode) return;

        const selectedMenu = overlayMenu.filter(item => item.name === selectedItem);
        const menuItem = selectedMenu[0].name;
        const currentTabs = selectedMenu[0].overlayTabs;
        const selectedTab = currentTabs[0];
        setSelectedMenuItem(menuItem);
        setCurrentTabs(currentTabs);
        setSelectedTab(selectedTab);
    };

    const handleEditDone = data => {
        setUpdateInfo(data);
        // setSelectedCaseId(id)
    };

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const handleConfirmChargeSheetChanges = (updateInfo) => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError = {false}
                    isEditUpdate = {true}
                    onCancel = {()=> {
                        modal.closeModals('ConfirmationModal');
                        setPageState({
                            ...pageState,
                            isEditMode : true,
                        })
                    }}
                    onAction = {()=>{
                        updateCaseChargeSheet(updateInfo)
                        setTimeout(()=>{
                            modal.closeModals('ConfirmationModal');
                        },200)
                    }}
                    message = {"Confirm changes made"}
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')}
            })

    }

    const updateCaseChargeSheet = updateInfo => {
        updateChargeSheet(caseId, updateInfo)
            .then(data => {
                console.log('Updated Record:', data);
            })
            .catch(error => {
                console.log('Failed to update chargesheet', error);
                Alert.alert('Sorry', 'Failed to update case file');
            })
            .finally(_ => {
                fetchCase(caseId);
            });
    };

    const handleQuotes = quotes => {
        // const quoteIds = quotes.map(item => item._id)
        setSelectedQuoteIds(quotes);
    };

    const handleInvoices = invoices => {
        setSelectedInvoiceIds(invoices);
    }

    const onGenerateQuotation = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        generateQuotation(caseId);
                    }}
                    message="Do you wish to generate a new quotation?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const onGenerateInvoice = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        generateInvoice(caseId);
                    }}
                    message="Do you wish to generate a new Invoice? This will remove Inventory Items from the system."//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    /**
     * Displays floating actions
     */
    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'CASE ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    // ############### Helper Function
    const fetchCase = id => {
        setPageLoading(true);
        getCaseFileById(id)
            .then(data => {
                setSelectedCase(data);
            })
            .catch(error => {
                console.log('Failed to get case', error);
                Alert.alert(('Failed', 'Failed to get details for case'));
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const chargeSheetApproval = (params) => {
        setPageLoading(true);
        // return;
        approveChargeSheetCall(caseId, params)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log("Failed to approve charge sheet", error)
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Failed to Make Changes?"
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });

            })
            .finally(_ => fetchCase(caseId))
    }

    const chargeSheetWithdrawChanges = () => {
        setPageLoading(true);
        // return;
        withdrawChargeSheetChangesCall(caseId)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log("Failed to approve charge sheet", error)
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Failed to Make Changes?"
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });

            })
            .finally(_ => fetchCase(caseId))
    }


    const generateQuotation = caseId => {
        setPageLoading(true);
        generateQuotationCall(caseId)
            .then(quotation => {
                console.log('quotation created', quotation);
                addQuotationToCaseState(quotation);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Failed to Generate Quotation?"
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log('failed to create', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Failed to Generate Quotation?"
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const generateInvoice = caseId => {
        setPageLoading(true);
        generateInvoiceCall(caseId)
            .then(invoice => {
                console.log('invoice created', invoice);
                addInvoiceToCaseState(invoice);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log('failed to create', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Failed to Generate Invoices."
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const addQuotationToCaseState = newQuotations => {
        const {quotations = []} = selectedCase;
        const updatedCase = {...selectedCase};
        updatedCase.quotations = [...quotations, newQuotations];
        setSelectedCase(updatedCase);
    };

    const addInvoiceToCaseState = newInvoices => {
        const {invoices = []} = selectedCase;
        const updatedCase = {...selectedCase};
        updatedCase.invoices = [...invoices, newInvoices];
        setSelectedCase(updatedCase);
    };

    const removeQuotationFromState = quotationId => {
        const {quotations = []} = selectedCase;
        const updatedCase = {...selectedCase};
        updatedCase.quotations = quotations.filter(item => item._id === quotationId);
        setSelectedCase(updatedCase);
    };

    const openAddItem = itemToAdd => {
        modal.closeModals('ActionContainerModal');

        setTimeout(() => {
            modal.openModal('OverlayModal', {

                content: <AddNewItem
                    itemToAdd={itemToAdd}
                />,
                onClose: () => setFloatingAction(false)

            });
        }, 200);
    };

    const onRemoveQuotations = quotation => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        removeQuotation(caseId, quotation);
                    }}
                    message="Are you sure you want to remove this quotation?"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const removeQuotation = (caseId, quotationId) => {
        setPageLoading(true);
        removeQuotationCall(caseId, quotationId)
            .then(r => {
                removeQuotationFromState(caseId, quotationId);
            })
            .catch(error => {
                console.log('failed to remove quotation', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    /**
     * Get the list of actions based on the current tab and sections
     */
    const getFabActions = () => {
        let title = 'Actions';
        const floatingAction = [];

        console.log('getFabActions: selected tab', selectedTab);
        console.log('Selected menu: ', selectedMenuItem);

        if (selectedMenuItem === 'Charge Sheet') {
            switch (selectedTab) {
                case 'Consumables': {

                    const {chargeSheet} = selectedCase;
                    const status = chargeSheet.status;
                    const isPending = status === CHARGE_SHEET_STATUSES.PENDING_CHANGES

                    if (isPending) {

                        const isAdmin = authInfo['role_name'] === ROLES.ADMIN
                        const isOwner = chargeSheet.updatedBy?._id === authInfo['user_id'];

                        if (isAdmin) {
                            const RevertChanges = (
                                <ActionItem
                                    title="Revert Changes"
                                    icon={<WasteIcon/>}
                                    onPress={handleRevertChargeSheetChanges}
                                />
                            );

                            const AcceptChanges = (
                                <ActionItem
                                    title="Accept Changes"
                                    icon={<AcceptIcon/>}
                                    onPress={handleAcceptChargeSheetChange}
                                />
                            );
                            floatingAction.push(RevertChanges, AcceptChanges);
                        }

                        if (isOwner) {
                            const WithdrawChanges = (
                                <LongPressWithFeedback
                                    pressTimer={700}
                                    onLongPress={handleWithdrawChargeSheetChanges}
                                >
                                    <ActionItem
                                        title="Hold to Withdraw"
                                        icon={<WasteIcon/>}
                                        onPress={() => {
                                        }}
                                        touchable={false}
                                    />
                                </LongPressWithFeedback>
                            );
                            floatingAction.push(WithdrawChanges);
                        }

                    } else {
                        const addNewLineItemAction = (
                            <ActionItem
                                title="Update Consumable"
                                icon={<AddIcon/>}
                                onPress={_ => {
                                }}
                            />
                        );
                        const addNewItem = (
                            <ActionItem
                                title="Add Consumable"
                                icon={<AddIcon/>}
                                onPress={() => openAddItem('Consumable')}
                            />
                        );
                        const removeLineItemAction = (
                            <ActionItem
                                title="Remove Consumable"
                                icon={<DeleteIcon/>}
                                onPress={_ => {
                                }}
                            />
                        );
                        floatingAction.push(/*addNewLineItemAction,*/ addNewItem, /*removeLineItemAction*/);
                    }
                    title = "CONSUMABLE'S ACTIONS";


                    break;
                }
                case 'Equipment': {
                    const addNewLineItemAction = (
                        <ActionItem
                            title="Add Equipment"
                            icon={<AddIcon/>}
                            onPress={_ => {}}
                        />
                    );
                    const removeLineItemAction = (
                        <LongPressWithFeedback
                            pressTimer={700}
                            onLongPress={_ => {}}
                            isDisabled = {selectedEquipments.length === 0 ? true : false}

                        >
                            <ActionItem
                                title="Hold to Delete"
                                icon={<WasteIcon strokeColor = {selectedEquipments.length === 0 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}/>}
                                onPress={() => {}}
                                touchable={false}
                                disabled = {selectedEquipments.length === 0 ? true : false}
                            />

                        </LongPressWithFeedback>
                    );
                    floatingAction.push(removeLineItemAction,addNewLineItemAction);
                    title = 'EQUIPMENT ACTIONS';
                    break;
                }
                case 'Quotation': {
                    // Generate Actions depending on the quotation that was selected.

                    if (selectedQuoteIds.length === 1) {
                        const quotation = selectedQuoteIds[0];
                        const removeQuotations = (
                            <LongPressWithFeedback
                                pressTimer={700}
                                onLongPress={() => onRemoveQuotations(quotation)}
                            >
                                <ActionItem
                                    title="Hold to Delete"
                                    icon={<WasteIcon/>}
                                    onPress={() => {
                                    }}
                                    touchable={false}
                                />
                            </LongPressWithFeedback>
                        );
                        const downloadQuotation = (
                            <ActionItem
                                title="Download Quotation"
                                icon={<DownloadIcon/>}
                                onPress={() => downloadQuotationDocument(quotation)}
                            />
                        );

                        console.log('selected quote id', quotation);

                        floatingAction.push(removeQuotations);
                        floatingAction.push(downloadQuotation);
                    } else if (selectedQuoteIds.length > 1) {
                        // const createInvoice = <ActionItem title="Create Invoice" icon={<AddIcon/>}
                        //                                   onPress={onCreateInvoice}/>
                    }

                    title = 'QUOTATION ACTIONS';
                    break;
                }
                case 'Invoices': {
                    if (selectedInvoiceIds.length === 1) {
                        const invoice = selectedInvoiceIds[0];
                        // const removeInvoices = (
                        //     <LongPressWithFeedback
                        //         pressTimer={700}
                        //         onLongPress={() => onRemoveInvoices(invoice)}
                        //     >
                        //         <ActionItem
                        //             title="Hold to Delete"
                        //             icon={<WasteIcon/>}
                        //             onPress={() => {
                        //             }}
                        //             touchable={false}
                        //         />
                        //     </LongPressWithFeedback>
                        // );
                        const downloadInvoice = (
                            <ActionItem
                                title="Download Invoice"
                                icon={<DownloadIcon/>}
                                onPress={() => downloadInvoiceDocument(invoice)}
                            />
                        );

                        // floatingAction.push(removeInvoices);
                        floatingAction.push(downloadInvoice);
                    } else if (selectedInvoiceIds.length > 1) {
                        // const createInvoice = <ActionItem title="Create Invoice" icon={<AddIcon/>}
                        //                                   onPress={onCreateInvoice}/>
                    }

                    title = 'INVOICE ACTIONS';
                    break;
                }
                case 'Billing': {
                    const generateQuotationAction = (
                        <ActionItem
                            title="Generate Quotation"
                            icon={<GenerateIcon/>}
                            onPress={() => onGenerateQuotation()}
                        />
                    );
                    const generateInvoiceAction = (
                        <ActionItem
                            title="Generate Invoice"
                            icon={<GenerateIcon/>}
                            onPress={() => onGenerateInvoice()}
                        />
                    );

                    floatingAction.push(generateQuotationAction, generateInvoiceAction);

                    title = 'BILLING ACTIONS';
                    break;
                }
            }
        } else if (selectedMenuItem === 'Procedures') {
            switch (selectedTab) {
                case 'Details':
                    const addNewProcedure = (
                        <ActionItem
                            title="Add Appointment"
                            icon={<AddIcon/>}
                            onPress={openAddProcedure}
                        />
                    );
                    floatingAction.push(addNewProcedure);
                    title = 'APPOINTMENT ACTIONS';
                    break;
            }
        }

        return <ActionContainer
            floatingActions={floatingAction}
            title={title}
        />;
    };

    const onCreateInvoice = (caseId, quotationId) => () => {
        modal.closeAllModals();
        createInvoiceViaQuotation(caseId, quotationId)
            .then(data => {
                console.log('Invoice Record:', data);

                addNotification('Inventory items have been removed.', 'Inventory');

                fetchCase(caseId);
            })
            .catch(error => {
                console.log('Failed to create invoice', error);
                Alert.alert('Sorry', 'Failed to generate invoice, please try again');
            })
            .finally(_ => {
                modal.closeAllModals();
            });
    };

    const updateQuotationStatus = (caseId, quotationId, status) => () => {
        updateCaseQuotationStatus(caseId, quotationId, status)
            .then(data => {
                console.log('Invoice Record:', data);

                // update the quotation in state
                const updatedCase = {...selectedCase};
                let {quotations} = updatedCase;

                quotations = quotations.map(item => (item._id === quotationId ?
                    {...item, status} :
                    {...item}));

                updatedCase.quotations = quotations;
                setSelectedCase(updatedCase);
            })
            .catch(error => {
                console.log('Failed to update status', error);
                Alert.alert('Sorry', 'Failed to open quotation, please try again.');
            })
            .finally(_ => {
                modal.closeAllModals();
            });
    };

    const openAddProcedure = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal('OverlayModal', {
                content: (
                    <View/>
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    const downloadInvoiceDocument = async invoice => {
    }

    const downloadQuotationDocument = async quotation => {
        const {quotations, chargeSheet = {}, caseProcedures: procedures = []} = selectedCase;
        const {proceduresBillableItems = [], total = 0} = chargeSheet;

        // preparing billing information
        const LINE_ITEM_TYPES = {
            DISCOUNT: 'discount',
            SERVICE: 'service',
            PROCEDURES: 'procedures',
            PHYSICIANS: 'physician',
        };

        const billing = {
            total,
            hasDiscount: true,
            discount: 0.15,
            procedures: []
        };

        // todo: eval what's actually needed here
        for (const proceduresBillableItem of proceduresBillableItems) {
            const {lineItems = [], inventories, equipments, caseProcedureId} = proceduresBillableItem;

            const caseProcedure = procedures.find(item => item._id === proceduresBillableItem.caseProcedureId) || {};
            const caseAppointment = caseProcedure.appointment || {};

            const title = caseAppointment.title ? caseAppointment.title : '';

            const name = `${title} (${formatDate(caseAppointment.startTime, 'MMM D - h:mm a')})`;

            const billingItem = {
                caseProcedureId,
                discounts: [],
                physicians: [],
                services: [],
                procedures: [],
                procedure: {
                    name: name || proceduresBillableItem.caseProcedureId,
                    cost: proceduresBillableItem.total
                },
            };

            for (const lineItem of lineItems) {
                switch (lineItem.type) {
                    case LINE_ITEM_TYPES.PHYSICIANS:
                        billingItem.physicians.push(lineItem);
                        break;
                    case LINE_ITEM_TYPES.SERVICE:
                        billingItem.services.push(lineItem);
                        break;
                    case LINE_ITEM_TYPES.PROCEDURES:
                        billingItem.procedures.push(lineItem);
                        break;
                    case LINE_ITEM_TYPES.DISCOUNT:
                        billingItem.discounts.push(lineItem);
                        break;
                }
            }

            billingItem.inventories = inventories.map(item => ({
                _id: item._id,
                inventory: item?.inventory?._id,
                amount: item.amount,
                name: item.inventory?.name,
                cost: item.inventory?.unitCost || 0,
            }));

            billingItem.equipments = equipments.map(item => ({
                _id: item?._id,
                equipment: item.equipment?._id,
                amount: item.amount,
                name: item.equipment?.name,
                cost: item.equipment?.unitPrice || 0,
            }));

            billing.procedures.push(billingItem);
        }

        const {discount = 0, hasDiscount = false, tax = 0} = billing;

        let data = {
            key: 'suites_quotation_generated',
            is_pdf: true,
            from_html: true,
        };
        const args = {
            suites_contact_number: '876-324-9087',
            suites_email: 'thesuites@gmail.com',
            suites_website: 'thesuites.com',
            suites_address_line_1: '12 Ruthven Road',
            suites_address_line_2: 'Half Way Tree Road',
            suites_address_line_3: 'Kingston 10'
        };

        quotations.map(q => {
            if (q._id === quotation) {
                const total = hasDiscount ? (q.amountDue - (q.amountDue * discount)) * (1 + tax) : (q.amountDue) * (1 + tax);
                const formatDiscount = q.amountDue * discount;

                const physiciansArray = [];
                const proceduresArray = [];
                const servicesArray = [];
                let inventoriesArray = [];

                billing.procedures.map(item => {
                    const {physicians = [], services = [], procedures = [], inventories = []} = item;
                    physicians.map(physician => {
                        physiciansArray.push({
                            name: physician.name || '',
                            cost: `$${currencyFormatter(physician.unitPrice * physician.quantity)}` || 0
                        });
                    });
                    procedures.map(procedure => {
                        proceduresArray.push({
                            name: procedure.name || '',
                            cost: `$${currencyFormatter(procedure.unitPrice * procedure.quantity)}` || 0
                        });
                    });
                    services.map(service => {
                        servicesArray.push({
                            name: service.name || '',
                            cost: `$${currencyFormatter(service.unitPrice * service.quantity)}` || 0
                        });
                    });

                    inventoriesArray = [...inventories];
                });

                const summarydetails = [...physiciansArray, ...proceduresArray, ...servicesArray];
                const consumabledetails = [];

                inventoriesArray.map(inventory => {
                    const {name, cost, amount} = inventory;

                    consumabledetails.push({
                        name,
                        quantity: amount,
                        price: `$${currencyFormatter(cost)}`,
                        total: `$${currencyFormatter(cost * amount)}`
                    })
                });

                args.total = `$${currencyFormatter(total)}`;
                args.customer_name = q.customerDetails.name;
                args.customer_address_line_1 = q.customerDetails.address.line1;
                args.customer_address_line_2 = q.customerDetails.address.line2;
                args.customer_address_line_3 = q.customerDetails.address.city;
                args.quotation_number = q.quotationNumber;
                args.quotation_purpose = 'Medical Supplies';
                args.date = formatDate(q.createdAt, 'DD/MM/YYYY');
                args.summarydetails = summarydetails;
                args.consumabledetails = consumabledetails;
                args.subtotal = `$${currencyFormatter(q.amountDue)}`;
                args.discount = `-$${currencyFormatter(formatDiscount)}`;
                args.tax = `${tax * 100}%`;
            }
        });

        data = {...data, args};

        // build args to pass to document generation endpoint; pass result of that endpoint to downloadAsync
        try {
            setPageLoading(true);
            const response = await generateDocumentLink(data);

            const fileUrl = response?.url;
            const filenameParts = fileUrl.split('/');
            const filename = filenameParts[filenameParts.length - 1];

            FileSystem.downloadAsync(
                fileUrl,
                `${FileSystem.cacheDirectory}${filename}`
            ).then(({uri}) => {
                console.info(`download.path::${uri}`);

                Sharing.shareAsync(uri, {UTI: 'pdf'})
                    .then(result => console.info('sharing.success', result))
                    .catch(error => console.error('sharing.error', error));
            }).catch(error => {
                console.error(error);
            }).finally(_ => {
                setPageLoading(false);
                modal.closeAllModals();
            });
        } catch (error) {
            console.error(error); // todo: show error message
            setPageLoading(false);
            modal.closeAllModals();
        }
    };
    // ############### Data

    const getOverlayContent = () => {
        const {patient = {}, staff = {}, chargeSheet = {}, caseProcedures = [], quotations = [], invoices = []} = selectedCase;
        const {medicalInfo = {}} = patient;

        switch (selectedMenuItem) {
            case 'Patient':
                return <Patient
                    patient={patient}
                    selectedTab={selectedTab}
                />;
            case 'Medical Staff':
                return <MedicalStaff
                    staff={staff}
                    selectedTab={selectedTab}
                />;
            case 'Medical History':
                return <MedicalHistory
                    medicalInfo={medicalInfo}
                    selectedTab={selectedTab}
                />;
            case 'Procedures':
                return <Procedures
                    procedures={caseProcedures}
                    caseId={caseId}
                />;
            case 'Charge Sheet':
                return <ChargeSheet
                    chargeSheet={chargeSheet}
                    procedures={caseProcedures}
                    selectedTab={selectedTab}
                    quotations={quotations}
                    invoices={invoices}
                    onUpdateChargeSheet={data => handleConfirmChargeSheetChanges(data)}
                    handleEditDone={handleEditDone}
                    handleQuotes={handleQuotes}
                    handleInvoices={handleInvoices}
                    onSelectEquipments = {(equipments)=>{setSelectedEquipments(equipments)}}
                />;
            default:
                return <View/>;
        }
    };

    const {patient, caseNumber} = selectedCase;
    const name = patient ? `${patient.firstName} ${patient.surname}` : '';

    return (
        <>
            <PageContext.Provider value={{pageState, setPageState, fetchCase}}>
                <DetailsPage
                    title={name}
                    subTitle={`#${caseNumber}`}
                    onBackPress={() => {
                        navigation.navigate('CaseFiles');
                    }}
                    pageTabs={(
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={selectedTab}
                            onPressChange={handleTabPressChange}
                        />
                    )}
                >

                    <CasePageContent
                        overlayContent={getOverlayContent()}
                        overlayMenu={overlayMenu}
                        toggleActionButton={toggleActionButton}
                        actionDisabled={false}
                        selectedMenuItem={selectedMenuItem}
                        onOverlayTabPress={handleOverlayMenuPress}
                    />

                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

CasePage.propTypes = {};
CasePage.defaultProps = {};

const mapDispatchTopProp = dispatch => bindActionCreators({
    addNotification,
    setCaseEdit
}, dispatch);

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchTopProp)(CasePage);

function CasePageContent({
                             overlayContent,
                             overlayMenu,
                             selectedMenuItem,
                             onOverlayTabPress,
                             toggleActionButton,
                             actionDisabled
                         }) {
    useEffect(() => {
        console.log('Case Page Create');
    }, []);

    useEffect(() => {
        console.log('Case Page Update');
    });

    const FooterWrapper = styled.View`
        width: 100%;
        padding-right: 30px;
        padding-left: 30px;
        padding-bottom: 17px;
        position : absolute;
        bottom: 0;
        height: 60px;
    `;

    const FooterContainer = styled.View`
        width: 100%;
        height: 100%;
        flex-direction : row;
    `;

    return (
        <>
            {
                overlayContent
            }
            <FooterWrapper>
                <FooterContainer>
                    <CaseFileOverlayMenu
                        selectedMenuItem={selectedMenuItem}
                        overlayMenu={overlayMenu}
                        handleTabPress={onOverlayTabPress}
                    />
                    <FloatingActionButton
                        isDisabled={actionDisabled}
                        toggleActionButton={toggleActionButton}
                    />
                </FooterContainer>
            </FooterWrapper>
        </>
    );
}
