import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import { useModal } from "react-native-modalfy";
import EmptyPaymentHistoryContainer from "../PurchaseOrders/EmptyPaymentHistoryContainer";
import AddIcon from "../../../assets/svg/addIcon";
import RemoveIcon from "../../../assets/svg/remove2";
import Footer from "../common/Page/Footer";
import ActionItem from "../common/ActionItem";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RegisterPaymentDialogContainer from "../PurchaseOrders/RegisterPaymentDialogContainer";
import RevertPaymentDialogContainer from "../PurchaseOrders/RevertPaymentDialogContainer";
import { registerPayment } from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
const LineDividerContainer = styled.View`
    margin-bottom : ${({ theme }) => theme.space['--space-32']};
`;


const PaymentHistoryTab = ({
    order,
}) => {

    const theme = useTheme();
    const modal = useModal();
    const baseStateRef = useRef();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;
    const [selectedPayment, setSelectedPayment] = useState({});
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const { payments } = order;

    const floatingActions = () => {

        const addItem = (
            <ActionItem
                title="Register Payment"
                icon={<AddIcon strokeColor={selectedPayment ? theme.colors['--color-green-700'] : theme.colors['--color-gray-600']} />}
                onPress={openRegisterPaymentDialog}
                disabled={!selectedPayment}
                touchable={selectedPayment}
            />
        );
        const revertPayment = (
            <ActionItem
                title="Revert Payment"
                icon={<RemoveIcon />}
                onPress={openRevertPaymentDialog}

            />
        )


        return <ActionContainer
            floatingActions={[
                addItem,
                revertPayment
            ]}
            title="PAYMENT ACTIONS"
        />;
    };

    const toggleActionButton = () => {
        setFloatingAction(true);

        modal.openModal('ActionContainerModal',
            {
                actions: floatingActions(),
                title: 'ORDER ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                },
            });
    };

    const handleAddPayment = (amount, receipt) => {
        registerPayment(order._id, { paid: amount, receiptId: receipt })
            .then(_ => successModal())
            .catch(_ => errorModal())
    }


    const openRegisterPaymentDialog = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <RegisterPaymentDialogContainer
                        headerTitle={"Register Payment"}
                        onCancel={() => { console.log("false") }}
                        handleDonePressed={handleAddPayment}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };
    
    const handleRevertPayment =(receipt)=>{
         console.log(receipt)
    }

    const openRevertPaymentDialog = () => {
        modal.closeModals('ActionContainerModal')
        modal.openModal('OverlayModal',
            {
                content: <RevertPaymentDialogContainer
                    headerTitle={"Revert Payment"}
                    onCancel={() => { console.log("false") }}
                    handleDonePressed={handleRevertPayment}
                />,
                onClose: () => setFloatingAction(false)
            }
        )
    }

    const successModal = () => {
        modal.openModal(
            'ConfirmationModal', {
            content: <ConfirmationComponent
                isError={false}
                isEditUpdate={false}
                onAction={() => {
                    modal.closeAllModals();
                }}
                onCancel={() => {
                    modal.closeAllModals();
                }}
            />,
            onClose: () => {
                modal.closeAllModals();
            }
        }
        );
    }

    const errorModal = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeAllModals()}
                />,
                onClose: () => {
                    modal.closeAllModals();
                }
            }
        );
    }


    return (
        <>
            {
                payments?.length ?

                    <></>
                    :
                    <EmptyPaymentHistoryContainer handleRegisterPayment={openRegisterPaymentDialog} />
            }


            <Footer
                hasPaginator={false}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
            />

        </>

    )
}

export default PaymentHistoryTab


