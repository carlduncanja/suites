import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import _ from "lodash";
import FramStaffIcon from '../../../assets/svg/frameMedicalStaff';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import drug from '../../../assets/svg/drug'
import alcohol from "../../../assets/svg/alcohol";
import tobacco from "../../../assets/svg/tobacco";

const LifeStyleTabs = ({ LifestyleData,
    isEditMode,
    handleEdit = () => { },
    onDelete = () => { },
    onAction = () => { } },
) => {


    const updatedList = LifestyleData



    const Categories = updatedList.map(categorie => {
        let backgroundColor = ''
        let frame = ''
        let icon = FramStaffIcon
        let border = ''
        const { name = "", items = [], _id = "" } = categorie
        switch (name) {
            case 'Drug Use':
                backgroundColor = '#FAF5FF';
                frame = '#805AD5';
                border = '#D6BCFA'
                icon = drug;
                break;
            case 'Alcohol Use':
                backgroundColor = '#FFF5F5';
                frame = "#E53E3E";
                border = "#FEB2B2"
                icon = alcohol;
                break;
            case 'Tobacco Use':
                backgroundColor = '#EEF2F6';
                frame = '#4E5664';
                border = '#A0AEC0'
                icon = tobacco
                break;
            default:
                backgroundColor = '#90CDF4';
                frame = "#3182CE";
                border = "#A0AEC0"
                break;

        }

        const itemsName = items.map(item => {
            const { name = '' } = item
            return name
        })
        const itemsIds = items.map(item => {
            const { _id = '' } = item
            return _id
        })

        return { name: name, itemsNames: itemsName, color: backgroundColor, frame: frame, icon: icon, _id: _id, itemsIds: itemsIds, border: border }
    })

    const categoriesIds = updatedList.map(categories => {
        const { _id = "" } = categories
        return _id;
    })

    const renderItem = (categoryData, index) => {
      
        return (<View style={styles.frameContainer} key={index}>
            <FrameCard
                frameColor={categoryData.frame}
                titleBackgroundColor={categoryData.color}
                frameBorderColor={categoryData.border}
                frameTitle={categoryData.name}
                cardInformation={categoryData.itemsNames}
                icon={categoryData.icon}
                isEditMode={isEditMode}
                onEdit={handleEdit}
                onDelete={onDelete}
                idArray={categoryData.itemsIds}
                onAction={(data) =>
                    onAction({ id: categoryData._id, data: data })
                }
                normalInput={true}

            />
        </View>)

    }



    return (
        <ScrollView>
            {Categories.map((item, index) => (
                renderItem(item, index)
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