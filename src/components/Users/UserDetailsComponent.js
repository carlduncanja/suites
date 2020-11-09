import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import Row from "../common/Row";
import Record from "../common/Information Record/Record";
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import {PageContext} from "../../contexts/PageContext";
import InputLabelComponent from "../common/InputLablel";
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import OptionsField from "../common/Input Fields/OptionsField";
import {getRolesCall, updateUserCall} from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import {useModal} from "react-native-modalfy";
import LoadingComponent from "../LoadingComponent";


const InputWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    z-index: ${({zIndex}) => zIndex};
    margin-right: 8px;
`


function UserDetailsComponent({user, onUserUpdated = () => {}, onResetPassword = () => {} }) {

    const {pageState, setPageState} = useContext(PageContext)
    const modal = useModal();

    const [userFields, setUserFields] = useState({
        'first_name': user['first_name'],
        'last_name': user['last_name'],
        'email': user['email'],
        'password': user['password'],
        'role': user['role']
    });

    const {isEditMode} = pageState;

    const [roles, setRoles] = useState([])
    const [fieldErrors, setErrors] = useState({});
    const [isUpdated, setUpdated] = useState(false);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getRoles()
    }, [])

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            confirmChanges()
        }
    }, [isEditMode])

    const onFieldChange = field => value => {
        setUserFields({
            ...userFields,
            [field]: value
        })

        setErrors({
            ...fieldErrors,
            [field]: undefined
        })

        setUpdated(true);
    }

    const getRoles = () => {
        getRolesCall()
            .then(data => setRoles(data))
            .catch(error => {
                console.log("failed to get user role")
            })
    }

    const confirmChanges = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        // resetState()
                        setPageState({...pageState, isEditMode: true})
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        updateUser(user?._id, convertUserFieldsToUpdateData(userFields))
                    }}
                    message="Would you like to finish edit and save changes?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    }

    const updateUser = (userId, data) => {
        setLoading(true);
        updateUserCall(userId, data)
            .then(_ => {
                onUserUpdated(userFields);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={modal.closeAllModals}
                            message={"User information updated."}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .catch(error => {
                console.log("failed to update user", error)
                setPageState({...pageState, isEditMode: true})
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={modal.closeAllModals}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .finally(_ => {
                setLoading(false);
            })
    }

    const convertUserFieldsToUpdateData = () => {
        return {
            email: userFields['email'],
            first_name: userFields['first_name'],
            last_name: userFields['last_name'],
            role: userFields.role?._id,
        }
    }

    return (
        <>
            <Row>
                <Record
                    recordValue={userFields['first_name']}
                    recordTitle='First Name'
                    editMode={isEditMode}
                    onRecordUpdate={onFieldChange('first_name')}
                    onClearValue={onFieldChange('first_name')}
                />

                <Record
                    recordValue={userFields['last_name']}
                    recordTitle='Last Name'
                    editMode={isEditMode}
                    onRecordUpdate={onFieldChange('last_name')}
                    onClearValue={onFieldChange('last_name')}
                />
            </Row>

            <Row>
                <Record
                    recordValue={userFields['email']}
                    recordTitle='Email'
                    editMode={isEditMode}
                    onRecordUpdate={onFieldChange('email')}
                    onClearValue={onFieldChange('email')}
                />

                {
                    isEditMode
                        ? <InputWrapper>
                            <InputLabelComponent label={"Role"}/>
                            <OptionsField
                                text={userFields['role'].name}
                                hasError={!!fieldErrors['role']}
                                errorMessage={fieldErrors['role']}
                                oneOptionsSelected={onFieldChange('role')}
                                menuOption={(
                                    <MenuOptions>
                                        {
                                            roles?.map(item => <MenuOption key={item._id} value={item} text={item.name}/>)
                                        }
                                    </MenuOptions>
                                )}
                            />
                        </InputWrapper>
                        : <Record
                            recordValue={userFields['role'].name}
                            recordTitle='Role'
                        />
                }
            </Row>

            <Row>
                <ResponsiveRecord
                    recordTitle="Password"
                    recordValue="Reset Password"
                    handleRecordPress={() => { onResetPassword(); }}
                />
                {/* <Record
                    recordValue={userFields['password']}
                    recordTitle='Password'
                /> */}
            </Row>

            {
                isLoading && <LoadingComponent/>
            }
        </>
    );
}

UserDetailsComponent.propTypes = {};
UserDetailsComponent.defaultProps = {};

export default UserDetailsComponent;
