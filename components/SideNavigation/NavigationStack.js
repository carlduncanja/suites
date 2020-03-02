import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from './NavigationBar';
import Schedule from './../../page/Schedule';
import {ScheduleProvider} from '../../contexts/ScheduleContext';

const sidebarNavigator = createSidebarNavigator(
  {
    Schedule: {
      screen: Schedule,
      params: {
        icon: 'schedule',
        tabName: 'schedule',
        provider: ScheduleProvider
      },
    }
  },
  {
    initialRouteName: 'Schedule',
  },
);

export default createAppContainer(sidebarNavigator);