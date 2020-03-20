import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './menu';
import {Patient, MedicalStaff,MedicalHistory,Procedures,ChargeSheet} from './screens';

const sidebarNavigator = createSidebarNavigator(
  {
    Patient: {
      screen: Patient,
      params: {
        tabName: 'Patient',
        icon: 'patientButton'
      },
    },
    Staff: {
      screen: MedicalStaff,
      params: {
        tabName: 'Medical Staff',
        icon: 'medicalStaffButton'
      },
    },
    History: {
      screen: MedicalHistory,
      params: {
        tabName: 'Medical History',
        icon: 'medicalHistoryButton'
      },
    },
    Procedures : {
      screen: Procedures,
        params: {
          tabName: 'Procedures',
          icon: 'procedureButton',
        }
    },
    Charge: {
      screen: ChargeSheet,
      params: {
        tabName: 'Charge Sheet',
        icon: 'chargeSheetButton'
      },
    },
  },
  {
    initialRouteName: 'Patient',
  },
);

export default createAppContainer(sidebarNavigator);