import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";
import React, { useState } from "react";
import { useModal } from "react-native-modalfy";
import SvgIcon from "../../../../assets/SvgIcon";
import { currencyFormatter, formatDate } from "../../../utils/formatter";
import BillingCaseProcedure from "./BillingCaseProcedure";
import EditProcedure from "./EditProcedure";

const BillingCardContainer = styled.ScrollView`
  padding-bottom: 100px;
`;

const BillingHeader = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space["--space-24"]};
`;

const RowItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StackedRecord = styled.View`
  display: flex;
  align-items: ${({ align = "flex-start" }) => align};
`;

const ChargeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors["--color-gray-200"]};
  padding: ${({ theme }) =>
    `${theme.space["--space-12"]} ${theme.space["--space-8"]}`};
  margin-bottom: ${({ theme }) => theme.space["--space-24"]};
`;

const SectionHeaderContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space["--space-16"]};
`;

const SectionContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space["--space-32"]};
`;

const ProcedureContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ProcedureHeaderContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space["--space-12"]};
`;

const ProcedureNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProcedureIconContainer = styled.View`
  padding-right: ${({ theme }) => theme.space["--space-14"]};
`;

const ProcedureDetailsContainer = styled.View`
  margin-left: ${({ theme }) => theme.space["--space-24"]};
  margin-bottom: ${({ theme }) => theme.space["--space-18"]};
`;

const EditButtonItem = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.space["--space-10"]};
`;

const BillingText = styled.Text(
  ({ theme, font = "--text-base-regular", color = "--color-gray-600" }) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 1,
  })
);

const BillingCaseCard = ({
  caseProcedures,
  isEditMode,
  onCaseProcedureBillablesChange,
  outstandingBalance,
  paymentDetails,
  overTimeData,
  procedureDetails,
  tabDetails,
  templateResourceLists,
}) => {
  const modal = useModal();
  const theme = useTheme();
  const { lastModified = "", procedures = [] } = tabDetails;

  const { serviceFee } = procedureDetails;
  const { lineItems = [] } = paymentDetails;

  const [billingProcedures, setBillingProcedures] = useState(caseProcedures);
  const [open, setOpen] = useState(true);

  const payments = lineItems.filter((lineItem) => lineItem.type === "payment");
  const discounts = lineItems.filter(
    (lineItem) => lineItem.type === "discount"
  );

  const totalDiscount = discounts.reduce(
    (acc, curr) => acc + (curr.unitPrice || 0),
    0
  );

  const onCreated = (id) => (data) => {
    const billingData = [...billingProcedures];
    const findIndex = billingData.findIndex(
      (obj) => obj.caseProcedureId === id
    );
    const selectedItem = billingData[findIndex];
    const updatedObj = {
      ...selectedItem,
      inventories: data.inventories,
      equipments: data.equipments,
      services: data.lineItems,
    };
    const updatedData = [
      ...billingData.slice(0, findIndex),
      updatedObj,
      ...billingData.slice(findIndex + 1),
    ];

    setBillingProcedures(updatedData);
    onCaseProcedureBillablesChange(updatedData);
    modal.closeModals("OverlayInfoModal");
  };

  const openActionContainer = (
    name,
    consumables,
    equipments,
    services,
    caseProcedureId
  ) => {
    modal.openModal("OverlayInfoModal", {
      overlayContent: (
        <EditProcedure
          onCreated={onCreated(caseProcedureId)}
          procedureName={name}
          consumables={consumables}
          equipments={equipments}
          services={services}
          tabs={["Consumables", "Equipments"]}
        />
      ),
    });
  };

  return (
    <BillingCardContainer>
      <BillingHeader theme={theme}>
        <RowItem>
          <StackedRecord>
            <BillingText
              theme={theme}
              style={css`
                padding-bottom: ${theme.space["--space-12"]};
              `}
            >
              Last Modified
            </BillingText>
            <BillingText
              theme={theme}
              color="--color-gray-800"
              font="--text-base-medium"
            >
              {formatDate(lastModified, "MMM D, YYYY")}
            </BillingText>
          </StackedRecord>

          <StackedRecord align="flex-end">
            <BillingText
              theme={theme}
              style={css`
                padding-bottom: ${theme.space["--space-12"]};
              `}
            >
              Adjusted Cost
            </BillingText>
            {totalDiscount === 0 ? (
              <BillingText
                theme={theme}
                color="--color-gray-800"
                font="--text-base-medium"
              >
                No Adjustments Yet
              </BillingText>
            ) : (
              <BillingText
                theme={theme}
                color="--color-gray-800"
                font="--text-base-medium"
              >
                <BillingText
                  theme={theme}
                  color="--accent-button"
                  font="--text-base-medium"
                >
                  discount:{" "}
                </BillingText>
                {`$ ${currencyFormatter(totalDiscount)} $ ${currencyFormatter(
                  serviceFee - totalDiscount
                )}`}
              </BillingText>
            )}
          </StackedRecord>
        </RowItem>

        <RowItem
          style={css`
            padding-top: ${theme.space["--space-32"]};
          `}
        >
          <StackedRecord>
            <BillingText
              theme={theme}
              style={css`
                padding-bottom: ${theme.space["--space-12"]};
              `}
            >
              Outstanding Balance
            </BillingText>
            <BillingText
              theme={theme}
              color="--color-red-600"
              font="--text-lg-medium"
            >
              $ {currencyFormatter(outstandingBalance)}
            </BillingText>
          </StackedRecord>

          <StackedRecord>
            <BillingText
              theme={theme}
              style={css`
                padding-bottom: ${theme.space["--space-12"]};
              `}
            >
              Initial Cost
            </BillingText>
            <BillingText
              theme={theme}
              color="--color-gray-800"
              font="--text-base-medium"
            >
              $ {currencyFormatter(serviceFee)}
            </BillingText>
          </StackedRecord>
        </RowItem>
      </BillingHeader>

      <>
        <ChargeHeader>
          <BillingText theme={theme} font="--text-sm-medium">
            Charge
          </BillingText>
          <BillingText theme={theme} font="--text-sm-medium">
            Cost
          </BillingText>
        </ChargeHeader>

        <SectionContainer>
          <SectionHeaderContainer theme={theme}>
            <BillingText
              theme={theme}
              font="--text-xs-medium"
              color="--color-blue-500"
            >
              PROCEDURE
            </BillingText>
          </SectionHeaderContainer>

          {billingProcedures.map((item, index) => {
            const {
              procedure = {},
              physicians = [],
              equipments = [],
              inventories = [],
              services = [],
              caseProcedureId = "",
            } = item;
            return (
              <ProcedureContainer>
                <ProcedureHeaderContainer
                  theme={theme}
                  onPress={() => setOpen(!open)}
                >
                  <ProcedureNameContainer>
                    <ProcedureIconContainer theme={theme}>
                      {open ? (
                        <SvgIcon iconName="hideProcedure" />
                      ) : (
                        <SvgIcon iconName="showProcedure" />
                      )}
                    </ProcedureIconContainer>
                    <BillingText theme={theme} color="--color-gray-700">
                      {procedure.name}
                    </BillingText>
                  </ProcedureNameContainer>

                  <BillingText
                    theme={theme}
                    color="--color-gray-700"
                    font="--text-lg-regular"
                  >{`$ ${currencyFormatter(serviceFee)}`}</BillingText>
                </ProcedureHeaderContainer>

                {open && (
                  <ProcedureDetailsContainer theme={theme}>
                    <BillingCaseProcedure
                      physicians={physicians}
                      equipments={equipments}
                      inventories={inventories}
                      overTimeData={overTimeData}
                      templateResourceLists={templateResourceLists}
                    />
                    {isEditMode && (
                      <EditButtonItem
                        activeOpacity={0.5}
                        onPress={() => {
                          openActionContainer(
                            procedure.name,
                            inventories,
                            equipments,
                            services,
                            caseProcedureId
                          );
                        }}
                      ></EditButtonItem>
                    )}
                  </ProcedureDetailsContainer>
                )}
              </ProcedureContainer>
            );
          })}
        </SectionContainer>

        {payments.length > 0 && (
          <SectionContainer theme={theme}>
            <SectionHeaderContainer theme={theme}>
              <BillingText
                theme={theme}
                font="--text-xs-medium"
                color="--color-blue-500"
              >
                PAYMENTS
              </BillingText>
            </SectionHeaderContainer>

            {payments.map((payment, index) => {
              return (
                <RowItem
                  style={css`
                    margin-left: ${theme.space["--space-24"]};
                    padding-bottom: ${index !== payments.length - 1 &&
                    theme.space["--space-18"]};
                  `}
                  key={index}
                >
                  <BillingText theme={theme} color="--color-gray-700">
                    {payment.name}
                  </BillingText>
                  <BillingText
                    theme={theme}
                    color="--color-gray-700"
                    font="--text-lg-regular"
                  >
                    - $ {currencyFormatter(payment.unitPrice)}
                  </BillingText>
                </RowItem>
              );
            })}
          </SectionContainer>
        )}

        {discounts.length > 0 && (
          <SectionContainer theme={theme}>
            <SectionHeaderContainer theme={theme}>
              <BillingText
                theme={theme}
                font="--text-xs-medium"
                color="--color-blue-500"
              >
                DISCOUNTS
              </BillingText>
            </SectionHeaderContainer>
            {discounts.map((discount, index) => {
              return (
                <RowItem
                  style={css`
                    margin-left: ${theme.space["--space-24"]};
                    padding-bottom: ${index !== discounts.length - 1 &&
                    theme.space["--space-18"]};
                  `}
                  key={index}
                >
                  <BillingText theme={theme} color="--color-gray-700">
                    {discount.name}
                  </BillingText>
                  <BillingText
                    theme={theme}
                    color="--color-gray-700"
                    font="--text-lg-regular"
                  >
                    - $ {currencyFormatter(discount.unitPrice)}
                  </BillingText>
                </RowItem>
              );
            })}
          </SectionContainer>
        )}
      </>
    </BillingCardContainer>
  );
};

export default BillingCaseCard;
