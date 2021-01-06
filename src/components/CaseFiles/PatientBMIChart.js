import React, {} from 'react';
import {View} from 'react-native';
import BMIChart from './BMIChart';

const PatientBMIChart = ({value, bmiScale}) => {
    const list = [
        {
            color: '#4299E1',
            title: 'Underweight',
            description: 'Below 18.5'
        },
        {
            color: '#48BB78',
            title: 'Healthy',
            description: '18.5 - 24.9'
        },
        {
            color: '#ED8936',
            title: 'Overweight',
            description: '25.5 - 29.9'
        },
        {
            color: '#E53E3E',
            title: 'Obese',
            description: '30.0 - 39.9'
        },
        {
            color: '#805AD5',
            title: 'Extremely Obese',
            description: '40 and up'
        }
    ];

    const bmiRange = bmiScale.filter(item => value >= item.startValue && value <= item.endValue);
    const selected = bmiRange[0].color;
    return (
        <View style={{width: 400}}>
            <BMIChart
                value={value}
                bmiList={list}
                selected={selected}
            />
        </View>
    );
};

export default PatientBMIChart;
