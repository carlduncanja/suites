import React,{Component, useContext} from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import TabLeftCorner from '../../../../assets/svg/tabLeftCorner';
import TabRightCorner from '../../../../assets/svg/tabRightCorner';
import SvgIcon from '../../../../assets/SvgIcon';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const TabWrapper = styled.TouchableOpacity`
    height:100%;
`;

const TabContainer = styled.View`
    height: 100%;
    flex-direction : row;
`;

const TabCorner = styled.View`
    align-self: flex-end;
`;

const TabNameWrapper = styled.View`
    height: 100%;
`;
const TabNameContainer = styled.View`
    height:100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding-top:5px;
    padding-left:8px;
    padding-right:8px;
    background-color:${ ({backgroundColor}) => backgroundColor ? backgroundColor : null};
`;

const TabText = styled.Text(({theme, font = '--text-base-medium', color}) => ({
    ...theme.font[font],
    color,
}));

function Tab({backgroundColor, textColor = "", tabName = "", onTabPress = ()=>{}}) {

    const theme = useTheme();

    return (
        <TabWrapper onPress={onTabPress} activeOpacity={1}>
            <TabContainer>
                <TabCorner>
                    <TabLeftCorner fillColor={backgroundColor ? backgroundColor : null}/>
                </TabCorner>
                
                <TabNameWrapper>
                    <TabNameContainer backgroundColor={backgroundColor}>
                        <TabText theme={theme} color={textColor}>{tabName}</TabText>
                        {/* <Text style={[styles.text,{color:textColor}]}>{tabName}</Text> */}
                    </TabNameContainer>
                </TabNameWrapper>

                <TabCorner>
                    <TabRightCorner fillColor={backgroundColor ? backgroundColor : null}/>
                </TabCorner>
            </TabContainer>
        </TabWrapper>
        // <View style={styles.container}>
        //     <View style={styles.corner}>
        //         <SvgIcon iconName="tabLeft" fillColor={backgroundColor}/>
        //     </View>
        //     <View style={[styles.tabContainer,{backgroundColor:backgroundColor}]}>
        //         <Text style={[styles.text,{color:textColor}]}>{tabName}</Text>
        //     </View>
        //     <View style={styles.corner}>
        //         <SvgIcon iconName="tabRight" fillColor={backgroundColor}/>
        //     </View>
        // </View>
    );
}

export default Tab;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginRight:0,
    },
    tabContainer:{
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
        padding:5,
        paddingLeft:8,
        paddingRight:8
    },
    text:{
        fontSize:16,
        //color:'#3182CE'
    },
    corner:{
        alignSelf:'flex-end'
    }
})
