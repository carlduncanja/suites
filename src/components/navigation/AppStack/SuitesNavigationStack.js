import { createAppContainer } from 'react-navigation';
import { createSuitesSidebarNavigator } from '../SuiteNavigator';

import React from "react";


/* Screens */
import Schedule from '../../../page/Schedule';
import Theatres from "../../../page/Theatres/Theatres";
import Inventory from "../../../page/Inventory/Inventory";
import Storage from "../../../page/Storage";
import Procedures from '../../../page/Procedures';
import Physicians from '../../../page/Physicians';
import Suppliers from '../../../page/Suppliers';
import Equipment from '../../../page/Equipment';
import Orders from '../../../page/Orders'

import ProcedureNavigationStack from "./ProcedureNavigationStack";
import CaseFileNavigationStack from "./CaseFileNavigationStack";
import TheatreNavigationStack from "./TheatreNavigationStack";
import OrderNavigationStack from "./OrderNavigationStack";
import SupplierNavigationStack from "./SupplierNavigationStack";
import StorageNavigationStack from "./StorageNavigationStack";
import PhysicianNavigationStack from "./PhysiciansNavigationStack";
import EquipmentNavigationStack from "./EquipmentNavigationStack";
import InventoryNavigationStack from "./InventoryNavigationStack";

/* Providers*/
import NotFound from "../../../page/NotFound";


/* Icons */
import ScheduleIcon from "../../../../assets/svg/schedule"
import CaseFileIcon from "../../../../assets/svg/caseFile"
import TheathreIcon from "../../../../assets/svg/threatre"
import InventoryIcon from "../../../../assets/svg/caseFile"
import EquipmentIcon from "../../../../assets/svg/equipment"
import OrdersIcon from "../../../../assets/svg/orders"
import DeliveryIcon from "../../../../assets/svg/delivery"
import InvoiceIcon from "../../../../assets/svg/invoices"
import StorageIcon from "../../../../assets/svg/storage"
import PhysiciansIcon from "../../../../assets/svg/physicians"
import ProcedureIcon from "../../../../assets/svg/procedures"
import SettingsIcon from "../../../../assets/svg/settingsIcon";
import HelpIcon from "../../../../assets/svg/helpIcon";
import NotificationIcon from "../../../../assets/svg/notificationIcon";
import Invoices from "../../CaseFiles/OverlayPages/ChargeSheet/Invoices";
import {connect} from "react-redux";
import {ROLES} from "../../../const";
import PersonIcon from "../../../../assets/svg/personIcon";



const SuitesNavigator = createSuitesSidebarNavigator();


export const SuitesNavigationStack = ({auth = {}}) => {

    const isAdmin =  auth.user['role_name'] === ROLES.ADMIN

    console.log("auth suites navigator", auth);

    return (
        <SuitesNavigator.Navigator
            initialRouteName="Schedule"
        >

            <SuitesNavigator.Screen
                name="Schedule"
                component={Schedule}
                initialParams={{
                    icon: ScheduleIcon,
                    tabName: 'schedule',
                }}
            />

            <SuitesNavigator.Screen
                name="Case Files"
                component={CaseFileNavigationStack}
                initialParams={{
                    icon: CaseFileIcon,
                    tabName: 'Case Files',
                }} />


            <SuitesNavigator.Screen
                name="Theatres"
                component={TheatreNavigationStack}
                initialParams={{
                    icon: TheathreIcon,
                    tabName: 'Theatres',
                }} />


            <SuitesNavigator.Screen
                name="Inventory"
                component={InventoryNavigationStack}
                initialParams={{
                    icon: InventoryIcon,
                    tabName: 'Inventory',
                }} />


            <SuitesNavigator.Screen
                name="Equipment"
                component={EquipmentNavigationStack}
                initialParams={{
                    icon: EquipmentIcon,
                    tabName: 'Equipment',
                }} />


            <SuitesNavigator.Screen
                name="Orders"
                component={OrderNavigationStack}
                initialParams={{
                    icon: OrdersIcon,
                    tabName: 'Orders',
                }}
            />


            <SuitesNavigator.Screen
                name="Suppliers"
                component={SupplierNavigationStack}
                initialParams={{
                    icon: DeliveryIcon,
                    tabName: 'Suppliers',
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
                }}
            />


            <SuitesNavigator.Screen
                name="Physicians"
                component={PhysicianNavigationStack}
                initialParams={{
                    icon: PhysiciansIcon,
                    tabName: 'Physicians',
                }}
            />


            <SuitesNavigator.Screen
                name="Procedures List"
                component={ProcedureNavigationStack}
                initialParams={{
                    icon: ProcedureIcon,
                    tabName: 'Procedures',
                }}
            />

            {
                isAdmin &&
                <SuitesNavigator.Screen
                    name="Users"
                    component={NotFound}
                    initialParams={{
                        icon: PersonIcon,
                        tabName: 'Users',
                    }}
                />
            }





            <SuitesNavigator.Screen
                name="Alerts"
                component={NotFound}
                initialParams={{
                    icon: NotificationIcon,
                    tabName: 'Alerts',
                }}
            />



            <SuitesNavigator.Screen
                name="Help"
                component={Procedures}
                initialParams={{
                    icon: HelpIcon,
                    tabName: 'Help',
                }}
            />



            <SuitesNavigator.Screen
                name="Settings"
                component={NotFound}
                initialParams={{
                    icon: SettingsIcon,
                    tabName: 'Settings',
                }}
            />


        </SuitesNavigator.Navigator>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SuitesNavigationStack)
