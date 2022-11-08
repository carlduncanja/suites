import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import EditIconButton from "../../../../../assets/svg/editIconButton";
import Checked from "../../../../../assets/svg/checked";
import { useNavigation } from "@react-navigation/native";
import { emptyFn } from "../../../../const";
import { useModal } from "react-native-modalfy";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import {  getCaseFileById } from '../../../../api/network';
import { currencyFormatter } from '../../../../utils/formatter';
import InputField2 from '../../../common/Input Fields/InputField2';
import IconButton from '../../../common/Buttons/IconButton';
import ConfirmationComponent from '../../../ConfirmationComponent';
import {
    applyPaymentsChargeSheetCall, simpleCaseProcedureUpdate
} from '../../../../api/network';


function PreAuthorizationSheet({
    appointmentDetails,
    closeOverlay = emptyFn,
}) {
    const navigation = useNavigation();
    const theme = useTheme();
    const modal = useModal();
    const [caseItem, setCaseItem] = useState({});
    const [coverage, setCoverage] = useState('');
    const [discount, setDiscount] = useState('');
    const [patientPays, setPatientPays] = useState();
    const [editMode, setEditMode] = useState(true);
    const [authStatus, setAuthStatus] = useState(false);

    const fetchCase = (id) => {
        getCaseFileById(id)
            .then(data => {
                setCaseItem(data)
               const insurance = data.chargeSheet.lineItems.filter(x => x.caseProcedureRef === appointmentDetails._id)[0].unitPrice;
               if(insurance) 
               {
                setCoverage(currencyFormatter(insurance));
                setDiscount(insurance);
                setPatientPays(currencyFormatter(data?.chargeSheet?.total - insurance))
               }
            })
            .catch(error => {
                console.log("Failed to get case", error)
            })
    };

    useEffect(() => {
        fetchCase(appointmentDetails.appointment.item.case);
        setAuthStatus(appointmentDetails.preAuthStatus);    
    }, [])


    /**
     * @param scheduleDate - date object
     */
    const getTime = scheduleDate => {
        const date = moment(scheduleDate);
        return date.format('h:mm a');
    };

    const formatDate = scheduleDate => {
        const date = moment(scheduleDate);
        return date.format('D/M/YYYY');
    };

    const displayPatient = (patient = {}) => {
        const { firstName = '', surname = '' } = patient;

        return (firstName && surname) ? `${firstName} ${surname}` : 'N/A'
    }

    const displayNumber = (patient = {}) => {
        const { patientNumber = '' } = patient;

        return (patientNumber) ? `#${patientNumber}` : 'N/A'
    }

    const handleOnCaseIdPress = () => {
        navigation.navigate('CaseFiles',
            {
                screen: 'Case',
                params: {
                    initial: false,
                    caseId: caseItem._id,
                    isEdit: false
                }
            });
        closeOverlay()
    };

    const handleCoverage = value => {
        const updatedCoverage = value.replace(/[^0-9.]/g, '');

        if (/^\d+(\.\d{1,2})?$/g.test(updatedCoverage) || /^\d+$/g.test(updatedCoverage) || !updatedCoverage) {
            setDiscount(parseFloat(updatedCoverage));
        }
        
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(updatedCoverage) || !updatedCoverage) {
            setCoverage(updatedCoverage);
        }
    };

    const formatCoverage = () => {
        if (coverage) {
            setCoverage(currencyFormatter(coverage));
            setPatientPays(currencyFormatter(caseItem?.chargeSheet?.total - coverage))
        }
        setEditMode(!editMode);
    }

    const handleClear = () => {
        setCoverage('');
        setPatientPays('');
    }

    const handleAuthClicked = () => {
        if(discount) applyInvoicePayment();
    }
    const applyInvoicePayment = () => {
        applyPaymentsChargeSheetCall(caseItem.chargeSheet.caseId, {
            name: "Insurance",
            amount: discount,
            type: 'discount',
            caseProcedureRef: appointmentDetails._id
        })
            .then(_ => {
                appointmentDetails.preAuthStatus = true;
                simpleCaseProcedureUpdate(appointmentDetails.appointment.item.case, appointmentDetails._id, appointmentDetails).then( _ => { 
                    setAuthStatus(true);
                    modal.openModal('ConfirmationModal', {
                        content: (
                            <ConfirmationComponent
                                isError={false}
                                isEditUpdate={false}
                                onCancel={() => {
                                    modal.closeModals('ConfirmationModal');
                                }}
                                onAction={() => {
                                    modal.closeModals('ConfirmationModal');
                                }}
                                message={`${caseItem.patient.firstName}'s ${appointmentDetails.appointment.title}has been authorized.`}
                            />
                        ),
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        },
                    });
                })
            })
            .catch(error => {
                console.log('failed to apply payment', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="An error has occured"
                            action="Ok"
                        />
                    ),
                    onClose: () => {
                        modal.closeAllModals();
                    },
                });
            })
    };


    const ModalText = styled.Text(({ textColor = '--color-gray-600', theme, font = '--confirm-title' }) => ({
        ...theme.font[font],
        color: theme.colors[textColor],
        paddingTop: 2,
        textAlign: 'center',
    }));

    const CloseButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    padding-top : 12px;
    border-radius: 6px;
    border-width: 1px;
    background-color: #FFFFFFF;
    width: 99px;
    height: 40px;
    border-color:#0CB0E7;
    /* margin-left:5px; */
`;

    const ButtonContainer = styled.TouchableOpacity`
    height : 40px;
    width : ${({ fullWidth }) => fullWidth === true ? '100%' : null};
    display:flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => `0 ${theme.space['--space-16']}`};
    border-radius: 8px;
    background-color : ${({ editMode }) => editMode === true ? '#EEF2F6' : '#0CB0E7'};
    border: ${({ theme, borderColor }) => borderColor ? `1px solid ${theme.colors[borderColor]}` : null};
    
`;

    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}> 
            <ScrollView style={styles.container}> 
                <View>
                    <View style={styles.cardTitle}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={handleOnCaseIdPress}>
                                <Text style={styles.idText}>
                                    {displayNumber(caseItem.patient)}
                                </Text>

                            </TouchableOpacity>


                            {authStatus ? <View style={styles.statusWrapper} backgroundColor='#C6F6D5'>
                                <Text style={{
                                    color: '#2F855A',
                                    fontSize: 12
                                }}
                                >
                                    Authorized
                                </Text>
                            </View> : <View style={styles.statusWrapper} backgroundColor='#FED7D7'>
                                <Text style={{
                                    color: '#C53030',
                                    fontSize: 12
                                }}
                                >
                                    Pending
                                </Text>
                            </View>}

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.subjectText}>
                                {displayPatient(caseItem.patient)}
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                color: '#104587',
                                paddingBottom: 5
                            }}
                            >{appointmentDetails.appointment.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.doctors]}>
                        <View style={styles.cardDescription}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>Description</Text>
                                <Text style={[styles.detailText]}>{appointmentDetails.appointment.description ? appointmentDetails.appointment.description : "----"}</Text>
                            </View>


                        </View>

                    </View>

                    <View style={[styles.doctors]}>
                        <View style={styles.cardDescription}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>Physician</Text>
                                <Text style={[styles.detailText]}>{appointmentDetails?.appointment?.subject}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ flexDirection: 'column', marginRight: 15 }}>
                                    <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>
                                        Date
                                    </Text>
                                    <Text style={[styles.detailText]}>
                                        {formatDate(appointmentDetails.appointment.startTime)}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>
                                        Time
                                    </Text>
                                    <Text style={[styles.detailText]}>
                                        {getTime(appointmentDetails.appointment.startTime)} - {getTime(appointmentDetails.appointment.endTime)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.doctors]}>
                        <View style={styles.cardDescription}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>Cost</Text>
                                <Text style={[styles.detailText]}>${currencyFormatter(caseItem?.chargeSheet?.total)}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', width: 200, marginRight: 25 }}>
                                <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>
                                    Patient Pays
                                </Text>
                                <Text style={[styles.detailText]}>
                                    {patientPays ? `$${patientPays}` : "--"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.divider]} />


                    <View style={{ paddingBottom: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: '#104587' }}>Please the enter coverage amount to pre-authorize this procedure. This will inform us
                            on how much the patient should pay.</Text>

                    </View>

                    <View style={[styles.box]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, paddingBottom: 10, color: '#718096' }}>Coverage Amount</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 532 }}>
                                <InputField2
                                    labelWidth={98}
                                    value={`$ ${coverage.toString()}`}
                                    onChangeText={value => handleCoverage(value)}
                                    keyboardType={'number-pad'}
                                    onClear={() => handleClear()}
                                    onEndEditing={() => formatCoverage(coverage)}
                                    enabled={editMode}
                                />
                            </View>
                            <View >

                                <IconButton Icon={!editMode ? <EditIconButton /> : <Checked />} onPress={() => setEditMode(!editMode)} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>

                        <CloseButtonContainer theme={theme} background='--color-gray-300' onPress={() => modal.closeAllModals()}>
                            <ModalText theme={theme} textColor="--accent-button" font="--text-base-bold">Close</ModalText>

                        </CloseButtonContainer>

                        <ButtonContainer theme={theme} editMode={editMode} onPress={() => handleAuthClicked()} >
                            <ModalText theme={theme} textColor={editMode ? "--color-gray-500" : '--default-shade-white'} font="--text-base-bold">Authorize</ModalText>
                        </ButtonContainer>
                    </View>
                </View>

            </ScrollView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        paddingRight: '4%',
        paddingLeft: '4%',
        flexDirection: 'column',
    },

    buttonHolder: {
        flex: 1,
        //backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row'

    },

    editContainer: {
        height: 50,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 17,
        paddingHorizontal: 32,
        //backgroundColor: 'red'
    },

    editText: {
        color: '#718096',
        fontSize: 12,
        fontWeight: "500",
        flex: 1,
        // backgroundColor: 'red'
    },

    idText: {
        fontSize: 16,
        color: '#104587',
        marginBottom: 10,
        marginRight: 4,
    },
    subjectText: {
        fontSize: 20,
        color: '#0CB0E7',
        paddingBottom: 5
    },
    statusWrapper: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    cardTitle: {
        flexDirection: 'column',
        //paddingTop:10,
        paddingBottom: 20,
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1
    },
    doctors: { flexDirection: 'column' },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '4%',
        paddingTop: 20,
        paddingBottom: 20,
        //marginBottom:'5%',
        //height:100,
    },

    cardDescription: {
        paddingBottom: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider: {
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1,
    },
    cardDoctors: {
        flexDirection: 'column',
        marginTop: 20,
    },
    doctorContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 20,
    },
    box: {
        height: 96,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#F7FAFC',
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderColor: '#CBD5E0',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        flexDirection: 'column',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    detailText: {
        fontSize: 16,
        color: '#4E5664'
    },
    buttonController: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    footer: {
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,

    }
});

PreAuthorizationSheet.propTypes = {};
PreAuthorizationSheet.defaultProps = {};

export default PreAuthorizationSheet;
