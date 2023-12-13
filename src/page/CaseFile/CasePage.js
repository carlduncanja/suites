import styled from "@emotion/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import jwtDecode from "jwt-decode";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from "../../../assets/svg/DownloadIcon";
import AcceptIcon from "../../../assets/svg/acceptIcon";
import DiscountIcon from "../../../assets/svg/discountIcon";
import GenerateIcon from "../../../assets/svg/generateIcon";
import ChargeSheetDisabledIcon from "../../../assets/svg/overlayChargeSheetDisabled";
import ChargeSheetSelectedIcon from "../../../assets/svg/overlayChargeSheetSelected";
import MedicalDisabledIcon from "../../../assets/svg/overlayMedicalHistoryDisabled";
import MedicalSelectedIcon from "../../../assets/svg/overlayMedicalHistorySelected";
import StaffDisabledIcon from "../../../assets/svg/overlayMedicalStaffDisabled";
import StaffSelectedIcon from "../../../assets/svg/overlayMedicalStaffSelected";
import PatientDisabledIcon from "../../../assets/svg/overlayPatientDisabled";
import PatientSelectedIcon from "../../../assets/svg/overlayPatientSelected";
import ProcedureDisabledIcon from "../../../assets/svg/overlayProcedureDisabled";
import ProcedureSelectedIcon from "../../../assets/svg/overlayProcedureSelected";
import PreviewIcon from "../../../assets/svg/previewIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import {
  applyPaymentsChargeSheetCall,
  applyPaymentsChargeSheetInvoiceCall,
  approveChargeSheetCall,
  createInvoiceViaQuotation,
  generateDocumentLink,
  generateInvoiceCall,
  generateQuotationCall,
  getCaseFileById,
  getProcedureById,
  getUserCall,
  removeQuotationCall,
  updateCaseQuotationStatus,
  updateChargeSheet,
  withdrawChargeSheetChangesCall,
} from "../../api/network";
import CaseFileOverlayMenu from "../../components/CaseFiles/CaseFileOverlayMenu";
import ReportPreview from "../../components/CaseFiles/Reports/ReportPreview";
import {
  ChargeSheet,
  MedicalHistory,
  MedicalStaff,
  Patient,
  Procedures,
} from "../../components/CaseFiles/navigation/screens";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import ActionItem from "../../components/common/ActionItem";
import DetailsPage from "../../components/common/DetailsPage/DetailsPage";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import FloatingActionButton from "../../components/common/FloatingAction/FloatingActionButton";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent";
import { LONG_PRESS_TIMER } from "../../const";
import { PageContext } from "../../contexts/PageContext";
import {
  useApplyDiscountModal,
  useConfirmationModal,
} from "../../hooks/SuitesHooks";
import { addNotification } from "../../redux/actions/NotificationActions";
import { setCaseEdit } from "../../redux/actions/casePageActions";
import { currencyFormatter, formatDate } from "../../utils/formatter";
import PayBalanceItem from "./PayBalanceItem";
import { setChargeSheetTab } from "../../redux/actions/casePageActions";

const overlayMenu = [
  {
    name: "Patient",
    overlayTabs: [
      "Details",
      "Insurance",
      "Diagnosis",
      "Patient Comments",
      "Covid Test",
    ],
    selectedIcon: <PatientSelectedIcon />,
    disabledIcon: <PatientDisabledIcon />,
  },
  {
    name: "Medical Staff",
    overlayTabs: ["Details"],
    selectedIcon: <StaffSelectedIcon />,
    disabledIcon: <StaffDisabledIcon />,
  },
  {
    name: "Medical History",
    authenticationRequired: "cases.read_medical_history",
    overlayTabs: ["Details", "Family History", "Lifestyle"],
    selectedIcon: <MedicalSelectedIcon />,
    disabledIcon: <MedicalDisabledIcon />,
  },
  {
    name: "Procedures",
    overlayTabs: ["Details"],
    selectedIcon: <ProcedureSelectedIcon />,
    disabledIcon: <ProcedureDisabledIcon />,
  },
  {
    name: "Charge Sheet",
    overlayTabs: [
      "Consumables",
      "Equipment",
      "Billing",
      "Quotation",
      "Invoices",
    ],
    selectedIcon: <ChargeSheetSelectedIcon />,
    disabledIcon: <ChargeSheetDisabledIcon />,
  },
];

const { name: initialMenuItem, overlayTabs: initialCurrentTabs } =
  overlayMenu[0];
const initialSelectedTab = initialCurrentTabs[0];

function CasePage({
  auth = {},
  route,
  addNotification,
  navigation,
  setSelectedTabRdx,
  chargeSheetTab,
}) {
  const {
    appointmentObj,
    permissions: casePermissions,
    timeStamp,
  } = route.params;
  const modal = useModal();
  const caseIdRef = useRef();
  const chargeSheetRef = useRef();
  const templateResourceListsRef = useRef();

  const { userToken } = auth;
  let authInfo = {};
  try {
    authInfo = jwtDecode(userToken);
  } catch (e) {
    console.log("failed to decode token", e);
  }

  const { caseId } = route.params;

  const [isFloatingActionDisabled, setFloatingAction] = useState(false); // TO-DO: Are these to be used somewhere?
  const [updateInfo, setUpdateInfo] = useState([]); // TO-DO: Are these to be used somewhere?
  const [selectedQuoteIds, setSelectedQuoteIds] = useState([]);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

  const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs);
  const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem);
  const [status, setStatus] = useState("");

  const [pageState, setPageState] = useState({
    isEditMode: false,
  });
  const [caseFile, setCaseFile] = useState({});
  const [userPermissions, setUserPermissions] = useState({});

  const renderConfirmationModal = useConfirmationModal();
  const renderApplyDiscModal = useApplyDiscountModal();

  useEffect(() => {
    if (caseIdRef.current !== caseId) {
      caseIdRef.current = caseId;
      setSelectedTabRdx("Details");
    }
    fetchCase(caseId);
    fetchUser(authInfo?.user_id);
  }, []);

  const { startTime: appointmentStartTime, endTime: appointmentEndTime } =
    caseFile.caseProcedures?.[0].appointment ?? {};

  useEffect(() => {
    const info = getProgressStatus(appointmentStartTime, appointmentEndTime);
    setStatus(info);
  }, [appointmentStartTime, appointmentEndTime]);

  const getProgressStatus = (startTime, endTime) => {
    const now = moment();
    const start = moment(startTime);
    const end = moment(endTime);

    if (now.isBefore(start)) {
      return "Not Yet Started";
    }
    if (now.isBefore(end)) {
      return "In Progress";
    }
    return "Ended";
  };

  const handleTabPressChange = (tab) => {
    if (!pageState.isEditMode) {
      setSelectedTabRdx(tab);
    }
  };

  const handleOverlayMenuPress = (selectedItem) => {
    if (pageState.isEditMode) return;

    const selectedMenu = overlayMenu.filter(
      (item) => item.name === selectedItem
    );
    const { name: menuItem, overlayTabs: currentTabs } = selectedMenu[0];
    const selectedTab = currentTabs[0];
    setSelectedMenuItem(menuItem);
    setCurrentTabs(currentTabs);
    setSelectedTabRdx(selectedTab);
  };

  const handleEditDone = (data) => {
    setUpdateInfo(data);
  };

  const setPageLoading = (value) => {
    setPageState({
      ...pageState,
      isLoading: value,
      isEdit: false,
    });
  };

  const handleConfirmChargeSheetChanges = (updateInfo) => {
    const onCancel = () => {
      modal.closeModals("ConfirmationModal");
      setPageState({
        ...pageState,
        isEditMode: true,
      });
    };
    const onAction = () => {
      updateCaseChargeSheet(updateInfo);
      setTimeout(() => {
        modal.closeModals("ConfirmationModal");
      }, 200);
    };
    renderConfirmationModal(
      null,
      true,
      false,
      "Confirm changes made",
      onAction,
      onCancel
    );
  };

  const updateCaseChargeSheet = (updateInfo) => {
    const onCancel = modal.closeAllModals;
    const onAction = onCancel;

    updateChargeSheet(caseId, updateInfo)
      .then((data) => {
        renderConfirmationModal("Ok", false, false, null, onAction, onCancel);
      })
      .catch((error) => {
        console.error("Failed to update chargesheet", error);
        renderConfirmationModal(null, false, true, null, onAction, onCancel);
      })
      .finally((_) => {
        console.log("Fetching case after updateCaseChargeSheet");
        fetchCase(caseId);
      });
  };

  const handleQuotes = (quotes) => {
    setSelectedQuoteIds(quotes);
  };

  const handleInvoices = (invoices) => {
    setSelectedInvoiceIds(invoices);
  };

  const onGenerateQuotation = () => {
    const onCancel = modal.closeAllModals;
    const onAction = () => {
      modal.closeAllModals();
      generateQuotation(caseId);
    };
    renderConfirmationModal(
      "Yes",
      true,
      false,
      "Do you wish to generate a new quotation?",
      onAction,
      onCancel
    );
  };

  const onGenerateInvoice = () => {
    const onCancel = modal.closeAllModals;
    const onAction = () => {
      modal.closeAllModals();
      generateInvoice(caseId);
    };
    const message =
      "Do you wish to generate a new Invoice? This will remove Inventory Items from the system.";
    renderConfirmationModal("Yes", true, false, message, onAction, onCancel);
  };

  const onPreviewInvoice = () => {
    const billingData = getBillingData();
    const { total = 0 } = getBillingData(); //To-do: should this be used?

    /**
     * Prepare Report Preview details from ChargeSheet data.
     *
     * Reports Data Requirements
     * 1. array of inventory list items that contains { name, unitCost, quantity }
     * 1. array of equipment list items that contains { name, unitCost, quantity }
     * 1. array of procedure list items that contains { procedureName, total }
     */

    const chargeSheet = caseFile?.chargeSheet;
    let details = {
      ...chargeSheet,
      inventoryList: chargeSheet.inventoryList.map((item) => {
        return {
          name: item?.inventory?.name,
          unitPrice: item?.inventory?.unitCost,
          quantity: item.amount,
        };
      }),
      equipmentList: chargeSheet.equipmentList.map((item) => {
        return {
          name: item?.equipment?.name,
          unitPrice: item?.equipment?.unitPrice,
          quantity: item?.amount,
        };
      }),
      proceduresBillableItems: chargeSheet.proceduresBillableItems.map(
        (item) => {
          return {
            procedureName: item?.procedureId?.name,
            total: item?.total,
          };
        }
      ),
    };

    modal.openModal("ReportPreviewModal", {
      content: (
        <ReportPreview
          type="Invoice"
          details={details}
          reportDetails={billingData}
        />
      ),
      onClose: () => {
        modal.closeModals("ActionContainerModal");
      },
    });
  };

  const onApplyDiscount = () => {
    const onCancel = () => {
      setFloatingAction(false);
      modal.closeAllModals();
    };
    const onClose = () => {
      setFloatingAction(false);
      modal.closeAllModals();
    };
    modal.closeAllModals();
    setTimeout(() => {
      renderApplyDiscModal(handlePayment, onCancel, onClose);
    }, 200);
  };

  const onPayBalance = () => {
    modal.closeAllModals();
    setTimeout(() => {
      modal.openModal("OverlayModal", {
        content: (
          <PayBalanceItem
            onAddPay={handlePayment}
            onCancel={() => {
              setFloatingAction(false);
              modal.closeAllModals();
            }}
          />
        ),
        onClose: () => {
          setFloatingAction(false);
          modal.closeAllModals();
        },
      });
    }, 200);
  };

  const onPayInvoiceBalance = (invoiceId) => {
    console.log("Invoice ID: ", invoiceId);
    modal.closeAllModals();
    setTimeout(() => {
      modal.openModal("OverlayModal", {
        content: (
          <PayBalanceItem
            onAddPay={(data) => handleInvoicePayment(invoiceId, data)}
            onCancel={() => {
              setFloatingAction(false);
              modal.closeAllModals();
            }}
          />
        ),
        onClose: () => {
          setFloatingAction(false);
          modal.closeAllModals();
        },
      });
    }, 200);
  };

  const handleInvoicePayment = (invoiceId, data) => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={false}
          error={false}
          isEditUpdate={true}
          onCancel={() => {
            modal.closeAllModals();
          }}
          onAction={() => {
            modal.closeAllModals();
            console.log("Payment data: ", data);
            applyInvoicePayment(invoiceId, data);
          }}
          message="Do you want to save your changes?"
          action="Yes"
        />
      ),
      onClose: () => modal.closeModals("ConfirmationModal"),
    });
  };

  const handlePayment = (data) => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={false}
          error={false}
          isEditUpdate={true}
          onCancel={() => {
            modal.closeAllModals();
          }}
          onAction={() => {
            modal.closeAllModals();
            console.log("Payment data: ", data);
            applyPayment(caseId, data);
          }}
          message="Do you want to save your changes?"
          action="Yes"
        />
      ),
      onClose: () => modal.closeModals("ConfirmationModal"),
    });
  };

  const onPatientUpdated = (data) => fetchCase(caseId);

  const onRiskUpdate = () => fetchCase(caseId);

  const toggleActionButton = () => {
    setFloatingAction(true);
    modal.openModal("ActionContainerModal", {
      actions: getFabActions(),
      title: "CASE ACTIONS",
      onClose: () => {
        setFloatingAction(false);
      },
    });
  };

  const fetchCase = (id) => {
    setPageLoading(true);
    getCaseFileById(id)
      .then((caseFile) => {
        setCaseFile(caseFile);
        const { _id: procedureId } = caseFile.caseProcedures[0].procedure;
        if (!templateResourceListsRef.current) {
          getProcedureById(procedureId).then((procedure) => {
            const { inventories, equipments } = procedure;
            templateResourceListsRef.current = {
              inventories,
              equipments,
            };
          });
        }
      })
      .catch((error) => {
        console.error("Failed to get case", error);
        navigation.replace("CaseFiles");
        Alert.alert(("Failed", "Failed to get details for case"));
      })
      .finally((_) => {
        setPageLoading(false);
      });
  };

  const fetchUser = (id) => {
    setPageLoading(true);
    getUserCall(id)
      .then((data) => {
        setUserPermissions(data.role?.permissions || {});
      })
      .catch((error) => {
        console.error("fetch.user.failed", error);
      })
      .finally((_) => setPageLoading(false));
  };

  const chargeSheetApproval = (params) => {
    setPageLoading(true);
    approveChargeSheetCall(caseId, params)
      .then((_) => {
        modal.openModal("ConfirmationModal", {
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
            console.log("Modal closed");
          },
        });
      })
      .catch((error) => {
        console.log("Failed to approve charge sheet", error);
        modal.openModal("ConfirmationModal", {
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
              message="Failed to Make Changes?"
              action="Ok"
            />
          ),
          onClose: () => {
            console.log("Modal closed");
          },
        });
      })
      .finally((_) => fetchCase(caseId));
  };

  const chargeSheetWithdrawChanges = () => {
    setPageLoading(true);
    withdrawChargeSheetChangesCall(caseId)
      .then((_) => {
        modal.openModal("ConfirmationModal", {
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
            console.log("Modal closed");
          },
        });
      })
      .catch((error) => {
        console.log("Failed to approve charge sheet", error);
        modal.openModal("ConfirmationModal", {
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
              message="Failed to Make Changes?"
              action="Ok"
            />
          ),
          onClose: () => {
            console.log("Modal closed");
          },
        });
      })
      .finally((_) => fetchCase(caseId));
  };

  const generateQuotation = (caseId) => {
    setPageLoading(true);
    generateQuotationCall(caseId)
      .then((quotation) => {
        addQuotationToCaseState(quotation);
        modal.openModal("ConfirmationModal", {
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
            console.log("Modal closed");
          },
        });
      })
      .catch((error) => {
        console.log("failed to create", error);
        modal.openModal("ConfirmationModal", {
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
              message="Failed to Generate Quotation?"
              action="Ok"
            />
          ),
          onClose: () => {
            console.log("Modal closed");
          },
        });
      })
      .finally((_) => {
        setPageLoading(false);
      });
  };

  const generateInvoice = (caseId) => {
    setPageLoading(true);
    generateInvoiceCall(caseId)
      .then((invoice) => {
        fetchCase(caseId);
        modal.openModal("ConfirmationModal", {
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
            console.log("Modal closed");
          },
        });
      })
      .catch((error) => {
        console.log("failed to create", error);
        modal.openModal("ConfirmationModal", {
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
              message="Failed to Generate Invoices."
              action="Ok"
            />
          ),
          onClose: () => {
            console.log("Modal closed");
          },
        });
      })
      .finally((_) => {
        setPageLoading(false);
      });
  };

  const applyPayment = (id, data) => {
    setPageLoading(true);
    applyPaymentsChargeSheetCall(id, data)
      .then((_) => {
        fetchCase(id);
        modal.openModal("ConfirmationModal", {
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
            modal.closeAllModals();
          },
        });
      })
      .catch((error) => {
        console.log("failed to apply appointment", error);
        modal.openModal("ConfirmationModal", {
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
              message="Failed to Apply Payment."
              action="Ok"
            />
          ),
          onClose: () => {
            modal.closeAllModals();
          },
        });
      })
      .finally((_) => {
        setPageLoading(false);
      });
  };

  const applyInvoicePayment = (invoiceId, data) => {
    setPageLoading(true);
    applyPaymentsChargeSheetInvoiceCall(caseId, invoiceId, data)
      .then((_) => {
        fetchCase(caseId);
        modal.openModal("ConfirmationModal", {
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
            modal.closeAllModals();
          },
        });
      })
      .catch((error) => {
        console.log("failed to apply payment", error);
        modal.openModal("ConfirmationModal", {
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
              message="Failed to Apply Payment."
              action="Ok"
            />
          ),
          onClose: () => {
            modal.closeAllModals();
          },
        });
      })
      .finally((_) => {
        setPageLoading(false);
      });
  };

  const addQuotationToCaseState = (newQuotations) => {
    const { quotations = [] } = caseFile;
    const updatedCase = { ...caseFile };
    updatedCase.quotations = [...quotations, newQuotations];
    setCaseFile(updatedCase);
  };

  const removeQuotationFromState = (quotationId) => {
    const { quotations = [] } = caseFile;
    const updatedCase = { ...caseFile };
    updatedCase.quotations = quotations.filter(
      (item) => item._id === quotationId
    );
    setCaseFile(updatedCase);
  };

  const onRemoveQuotations = (quotation) => {
    modal.openModal("ConfirmationModal", {
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
        console.log("Modal closed");
      },
    });
  };

  const removeQuotation = (caseId, quotationId) => {
    setPageLoading(true);
    removeQuotationCall(caseId, quotationId)
      .then((r) => {
        removeQuotationFromState(caseId, quotationId);
      })
      .catch((error) => {
        console.log("failed to remove quotation", error);
        modal.openModal("ConfirmationModal", {
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
            console.log("Modal closed");
          },
        });
      })
      .finally((_) => {
        setPageLoading(false);
      });
  };

  /**
   * Get the list of actions based on the current tab and sections
   */
  const getFabActions = () => {
    let title = "Actions";
    let floatingAction = [];

    console.log("getFabActions: selected tab", chargeSheetTab);
    console.log("Selected menu: ", selectedMenuItem);

    if (selectedMenuItem === "Charge Sheet") {
      switch (chargeSheetTab) {
        case "Consumables": {
          [floatingAction, title] = chargeSheetRef.current?.getActions() || [];

          break;
        }
        case "Equipment": {
          [floatingAction, title] = chargeSheetRef.current?.getActions() || [];

          break;
        }
        case "Quotation": {
          // Generate Actions depending on the quotation that was selected.

          if (selectedQuoteIds.length === 1) {
            const quotation = selectedQuoteIds[0];
            const removeQuotations = (
              <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={() => onRemoveQuotations(quotation)}
              >
                <ActionItem
                  title="Hold to Delete"
                  icon={<WasteIcon />}
                  onPress={() => {}}
                  touchable={false}
                />
              </LongPressWithFeedback>
            );
            const downloadQuotation = (
              <ActionItem
                title="Download Quotation"
                icon={<DownloadIcon />}
                onPress={() => downloadQuotationDocument(quotation)}
              />
            );

            console.log("selected quote id", quotation);

            floatingAction.push(removeQuotations);
            floatingAction.push(downloadQuotation);
          } else if (selectedQuoteIds.length > 1) {
          }

          title = "QUOTATION ACTIONS";
          break;
        }
        case "Invoices":
          {
            setSelectedInvoiceIds([]);
            const invoice = selectedInvoiceIds[0];
            console.log("selected invoice ids", selectedInvoiceIds);
            const downloadInvoice = (
              <ActionItem
                title="Download Invoice"
                icon={<DownloadIcon />}
                disabled={selectedInvoiceIds.length !== 1}
                onPress={() => downloadInvoiceDocument(invoice)}
              />
            );

            const payBalanceAction = (
              <ActionItem
                title="Pay Balance"
                icon={<AcceptIcon />}
                disabled={selectedInvoiceIds.length !== 1}
                onPress={() => onPayInvoiceBalance(invoice?._id)}
              />
            );

            floatingAction.push(downloadInvoice, payBalanceAction);
          }
          break;
        case "Billing": {
          const applyDiscountAction = (
            <ActionItem
              title="Apply Discount"
              icon={<DiscountIcon />}
              onPress={() => onApplyDiscount()}
            />
          );
          const generateQuotationAction = (
            <ActionItem
              title="Generate Quotation"
              icon={<GenerateIcon />}
              onPress={() => onGenerateQuotation()}
            />
          );
          const generateInvoiceAction = (
            <ActionItem
              title="Generate Invoice"
              icon={<GenerateIcon />}
              onPress={() => onGenerateInvoice()}
            />
          );

          const previewInvoice = (
            <ActionItem
              title="Preview Invoice"
              icon={<PreviewIcon />}
              onPress={onPreviewInvoice}
            />
          );

          const payBalanceAction = (
            <ActionItem
              title="Pay Balance"
              icon={<AcceptIcon />}
              onPress={() => onPayBalance()}
            />
          );

          floatingAction.push(
            applyDiscountAction,
            generateQuotationAction,
            generateInvoiceAction,
            previewInvoice,
            payBalanceAction
          );

          title = "BILLING ACTIONS";
          break;
        }
      }
    } else if (selectedMenuItem === "Procedures") {
    }

    return <ActionContainer floatingActions={floatingAction} title={title} />;
  };

  const onCreateInvoice = (caseId, quotationId) => () => {
    modal.closeAllModals();
    createInvoiceViaQuotation(caseId, quotationId)
      .then((data) => {
        console.log("Invoice Record:", data);

        addNotification("Inventory items have been removed.", "Inventory");

        fetchCase(caseId);
      })
      .catch((error) => {
        console.log("Failed to create invoice", error);
        Alert.alert("Sorry", "Failed to generate invoice, please try again");
      })
      .finally((_) => {
        modal.closeAllModals();
      });
  };

  const getBillingData = () => {
    const { chargeSheet = {}, caseProcedures: procedures = [] } = caseFile;
    const { proceduresBillableItems = [], total = 0, lineItems } = chargeSheet;
    let totalDiscount = 0;

    for (const discount of lineItems) {
      totalDiscount += discount.unitPrice;
    }

    const LINE_ITEM_TYPES = {
      DISCOUNT: "discount",
      SERVICE: "service",
      PROCEDURES: "procedures",
      PHYSICIANS: "physician",
    };

    const billing = {
      total,
      hasDiscount: true,
      discount: totalDiscount,
      procedures: [],
    };

    for (const proceduresBillableItem of proceduresBillableItems) {
      const {
        lineItems = [],
        inventories,
        equipments,
        caseProcedureId,
      } = proceduresBillableItem;

      const caseProcedure =
        procedures.find(
          (item) => item._id === proceduresBillableItem.caseProcedureId
        ) || {};
      const caseAppointment = caseProcedure.appointment || {};

      const title = caseAppointment.title ? caseAppointment.title : "";

      const name = `${title} (${formatDate(
        caseAppointment.startTime,
        "MMM D - h:mm a"
      )})`;

      const billingItem = {
        caseProcedureId,
        discounts: [],
        physicians: [],
        services: [],
        procedures: [],
        procedure: {
          name: name || proceduresBillableItem.caseProcedureId,
          cost: proceduresBillableItem.total,
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

      billingItem.inventories = inventories.map((item) => ({
        _id: item._id,
        inventory: item?.inventory?._id,
        amount: item.amount,
        name: item.inventory?.name,
        unitCost: item.inventory?.unitCost || 0,
      }));

      billingItem.equipments = equipments.map((item) => ({
        _id: item?._id,
        equipment: item.equipment?._id,
        amount: item.amount,
        name: item.equipment?.name,
        unitCost: item.equipment?.unitPrice || 0,
      }));

      billing.procedures.push(billingItem);
    }

    return billing;
  };

  const downloadInvoiceDocument = async (invoice) => {
    const {
      invoices,
      chargeSheet = {},
      caseProcedures: procedures = [],
    } = caseFile;
    const { proceduresBillableItems = [], total = 0 } = chargeSheet;

    const LINE_ITEM_TYPES = {
      DISCOUNT: "discount",
      SERVICE: "service",
      PROCEDURES: "procedures",
      PHYSICIANS: "physician",
    };

    const billing = {
      total,
      hasDiscount: true,
      discount: 0.15,
      procedures: [],
    };

    for (const proceduresBillableItem of proceduresBillableItems) {
      const {
        lineItems = [],
        inventories,
        equipments,
        caseProcedureId,
      } = proceduresBillableItem;

      const caseProcedure =
        procedures.find(
          (item) => item._id === proceduresBillableItem.caseProcedureId
        ) || {};
      const caseAppointment = caseProcedure.appointment || {};

      const title = caseAppointment.title ? caseAppointment.title : "";

      const name = `${title} (${formatDate(
        caseAppointment.startTime,
        "MMM D - h:mm a"
      )})`;

      const billingItem = {
        caseProcedureId,
        discounts: [],
        physicians: [],
        services: [],
        procedures: [],
        procedure: {
          name: name || proceduresBillableItem.caseProcedureId,
          cost: proceduresBillableItem.total,
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

      billingItem.inventories = inventories.map((item) => ({
        _id: item._id,
        inventory: item?.inventory?._id,
        amount: item.amount,
        name: item.inventory?.name,
        cost: item.inventory?.unitCost || 0,
      }));

      billingItem.equipments = equipments.map((item) => ({
        _id: item?._id,
        equipment: item.equipment?._id,
        amount: item.amount,
        name: item.equipment?.name,
        cost: item.equipment?.unitPrice || 0,
      }));

      billing.procedures.push(billingItem);
    }

    const { discount = 0, hasDiscount = false, tax = 0 } = billing;

    let data = {
      key: "suites_invoice_generated",
      is_pdf: true,
      from_html: true,
    };
    const args = {
      suites_contact_number: "876-324-9087",
      suites_email: "thesuites@gmail.com",
      suites_website: "thesuites.com",
      suites_address_line_1: "12 Ruthven Road",
      suites_address_line_2: "Half Way Tree Road",
      suites_address_line_3: "Kingston 10",
    };

    invoices.map((inv) => {
      if (inv._id === invoice._id) {
        const total = hasDiscount
          ? (inv.amountDue - inv.amountDue * discount) * (1 + tax)
          : inv.amountDue * (1 + tax);
        const formatDiscount = inv.amountDue * discount;

        const physiciansArray = [];
        const proceduresArray = [];
        const servicesArray = [];
        let inventoriesArray = [];

        billing.procedures.map((item) => {
          const {
            physicians = [],
            services = [],
            procedures = [],
            inventories = [],
            equipments = [],
          } = item;
          physicians.map((physician) => {
            physiciansArray.push({
              name: physician.name || "",
              cost:
                `$${currencyFormatter(
                  physician.unitPrice * physician.quantity
                )}` || 0,
            });
          });
          procedures.map((procedure) => {
            proceduresArray.push({
              name: procedure.name || "",
              cost:
                `$${currencyFormatter(
                  procedure.unitPrice * procedure.quantity
                )}` || 0,
            });
          });
          services.map((service) => {
            servicesArray.push({
              name: service.name || "",
              cost:
                `$${currencyFormatter(service.unitPrice * service.quantity)}` ||
                0,
            });
          });

          inventoriesArray = [...inventories, ...equipments];
        });

        const summarydetails = [
          ...physiciansArray,
          ...proceduresArray,
          ...servicesArray,
        ];
        const consumabledetails = [];

        inventoriesArray.map((inventory) => {
          const { name, cost, amount } = inventory;

          consumabledetails.push({
            name,
            quantity: amount,
            price: `$${currencyFormatter(cost)}`,
            total: `$${currencyFormatter(cost * amount)}`,
          });
        });

        args.total = `$${currencyFormatter(total)}`;
        args.customer_name = inv.customerDetails.name;
        args.customer_address_line_1 = inv.customerDetails.address.line1;
        args.customer_address_line_2 =
          inv.customerDetails.address.line2 ||
          inv.customerDetails.address.parish;
        args.customer_address_line_3 =
          inv.customerDetails.address.postalCode ||
          inv.customerDetails.address.city;
        args.invoice_number = inv.invoiceNumber;
        args.quotation_purpose = "Medical Supplies";
        args.date = formatDate(inv.createdAt, "DD/MM/YYYY");
        args.summarydetails = summarydetails;
        args.consumabledetails = consumabledetails;
        args.subtotal = `$${currencyFormatter(inv.amountDue)}`;
        args.discount = `-$${currencyFormatter(formatDiscount)}`;
        args.tax = `${tax * 100}%`;
      }
    });

    data = {
      ...data,
      args,
    };

    // build args to pass to document generation endpoint; pass result of that endpoint to downloadAsync
    try {
      modal.closeModals("ActionContainerModal");
      setPageLoading(true);
      const response = await generateDocumentLink(data);

      const fileUrl = response?.url;
      const filenameParts = fileUrl.split("/");
      const filename = filenameParts[filenameParts.length - 1];

      FileSystem.downloadAsync(
        fileUrl,
        `${FileSystem.cacheDirectory}${filename}`
      )
        .then(({ uri }) => {
          console.info(`download.path::${uri}`);

          Sharing.shareAsync(uri, { UTI: "pdf" })
            .then((result) => console.info("sharing.success", result))
            .catch((error) => console.log("sharing.error", error));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((_) => {
          setPageLoading(false);
          modal.closeAllModals();
        });
    } catch (error) {
      console.log(error);
      setPageLoading(false);
      modal.closeAllModals();
    }
  };

  const downloadQuotationDocument = async (quotation) => {
    const {
      quotations,
      chargeSheet = {},
      caseProcedures: procedures = [],
    } = caseFile;
    const { proceduresBillableItems = [], total = 0 } = chargeSheet;

    // preparing billing information
    const LINE_ITEM_TYPES = {
      DISCOUNT: "discount",
      SERVICE: "service",
      PROCEDURES: "procedures",
      PHYSICIANS: "physician",
    };

    const billing = {
      total,
      hasDiscount: true,
      discount: 0.15,
      procedures: [],
    };

    // todo: eval what's actually needed here
    for (const proceduresBillableItem of proceduresBillableItems) {
      const {
        lineItems = [],
        inventories,
        equipments,
        caseProcedureId,
      } = proceduresBillableItem;

      const caseProcedure =
        procedures.find(
          (item) => item._id === proceduresBillableItem.caseProcedureId
        ) || {};
      const caseAppointment = caseProcedure.appointment || {};

      const title = caseAppointment.title ? caseAppointment.title : "";

      const name = `${title} (${formatDate(
        caseAppointment.startTime,
        "MMM D - h:mm a"
      )})`;

      const billingItem = {
        caseProcedureId,
        discounts: [],
        physicians: [],
        services: [],
        procedures: [],
        procedure: {
          name: name || proceduresBillableItem.caseProcedureId,
          cost: proceduresBillableItem.total,
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

      billingItem.inventories = inventories.map((item) => ({
        _id: item._id,
        inventory: item?.inventory?._id,
        amount: item.amount,
        name: item.inventory?.name,
        cost: item.inventory?.unitCost || 0,
      }));

      billingItem.equipments = equipments.map((item) => ({
        _id: item?._id,
        equipment: item.equipment?._id,
        amount: item.amount,
        name: item.equipment?.name,
        cost: item.equipment?.unitPrice || 0,
      }));

      billing.procedures.push(billingItem);
    }

    const { discount = 0, hasDiscount = false, tax = 0 } = billing;

    let data = {
      key: "suites_quotation_generated",
      is_pdf: true,
      from_html: true,
    };
    const args = {
      suites_contact_number: "876-324-9087",
      suites_email: "thesuites@gmail.com",
      suites_website: "thesuites.com",
      suites_address_line_1: "12 Ruthven Road",
      suites_address_line_2: "Half Way Tree Road",
      suites_address_line_3: "Kingston 10",
    };

    quotations.map((q) => {
      if (q._id === quotation) {
        const total = hasDiscount
          ? (q.amountDue - q.amountDue * discount) * (1 + tax)
          : q.amountDue * (1 + tax);
        const formatDiscount = q.amountDue * discount;

        const physiciansArray = [];
        const proceduresArray = [];
        const servicesArray = [];
        let inventoriesArray = [];

        billing.procedures.map((item) => {
          const {
            physicians = [],
            services = [],
            procedures = [],
            inventories = [],
            equipments = [],
          } = item;
          physicians.map((physician) => {
            physiciansArray.push({
              name: physician.name || "",
              cost:
                `$${currencyFormatter(
                  physician.unitPrice * physician.quantity
                )}` || 0,
            });
          });
          procedures.map((procedure) => {
            proceduresArray.push({
              name: procedure.name || "",
              cost:
                `$${currencyFormatter(
                  procedure.unitPrice * procedure.quantity
                )}` || 0,
            });
          });
          services.map((service) => {
            servicesArray.push({
              name: service.name || "",
              cost:
                `$${currencyFormatter(service.unitPrice * service.quantity)}` ||
                0,
            });
          });

          inventoriesArray = [...inventories, ...equipments];
        });

        const summarydetails = [
          ...physiciansArray,
          ...proceduresArray,
          ...servicesArray,
        ];
        const consumabledetails = [];

        inventoriesArray.map((inventory) => {
          const { name, cost, amount } = inventory;

          consumabledetails.push({
            name,
            quantity: amount,
            price: `$${currencyFormatter(cost)}`,
            total: `$${currencyFormatter(cost * amount)}`,
          });
        });

        args.total = `$${currencyFormatter(total)}`;
        args.customer_name = q.customerDetails.name;
        args.customer_address_line_1 = q.customerDetails.address.line1;
        args.customer_address_line_2 =
          q.customerDetails.address.line2 || q.customerDetails.address.parish;
        args.customer_address_line_3 =
          q.customerDetails.address.postalCode ||
          q.customerDetails.address.city;
        args.quotation_number = q.quotationNumber;
        args.quotation_purpose = "Medical Supplies";
        args.date = formatDate(q.createdAt, "DD/MM/YYYY");
        args.summarydetails = summarydetails;
        args.consumabledetails = consumabledetails;
        args.subtotal = `$${currencyFormatter(q.amountDue)}`;
        args.discount = `-$${currencyFormatter(formatDiscount)}`;
        args.tax = `${tax * 100}%`;
      }
    });

    data = {
      ...data,
      args,
    };

    // build args to pass to document generation endpoint; pass result of that endpoint to downloadAsync
    try {
      setPageLoading(true);
      const response = await generateDocumentLink(data);

      const fileUrl = response?.url;
      const filenameParts = fileUrl.split("/");
      const filename = filenameParts[filenameParts.length - 1];

      FileSystem.downloadAsync(
        fileUrl,
        `${FileSystem.cacheDirectory}${filename}`
      )
        .then(({ uri }) => {
          console.info(`download.path::${uri}`);

          Sharing.shareAsync(uri, { UTI: "pdf" })
            .then((result) => console.info("sharing.success", result))
            .catch((error) => console.log("sharing.error", error));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((_) => {
          setPageLoading(false);
          modal.closeAllModals();
        });
    } catch (error) {
      console.log(error);
      setPageLoading(false);
      modal.closeAllModals();
    }
  };

  const getIsEditable = () => {
    switch (selectedMenuItem) {
      case "Medical Staff":
        return (
          chargeSheetTab === "Insurance" ||
          chargeSheetTab === "Diagnosis" ||
          chargeSheetTab === "Patient Comments"
        );
      case "Medical History":
        true;

      case "Medical Staff":
        return (
          chargeSheetTab === "Insurance" ||
          chargeSheetTab === "Diagnosis" ||
          chargeSheetTab === "Patient Comments"
        );
      default:
        return false;
    }
  };

  const getOverlayContent = () => {
    const {
      patient = {},
      staff = {},
      chargeSheet = {},
      caseProcedures = [],
      quotations = [],
      invoices = [],
    } = caseFile;
    const { medicalInfo = {} } = patient;
    const { proceduresBillableItems } = chargeSheet;

    switch (selectedMenuItem) {
      case "Patient":
        return (
          <Patient
            patient={patient}
            procedures={caseProcedures}
            selectedTab={chargeSheetTab}
            onPatientUpdated={onPatientUpdated}
            onRiskUpdate={onRiskUpdate}
            isEditMode={pageState.isEditMode}
          />
        );
      case "Medical Staff":
        return (
          <MedicalStaff
            staff={staff}
            selectedTab={chargeSheetTab}
            isEditMode={pageState.isEditMode}
            modal={modal}
            caseId={caseId}
            refreshData={() => {
              fetchCase(caseId);
            }}
          />
        );
      case "Medical History":
        return (
          <MedicalHistory
            medicalInfo={medicalInfo}
            selectedTab={chargeSheetTab}
            patient={patient}
            setPageState={setPageState}
            fetchCase={() => fetchCase(caseId)}
          />
        );
      case "Procedures":
        return (
          <Procedures
            procedures={caseProcedures}
            proceduresBillableItems={proceduresBillableItems}
            caseId={caseId}
          />
        );
      case "Charge Sheet":
        return (
          <ChargeSheet
            chargeSheet={chargeSheet}
            chargeSheetApproval={chargeSheetApproval}
            handleEditDone={handleEditDone}
            handleInvoices={handleInvoices}
            handleQuotes={handleQuotes}
            invoices={invoices}
            onUpdateChargeSheet={(data) =>
              handleConfirmChargeSheetChanges(data)
            }
            onWithdrawChanges={chargeSheetWithdrawChanges}
            procedures={caseProcedures}
            quotations={quotations}
            ref={chargeSheetRef}
            selectedTab={chargeSheetTab}
            templateResourceLists={templateResourceListsRef.current}
          />
        );
      default:
        return <View />;
    }
  };

  const { patient, caseNumber } = caseFile;
  const name = patient ? `${patient.firstName} ${patient.surname}` : "";

  return (
    <PageContext.Provider
      value={{
        pageState,
        setPageState,
        fetchCase,
      }}
    >
      <DetailsPage
        isEditable={casePermissions.update}
        timeStamp={timeStamp}
        status={status}
        appointmentObj={
          appointmentObj || caseFile.caseProcedures?.[0].appointment
        }
        caseId={caseId}
        proceduresBillableItemsInfo={caseFile?.chargeSheet ?? []}
        headerChildren={[name, `#${caseNumber}`]}
        updatePhysician={casePermissions.update}
        onBackPress={() => {
          navigation.navigate("CaseFiles");
          setSelectedTabRdx("Details");
        }}
        selectedTab={chargeSheetTab}
        isArchive={getIsEditable()}
        pageTabs={
          <TabsContainer
            tabs={currentTabs}
            selectedTab={chargeSheetTab}
            onPressChange={handleTabPressChange}
          />
        }
      >
        <CasePageContent
          overlayContent={getOverlayContent()}
          overlayMenu={overlayMenu}
          userPermissions={userPermissions}
          toggleActionButton={toggleActionButton}
          actionDisabled={false}
          selectedMenuItem={selectedMenuItem}
          onOverlayTabPress={handleOverlayMenuPress}
        />
      </DetailsPage>
    </PageContext.Provider>
  );
}

const mapDispatchTopProp = (dispatch) =>
  bindActionCreators(
    {
      addNotification,
      setCaseEdit,
      setSelectedTabRdx: setChargeSheetTab,
    },
    dispatch
  );

const mapStateToProps = (state) => ({
  auth: state.auth,
  chargeSheetTab: state.casePage.chargeSheetTab,
});

export default connect(mapStateToProps, mapDispatchTopProp)(CasePage);

function CasePageContent({
  overlayContent,
  overlayMenu,
  userPermissions,
  selectedMenuItem,
  onOverlayTabPress,
  toggleActionButton,
  actionDisabled,
}) {
  const FooterWrapper = styled.View`
    width: 100%;
    padding-right: 30px;
    padding-left: 30px;
    padding-bottom: 17px;
    position: absolute;
    bottom: 0;
    height: 60px;
  `;

  const FooterContainer = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: row;
  `;

  return (
    <>
      {overlayContent}
      <FooterWrapper>
        <FooterContainer>
          <CaseFileOverlayMenu
            selectedMenuItem={selectedMenuItem}
            overlayMenu={overlayMenu}
            permissions={userPermissions}
            handleTabPress={onOverlayTabPress}
          />
          <FloatingActionButton
            isDisabled={actionDisabled}
            toggleActionButton={toggleActionButton}
            hasActions={true}
          />
        </FooterContainer>
      </FooterWrapper>
    </>
  );
}
