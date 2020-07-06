import React from 'react';
import { View } from "react-native";

const Seperator = ({color}) => {
    return (
        <View
            style = {{
                backgroundColor: color,
                height:1,
                marginTop :15,
                marginBottom:15,
                borderRadius:2
            }}
        />
    )
}

export default Seperator

