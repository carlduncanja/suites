import React, { Component, useState, useEffect, useContext } from "react";
import Paginator from "./Paginator";
import { SuitesContext } from "../../../contexts/SuitesContext";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import SvgIcon from "../../../../assets/SvgIcon";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const PaginatorWrapper = styled.View`
position:absolute;
width:100%;
height:100%;
top:88%;
left:30%
`;
const PaginatorContainer = styled.View`
width:279px;
padding:10px 12px;
background-color:${({ theme }) => theme.colors["--default-shade-white"]};
box-shadow:${({ theme }) => theme.shadow["--shadow-lg"]};
border-radius:32px;
`;

const PaginatorView = styled.View`
flex-direction:row;
align-items:center;
justify-content:center;
`;

const NumberContainer = styled.View`
background-color:${({ theme }) => theme.colors["--color-neutral-gray-100"]};
border:1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
border-radius:4px;
padding:6px 12px;
width:199px;
height:35px;
margin-left:10px;
margin-right:10px

`

const SchedulePaginator = ({
  date = new Date(),
  goToNextDay,
  goToPreviousDay,
}) => {
  const [state] = useContext(SuitesContext);
  const theme = useTheme();






  return (
    <PaginatorWrapper>
      <PaginatorContainer theme={theme}>
        <PaginatorView>
          <TouchableOpacity onPress={goToPreviousDay}>
            <SvgIcon iconName="paginationPrev" strokeColor="#104587" />
          </TouchableOpacity>

          <NumberContainer>
            <Text style={styles.numbers}>{date} </Text>
          </NumberContainer>
          <TouchableOpacity onPress={goToNextDay}>
            <SvgIcon iconName="paginationNext" strokeColor="#104587" />
          </TouchableOpacity>
        </PaginatorView>
      </PaginatorContainer>
    </PaginatorWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    position: "absolute",
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paginator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numbersContainer: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#CCD6E0",
    borderRadius: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
  },
  numbers: {
    fontSize: 19,
    color: "#313539",
  },
});

export default SchedulePaginator;
