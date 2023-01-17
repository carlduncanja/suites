import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../Buttons/IconButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import FrameTitle from '../FrameTitle'
import WasteIcon from '../../../../../assets/svg/wasteIcon'
import InputField2 from '../../../common/Input Fields/InputField2'
import _, { reduce, set } from "lodash";
import Row from '../../../common/Row';
import SearchableOptionsField from '../../../common/Input Fields/SearchableOptionsField'
import { getPhysicians, getUsersCall } from '../../../../api/network'

const FrameItemWrapper = styled.View`
    width: 100%;
    display:flex;
    margin-bottom : ${({ theme }) => theme.space['--space-12']};

    
`;
const FrameItemContainer = styled.View`

    width : 100%;
    height : 203px;
    border : 1px solid ${({ theme }) => theme.colors['--color-gray-400']};
    border-radius : 4px;
    background-color : ${({ theme }) => theme.colors['--default-shade-white']};
    
    
`;

const FrameItemContent = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-900']

}));

const FrameHeader = styled.View`
width: 100%;
height: 32px;
background-color : ${({ theme }) => theme.colors['--default-shade-white']};
padding-left : ${({ theme }) => theme.space['--space-16']};
padding-right : ${({ theme }) => theme.space['--space-16']};
justify-content : space-between;
align-items: center;
flex-direction : row;
border-top-left-radius : 4px;
border-top-right-radius : 4px;
border-width: 1px;
border-color : ${({ theme }) => theme.colors['--color-gray-400']};
`

const FrameBody = styled.View`
display: flex;
padding-left:25px;
padding-right:25px;
padding-bottom:25px;
height:171px;
justify-content:center;

`
export const FrameContent = styled.View`
flex-direction : row;
justify-content : space-between;
`

export const CancelButtonContainer = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    padding-top : 12px;
    border-radius: 10px;
    border-width: 1px;
    background-color: #FFFFFFF;
    width: 99px;
    height: 40px;
    border-color:#3182CE;
    /* margin-left:5px; */
`;

export const ModalText = styled.Text(({ textColor = '--color-gray-600', theme, font = '--confirm-title' }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    textAlign: 'center',
}));

const RecordContainer = styled.View` 
width:52px;
`

export const ButtonContainer = styled.TouchableOpacity`
    height : 40px;
    width : ${({ fullWidth }) => fullWidth === true ? '100%' : null};
    display:flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => `0 ${theme.space['--space-16']}`};
    border-radius: 8px;
    background-color: ${({ background, theme }) => theme.colors[background]};
    border: ${({ theme, borderColor }) => borderColor ? `1px solid ${theme.colors[borderColor]}` : null};

`;

function FrameEditItem({
    itemContent = {},
    onPressButton = () => { },
    onDelete = () => { },
    onCancel = () => { },
    title = "",
    deleteMode = false,
    normalInput = false,
    physicianSelection = true,
    buttonTitle = "",
    onAction = () => { },
    onEdit = () => { },
    id,
    toggleAddOption = () => { },
    setEditPress = () => { }
}) {

    const [physicianName, setPhysicianName] = useState(itemContent.name);
    const [physicianType, setPhysicianType] = useState(itemContent.type);
    const [searchResult, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0);
    const [generatedLeadSurgeon, setGeneratedLeadSurgeon] = useState();
    const [searchQuery, setSearchQuery] = useState({})
    const [selectedType, setSelectedType] = useState("Physician");
    const [staffInfo, setStaffInfo] = useState([]);
    const [actionButton, setActionButton] = useState(false)
    const [actionButtonB, setActionButtonB] = useState(false)
    const [generatedNurse, setGeneratedNurse] = useState();
    const [name, setName] = useState(itemContent.name);
    const [condition, setCondition] = useState(itemContent.condition);

    const theme = useTheme();
    //console.log('item content for edit page ', itemContent)

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const searchFunction = (selectedType === "Physician") ? fetchPhysicians : fetchNurses

        const search = _.debounce(searchFunction, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });
        search()
    }, [searchValue])


    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((physicianResult = []) => {
                const { data = [], pages = 0 } = physicianResult
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get physicians");
                setSearchResults([]);
            })
    };


    async function updatePhysicianDB(item, handlePatientFunc, setSelectedValueFunc) {
        let result = {};
        const token = item.split(" ");
        item = {
            "firstName": token[0],
            "surname": token[1]
        },
            await createPhysician(item).then(res => {
                result = {
                    _id: res._id,
                    name: `${res.firstName} ${res.surname}`
                }
            }).then(res => {
                handlePatientFunc(result);
                setSelectedValueFunc(result);
            })
    }

    const fetchNurses = () => {
        getUsersCall(searchValue, 1, 5)
            .then((userResult = []) => {
                const { data = [], pages = 0 } = userResult
                const filterUser = data.filter(user => user?.role?.name === 'Nurse');
                const results = filterUser.map(item => ({
                    name: `Nurse ${item.last_name}`,
                    ...item
                }));
                console.group("Nurse results: ", results);
                setSearchResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get nurses");
                setSearchResults([]);
            })
    }

    const handleSurgeon = (value) => {
        const staff = {
            _id: value?._id,
            name: value?.name,
            tag: value?.tag,
            type: "Physician"
        }

        setStaffInfo([
            ...staffInfo,
            staff
        ])
    }

    const onStaffChange = (value) => {
        console.log(value)
        setStaffInfo([
            ...staffInfo,
            value
        ])
    }

    const activateButton = (value) => {
        setActionButton(value)
    }

    const activateButtonB = (value) => {
        setActionButtonB(value)
    }

    return (
        <FrameItemWrapper theme={theme}>
            <FrameItemContainer theme={theme}>
                <FrameHeader>
                    <Text>{title}</Text>
                    {deleteMode ?
                        <TouchableOpacity onPress={onDelete}>
                            <WasteIcon strokeColor={theme.colors['--color-red-700']} />
                        </TouchableOpacity>
                        :
                        <View></View>
                    }

                </FrameHeader>

                <FrameBody>
                    <View style={{ zIndex: 7 }}>
                        <FrameContent>
                            <View style={{ flex: 1, marginBottom: 30, padding: 5 }}>
                                <View style={{ marginBottom: 5, }}>
                                    <Text style={styles.title}>Relative</Text>
                                </View >
                                <View style={{ ...styles.inputWrapper, zIndex: 7 }}>
                                    {normalInput ?
                                        <InputField2
                                            onChangeText={(e) => {
                                                setName(e)
                                                activateButton(true)
                                            }}
                                            value={name}
                                            onClear={() => {
                                                setName('')
                                                activateButton(false)
                                            }}
                                        /> : null

                                    }
                                </View>
                            </View>

                            <View style={{ flex: 1, marginBottom: 30, padding: 5 }}>
                                <View style={{ marginBottom: 5, }}>
                                    <Text style={styles.title}>Condition</Text>
                                </View >
                                <View style={{ ...styles.inputWrapper, zIndex: 7 }}>
                                    {normalInput ?
                                        <InputField2
                                            onChangeText={(e) => {
                                                setCondition(e)
                                                activateButtonB(true)
                                            }}
                                            value={condition}
                                            onClear={() => {
                                                setCondition('')
                                                activateButtonB(false)
                                            }}
                                        /> : null
                                    }
                                </View>
                            </View>
                    
                        </FrameContent>
                    </View>
                    <FrameContent>

                        <CancelButtonContainer theme={theme} background='--color-gray-300'
                            onPress={onCancel}
                        >
                            <ModalText theme={theme} textColor="--color-blue-600" font="--text-base-bold">Cancel</ModalText>
                        </CancelButtonContainer>
                        {(actionButton  && actionButtonB)?
                            <ButtonContainer
                                onPress={() => {
                                    actionButton ?
                                        normalInput ? buttonTitle === 'Add' ? onAction(name,condition) : onEdit(id, name) : onAction(staffInfo[0]._id)
                                        :

                                        null
                                    toggleAddOption(false);
                                    setEditPress(false)
                                }}
                                theme={theme}
                                background={actionButton ? "--color-blue-600" : '--color-gray-300'}
                            >

                                <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">{buttonTitle}</ModalText>
                            </ButtonContainer>
                            :
                            <ButtonContainer

                                theme={theme}
                                background={'--color-gray-300'}
                            >

                                <ModalText theme={theme} textColor="--default-shade-white" font="--text-base-bold">{buttonTitle}</ModalText>
                            </ButtonContainer>
                        }
                    </FrameContent>

                </FrameBody>


            </FrameItemContainer>

        </FrameItemWrapper>
    )
}
export default FrameEditItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#CCD6E0',
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    text: {
        fontSize: 16,
        color: '#1D2129',
        //fontFamily:'Metropolis'
    },
    title: {
        color: '#718096',
        fontSize: 16,
        // marginBottom:5
    },
    inputWrapper: {
        // flex:1,
        height: 30,
        // width:'100%',
        justifyContent: 'center',
    },
})