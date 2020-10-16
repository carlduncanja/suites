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
        group: 'casefiles',
        name: 'Case Files',
        actions: [
            {
                key: 'create',
                title: 'New Case'
            },
            {
                key: 'update',
                title: 'Edit Price'
            }
        ]
    },
    {
        group: 'theatres',
        name: 'Theatres',
        actions: [
            {
                key: 'create',
                title: 'New Theatre'
            }
        ]
    }
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
