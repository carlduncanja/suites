import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useModal} from 'react-native-modalfy';
import {connect} from 'react-redux';
import {duration} from 'moment';
import _ from 'lodash';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import OverlayDialog from '../../components/common/Dialog/OverlayDialog';
import DialogTabs from '../../components/common/Dialog/DialogTabs';
import DialogDetailsTab from '../../components/Procedures/DialogDetailsTab';
import DialogLocationTab from '../../components/Procedures/DialogLocationTab';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import CreatePageHeader from '../../components/common/DetailsPage/CreatePageHeader';
import CreatePreviousDoneFooter from '../../components/common/DetailsPage/CreatePreviousDoneFooter';

import {formatDate} from '../../utils/formatter';

import {createNewProcedure, getTheatres, getPhysicians, getProcedureById} from '../../api/network';
import {addProcedure} from '../../redux/actions/proceduresActions';
import DialogItems from '../../components/Procedures/DialogItems';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const PageWrapper = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${({theme}) => theme.colors['--default-shade-white']}; 
`;
const TabsContainer = styled.View`
    height : 58px;
    justify-content : flex-end;
    background-color: ${({theme}) => theme.colors['--color-gray-200']};
`;

const ContentWrapper = styled.View`
    height : 800px;
    padding : ${({theme}) => theme.space['--space-28']};
`;
const ContentContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const FooterWrapper = styled.View`
    position : absolute;
    bottom: 0; 
    left : 0;
    right : 0;
`;

const Divider = styled.View`
    border-width : 1px;
    border-color : ${({theme}) => theme.colors['--color-gray-300']};
    margin-top : ${({theme}) => theme.space['--space-20']};
    margin-bottom : ${({theme}) => theme.space['--space-32']};
`;

function CreateProcedure({addProcedure, navigation, route}) {
    const modal = useModal();
    const theme = useTheme();
    const {onCancel, onCreated, referenceProcedure} = route.params;
    const dialogTabs = ['Details', 'Locations', 'Consumables', 'Equipments'];
    const selectedIndex = 0;

    const locationsHeader = [
        {
            name: 'Location',
            alignment: 'flex-start'
        },
        {
            name: 'Recovery',
            alignment: 'flex-end'
        },
    ];
    const headers = [
        {
            name: 'Item Name',
            alignment: 'flex-start'
        },
        {
            name: 'Quantity',
            alignment: 'center'
        },
        {
            name: 'Unit Price',
            alignment: 'center'
        },
        {
            name: 'Action',
            alignment: 'flex-end'
        },
    ];

    const [tabIndex, setTabIndex] = useState(selectedIndex);
    const [positiveText, setPositiveText] = useState('NEXT');
    const [physicians, setPhysicians] = useState([]);
    const [savedTheatres, setSavedTheatres] = useState([]);

    const [locations, setLocations] = useState([]);
    const [consumables, setConsumables] = useState([]);
    const [equipments, setEquipments] = useState([]);

    const [popoverList, setPopoverList] = useState([
        {
            name: 'reference',
            status: false
        },
        {
            name: 'physician',
            status: false
        },
        {
            name: 'category',
            status: false
        },
        {
            name: 'location',
            status: false
        }
    ]);

    const [fields, setFields] = useState(referenceProcedure ? { // to ensure copied procedure doesn't try to recreate with a duplicate key
        ...referenceProcedure,
        _id: null
    } : {});
    const [errors, setErrors] = useState({});
    const [procedureCopy, setProcedureCopy] = useState(null);

    // const [errorFields, setErrorFields] = useState({
    //     name : false,
    //     duration : false,
    //     physician : false,
    //     serviceFee : false
    // })

    useEffect(() => {
        // if procedure is being copied
        if (referenceProcedure?._id) fetchProcedure(referenceProcedure._id);
    }, [referenceProcedure]);

    const fetchProcedure = id => {
        // todo: show loading
        getProcedureById(id)
            .then(data => {
                setProcedureCopy(data);

                // set up locations data for tab
                setLocations([...data.supportedRooms]);

                // set up consumables data for tab; necessary data moved one level to be used based on existing structure
                const consumables = data.inventories.map(item => ({...item, ...item.inventory}));
                setConsumables([...consumables]);

                // set up equipment data for tab; necessary data moved one level to be used based on existing structure
                const equipments = data.equipments.map(item => ({...item, ...item.equipment}));
                setEquipments([...equipments]);
            })
            .catch(error => {
                console.error('fail.procedure.copy.fetch', error);
                //TODO handle error cases.
            })
            .finally(_ => {
            });
    };

    const handlePopovers = popoverValue => popoverItem => {
        let updatedPopovers;
        if (!popoverItem) {
            updatedPopovers = popoverList.map(item => ({
                ...item,
                status: false
            }));

            // setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = {
                ...popoverList[objIndex],
                status: popoverValue
            };
            updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            // setPopoverList(updatedPopovers)
        }
        setPopoverList(updatedPopovers);
    };

    const onFieldChange = fieldName => value => {
        const updatedFields = {...fields};
        setFields({
            ...updatedFields,
            [fieldName]: value
        });

        const updatedErrors = {...errors};
        delete updatedErrors[fieldName];
        console.log('Update error: ', errors);
        setErrors(updatedErrors);
    };

    const onTabPress = newTab => {
        const isValid = validateProcedure();
        if (!isValid) {
            return;
        }
        setTabIndex(dialogTabs.indexOf(newTab));

        // const newIndex = dialogTabs.findIndex( tab => tab === newTab)
        // if (newIndex === dialogTabs.length - 1)
        // {
        //     let isValid = validateProcedure()

        //     if(!isValid){return}

        //     setPositiveText("DONE")
        //     setTabIndex(dialogTabs.length-1)

        // }else
        // {

        //     setPositiveText("NEXT")
        //     setTabIndex(newIndex)
        // }
    };

    const onFooterPreviousPress = () => {
        const isValid = validateProcedure();
        if (!isValid) {
            return;
        }
        setTabIndex(tabIndex - 1);
    };

    const validateProcedure = () => {
        let isValid = true;
        const requiredFields = ['name', 'duration', 'physician', 'serviceFee'];

        const errorObj = {...errors} || {};

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                console.log(`${requiredField} is required`);
                isValid = false;
                errorObj[requiredField] = 'Value is required.';
            } else {
                delete errorObj[requiredField];
            }
        }

        setErrors(errorObj);
        console.log('Error obj: ', errorObj);

        return isValid;
    };

    const onPositiveButtonPress = () => {
        let updatedFields = {};
        let isValid = true;

        if (tabIndex === 0) {
            isValid = validateProcedure();
        }

        if (!isValid) {
            return;
        }

        if (tabIndex === dialogTabs.length - 1) {
            const updatedLocations = locations.map(item => item?._id) || [];
            const updatedConsumables = consumables.map(item => ({
                inventory: item?._id,
                amount: item?.amount
            })) || [];
            const updatedEquipments = equipments.map(item => ({
                equipment: item?._id,
                amount: item?.amount
            })) || [];

            updatedFields = {
                ...fields,
                physician: fields.physician._id,
                duration: parseInt(fields.duration),
                supportedRooms: updatedLocations,
                inventories: updatedConsumables,
                equipments: updatedEquipments
            };

            // console.log("Fields: ", updatedFields);
            // console.log("Updated consumables:" , updatedConsumables);
            // console.log("Updated Loations:" , updatedLocations);
            // console.log("Updated Equipments:" , updatedEquipments);
            console.log('Fields: ', updatedFields);
            createProcedureCall(updatedFields);

            // let isNameError = errorFields['name']
            // let isDurationError = errorFields['duration']
            // let isPhysicianError = errorFields['physician']
            // let isServiceFeeError = errorFields['serviceFee']

            // fields['name'] === '' || null ? isNameError = true : isNameError = false
            // fields['duration'] === '' || null ? isDurationError = true : isDurationError = false
            // fields['physician'] === '' || null ? isPhysicianError = true : isPhysicianError = false
            // fields['serviceFee'] === 0 || null ? isServiceFeeError = true : isServiceFeeError = false

            // setErrorFields({
            //     ...errorFields,
            //     name : isNameError,
            //     duration : isDurationError,
            //     physician : isPhysicianError,
            //     serviceFee : isServiceFeeError
            // })

            // if(isNameError === false && isDurationError === false && isPhysicianError === false && isServiceFeeError === false){
            //     console.log("Fields: ",updatedFields)
            //     // createProcedureCall(updatedFields)
            // }else{
            //     setTabIndex(0)
            // }
        } else if (tabIndex + 1 === dialogTabs.length - 1) {
            setPositiveText('DONE');
            setTabIndex(dialogTabs.length - 1);
        } else {
            setTabIndex(tabIndex + 1);
        }
    };

    const getSavedTheatres = value => {
        setSavedTheatres(value);
    };

    const getDialogContent = tab => {
        switch (tab) {
            case 'Details':
                return <DialogDetailsTab
                    onFieldChange={onFieldChange}
                    fields={fields}
                    handlePopovers={handlePopovers}
                    popoverList={popoverList}
                    // errorFields = {errorFields}
                    errors={errors}
                />;
            case 'Locations':
                return <DialogItems
                    handleData={locations => setLocations([...locations])}
                    itemData={locations}
                    itemType="Locations"
                    headers={locationsHeader}
                />;

            case 'Consumables':
                return <DialogItems
                    handleData={consumables => setConsumables([...consumables])}
                    itemData={consumables}
                    itemType="Consumables"
                    headers={headers}
                />;

            case 'Equipments':
                return <DialogItems
                    handleData={equipments => setEquipments([...equipments])}
                    itemData={equipments}
                    itemType="Equipments"
                    headers={headers}
                />;
            default:
                return <View/>;
        }
    };

    const createProcedureCall = updatedFields => {
        createNewProcedure(updatedFields)
            .then(procedureData => {
                console.log("Data procedure: ", procedureData);
                addProcedure(procedureData);
                modal.openModal('ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeModals('ConfirmationModal');
                                onCancel();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                onCreated(procedureData);
                            }}
                            message="Completed Successfully!"
                            // onAction = { () => confirmAction()}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    });
                // modal.closeAllModals();
                // Alert.alert("Success",`New procedure ${updatedFields['name']} has been created.`)
                // navigation.replace('Procedure', {
                //     procedure : data,
                //     isOpenEditable : true
                // })
                // setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                // todo handle error
                modal.openModal('ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeModals('ConfirmationModal');
                                onCancel();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                onCancel();
                            }}
                            // onAction = { () => confirmAction()}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    });
                // Alert.alert("Fialed","Failed to create a new procedure.")
                console.log('failed to create procedure', error);
            });
        // .finally(_ => {
        //     modal.closeAllModals()
        // });
    };

    return (
        <PageWrapper theme={theme}>

            <CreatePageHeader
                title={referenceProcedure ? 'Create Copy' : 'Create Procedure'}
                onClose={onCancel}
            />

            <TabsContainer theme={theme}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={tabIndex}
                    onTabPress={onTabPress}
                />
            </TabsContainer>

            <ContentWrapper theme={theme}>
                <ContentContainer>
                    {getDialogContent(dialogTabs[tabIndex])}
                </ContentContainer>
            </ContentWrapper>

            <FooterWrapper>
                <CreatePreviousDoneFooter
                    onFooterPress={onPositiveButtonPress}
                    isFinished={tabIndex === dialogTabs.length - 1}
                    onFooterPreviousPress={onFooterPreviousPress}
                    isPreviousDisabled={tabIndex === 0}
                />
            </FooterWrapper>

        </PageWrapper>

    );
}

CreateProcedure.propTypes = {};
CreateProcedure.defaultProps = {};

const mapDispatchToProp = {addProcedure};

export default connect(null, mapDispatchToProp)(CreateProcedure);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 47,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E8EF'
    },
    footer: {
        height: 57,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: '#E3E8EF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    footerText: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#3182CE',
    }
});
