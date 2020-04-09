import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './SuiteNavigator';

import React from "react";


/* Screens */
import Schedule from '../../page/Schedule';
import CaseFiles from '../../page/CaseFiles'

/* Providers*/
import {ScheduleProvider} from '../../contexts/ScheduleContext';
import NotFound from "../../page/NotFound";


/* Icons */
import ScheduleIcon from "../../../assets/svg/schedule"
import CaseFileIcon from "../../../assets/svg/caseFile"
import TheathreIcon from "../../../assets/svg/threatre"
import InventoryIcon from "../../../assets/svg/caseFile"
import EquipmentIcon from "../../../assets/svg/equipment"
import OrdersIcon from "../../../assets/svg/equipment"
import DeliveryIcon from "../../../assets/svg/delivery"
import InvoiceIcon from "../../../assets/svg/invoices"
import StorageIcon from "../../../assets/svg/storage"
import PhysiciansIcon from "../../../assets/svg/physicians"
import ProcedureIcon from "../../../assets/svg/procedures"
import {CaseFileContextProvider} from "../../contexts/CaseFileContext";

/***
 *  Top level navigation Stack for Suites Application for the side navigation bar.
 *  https://reactnavigation.org/docs/4.x/app-containers/#props-of-createappcontainer-on-react-native
 *
 *  The params
 *  @icon : Icon component for sidebar tab.
 *  @tabName : Name displayed on the sidebar.
 *  @provider : Context provider that is passed in to the component.
 */
const SuitesNavigationStack = createSidebarNavigator(
  {
    Schedule: {
        screen: Schedule,
        params: {
            icon: ScheduleIcon,
            tabName: 'schedule',
            provider: ScheduleProvider
        },
    },
    CaseFiles: {
        screen: CaseFiles,
        params: {
            icon: CaseFileIcon,
            tabName: 'CaseFiles',
            provider: CaseFileContextProvider
        },
    },
    Theatre: {
        screen: NotFound,
        params: {
            icon: TheathreIcon,
            tabName: 'Theathre',
            provider: ScheduleProvider
        },
    },
    Inventory: {
        screen: NotFound,
        params: {
            icon: InventoryIcon,
            tabName: 'Inventory',
            provider: ScheduleProvider
        },
    },
    Equipment: {
        screen: NotFound,
        params: {
            icon: EquipmentIcon,
            tabName: 'Equipment',
            provider: ScheduleProvider
        },
    },
    Orders: {
        screen: NotFound,
        params: {
            icon: OrdersIcon,
            tabName: 'Orders',
            provider: ScheduleProvider
        },
    },
    Suppliers: {
        screen: NotFound,
        params: {
            icon: DeliveryIcon,
            tabName: 'Suppliers',
            provider: ScheduleProvider
        },
    },
    Invoices: {
        screen: NotFound,
        params: {
            icon: InvoiceIcon,
            tabName: 'Invoices',
            provider: ScheduleProvider
        },
    },
    Storage: {
        screen: NotFound,
        params: {
            icon: StorageIcon,
            tabName: 'Storage',
            provider: ScheduleProvider
        },
    },
    Physicians: {
        screen: NotFound,
        params: {
            icon: PhysiciansIcon,
            tabName: 'Physicians',
            provider: ScheduleProvider
        },
    },
    Procedures: {
        screen: NotFound,
        params: {
            icon: ProcedureIcon,
            tabName: 'Procedures',
            provider: ScheduleProvider
        },
    },
    Alerts: {
        screen: NotFound,
        params: {
            icon: CaseFileIcon,
            tabName: 'Alerts',
            provider: ScheduleProvider
        },
    },
    Help: {
        screen: NotFound,
        params: {
            icon: CaseFileIcon,
            tabName: 'Help',
            provider: ScheduleProvider
        },
    },
    Settings: {
        screen: NotFound,
        params: {
            icon: CaseFileIcon,
            tabName: 'Settings',
            provider: ScheduleProvider
        },
    }
  },
  {
    initialRouteName: 'CaseFiles',
  },
);

/**
 * https://reactnavigation.org/docs/4.x/app-containers/#props-of-createappcontainer-on-react-native
 * @type {NavigationContainer}
 */
const SuitesAppContainer = createAppContainer(SuitesNavigationStack);

export default SuitesAppContainer
