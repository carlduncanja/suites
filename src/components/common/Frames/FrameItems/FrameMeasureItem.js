import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native";
import Dropdown from '../../Dropdown';

const FrameSelectItem = ({ title,
    value,
    unit,
    editable = false,
    onChangeValue = () => { },
    index,
}) => {
    const [currentIndex, setIndex] = useState(index)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.valueContainer}>
                <TextInput value={value + ""} style={[styles.measure, styles.value]} editable={editable} onChangeText={(res) => {onChangeValue(res, currentIndex)} }/>
                <View style={styles.unitContainer}>
                    <Text style={styles.measure}>{unit}</Text>
                </View>

            </View>
        </View>
    );
}

export default FrameSelectItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin:10,
        marginRight:20
       
    },
    titleContainer: {
        marginRight: 10,
        // width:'32%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    title: {
        color: '#718096',
        fontSize: 16
    },
    valueContainer: {
        marginLeft: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderColor: "#CCD6E0",
        borderWidth: 1,
        borderRadius: 4,
    },
    value: {
        paddingLeft: 4
    },
    unitContainer: {
        alignSelf: "flex-end",
        alignItems: 'center',
        backgroundColor: "#F8FAFB",
        borderLeftWidth: 1,
        borderLeftColor: '#CCD6E0',
        padding: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        
    },
    measure: {
        color: '#1D2129',
        fontSize: 16,
        paddingRight: 0,
        alignSelf: 'center', 
        marginRight:10
    },
})