import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import NavigationTab from "./SideBarTabComponent";

function SideBarComponent({routes, navigation, selectedIndex, screenDimensions}) {


    const handleTabPress = () => {
        // TODO navigate to the pressed tab
    };


    return (
        <View style={{ flex: 1, width: '11%' }} >
            <View style={{ flex: 1 }}>
                <View style={styles.viewContainer}>
                    <View style={[styles.logo,
                        { paddingBottom: screenDimensions.width > screenDimensions.height ? 10 : 25 }
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
                                            onTabPress={handleTabPress}
                                        />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>

                </View>
                <View style={styles.footer} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    viewContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#104587',
        //flex:1,
    },
    logo: {
        paddingTop: 10
    },
    content: {
        flex: 12,
    }
});


SideBarComponent.propTypes = {};
SideBarComponent.defaultProps = {};

export default SideBarComponent;
