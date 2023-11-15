import React from "react";
import { useTheme } from "emotion-theming";
import { TouchableOpacity, View, StyleSheet } from "react-native";

function IconButton({
    Icon = () => {},
    onPress = () => {},
    disabled = false,
    testID,
}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 10,
            borderRadius: 4,
        },
        icon: {
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
    });

    return (
        <TouchableOpacity
            testID={testID}
            style={styles.container}
            onPress={onPress}
            disabled={disabled}
        >
            <View theme={theme} style={styles.icon}>
                {Icon}
            </View>
        </TouchableOpacity>
    );
}

export default IconButton;
