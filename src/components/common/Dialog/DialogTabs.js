import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import TabsContainer from "../Tabs/TabsContainer";

function DialogTabs({tabs, tab, onTabPress}) {
    return (
        <View style={styles.container}>
            <View style={{alignSelf: 'flex-end'}}>
                <TabsContainer
                    tabs={tabs}
                    onPressChange={onTabPress}
                    selectedTab={tabs[tab]}
                />
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
        backgroundColor: '#EEF2F6'
    }
});

export default DialogTabs;
