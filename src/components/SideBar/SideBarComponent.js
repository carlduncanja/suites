import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import SvgIcon from "../../../assets/SvgIcon";
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
            zIndex: 5,
            elevation: 5,
        }}>
            <View style={styles.tabContainer}>

                {/*Logo*/}
                <View style={[styles.logo,
                    {paddingBottom: screenDimensions.width > screenDimensions.height ? 10 : 25}
                ]}>
                    <SvgIcon iconName="logo"/>
                </View>

                <ScrollView
                    stickyHeaderIndices={[selectedIndex]}
                    scrollEventThrottle={2}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={[styles.container]}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start', width: '100%'}}
                >
                    {
                        // Spread the navigation routes.
                        routes.map((route, tabIndex) => {
                            const {routeName, params} = route;
                            const {icon, tabName} = params || {};

                            return (
                                <View style={{width: '100%'}} key={tabIndex}>

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

                <View style={{height: 45, width: '100%'}}>
                    <View style={styles.loginBadge}>
                        <Text style={
                            {
                                ...styles.textStyle,
                                fontSize: 7
                            }}>
                            LOGGED IN AS
                        </Text>
                    </View>

                    <View style={styles.userNameBadge}>
                        <Text style={{
                            ...styles.textStyle,
                            fontSize: 10,
                        }}>
                            H. EDWARDS
                        </Text>
                    </View>
                </View>

            </View>

            <View style={styles.sideBarEdge}/>
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
    },
    loginBadge: {
        height: 20,
        width: '100%',
        backgroundColor: "#205EAC",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        /* default/shade/white */
        color: '#FFFFFF',
    },
    userNameBadge: {
        flex: 1,
        height: 25,
        backgroundColor: '#2168C3',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.23,
        shadowRadius: 5,
        elevation: 5,
    }
});


SideBarComponent.propTypes = {};
SideBarComponent.defaultProps = {};

export default SideBarComponent;
