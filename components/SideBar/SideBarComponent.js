import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import NavigationTab from "./SideBarTabComponent";

function SideBarComponent({routes, selectedIndex, screenDimensions, onTabPressed}) {
    return (
        <View style={{
            flexDirection: 'row',
            width: 88,
            shadowColor: "#000",
            shadowOffset: {
                width: 3.5,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }} >
            <View style={styles.tabContainer}>

                {/*Logo*/}
                <View style={[ styles.logo,
                        {paddingBottom: screenDimensions.width > screenDimensions.height ? 10 : 25 }
                    ]}>
                    <SvgIcon iconName="logo" />
                </View>

                <ScrollView
                    stickyHeaderIndices={[selectedIndex]}
                    scrollEventThrottle={2}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={[styles.container]}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                >
                    {
                        // Spread the navigation routes.
                        routes.map((route, tabIndex) => {
                            const { routeName , params } = route;
                            const { icon, tabName } = params || {};

                            return (
                                <View style={{ width: '100%' }} key={tabIndex}>

                                    <NavigationTab
                                        icon={icon}
                                        tabName={tabName}
                                        isTabSelected={tabIndex === selectedIndex}
                                        onTabPress={(e) => onTabPressed(e, routeName)}
                                    />

                                </View>
                            )
                        })
                    }
                </ScrollView>

            </View>

            <View style={styles.sideBarEdge} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 80,
        flexDirection: 'column',
    },
    tabContainer: {
        height: '100%',
        width: 80,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#104587',
        //flex:1,
    },
    logo: {
        paddingTop: 10
    },
    sideBarEdge: {
        width: 8,
        backgroundColor: "white"
    }
});


SideBarComponent.propTypes = {};
SideBarComponent.defaultProps = {};

export default SideBarComponent;
