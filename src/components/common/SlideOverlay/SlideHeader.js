import React, {useContext} from 'react';
import {View} from 'react-native';
import {ViewModeHeading, EditModeHeading} from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import {SuitesContext} from '../../../contexts/SuitesContext';

const SlideHeader = ({id, title, selectedTab, currentTabs, onTabPressChange, isEditMode, onEditButtonPress}) => {
    return (
        <View style={{
            backgroundColor: isEditMode ? "#83AED1" : "#EEF2F6"
        }}>
            {
                isEditMode ?
                    <EditModeHeading
                        id={id}
                        title={title}
                        onButtonPress={onEditButtonPress}
                    />
                    :
                    <ViewModeHeading
                        id={id}
                        title={title}
                        onButtonPress={onEditButtonPress}
                    />
            }

            <TabsContainer
                tabs={currentTabs}
                selectedTab={selectedTab}
                onPressChange={onTabPressChange}
            />
        </View>
    );
}

export default SlideHeader;
