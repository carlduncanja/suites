import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameSelectItem from '../FrameItems/FrameSelectItem';
import FrameMeasureItem from '../FrameItems/FrameMeasureItem';
import moment from 'moment';
import { formatDate } from '../../../../utils/formatter';
import DateInputField from '../../Input Fields/DateInputField';
import TextButton from '../../../common/Buttons/TextButton'
const FequencyOptions = ["often", "regular", "high", "irregular", "low"]

const FrameLifestyleContent = ({ cardInformation, isEditMode = false, onSavePress = () => { } }) => {
    const {
        frequency = "",
        amount = 0,
        unit = "",
        usage = "",
        measureValue = 10,
        unitOfMeasure = "oz",
        startDate,
        _id = " "
    } = cardInformation

    const [lifestyleFeilds, setLifestyleFeilds] = useState({
        frequency: frequency,
        amount: amount,
        unit: unit,
        usage: usage,
        measureValue: measureValue,
        unitOfMeasure: "oz",
        startDate: startDate
    })

    const [editted, setEditted] = useState(false)

    const onLifeStyleFeildChange = (feildName, value) => {
        setLifestyleFeilds({
            ...lifestyleFeilds,
            [feildName]: value
        })
        setEditted(true)
    }



    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.label}>
                    <FrameSelectItem title="Frequency"
                        value={lifestyleFeilds.frequency}
                        isEdiMode={isEditMode}
                        options={FequencyOptions}
                        onOneSelected={(value) => { onLifeStyleFeildChange('frequency', value) }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <FrameTableItem
                        title="Amount"
                        value={lifestyleFeilds.amount}
                        editable={isEditMode}
                        enabled={isEditMode}
                        onChangeValue={(value) => { onLifeStyleFeildChange('amount', value) }}

                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.label}>
                    <FrameTableItem
                        title="Unit"
                        value={lifestyleFeilds.unit}
                        editable={isEditMode}
                        enabled={isEditMode}
                        onChangeValue={(value) => { onLifeStyleFeildChange('unit', value) }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <FrameMeasureItem
                        editable={isEditMode}
                        title="Capacity"
                        value={lifestyleFeilds.measureValue}
                        unit={lifestyleFeilds.unitOfMeasure}
                        onChangeValue={(value) => { onLifeStyleFeildChange('measureValue', value) }}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.label}>
                    <FrameTableItem
                        title="Usage"
                        value={lifestyleFeilds.usage}
                        editable={isEditMode}
                        enabled={isEditMode}
                        onChangeValue={(value) => { onLifeStyleFeildChange('usage', value) }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    {isEditMode ?
                        <View style={styles.rowContainer}>
                            <View style={{ justifyContent: 'center',marginRight:10,marginLeft:10 }}>
                                <Text style={styles.title}>Since</Text>
                            </View>
                               <View style={styles.dateLabel}>
                                <DateInputField
                                    value={formatDate(lifestyleFeilds.startDate || new Date(), 'DD/MM/YYYY')}
                                    onClear={() => onLifeStyleFeildChange('startDate', (''))}
                                    keyboardType="number-pad"
                                    mode="date"
                                    format="DD/MM/YYYY"
                                    placeholder="DD/MM/YYYY"
                                    onDateChange={(value) => { onLifeStyleFeildChange('startDate', value) }}
                                    maxDate={new Date(moment().subtract(1, 'days'))}
                                /> 
                               </View> 
                            
                        </View>
                        :

                        <FrameTableItem title="Since" value={formatDate(lifestyleFeilds.startDate, "DD/MM/YYYY")} editable={isEditMode} enabled={isEditMode} />
                    }
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>

                {
                    isEditMode && editted &&
                    <View style={{ padding: 8, marginRight: 8, height: 30 }}>
                        <TextButton
                            title="Save"
                            buttonPress={() => { onSavePress(lifestyleFeilds) }}
                        />
                    </View>
                }


            </View>

        </View>
    );
}

export default FrameLifestyleContent;

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        // alignItems:'flex-start'
    },

    itemContainer: {
        width: '50%',
        // backgroundColor:'yellow',
        alignSelf: 'flex-start',
        marginLeft: 10,
        justifyContent:"center",
        
        // alignSelf:'flex-start'
    },
    label: {
        width: '50%',
        // backgroundColor:'yellow',
        alignSelf: 'flex-start',
        marginRight: 10
        // alignSelf:'flex-start'
    }, 
    dateLabel:{
        width: '65%',
        // backgroundColor:'yellow',
        alignSelf: 'flex-start',
        marginRight: 18
        // alignSelf:'flex-start'
    },
    title: {
        color: '#718096',
        fontSize: 16
    }

})