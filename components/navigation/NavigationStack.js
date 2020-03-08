import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './SuiteNavigator';

import React from "react";


/* Screens */
import Schedule from './../../page/Schedule';
import CaseFiles from '../../page/CaseFiles'

/* Providers*/
import {ScheduleProvider} from '../../contexts/ScheduleContext';
import NotFound from "../../page/NotFound";

/***
 *  Top level navigation Stack for Suites Application for the side navigation bar.
 *  https://reactnavigation.org/docs/4.x/app-containers/#props-of-createappcontainer-on-react-native
 *
 *  The params
 *  @icon : Name for the icon component.
 *  @tabName : Name displayed on the sidebar.
 *  @provider : Context provider that is passed in to the component.
 */
const SuitesNavigationStack = createSidebarNavigator(
  {
    Schedule: {
        screen: NotFound,
        params: {
            icon: 'schedule',
            tabName: 'schedule',
            provider: ScheduleProvider
        },
    },
    CaseFiles: {
        screen: NotFound,
        params: {
            icon: 'caseFiles',
            tabName: 'CaseFiles',
            provider: ScheduleProvider
        },
    },
    Theatre: {
        screen: NotFound,
        params: {
            icon: 'theatres',
            tabName: 'Theathre',
            provider: ScheduleProvider
        },
    },
    Inventory: {
        screen: NotFound,
        params: {
            icon: 'inventory',
            tabName: 'Inventory',
            provider: ScheduleProvider
        },
    },
    Equipment: {
        screen: NotFound,
        params: {
            icon: 'equipment',
            tabName: 'Equipment',
            provider: ScheduleProvider
        },
    },
    Orders: {
        screen: NotFound,
        params: {
            icon: 'orders',
            tabName: 'Orders',
            provider: ScheduleProvider
        },
    },
    Suppliers: {
        screen: NotFound,
        params: {
            icon: 'delivery',
            tabName: 'Suppliers',
            provider: ScheduleProvider
        },
    },
    Invoices: {
        screen: NotFound,
        params: {
            icon: 'invoices',
            tabName: 'Invoices',
            provider: ScheduleProvider
        },
    },
    Storage: {
        screen: NotFound,
        params: {
            icon: 'storage',
            tabName: 'Storage',
            provider: ScheduleProvider
        },
    },
    Physicians: {
        screen: NotFound,
        params: {
            icon: 'caseFiles',
            tabName: 'Physicians',
            provider: ScheduleProvider
        },
    },
    Procedures: {
        screen: NotFound,
        params: {
            icon: 'procedures',
            tabName: 'Procedures',
            provider: ScheduleProvider
        },
    },
    Alerts: {
        screen: NotFound,
        params: {
            icon: 'alerts',
            tabName: 'Alerts',
            provider: ScheduleProvider
        },
    },
    Help: {
        screen: NotFound,
        params: {
            icon: 'help',
            tabName: 'Help',
            provider: ScheduleProvider
        },
    },
    Settings: {
        screen: NotFound,
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
