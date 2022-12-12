import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import { useModal } from "react-native-modalfy";
import EmptyPaymentHistoryContainer from "../PurchaseOrders/EmptyPaymentHistoryContainer";
import AddIcon from "../../../assets/svg/addIcon";
import Footer from "../common/Page/Footer";
import ActionItem from "../common/ActionItem";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RegisterPaymentDialogContainer from "../PurchaseOrders/RegisterPaymentDialogContainer";

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


        return <ActionContainer
            floatingActions={[
                addItem,
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

  
    const openRegisterPaymentDialog = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <RegisterPaymentDialogContainer
                        headerTitle={"Register Payment"}
                        onCancel={() => {console.log("false")}}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };


    return (
        <>
            {
                payments?.length ?

                    <></>
                    :
                    <EmptyPaymentHistoryContainer />
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


