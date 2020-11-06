import React, {useState} from 'react';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import RoleTypeGroupComponent from './RoleTypeGroupComponent';
import DataItem from '../common/List/DataItem';
import ContentDataItem from '../common/List/ContentDataItem';
import IconButton from '../common/Buttons/IconButton';
import ActionIcon from '../../../assets/svg/dropdownIcon';
import CollapsedIcon from '../../../assets/svg/closeArrow';
import CustomSwitch from '../common/CustomSwitch';

const ActionRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  height: ${({theme}) => theme.space['--space-20']};
  margin-bottom: ${({theme}) => theme.space['--space-20']};
`;

const ActionTitle = styled.Text(({theme, color = '--color-gray-700', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color]
}));

const ROLE_GROUPS = [
    {
        group: 'cases',
        name: 'Case Files',
        actions: [
            {
                key: 'create',
                title: 'New Case File'
            },
            {
                key: 'read',
                title: 'View Case Files'
            },
            {
                key: 'update',
                title: 'Edit Case Files'
            },
            {
                key: 'delete',
                title: 'Remove Case Files'
            },
            // {
            //     key: 'read_medical_history',
            //     title: 'View Patient Medical History'
            // }
        ]
    },
    {
        group: 'theatres',
        name: 'Theatres',
        actions: [
            {
                key: 'create',
                title: 'New Theatre'
            },
            {
                key: 'read',
                title: 'View Theatres'
            },
            {
                key: 'update',
                title: 'Edit Theatres'
            },
            {
                key: 'delete',
                title: 'Remove Theatres'
            }
        ]
    },
    {
        group: 'inventory_groups',
        name: 'Inventory',
        actions: [
            {
                key: 'create',
                title: 'Create Inventory'
            },
            {
                key: 'read',
                title: 'View Inventory'
            },
            {
                key: 'update',
                title: 'Update Inventory'
            },
            {
                key: 'delete',
                title: 'Remove Inventory'
            }
        ]
    },
    {
        group: 'equipment_type',
        name: 'Equipment',
        actions: [
            {
                key: 'create',
                title: 'Create Equipment'
            },
            {
                key: 'read',
                title: 'View Equipment'
            },
            {
                key: 'update',
                title: 'Update Equipment'
            },
            {
                key: 'delete',
                title: 'Remove Equipment'
            }
        ]
    },
    {
        group: 'purchase_orders',
        name: 'Purchase Orders',
        actions: [
            {
                key: 'create',
                title: 'Create Purchase Order'
            },
            {
                key: 'read',
                title: 'View Purchase Orders'
            },
            {
                key: 'update',
                title: 'Update Purchase Orders'
            },
            {
                key: 'delete',
                title: 'Remove Purchase Orders'
            }
        ]
    },
    {
        group: 'suppliers',
        name: 'Suppliers',
        actions: [
            {
                key: 'create',
                title: 'Create Supplier'
            },
            {
                key: 'read',
                title: 'View Suppliers'
            },
            {
                key: 'update',
                title: 'Update Suppliers'
            },
            {
                key: 'delete',
                title: 'Remove Suppliers'
            }
        ]
    },
    {
        group: 'storage_locations',
        name: 'Storage Locations',
        actions: [
            {
                key: 'create',
                title: 'Create Storage Location'
            },
            {
                key: 'read',
                title: 'View Storage Locations'
            },
            {
                key: 'update',
                title: 'Update Storage Locations'
            },
            {
                key: 'delete',
                title: 'Remove Storage Locations'
            }
        ]
    },
    {
        group: 'physicians',
        name: 'Physicians',
        actions: [
            {
                key: 'create',
                title: 'Create Physician'
            },
            {
                key: 'read',
                title: 'View Physicians'
            },
            {
                key: 'update',
                title: 'Update Physicians'
            },
            {
                key: 'delete',
                title: 'Remove Physicians'
            }
        ]
    },
    {
        group: 'procedures',
        name: 'Procedures',
        actions: [
            {
                key: 'create',
                title: 'Create Procedure'
            },
            {
                key: 'read',
                title: 'View Procedures'
            },
            {
                key: 'update',
                title: 'Update Procedures'
            },
            {
                key: 'delete',
                title: 'Remove Procedures'
            }
        ]
    },
];

function RolePermissionsList({
    permissions = {},
    onUpdatePermission = () => {
    }
}) {
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState([]);

    const roleHeader = name => (
        <>
            <DataItem color="--color-blue-600" fontStyle="--text-sm-medium" flex={1} text={name}/>
            <ContentDataItem
                align="flex-end"
                flex={0.5}
                content={(
                    <IconButton
                        Icon={isCollapsed.includes(name.toLowerCase()) ? <ActionIcon/> : <CollapsedIcon/>}
                        disabled={true}
                    />
                )}
            />
        </>
    );

    const onCollapse = name => () => {
        let newList = [];
        isCollapsed.includes(name) ?
            newList = [...isCollapsed.filter(item => item !== name)] :
            newList = [...isCollapsed, name];

        setIsCollapsed(newList);
    };

    const checkIfPermissionEnabled = (group, key) => {
        if (!permissions[group]) return false;
        return permissions[group][key];
    };

    const pageContent = () => (
        <>
            {
                ROLE_GROUPS.map((roleGroup, index) => {
                    const {group, name, actions} = roleGroup;

                    return <>
                        <RoleTypeGroupComponent
                            key={`RoleTypeGroupComponent_${group}`}
                            header={() => roleHeader(name)}
                            onItemPress={onCollapse(name.toLowerCase())}
                            isCollapsed={isCollapsed.includes(name.toLowerCase())}
                            showDivider={index !== ROLE_GROUPS.length - 1}
                            content={actions.map(action => (
                                <ActionRow theme={theme}>
                                    <ActionTitle theme={theme}>{action.title}</ActionTitle>
                                    <CustomSwitch
                                        isChecked={checkIfPermissionEnabled(group, action.key)}
                                        onChange={checked => onUpdatePermission({group, key: action.key, value: checked})}
                                    />
                                </ActionRow>
                            ))}
                        />
                    </>;
                })
            }
        </>
    );

    return (
        <>
            {pageContent()}
        </>
    );
}

export default RolePermissionsList;
