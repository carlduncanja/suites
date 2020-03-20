import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './tabsNavigator';
import Details from '../../../OverlayPages/Patient/Details';
import Insurance from '../../../OverlayPages/Patient/Insurance'
import Diagnosis from '../../../OverlayPages/Patient/Diagnosis'
import PatientRisk from '../../../OverlayPages/Patient/PatientRisk'

const sidebarNavigator = createSidebarNavigator(
  {
    Details: {
      screen: Details,
      params: {
        tabName: 'Details',
      },
    },
    Insurance: {
      screen: Insurance,
      params: {
        tabName: 'Insurance',
      },
    },
    Diagnosis: {
      screen: Diagnosis,
      params: {
        tabName: 'Diagnosis',
      },
    },
    PatientRisk : {
      screen: PatientRisk,
        params: {
          tabName: 'PatientRisk',
        }
    },
  },
  {
    initialRouteName: 'Details',
  },
);

export default createAppContainer(sidebarNavigator);