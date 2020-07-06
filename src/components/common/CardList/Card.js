import React from "react";
import { View } from "react-native";
import CardHeader from "./CardHeader";
import CardList from "./CardList";

/**
 * @param headerObject object
 * @param itemsArray array of objects
 * @returns {*}
 * @constructor
 */

const Card = ({headerObject, itemsArray}) =>{
    return (
        <>
            <CardHeader headerObject = {headerObject}/>
            <View
                style = {{
                    backgroundColor: "#CCD6E0",
                    height:1,
                    marginTop :20,
                    marginBottom:20,
                    borderRadius:2
                }}
            />
            <CardList itemsArray = {itemsArray}/>
        </>
    )
}

export default Card