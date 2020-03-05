import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from './NavigationBar';

/* Screens */
import Schedule from './../../page/Schedule';
import CaseFiles from '../../page/CaseFiles'

/* Providers*/
import {ScheduleProvider} from '../../contexts/ScheduleContext';

/***
 *asdf
 *
 * @type {NavigationNavigator<any, NavigationProp<NavigationState>>}
 */
const sidebarNavigator = createSidebarNavigator(
  {
    Schedule: {
      screen: Schedule,
      params: {
        icon: 'schedule',
        tabName: 'schedule',
        provider: ScheduleProvider
      },
    },
    CaseFiles: {
      screen: CaseFiles,
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
