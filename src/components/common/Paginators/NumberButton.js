import { StyleSheet, Text, View } from "react-native";

/**
 * @typedef {Object} PaginatorNumberButtonProps
 * @property {number} number - The number to display
 * @property {boolean} isSelected
 */

/**
 *
 * @param {PaginatorNumberButtonProps} props
 * @returns {JSX.Element}
 */
const PaginatorNumberButton = ({ number, isSelected }) => {
    const styles = StyleSheet.create({
        container: {
            height: 28,
            width: 34,
            borderWidth: 1,
            borderColor: "#CCD6E0",
            backgroundColor: isSelected ? "#4299E1" : "#F9F9F9",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 12,
        },
        number: {
            color: isSelected ? "#fff" : "#313539",
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{number}</Text>
        </View>
    );
};

export default PaginatorNumberButton;
