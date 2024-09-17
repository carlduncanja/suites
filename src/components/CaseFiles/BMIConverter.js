import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon';

const width = 20;
const BMIConverter = ({bmiValue, recordTitle, bmiScale}) => {
    const data = bmiScale;
    const indicator = <SvgIcon iconName="bmiIndicator"/>;

    const calcIndicatorPosition = value => {
        const calValue = value > 100 ? 100 : value;
        const bmiRange = data.filter(item => calValue >= item.startValue && calValue <= item.endValue);
        const getIndex = data.indexOf(bmiRange[0]);
        const position = (calValue - bmiRange[0]?.startValue) * (width / (bmiRange[0].endValue - bmiRange[0].startValue));
        return (getIndex * width) + position;
    };

    const BMIItem = (item, index) => (
        <View>
            {index === 0 ?
                <View style={[styles.bmiRange, {backgroundColor: item.color, borderBottomLeftRadius: 10, borderTopLeftRadius: 10}]}/> :
                index === bmiScale.length - 1 ?
                    <View style={[styles.bmiRange, {backgroundColor: item.color, borderBottomRightRadius: 10, borderTopRightRadius: 10}]}/> :
                    <View style={[styles.bmiRange, {backgroundColor: item.color}]}/>
            }
        </View>
    );

    const separator = () => (
        <View style={{backgroundColor: '#E3E8EF', width: 1}}/>
    );

    return (
        <>
            <View style={{left: calcIndicatorPosition(bmiValue)}}>{indicator}</View>
            <FlatList
                contentContainerStyle={styles.container}
                renderItem={({item, index}) => BMIItem(item, index)}
                ItemSeparatorComponent={separator}
                data={data}
                horizontal={true}
                keyExtractor={(item, index) => `${index}`}
            />
        </>
    );
};

export default BMIConverter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '40%',
        borderRadius: 30,
    },
    bmiRange: {
        width,
        height: 5
    }
});
