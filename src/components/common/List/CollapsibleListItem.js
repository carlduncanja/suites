import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import CheckBoxComponent from "../Checkbox";
import Collapsible from 'react-native-collapsible';
import CollapsibleListItemParentView from './CollapsibleListItemParentView';
import PropTypes from 'prop-types';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import CollapsibleListItemChildView from './CollapsibleListItemChildView';


/** 
 *
 * @param hasCheckBox{bool}
 * @param isChecked{bool}
 * @param onCheckBoxPress{function}
 * @param onItemPress{function}
 * @param childView{node}
 * @param render{function} function to render item view that take collapse a s call back.
 * @returns {*}
 * @constructor
 */

const CollapsibleListItemWrapper = styled.View`
    width: 100%;
    margin-bottom: ${ ({theme}) => theme.space['--space-12']};
`;
const CollapsibleListItemContainer = styled.TouchableOpacity`
    display: flex;
    width: 100%;
    
    flex-direction: column;
    border-radius: ${ ({theme, isCollapsed}) => theme.space['--space-8']};
    border: ${ ({theme, isCollapsed}) => `${isCollapsed ? '1px': '1px'} solid ${theme.colors['--color-gray-300']}`};
    //border-bottom-width : ${ ({isCollapsed}) => isCollapsed ===true ? 0 : null};
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
`;

function CollapsibleListItem ({
        hasCheckBox = true,
        isChecked = false,
        onCheckBoxPress = ()=>{},
        onItemPress = () => {},
        childView,
        render = ()=>{},
        children = ()=>{}  ,
        backgroundColor,
    }) {

    const [isCollapsed, setCollapsed] = useState(true);
    const theme = useTheme();
    const collapse = () => {
        console.log("collapse press")
        setCollapsed(!isCollapsed);
    }

    return (

        <CollapsibleListItemWrapper theme = {theme}>
            <CollapsibleListItemContainer theme = {theme} onPress = {() => onItemPress(collapse)} isCollapsed = {isCollapsed}>
                <CollapsibleListItemParentView
                    hasCheckBox = {hasCheckBox}
                    isChecked = {isChecked}
                    onCheckBoxPress = {onCheckBoxPress}
                    collapse = {collapse}
                    isCollapsed = {isCollapsed}
                    render = {render}
                    backgroundColor = {backgroundColor}
                />

                <CollapsibleListItemChildView
                    isCollapsed = {isCollapsed}
                    children = {children}
                />

                {/* <View style={styles.list}>
                    {
                        hasCheckBox &&
                        <View style={{alignSelf: 'center', justifyContent: 'center', padding: 10, marginRight: 10}}>
                            <CheckBoxComponent
                                isCheck={isChecked}
                                onPress={onCheckBoxPress}
                            />
                        </View>
                    }
                    {
                        render(collapse, isCollapsed)
                    }
                </View>
                <Collapsible collapsed={isCollapsed}>
                    <View style={styles.divider}/>
                    {
                        !isCollapsed &&
                        <View style={[styles.childContent]}>

                            {children}

                        </View>
                    }
                </Collapsible> */}
            </CollapsibleListItemContainer>
        </CollapsibleListItemWrapper>
        // </CollapsibleListItemWrapper>
    );
};

export default CollapsibleListItem

CollapsibleListItem.propTypes = {
    hasCheckBox: PropTypes.bool,
    isChecked: PropTypes.bool,
    onCheckBoxPress: PropTypes.func,
    onItemPress: PropTypes.func,
    childView: PropTypes.node,
    render: PropTypes.func
};
CollapsibleListItem.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: "#E3E8EF",
    },
    divider: {
        // flex: 1,
        width: '100%',
        height: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#E3E8EF",
        marginBottom: 20
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    childContent: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:22,
        paddingBottom:20,
        marginBottom: 20,

        // padding: 8,
        // marginTop: 0
    }
});
