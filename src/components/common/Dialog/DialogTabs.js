import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import TabsContainer from "../Tabs/TabsContainer";
import AddTab from "../../../../assets/svg/addTab";

function DialogTabs({tabs, tab, onTabPress, onAddTab, tabName}) {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                alignSelf: 'flex-end',
                justifyContent: "flex-end"
            }}>
                <TabsContainer
                    tabs={tabs}
                    onPressChange={onTabPress}
                    selectedTab={tabs[tab]}
                />
                {
                    onAddTab &&
                    <View style={{justifyContent: "center", marginLeft: 16}}>
                        <TouchableOpacity
                            style = {{flex:1, justifyContent: "center", flexDirection: "row", alignItems: 'center'}}
                            onPress={onAddTab}
                        >
                            <AddTab/>
                            <Text style={{marginLeft: 6, color: "#A0AEC0", fontWeight: "500"}}>
                                { `${tabName} ${tabs.length+1}` }
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    );
}

DialogTabs.propTypes = {};
DialogTabs.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF2F6',
        paddingTop:8,
    }
});

export default DialogTabs;
