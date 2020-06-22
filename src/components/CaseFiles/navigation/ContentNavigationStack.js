import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './menu';
import {Patient, MedicalStaff,MedicalHistory,Procedures,ChargeSheet} from './screens';

import PatientSelectedIcon from '../../../../assets/svg/overlayPatientSelected';
import PatientDisabledIcon from '../../../../assets/svg/overlayPatientDisabled';

import ProcedureSelectedIcon from '../../../../assets/svg/overlayProcedureSelected';
import ProcedureDisabledIcon from '../../../../assets/svg/overlayProcedureDisabled';

import MedicalSelectedIcon from '../../../../assets/svg/overlayMedicalHistorySelected';
import MedicalDisabledIcon from '../../../../assets/svg/overlayMedicalHistoryDisabled';

import StaffSelectedIcon from '../../../../assets/svg/overlayMedicalStaffSelected';
import StaffDisabledIcon from '../../../../assets/svg/overlayMedicalStaffDisabled';

import ChargeSheetSelectedIcon from '../../../../assets/svg/overlayChargeSheetSelected';
import ChargeSheetDisabledIcon from '../../../../assets/svg/overlayChargeSheetDisabled';

const sidebarNavigator = createSidebarNavigator( 
  {
    Patient: {
      screen: Patient,
      params: {
        tabId : 'patient',
        tabName: 'Patient',
        selectedIcon: <PatientSelectedIcon/>,
        disabledIcon: <PatientDisabledIcon/>
      },
    },
    Staff: {
      screen: MedicalStaff,
      params: {
        tabId : 'medicalStaff',
        tabName: 'Medical Staff',
        selectedIcon: <StaffSelectedIcon/>,
        disabledIcon: <StaffDisabledIcon/>
      },
    },
    History: {
      screen: MedicalHistory,
      params: {
        tabId : 'medical',
        tabName: 'Medical History',
        selectedIcon: <MedicalSelectedIcon/>,
        disabledIcon: <MedicalDisabledIcon/>
      },
    },
    Procedures : {
      screen: Procedures,
        params: {
          tabId : 'caseProcedures',
          tabName: 'Procedures',
          selectedIcon: <ProcedureSelectedIcon/>,
          disabledIcon: <ProcedureDisabledIcon/>
        }
    },
    Charge: {
      screen: ChargeSheet,
      params: {
        tabId:'chargeSheet',
        tabName: 'Charge Sheet',
        selectedIcon: <ChargeSheetSelectedIcon/>,
        disabledIcon: <ChargeSheetDisabledIcon/>
      },
    },
  },
  {
    initialRouteName: 'Patient',
  },
);

export default createAppContainer(sidebarNavigator);
