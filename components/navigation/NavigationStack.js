import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './SuiteNavigator';

import React from "react";


/* Screens */
import Schedule from './../../page/Schedule';
import CaseFiles from '../../page/CaseFiles'

/* Providers*/
import {ScheduleProvider} from '../../contexts/ScheduleContext';
import TestPage from "../../page/TestPage";

/***
 *
 * https://reactnavigation.org/docs/4.x/app-containers/#props-of-createappcontainer-on-react-native
 */
const SuitesNavigationStack = createSidebarNavigator(
  {
    Schedule: {
        screen: TestPage,
        params: {
            icon: 'schedule',
            tabName: 'schedule',
            provider: ScheduleProvider
        },
    },
    CaseFiles: {
        screen: TestPage,
        params: {
            icon: 'caseFiles',
            tabName: 'CaseFiles',
            provider: ScheduleProvider
        },
    },
    Theatre: {
        screen: TestPage,
        params: {
            icon: 'theatres',
            tabName: 'Theathre',
            provider: ScheduleProvider
        },
    },
    Inventory: {
        screen: TestPage,
        params: {
            icon: 'inventory',
            tabName: 'Inventory',
            provider: ScheduleProvider
        },
    },
    Equipment: {
        screen: TestPage,
        params: {
            icon: 'equipment',
            tabName: 'Equipment',
            provider: ScheduleProvider
        },
    },
    Orders: {
        screen: TestPage,
        params: {
            icon: 'orders',
            tabName: 'Orders',
            provider: ScheduleProvider
        },
    },
    Suppliers: {
        screen: TestPage,
        params: {
            icon: 'delivery',
            tabName: 'Suppliers',
            provider: ScheduleProvider
        },
    },
    Invoices: {
        screen: TestPage,
        params: {
            icon: 'invoices',
            tabName: 'Invoices',
            provider: ScheduleProvider
        },
    },
    Storage: {
        screen: TestPage,
        params: {
            icon: 'storage',
            tabName: 'Storage',
            provider: ScheduleProvider
        },
    },
    Physicians: {
        screen: TestPage,
        params: {
            icon: 'caseFiles',
            tabName: 'Physicians',
            provider: ScheduleProvider
        },
    },
    Procedures: {
        screen: TestPage,
        params: {
            icon: 'procedures',
            tabName: 'Procedures',
            provider: ScheduleProvider
        },
    },
    Alerts: {
        screen: TestPage,
        params: {
            icon: 'alerts',
            tabName: 'Alerts',
            provider: ScheduleProvider
        },
    },
    Help: {
        screen: TestPage,
        params: {
            icon: 'help',
            tabName: 'Help',
            provider: ScheduleProvider
        },
    },
    Settings: {
        screen: TestPage,
        params: {
            icon: 'settings',
            tabName: 'Settings',
            provider: ScheduleProvider
        },
    }
  },
  {
    initialRouteName: 'Schedule',
  },
);

/**
 * https://reactnavigation.org/docs/4.x/app-containers/#props-of-createappcontainer-on-react-native
 * @type {NavigationContainer}
 */
const SuitesAppContainer = createAppContainer(SuitesNavigationStack);

export default SuitesAppContainer
