import React, { useContext} from 'react';
import {View, ScrollView} from 'react-native';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import Item from './Item';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Data = ({data = [], listItemFormat = () => {}}) =>

// const sliceMin = currentListMin ? currentListMin : 0
// const sliceMax = currentListMax ? currentListMax : data.length

    (
        <KeyboardAwareScrollView
            bounces={false}
            extraScrollHeight={100}
            contentContainerStyle={{
                paddingBottom: 100
            }}
        >

            {/* {data.slice(sliceMin,sliceMax).map((item,index)=>{ */}
            {data.map((item, index) => (
                <View key={index}>
                    {listItemFormat(item, index)}
                </View>
            ))
            }
        </KeyboardAwareScrollView>
    );

export default Data;
