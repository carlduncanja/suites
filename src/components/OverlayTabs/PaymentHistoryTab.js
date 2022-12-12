import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import Row from "../common/Row";
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import { formatDate, formatToCurrency, handleNumberValidation } from "../../utils/formatter";
import { formatAmount } from "../../helpers/caseFilesHelpers";
import { transformToSentence } from "../../hooks/useTextEditHook";
import DateInputField from '../common/Input Fields/DateInputField';
import LineDivider from "../common/LineDivider";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import ConfirmationComponent from '../ConfirmationComponent';
import { getStorage, updatePurchaseOrder, updatePurchaseOrderDetails } from '../../api/network';
import { useModal } from "react-native-modalfy";
import FieldContainer from "../common/FieldContainerComponent";
import InputWrapper from "../common/Input Fields/InputWrapper";
import InputLabelComponent from "../common/InputLablel";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";
import Footer from "../common/Page/Footer";
import EmptyPaymentHistoryContainer from "../PurchaseOrders/EmptyPaymentHistoryContainer";

const LineDividerContainer = styled.View`
    margin-bottom : ${({ theme }) => theme.space['--space-32']};
`;


const PaymentHistoryTab = ({

}) => {

    const theme = useTheme();
    const modal = useModal();
    const baseStateRef = useRef();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

  
    return (
     <EmptyPaymentHistoryContainer></EmptyPaymentHistoryContainer>

    )
}

export default PaymentHistoryTab


