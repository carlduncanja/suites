import {createAppContainer} from 'react-navigation';
import {createSuitesSidebarNavigator} from '../SuiteNavigator';

import React from "react";


/* Screens */
import Schedule from '../../../page/Schedule';
import CaseFiles from '../../../page/CaseFile/CaseFiles'
import Theatres from "../../../page/Theatres";
import Inventory from "../../../page/Inventory";
import Storage from "../../../page/Storage";
import Procedures from '../../../page/Procedures';
import Physicians from '../../../page/Physicians';
import StorageLocations from '../../../page/StorageLocations';
import Suppliers from '../../../page/Suppliers';
import Equipment from '../../../page/Equipment';
import Orders from '../../../page/Orders'


/* Providers*/
import {ScheduleProvider} from '../../../contexts/ScheduleContext';
import NotFound from "../../../page/NotFound";


/* Icons */
import ScheduleIcon from "../../../../assets/svg/schedule"
import CaseFileIcon from "../../../../assets/svg/caseFile"
import TheathreIcon from "../../../../assets/svg/threatre"
import InventoryIcon from "../../../../assets/svg/caseFile"
import EquipmentIcon from "../../../../assets/svg/equipment"
import OrdersIcon from "../../../../assets/svg/equipment"
import DeliveryIcon from "../../../../assets/svg/delivery"
import InvoiceIcon from "../../../../assets/svg/invoices"
import StorageIcon from "../../../../assets/svg/storage"
import PhysiciansIcon from "../../../../assets/svg/physicians"
import ProcedureIcon from "../../../../assets/svg/procedures"
import SettingsIcon from "../../../../assets/svg/settingsIcon";
import HelpIcon from "../../../../assets/svg/helpIcon";
import NotificationIcon from "../../../../assets/svg/notificationIcon";
import Invoices from "../../CaseFiles/OverlayPages/ChargeSheet/Invoices";
import CaseFileNavigationStack from "./CaseFileNavigationStack";


const SuitesNavigator = createSuitesSidebarNavigator();


export const SuitesNavigationStack = () => {
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
                }}/>


            <SuitesNavigator.Screen
                name="Theatres"
                component={Theatres}
                initialParams={{
                    icon: TheathreIcon,
                    tabName: 'Theatre',
                }}/>


            <SuitesNavigator.Screen
                name="Inventory"
                component={Inventory}
                initialParams={{
                    icon: InventoryIcon,
                    tabName: 'Inventory',
                }}/>


            <SuitesNavigator.Screen
                name="Equipment"
                component={Equipment}
                initialParams={{
                    icon: EquipmentIcon,
                    tabName: 'Equipment',
                }}/>


            <SuitesNavigator.Screen
                name="Orders"
                component={Orders}
                initialParams={{
                    icon: OrdersIcon,
                    tabName: 'Orders',
                }}
            />


            <SuitesNavigator.Screen
                name="Suppliers"
                component={Suppliers}
                initialParams={{
                    icon: DeliveryIcon,
                    tabName: 'Suppliers',
                }}
            />


            <SuitesNavigator.Screen
                name="Invoices"
                component={NotFound}
                initialParams={{
                    icon: InvoiceIcon,
                    tabName: 'Invoices',
                }}
            />


            <SuitesNavigator.Screen
                name="Storage"
                component={Storage}
                initialParams={{
                    icon: StorageIcon,
                    tabName: 'Storage',
                }}
            />


            <SuitesNavigator.Screen
                name="Physicians"
                component={Physicians}
                initialParams={{
                    icon: PhysiciansIcon,
                    tabName: 'Physicians',
                }}
            />


            <SuitesNavigator.Screen
                name="Procedures"
                component={Procedures}
                initialParams={{
                    icon: ProcedureIcon,
                    tabName: 'Procedures',
                }}
            />



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

/***
 *  Top level navigation Stack for Suites Application for the side navigation bar.
 *
 *  The params
 *  @icon : Icon component for sidebar tab.
 *  @tabName : Name displayed on the sidebar.
 *  @provider : Context provider that is passed in to the component.
 */
// export const SuitesNavigationStack = createSuitesSidebarNavigator(
//     {
//         Schedule: {
//             screen: Schedule,
//             params: {
//                 icon: ScheduleIcon,
//                 tabName: 'schedule',
//                 provider: ScheduleProvider
//             },
//         },
//         CaseFiles: {
//             screen: CaseFileStack,
//             params: {
//                 icon: CaseFileIcon,
//                 tabName: 'CaseFiles',
//                 provider: CaseFileContextProvider
//             },
//         },
//         Theatre: {
//             screen: Theatres,
//             params: {
//                 icon: TheathreIcon,
//                 tabName: 'Theatre',
//                 provider: ScheduleProvider
//             },
//         },
//         Inventory: {
//             screen: Inventory,
//             params: {
//                 icon: InventoryIcon,
//                 tabName: 'Inventory',
//                 provider: ScheduleProvider
//             },
//         },
//         Equipment: {
//             screen: Equipment,
//             params: {
//                 icon: EquipmentIcon,
//                 tabName: 'Equipment',
//                 provider: ScheduleProvider
//             },
//         },
//         Orders: {
//             screen: Orders,
//             params: {
//                 icon: OrdersIcon,
//                 tabName: 'Orders',
//                 provider: ScheduleProvider
//             },
//         },
//         Suppliers: {
//             screen: Suppliers,
//             params: {
//                 icon: DeliveryIcon,
//                 tabName: 'Suppliers',
//                 provider: ScheduleProvider
//             },
//         },
//         Invoices: {
//             screen: NotFound,
//             params: {
//                 icon: InvoiceIcon,
//                 tabName: 'Invoices',
//                 provider: ScheduleProvider
//             },
//         },
//         Storage: {
//             screen: Storage,
//             params: {
//                 icon: StorageIcon,
//                 tabName: 'Storage',
//                 provider: ScheduleProvider
//             },
//         },
//         Physicians: {
//             screen: Physicians,
//             params: {
//                 icon: PhysiciansIcon,
//                 tabName: 'Physicians',
//                 provider: ScheduleProvider
//             },
//         },
//         Procedures: {
//             screen: Procedures,
//             params: {
//                 icon: ProcedureIcon,
//                 tabName: 'Procedures',
//                 provider: ScheduleProvider
//             },
//         },
//         Alerts: {
//             screen: NotFound,
//             params: {
//                 icon: NotificationIcon,
//                 tabName: 'Alerts',
//                 provider: ScheduleProvider
//             },
//         },
//         Help: {
//             screen: NotFound,
//             params: {
//                 icon: HelpIcon,
//                 tabName: 'Help',
//                 provider: ScheduleProvider
//             },
//         },
//         Settings: {
//             screen: NotFound,
//             params: {
//                 icon: SettingsIcon,
//                 tabName: 'Settings',
//                 provider: ScheduleProvider
//             },
//         }
//     },
//     {
//         initialRouteName: 'Schedule',
//     },
// );

export default SuitesNavigationStack
