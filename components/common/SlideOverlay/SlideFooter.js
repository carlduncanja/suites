import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MenuWithoutPagination from '../OverlayMenuBars/MenuWithoutPagination';

const SlideFooter = () => {
    return ( 
        <View>
            <MenuWithoutPagination 
                    fillColor="#CCD6E0"
                    backgroundColor="#FFFFFF"
                />
        </View>
    );
}
 
export default SlideFooter;