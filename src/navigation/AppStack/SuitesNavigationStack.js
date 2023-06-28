import { createAppContainer } from 'react-navigation';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createSuitesSidebarNavigator } from '../SuiteNavigator';

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
import LostConnectionPage from '../../components/common/Page/LostConnectionPage';

/* Icons */
import InvoiceIcon from '../../../assets/svg/invoices';
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
import { ROLES } from '../../const';
import UserPageIcon from '../../../assets/svg/UserPageIcon';
import UsersNavigationStack from './UsersNavigationStack';
import ScheduleNavigationStack from "./ScheduleNavigationStack";
import InvoicesNavigationStack from './InvoicesNavigationStack';
import ConnectionIcon from '../../../assets/svg/lostConnection';
import { getUserCall } from '../../api/network';


const SuitesNavigator = createSuitesSidebarNavigator();

export const SuitesNavigationStack = ({ auth = {} }) => {
    const isAdmin = auth.user.role_name === ROLES.ADMIN;
    // fetchUser(auth?.user.user_id);

    const [userPermissions, setUserPermissions] = useState({});

    const fetchUser = id => {
        getUserCall(id)
            .then(data => {
                setUserPermissions(data.role?.permissions || {});
            })
            .catch(error => {
                console.error('fetch.user.failed', error);
            })
            .finally();
    };

    useEffect(() => {
        fetchUser(auth.user.user_id);
    }, [auth]);


    const ViewProcedures = userPermissions?.['procedures']?.['read'];
    const ViewCase = userPermissions?.['cases']?.['read'];
    const ViewEquipment = userPermissions?.['equipment_type']?.['read'];

    const ViewTheatre = userPermissions?.['theatres']?.['read'];

    const ViewAlerts = userPermissions?.['alerts']?.['read'];

    const ViewSettings = userPermissions?.['settings']?.['read'];

    const ViewPhysicians = userPermissions?.['physicians']?.['read'];

    const ViewUsers = userPermissions?.['users']?.['read'];

    const ViewPurchaseOrders = userPermissions?.['purchase_orders']?.['read'];

    const ViewInventory = userPermissions?.['inventory_groups']?.['read'];

    const ViewStrorageLocation = userPermissions?.['storage_locations']?.['read']

    const ViewSuppliers = userPermissions?.['suppliers']?.['read']


    // the invioces section was removed becuase of the changes to the purchase order section 
    /* <SuitesNavigator.Screen
                 name="Invoices"
                 component={InvoicesNavigationStack}
                 initialParams={{
                     icon: InvoiceIcon,
                     tabName: 'Invoices',
                 }}
             />*/

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

            {ViewCase &&
                <SuitesNavigator.Screen
                    name="CaseFiles"
                    component={CaseFileNavigationStack}
                    initialParams={{
                        icon: CaseFileIcon,
                        tabName: 'Case Files',
                        isAdmin,
                        userPermissions
                    }}
                />
            }

            {
                ViewTheatre &&

                <SuitesNavigator.Screen
                    name="Theatres"
                    component={TheatreNavigationStack}
                    initialParams={{
                        icon: TheatreIcon,
                        tabName: 'Theatres',
                        isAdmin,
                        userPermissions
                    }}
                />
            }
            {ViewInventory &&
                <SuitesNavigator.Screen
                    name="Inventory"
                    component={InventoryNavigationStack}
                    initialParams={{
                        icon: InventoryIcon,
                        tabName: 'Inventory',
                        isAdmin,
                        userPermissions
                    }}
                />
            }
            {
                ViewEquipment &&

                <SuitesNavigator.Screen
                    name="Equipment"
                    component={EquipmentNavigationStack}
                    initialParams={{
                        icon: EquipmentIcon,
                        tabName: 'Equipment',
                        isAdmin
                    }}
                />
            }
            {ViewPurchaseOrders &&
                <SuitesNavigator.Screen
                    name="Orders"
                    component={OrderNavigationStack}
                    initialParams={{
                        icon: OrdersIcon,
                        tabName: 'Orders',
                        isAdmin,
                        userPermissions
                    }}
                />
            }
            {ViewSuppliers &&
                <SuitesNavigator.Screen
                    name="Suppliers"
                    component={SupplierNavigationStack}
                    initialParams={{
                        icon: DeliveryIcon,
                        tabName: 'Suppliers',
                        isAdmin,
                        userPermissions
                    }}
                />
            }
            {ViewStrorageLocation &&
                <SuitesNavigator.Screen
                    name="Storage"
                    component={StorageNavigationStack}
                    initialParams={{
                        icon: StorageIcon,
                        tabName: 'Storage',
                        isAdmin,
                        userPermissions
                    }}
                />
            }
            {ViewPhysicians &&

                <SuitesNavigator.Screen
                    name="Physicians"
                    component={PhysicianNavigationStack}
                    initialParams={{
                        icon: PhysiciansIcon,
                        tabName: 'Physicians',
                        isAdmin,
                        userPermissions
                    }}
                />
            }

            {ViewProcedures &&
                <SuitesNavigator.Screen
                    name="Procedures List"
                    component={ProcedureNavigationStack}
                    initialParams={{
                        icon: ProcedureIcon,
                        tabName: 'Procedures',
                        isAdmin
                    }}
                />
            }
            {
                ViewUsers &&
                <SuitesNavigator.Screen
                    name="Users"
                    component={UsersNavigationStack}
                    initialParams={{
                        icon: UserPageIcon,
                        tabName: 'Users',
                        userPermissions
                    }}
                />

            }

            {ViewAlerts &&

                <SuitesNavigator.Screen
                    name="Alerts"
                    component={Alerts}
                    initialParams={{
                        icon: NotificationIcon,
                        tabName: 'Alerts',
                        isAdmin
                    }}
                />

            }

            {/*<SuitesNavigator.Screen*/}
            {/*    name="Help"*/}
            {/*    component={NotFoundPage}*/}
            {/*    initialParams={{*/}
            {/*        icon: HelpIcon,*/}
            {/*        tabName: 'Help',*/}
            {/*    }}*/}
            {/*/>*/}
            {/* <SuitesNavigator.Screen
                name="Lost Connection"
                component={LostConnectionPage}
                initialParams={{
                    icon: ConnectionIcon,
                    tabName: 'Help',
                }}
            />*/}

            {ViewSettings &&

                <SuitesNavigator.Screen
                    name="Settings"
                    component={SettingsNavigationStack}
                    initialParams={{
                        icon: SettingsIcon,
                        tabName: 'Settings',
                    }}
                />

            }

        </SuitesNavigator.Navigator>
    );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(SuitesNavigationStack);
