import {createAppContainer} from 'react-navigation';
import React from 'react';
import {connect} from 'react-redux';
import {createSuitesSidebarNavigator} from '../SuiteNavigator';

/* Screens */
import SchedulePage from '../../page/Schedule/SchedulePage/SchedulePage';
import Theatres from '../../page/Theatres/Theatres';
import Inventory from '../../page/Inventory/Inventory';
import Storage from '../../page/Storage';
import Procedures from '../../page/Procedures';
import Physicians from '../../page/Physicians';
import Suppliers from '../../page/Suppliers';
import Equipment from '../../page/Equipment/Equipment';
import Orders from '../../page/PurchaseOrders/Orders';
import Alerts from '../../page/Alerts';
import Settings from '../../page/Settings';

import ProcedureNavigationStack from './ProcedureNavigationStack';
import CaseFileNavigationStack from './CaseFileNavigationStack';
import TheatreNavigationStack from './TheatreNavigationStack';
import OrderNavigationStack from './OrderNavigationStack';
import SupplierNavigationStack from './SupplierNavigationStack';
import StorageNavigationStack from './StorageNavigationStack';
import PhysicianNavigationStack from './PhysiciansNavigationStack';
import EquipmentNavigationStack from './EquipmentNavigationStack';
import InventoryNavigationStack from './InventoryNavigationStack';
import SettingsNavigationStack from './SettingsNavigationStack';

/* Providers*/
import NotFoundPage from '../../components/common/Page/NotFoundPage';

/* Icons */
import ScheduleIcon from '../../../assets/svg/schedule';
import CaseFileIcon from '../../../assets/svg/caseFile';
import TheatreIcon from '../../../assets/svg/theatre';
import InventoryIcon from '../../../assets/svg/inventory';
import EquipmentIcon from '../../../assets/svg/equipment';
import OrdersIcon from '../../../assets/svg/orders';
import DeliveryIcon from '../../../assets/svg/delivery';
import StorageIcon from '../../../assets/svg/storage';
import PhysiciansIcon from '../../../assets/svg/physicians';
import ProcedureIcon from '../../../assets/svg/procedures';
import SettingsIcon from '../../../assets/svg/settingsIcon';
import NotificationIcon from '../../../assets/svg/notificationIcon';
import {ROLES} from '../../const';
import UserPageIcon from '../../../assets/svg/UserPageIcon';
import UsersNavigationStack from './UsersNavigationStack';
import ScheduleNavigationStack from "./ScheduleNavigationStack";

const SuitesNavigator = createSuitesSidebarNavigator();

export const SuitesNavigationStack = ({auth = {}}) => {
    const isAdmin = auth.user.role_name === ROLES.ADMIN;

    // console.log('auth suites navigator', auth);

    return (
        <SuitesNavigator.Navigator
            initialRouteName="SchedulePage"
        >

            <SuitesNavigator.Screen
                name="SchedulePage"
                component={ScheduleNavigationStack}
                initialParams={{
                    icon: ScheduleIcon,
                    tabName: 'schedule',
                }}
            />

            <SuitesNavigator.Screen
                name="CaseFiles"
                component={CaseFileNavigationStack}
                initialParams={{
                    icon: CaseFileIcon,
                    tabName: 'Case Files',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Theatres"
                component={TheatreNavigationStack}
                initialParams={{
                    icon: TheatreIcon,
                    tabName: 'Theatres',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Inventory"
                component={InventoryNavigationStack}
                initialParams={{
                    icon: InventoryIcon,
                    tabName: 'Inventory',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Equipment"
                component={EquipmentNavigationStack}
                initialParams={{
                    icon: EquipmentIcon,
                    tabName: 'Equipment',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Orders"
                component={OrderNavigationStack}
                initialParams={{
                    icon: OrdersIcon,
                    tabName: 'Orders',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Suppliers"
                component={SupplierNavigationStack}
                initialParams={{
                    icon: DeliveryIcon,
                    tabName: 'Suppliers',
                    isAdmin
                }}
            />

            {/* <SuitesNavigator.Screen
                name="Invoices"
                component={NotFound}
                initialParams={{
                    icon: InvoiceIcon,
                    tabName: 'Invoices',
                }}
            /> */}

            <SuitesNavigator.Screen
                name="Storage"
                component={StorageNavigationStack}
                initialParams={{
                    icon: StorageIcon,
                    tabName: 'Storage',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Physicians"
                component={PhysicianNavigationStack}
                initialParams={{
                    icon: PhysiciansIcon,
                    tabName: 'Physicians',
                    isAdmin
                }}
            />

            <SuitesNavigator.Screen
                name="Procedures List"
                component={ProcedureNavigationStack}
                initialParams={{
                    icon: ProcedureIcon,
                    tabName: 'Procedures',
                    isAdmin
                }}
            />

            {
                isAdmin &&
                <SuitesNavigator.Screen
                    name="Users"
                    component={UsersNavigationStack}
                    initialParams={{
                        icon: UserPageIcon,
                        tabName: 'Users',
                    }}
                />
            }

            <SuitesNavigator.Screen
                name="Alerts"
                component={Alerts}
                initialParams={{
                    icon: NotificationIcon,
                    tabName: 'Alerts',
                    isAdmin
                }}
            />

            {/*<SuitesNavigator.Screen*/}
            {/*    name="Help"*/}
            {/*    component={NotFoundPage}*/}
            {/*    initialParams={{*/}
            {/*        icon: HelpIcon,*/}
            {/*        tabName: 'Help',*/}
            {/*    }}*/}
            {/*/>*/}

            <SuitesNavigator.Screen
                name="Settings"
                component={SettingsNavigationStack}
                initialParams={{
                    icon: SettingsIcon,
                    tabName: 'Settings',
                }}
            />

        </SuitesNavigator.Navigator>
    );
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(SuitesNavigationStack);
