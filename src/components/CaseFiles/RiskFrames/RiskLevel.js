import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import FrameItem from '../../common/Frames/FrameItems/FrameItem';
import RiskIcon from '../../../../assets/svg/riskLevel';
import LineDivider from '../../common/LineDivider';
import TextArea from '../../common/Input Fields/TextArea';
import TextEditor from '../../common/Input Fields/TextEditor';
import { set, update } from 'lodash';


const RiskLevelWrapper = styled.View`
    width : 100%;
    border-radius : 8px;

`;

const HeaderWrapper = styled.View`
    width : 100%;
    height : 40px;
    padding : ${({ theme }) => theme.space['--space-10']};
    padding-top : 0;
    padding-bottom : 0;
    border-top-left-radius : 8px;
    border-top-right-radius : 8px;
    border-color : ${({ borderColor }) => borderColor};
    background-color : ${({ backgroundColor }) => backgroundColor};
    border-width : 1px;
`;
const HeaderContainer = styled.View`
    height : 100%;
    display : flex;
    flex-direction : row;
    align-items : center;
`;

const Title = styled.Text(({ titleColor, theme }) => ({
    ...theme.font['--text-base-medium'],
    color: titleColor,
    marginLeft: 8,
}));

const ContentWrapper = styled.View`
    width : 100%;
    /* height : 100%; */
    padding : ${({ theme }) => theme.space['--space-16']};
    border-bottom-left-radius : 8px;
    border-bottom-right-radius : 8px;
    border-color : ${({ theme }) => theme.colors['--color-gray-400']};
    border-width : 1px;
    border-top-width : 0;
    background-color :  ${({ theme }) => theme.colors['--color-gray-100']};
`;
const ContentContainer = styled.View`
    flex : 1;
`;

const LevelsContainer = styled.View`
    width : 100%;
    height : 34px;
    flex-direction : row;
    border-width : 1px;
    border-right-width : 0;
    border-color : ${({ theme }) => theme.colors['--color-gray-400']};
    align-items : center;
`;

const LevelWrapper = styled.TouchableOpacity`
    height : 100%;
    flex :1;
`;

const LevelContainer = styled.View`
    flex : 1;
    border-right-width : 1px;
    border-color : ${({ theme }) => theme.colors['--color-gray-400']};
    justify-content : center;
    align-items : center;
    background-color : ${({ backgroundColor }) => backgroundColor};
`;

const LevelText = styled.Text(({ color, theme }) => ({
    ...theme.font['--text-base-medium'],
    color,
}));

const DividerContainer = styled.View`
    padding-top : ${({ theme }) => theme.space['--space-24']};
    padding-bottom : ${({ theme }) => theme.space['--space-24']};
`;

const NotesContainer = styled.View``;

const NotesText = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-gray-500'],
    marginBottom: 6
}));

function RiskLevel({
    // titleBackground = theme.colors['--color-gray-200'],
    // borderColor = theme.colors['--color-gray-400'],
    // levelColor = theme.colors['--color-gray-500'],
    // cardColor = theme.colors['--color-gray-600'],
    titleBackground = '--color-gray-200',
    borderColor = '--color-gray-400',
    levelColor = '--color-gray-500',
    cardColor = '--color-gray-600',
    riskLevel = 'default',
    itemContent = [],
    isEditMode = false,
    onFieldChange = () => { },
    onRiskChange = () => { }
}) {
    const theme = useTheme();
    const levels = [
        {
            "level": "low",
            "name": "Low",
        },
        {
            "level": "moderate",
            "name": "Moderate",
        },
        {
            "level": "high",
            "name": "High",
        },
        {
            "level": "veryHigh",
            "name": "Very High",
        },
    ];
    const [selectedRiskLevel, setSelectedRiskLevel] = useState({ "level": riskLevel, "name": riskLevel })
    const [isUpdated, setIsUpdated] = useState(true)
    const [fields, setFields] = useState({
        riskLevel: "",
        description: ""
    })

    const Level = (name, backgroundColor, textColor) => {
        const background = backgroundColor;

        return (
            <LevelContainer backgroundColor={background}>
                <LevelText color={textColor}>{name}</LevelText>
            </LevelContainer>
        );
    };

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            console.log("we in here ",selectedRiskLevel.level)
            onRiskChange(selectedRiskLevel.level)
        }
    }, [isEditMode])

    return (
        <RiskLevelWrapper theme={theme}>

            <HeaderWrapper theme={theme} borderColor={isEditMode ? theme.colors['--color-purple-400'] : theme.colors[borderColor]} backgroundColor={isEditMode ? theme.colors['--color-purple-200'] : theme.colors[titleBackground]}>
                <HeaderContainer theme={theme}>
                    <RiskIcon fillColor={isEditMode ? theme.colors['--color-purple-500'] : theme.colors[levelColor]} />
                    <Title titleColor={isEditMode ? theme.colors['--color-purple-600'] : theme.colors[cardColor]} theme={theme}>Risk Level</Title>
                </HeaderContainer>
            </HeaderWrapper>

            <ContentWrapper theme={theme}>
                <ContentContainer>

                    <LevelsContainer>
                        {
                            levels.map((level, index) => {
                                return (
                                    <LevelWrapper

                                        activeOpacity={1}
                                        key={index}
                                        onPress={() => {
                                            if (isEditMode) {
                                                setSelectedRiskLevel(level);
                                                setIsUpdated(true);
                                            }

                                        }}
                                    >
                                        {Level(
                                            level.name,
                                            level.level === selectedRiskLevel.level ? theme.colors['--color-purple-500'] : theme.colors['--default-shade-white'],
                                            level.level === selectedRiskLevel.level ? theme.colors['--default-shade-white'] : theme.colors['--color-gray-700']
                                        )}
                                    </LevelWrapper>

                                );
                            })
                        }
                    </LevelsContainer>

                    <DividerContainer theme={theme}>
                        <LineDivider />
                    </DividerContainer>

                    <>
                        <NotesText theme={theme}>Notes</NotesText>
                        {
                            isEditMode ?
                                <TextArea  
                                
                                /> :
                                <FrameItem itemContent={itemContent} />
                        }
                    </>

                </ContentContainer>
            </ContentWrapper>


            {/* <View style={[styles.titleContainer,{backgroundColor:titleBackground, borderColor:borderColor, borderWidth:1}]}>
                <RiskIcon fillColor={levelColor}/>
                <Text style={{color:cardColor, marginLeft:5}}>Risk Level</Text>
            </View> */}

            {/* <View style={styles.contentContainer}>
                <View style={styles.levelsContainer}>
                    {
                        levels.map((level,index)=>{
                            return(
                                <TouchableOpacity
                                    activeOpacity = {1}
                                    key = {index}
                                    style = {{flex:1, borderWidth : level.level === riskLevel && 0 }}
                                    onPress = {()=>{onRiskChange(level.level)}}
                                >
                                    {Level(
                                        level.name,
                                        level.level === riskLevel ? levelColor : "#FFFFFF",
                                        level.level === riskLevel ? "#FFFFFF" : "#4E5664"
                                    )}
                                </TouchableOpacity>
                            )

                        })
                    }
                </View>
                <View
                    style={{
                        backgroundColor:"#CCD6E0",
                        height:1,
                        borderRadius:2,
                        marginTop:35,
                        marginBottom:35
                    }}
                />
                <View style={styles.notesContainer}>
                    <View style={styles.notesTitleContainer}>
                        <Text style={styles.notesTitle}>Note</Text>
                    </View>
                    {
                        isEditMode ?
                            <TextEditor
                                onFieldChange = {onFieldChange}
                            />
                            :
                            <View>
                                <FrameItem itemContent={itemContent}/>
                            </View>
                    }
                </View>
            </View> */}

        </RiskLevelWrapper>
    );
}

export default RiskLevel;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFB',
        borderRadius: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    contentContainer: {
        padding: 20,
        borderColor: '#CCD6E0',
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    levelsContainer: {
        flexDirection: "row",
        width: '100%',
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: "#CCD6E0"
    },
    level: {
        borderRightWidth: 1,
        borderColor: "#CCD6E0",
        justifyContent: 'center',
        padding: 7,
        alignItems: 'center',
    },
    levelTitle: {
        fontSize: 16
    },
    notesContainer: {
        //paddingTop:25
    },
    notesTitleContainer: {
        marginBottom: 5
    },
    notesTitle: {
        color: "#718096",
        fontSize: 16
    }
})
