import React, {useState, useEffect} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Page from '../components/common/Page/Page';
import RoleTypeComponent from '../components/Settings/RoleTypeComponent';
import DataItem from '../components/common/List/DataItem';
import ContentDataItem from '../components/common/List/ContentDataItem';
import IconButton from '../components/common/Buttons/IconButton';
import CollapsedIcon from '../../assets/svg/closeArrow';
import ActionIcon from '../../assets/svg/dropdownIcon';
import {getRolesCall} from '../api/network';
import RolePermissionsList from '../components/Settings/RolePermissionsList';

const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  height: 20px;
`;

const ActionsBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ActionButton = styled.TouchableOpacity`
  padding-right: ${({theme}) => theme.space['--space-18']};
`;

const ActionButtonText = styled.Text(({theme, disabled}) => ({
    ...theme.font['--text-sm-medium'],
    color: disabled ? theme.colors['--color-gray-600'] : theme.colors['--color-blue-600']
}));

const SectionTitle = styled.Text(({theme, color = '--color-blue-600', font = '--text-base-medium'}) => ({
    ...theme.font[font],
    color: theme.colors[color]
}));

const Space = styled.View`
    height: 16px;
`;

function Settings() {
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);
    const [roles, setRoles] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        setFetchingData(true);
        fetchRoles();
    }, []);

    const fetchRoles = () => {
        getRolesCall()
            .then(results => setRoles(results))
            .catch(error => {
                console.error('Error fetching roles: ', error);
            })
            .finally(_ => setFetchingData(false));
    };

    const roleHeader = name => (
        <>
            <DataItem color="--color-gray-700" fontStyle="--text-base-medium" flex={1} text={name}/>
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

    const pageContent = (
        <>
            <Space/>

            <SectionHeader theme={theme}>
                <SectionTitle>Roles & Permissions</SectionTitle>
                <ActionsBar theme={theme}>
                    <ActionButton><ActionButtonText>Add New</ActionButtonText></ActionButton>
                    <ActionButton theme={theme} disabled={!selectedRoles.length}>
                        <ActionButtonText theme={theme} disabled={!selectedRoles.length}>
                            Delete ({selectedRoles.length})
                        </ActionButtonText>
                    </ActionButton>
                </ActionsBar>
            </SectionHeader>

            <Space/>

            {
                roles.map(role => (
                    <>
                        <RoleTypeComponent
                            key={`SettingsRoleSection_${role._id}`}
                            header={() => roleHeader(role.name)}
                            onItemPress={onCollapse(role.name?.toLowerCase())}
                            isCollapsed={isCollapsed.includes(role.name?.toLowerCase())}
                            content={(
                                <RolePermissionsList data={role.permissions}/>
                            )}
                        />
                        <Space/>
                    </>
                ))
            }
        </>
    );

    return (
        <Page
            routeName="Settings"
            hasSearch={false}
            hasList={false}
            pageContent={pageContent}
            isFetchingData={isFetchingData}
        />
    );
}

export default Settings;
