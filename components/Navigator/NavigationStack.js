import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './SuiteNavigator';

/* Screens */
import Schedule from './../../page/Schedule';
import CaseFiles from '../../page/CaseFiles'

/* Providers*/
import {ScheduleProvider} from '../../contexts/ScheduleContext';
import TestPage from "../../page/TestPage";

/***
 *asdf
 *
 * @type {NavigationNavigator<any, NavigationProp<NavigationState>>}
 */
const sidebarNavigator = createSidebarNavigator(
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
        tabName: 'CaseFile',
        provider: ScheduleProvider
      },
    },
  },
  {
    initialRouteName: 'Schedule',
  },
);

export default createAppContainer(sidebarNavigator);
