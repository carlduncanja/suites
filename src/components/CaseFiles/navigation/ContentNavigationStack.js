import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './menu';
import {Patient, MedicalStaff,MedicalHistory,Procedures,ChargeSheet} from './screens';

const sidebarNavigator = createSidebarNavigator(
  {
    Patient: {
      screen: Patient,
      params: {
        tabId : 'patient',
        tabName: 'Patient',
        icon: 'patientButton'
      },
    },
    Staff: {
      screen: MedicalStaff,
      params: {
        tabId : 'medicalStaff',
        tabName: 'Medical Staff',
        icon: 'medicalStaffButton'
      },
    },
    History: {
      screen: MedicalHistory,
      params: {
        tabId : 'medical',
        tabName: 'Medical History',
        icon: 'medicalHistoryButton'
      },
    },
    Procedures : {
      screen: Procedures,
        params: {
          tabId : 'caseProcedures',
          tabName: 'Procedures',
          icon: 'procedureButton',
        }
    },
    Charge: {
      screen: ChargeSheet,
      params: {
        tabId:'chargeSheet',
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