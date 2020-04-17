import React,{ useContext} from 'react';
import { View } from 'react-native';
import { ViewModeHeading, EditModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';
 
const SlideHeader = ({id, title, selectedTab, currentTabs, onTabPressChange, isEditMode}) => { 
    const [state, dispatch] = useContext(SuitesContext)
    
    return (  
        <View style = {{
            backgroundColor : isEditMode ?"#83AED1" :"#EEF2F6" 
        }}>
            { 
                isEditMode ?
                    <EditModeHeading
                        id = {id}
                        title = {title}
                    />
                    :
                    <ViewModeHeading
                        id = {id}
                        title = {title}
                    />
            }

            <TabsContainer 
                tabs = {currentTabs}
                selectedTab = {selectedTab}
                onPressChange = {onTabPressChange}
            />
        </View>
    );
}
 
export default SlideHeader;
