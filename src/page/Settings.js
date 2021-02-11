import React, {useState, useEffect} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {useModal} from 'react-native-modalfy';
import {RefreshControl, ScrollView} from 'react-native';
import Page from '../components/common/Page/Page';
import RoleTypeComponent from '../components/Settings/RoleTypeComponent';
import DataItem from '../components/common/List/DataItem';
import ContentDataItem from '../components/common/List/ContentDataItem';
import IconButton from '../components/common/Buttons/IconButton';
import CollapsedIcon from '../../assets/svg/closeArrow';
import ActionIcon from '../../assets/svg/dropdownIcon';
import {deleteRoleCall, getRolesCall, updateRoleCall} from '../api/network';
import RolePermissionsList from '../components/Settings/RolePermissionsList';
import {checkboxItemPress} from '../helpers/caseFilesHelpers';
import ConfirmationComponent from '../components/ConfirmationComponent';
import CreateUserOverlayDialog from '../components/Roles/CreateRoleOverlayDialog';
import RefreshableScrollView from '../components/common/RefreshableScrollView';
import CustomTypes from '../components/Settings/CustomTypes';
import NotFoundPage from '../components/common/Page/NotFoundPage';

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

const ActionButtonText = styled.Text(({
    theme,
    disabled,
    color
}) => ({
    ...theme.font['--text-sm-medium'],
    color: disabled ? theme.colors['--color-gray-600'] : color ? theme.colors[color] : theme.colors['--color-blue-600']
}));

const SectionTitle = styled.Text(({
    theme,
    color = '--color-blue-600',
    font = '--text-base-medium'
}) => ({
    ...theme.font[font],
    color: theme.colors[color]
}));

const Space = styled.View`
  height: 16px;
`;

function Settings({navigation}) {
    const theme = useTheme();
    const modal = useModal();

    const [isCollapsed, setIsCollapsed] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);
    const [roles, setRoles] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = () => {
        setFetchingData(true);
        getRolesCall()
            .then(results => {
                setRoles(results);
                setSelectedRoles([]);
            })
            .catch(error => console.log('Error fetching roles: ', error))
            .finally(_ => setFetchingData(false));
    };

    const onCreateRole = () => {
        modal.openModal('OverlayModal', {
            content: (
                <CreateUserOverlayDialog
                    roles={roles}
                    onCreated={role => {
                        console.log('create.role.success', role);
                        setFetchingData(true);
                        fetchRoles();
                    }}
                    onCancel={() => modal.closeModals('OverlayModal')}
                />
            ),
            onClose: () => modal.closeModals('OverlayModal')
        });
    };

    const updateRole = (id, data) => {
        updateRoleCall(id, data)
            .then(result => console.log(`role.${id}.updated`, data, result))
            .catch(error => {
                console.log('Error fetching roles: ', error);
            })
            .finally(_ => setFetchingData(false));
    };

    const deleteRoles = ids => {
        setFetchingData(true);
        deleteRoleCall(ids)
            .then(result => {
                console.log('roles.remove.success', ids, result);
                fetchRoles();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => modal.closeAllModals()}
                            message="Role(s) successfully removed."
                        />,
                        onClose: () => modal.closeModals('ConfirmationModal')
                    }
                );
            })
            .catch(error => {
                // console.log('roles.remove.error', error, error.response?.data?.msg.includes('Guest'));
                const errorMessage = error.response?.data?.msg.includes('Guest') ? 'Unable to remove \'Guest\' Role.' : error.response?.data?.msg.includes('Admin') ? 'Unable to remove \'Admin\' Role.' : 'Failed to remove Role(s)';

                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={modal.closeAllModals}
                            message={errorMessage}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
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

    const handleOnCheckBoxPress = item => () => {
        const {_id} = item;
        const updatedRoles = checkboxItemPress(_id, selectedRoles);
        setSelectedRoles(updatedRoles);
    };

    /**
     *
     * @param id roleId
     * @param permission { group, key, value }
     */
    const onUpdatePermission = (id, permission) => {
        const {
            group,
            key,
            value
        } = permission;

        // find role with id
        const roleIndex = roles.findIndex(item => item._id === id);
        const role = roles[roleIndex];

        // find the module under the permissions for that role; update the key under that module; update the key under that module
        if (!role.permissions) role.permissions = {};
        if (!role.permissions[group]) role.permissions[group] = {};
        if (!role.permissions[group][key]) role.permissions[group][key] = false;

        role.permissions[group][key] = value;

        const updatedRoles = [...roles];
        updatedRoles[roleIndex] = role;
        setRoles(updatedRoles);

        // update role endpoint; updates roles
        updateRole(id, role);
    };

    const onDeleteRoles = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={modal.closeAllModals}
                    onAction={() => deleteRoles(selectedRoles)}
                    action="Yes"
                    message="Are you sure you want to remove the selected role(s)?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const pageContent = (
        <>
            <Space/>

            <SectionHeader theme={theme}>
                <SectionTitle>Custom Types</SectionTitle>
            </SectionHeader>

            <Space/>

            <CustomTypes
                navigation={navigation}
            />

            <Space/>

            <SectionHeader theme={theme}>
                <SectionTitle>Roles & Permissions</SectionTitle>
                <ActionsBar theme={theme}>
                    <ActionButton onPress={onCreateRole}><ActionButtonText>Add New</ActionButtonText></ActionButton>
                    <ActionButton theme={theme} disabled={!selectedRoles.length} onPress={onDeleteRoles}>
                        <ActionButtonText theme={theme} disabled={!selectedRoles.length} color="--color-red-600">
                            Delete ({selectedRoles.length})
                        </ActionButtonText>
                    </ActionButton>
                </ActionsBar>
            </SectionHeader>

            <Space/>

            <RefreshableScrollView
                refreshing={isFetchingData}
                onRefresh={() => fetchRoles()}
                content={(
                    <>
                        {
                            roles.map(item => (
                                <>
                                    <RoleTypeComponent
                                        key={`SettingsRoleSection_${item._id}`}
                                        header={() => roleHeader(item.name)}
                                        onItemPress={onCollapse(item.name?.toLowerCase())}
                                        isCollapsed={isCollapsed.includes(item.name?.toLowerCase())}
                                        isChecked={selectedRoles.includes(item._id)}
                                        onCheckBoxPress={handleOnCheckBoxPress(item)}
                                        content={(
                                            <RolePermissionsList permissions={item.permissions} onUpdatePermission={permission => onUpdatePermission(item._id, permission)}/>
                                        )}
                                    />
                                    <Space/>
                                </>
                            ))
                        }
                    </>
                )}
            />
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
