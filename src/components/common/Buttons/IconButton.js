import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, View, StyleSheet} from "react-native";
import styled, {css} from "@emotion/native";
import {useTheme} from "emotion-theming";

const IconButtonWrapper = styled.TouchableOpacity`
    margin:0;
    flex:1;
    padding-right: 10px;
    padding-left: 10px;
  `;
const IconButtonContainer = styled.View`
    height:100%;
    width:100%;
    align-items:center;
    justify-content: center;
  `;


function IconButton({
                        Icon = () => {
                        },
                        onPress = () => {
                        },
                        disabled = false
                    }) {
    const theme = useTheme();

    return (
        <IconButtonWrapper theme={theme} onPress={onPress}>
            <IconButtonContainer theme={theme}>{Icon}</IconButtonContainer>
        </IconButtonWrapper>
    );
}

IconButton.propTypes = {};
IconButton.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default IconButton;
