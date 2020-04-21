import React,{ useState } from "react";
import { SectionList, View } from "react-native";

const ColumnSectionsList = ({sections}) => {

    return (
        sections.map(( item, index) => {
            return (
                <>
                    {item}
                    {
                        index !== sections.length - 1 && <View style = {{
                                height : 1,
                                backgroundColor : "#CCD6E0",
                                borderRadius : 2,
                                marginBottom:25,
                                marginTop:20
                            }}  
                        />
                    }
                </>

            )
        })     
    )
}

export default ColumnSectionsList