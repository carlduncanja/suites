import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './NavigationBar';

import React from "react";
import {Text, View} from "react-native";


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
