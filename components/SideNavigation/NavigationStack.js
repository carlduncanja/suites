import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from './NavigationBar';
import Schedule from './../../page/Schedule';
import ScheduleTopBar from './../Schedule/ScheduleTopBar';

const sidebarNavigator = createSidebarNavigator(
  {
    Schedule: {
      screen: Schedule,
      params: {
        icon: 'schedule',
        tabName: 'schedule',
      },
    }
  },
  {
    initialRouteName: 'Schedule',
  },
);

export default createAppContainer(sidebarNavigator);