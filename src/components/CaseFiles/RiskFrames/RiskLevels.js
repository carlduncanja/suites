import React,{useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import RiskLevel from './RiskLevel';

export function Low({level, notes}) {
    return(
        <View>
            <RiskLevel
                titleBackground="#EBF8FF"
                borderColor="#90CDF4"
                levelColor="#4299E1"
                cardColor="#3182CE"
                riskLevel={level}
                itemContent = {notes}
            />
        </View>
    )
}

export function Moderate({level, notes}) {
    return(
        <View>
            <RiskLevel
                titleBackground="#FFFAF0"
                borderColor="#FBD38D"
                levelColor="#ED8936"
                cardColor="#DD6B20"
                riskLevel={level}
                itemContent = {notes}
            />
        </View>
    )
}

export function High({level, notes}) {
    return(
        <View>
            <RiskLevel
                titleBackground="#FFF5F5"
                borderColor="#FEB2B2"
                levelColor="#F56565"
                cardColor="#E53E3E"
                riskLevel={level}
                itemContent = {notes}
            />
        </View>
    )
}

export function VeryHigh({level, notes}) {
    return(
        <View>
            <RiskLevel
                titleBackground="#FAF5FF"
                borderColor="#D6BCFA"
                levelColor="#9F7AEA"
                cardColor="#805AD5"
                riskLevel={level}
                itemContent = {notes}
            />
        </View>
    )
}



