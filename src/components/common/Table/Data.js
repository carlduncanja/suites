import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {CaseFileContext} from '../../../contexts/CaseFileContext';
import Item from './Item';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {emptyFn} from "../../../const";

const Data = ({
                  data = [],
                  listItemFormat = emptyFn()
              }) => (
    <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
            paddingBottom: 100
        }}
    >
        {
            data.map((item, index) => (
                <View key={index}>
                    {listItemFormat(item, index)}
                </View>
            ))
        }
    </KeyboardAwareScrollView>
);

export default Data;
