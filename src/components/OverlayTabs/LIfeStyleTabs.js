import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { addLifeStyleItems } from '../../api/network'
import _ from "lodash";
import Footer from "../common/Page/Footer";
import FramStaffIcon from '../../../assets/svg/frameMedicalStaff';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import drug from '../../../assets/svg/drug'
import alcohol from "../../../assets/svg/alcohol";
import tobacco from "../../../assets/svg/tobacco";
import ConfirmationCheckBoxComponent from '../../components/ConfirmationCheckBoxComponent';
import ConfirmationComponent from '../../components/ConfirmationComponent'

const LifeStyleTabs = ({ LifestyleData,
    isEditMode,
    handleEdit = () => { },
    onDelete = () => { },
    onAction = () => { } },
    modal
) => {

    //const { data } = lifestyleData
    const updatedList = LifestyleData



    const Categories = updatedList.map(categorie => {
        let backgroundColor = ''
        let frame = ''
        let icon = FramStaffIcon
        let border=''
        const { name = "", items = [], _id = "" } = categorie
        switch (name) {
            case 'Drug Use':
                backgroundColor = '#FAF5FF';
                frame = '#805AD5';
                border='#D6BCFA'
                icon = drug;
                break;
            case 'Alcohol Use':
                backgroundColor = '#FFF5F5';
                frame = "#E53E3E";
                border="#FEB2B2"
                icon = alcohol;
                break;
            case 'Tobacco Use':
                backgroundColor = '#EEF2F6';
                frame = '#4E5664';
                border='#A0AEC0'
                icon = tobacco
                break;
            default:
                backgroundColor = '#90CDF4';
                frame = "#3182CE";
                break;

        } 

        const itemsName = items.map(item => {
            const { name = '' } = item
            return name
        }) 
        const itemsIds = items.map(item =>{
            const {_id=''}=item
            return _id
        })

        return { name: name, itemsNames: itemsName, color: backgroundColor, frame: frame, icon: icon, _id: _id,itemsIds:itemsIds,border:border }
    })

    const categoriesIds = updatedList.map(categories => {
        const { _id = "" } = categories
        return _id;
    })

    const renderItem = (categorieData) => {

        return (<View style={styles.frameContainer}>
            <FrameCard
                frameColor={categorieData.frame}
                titleBackgroundColor={categorieData.color}
                frameBorderColor={categorieData.border}
                frameTitle={categorieData.name}
                cardInformation={categorieData.itemsNames}
                icon={categorieData.icon}
                isEditMode={isEditMode}
                //handleEdit={handleEdit}
                onDelete={onDelete}
                idArray={categorieData.itemsIds}
                onAction={(data) =>
                    onAction({id:categorieData._id, data:data})
                }
                textInput={true}
            />
        </View>)

    }

    

    return (
        <ScrollView>
            {Categories.map(cats => (
                renderItem(cats)
            ))}
        </ScrollView>

    )
}
export default LifeStyleTabs

const styles = StyleSheet.create({
    frameContainer: {
        marginBottom: 10
    }
})