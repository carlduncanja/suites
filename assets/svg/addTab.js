import React from 'react';
import Svg, {Path, Rect, G, ClipPath, Defs} from "react-native-svg";
import {View} from "react-native";

const AddTab = ({strokeColor, fillColor}) => (<View>
        <Svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0)">
                <Path d="M10.5 6V9H2.5V6H0.5V10C0.5 10.2652 0.605357 10.5196 0.792893 10.7071C0.98043 10.8946 1.23478 11 1.5 11H11.5C11.7652 11 12.0196 10.8946 12.2071 10.7071C12.3946 10.5196 12.5 10.2652 12.5 10V6H10.5Z" fill="#A0AEC0"/>
                <Path d="M5.5 6H7.5V4H9.5V2H7.5V0H5.5V2H3.5V4H5.5V6Z" fill="#A0AEC0"/>
            </G>
            <Defs>
                <ClipPath id="clip0">
                    <Rect x="0.5" width="12" height="12" fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    </View>
);

AddTab.propTypes = {};
AddTab.defaultProps = {};

export default AddTab;
