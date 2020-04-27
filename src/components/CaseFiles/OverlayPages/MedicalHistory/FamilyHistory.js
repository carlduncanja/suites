import React from 'react';
import { View, ScrollView } from 'react-native';
import { FamilyPreExistingConditions } from '../../OverlayCardFrames';

import FamilyIcon from '../../../../../assets/svg/familyConditions';


const FamilyHistory = ({tabDetails}) => {
    const getConditionData = (conditions) => {
        let newArray = []
        conditions.map((item)=>{
            let newObject = {"relative":item.relative, "condition":item.condition}
            newArray.push(newObject)
        })
        return newArray
    }
    let conditions = tabDetails.filter(item => item.types === 'preExistingConditions')
    return ( 
        <ScrollView>
            <FamilyPreExistingConditions 
                cardInformation = {getConditionData(conditions)}
                icon = {FamilyIcon}
            />
        </ScrollView>
    );
}
 
export default FamilyHistory;