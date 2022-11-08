import React from 'react';
import Svg, { Path, G, Rect } from "react-native-svg";
import { View } from "react-native";

const EditIconButton = ({ strokeColor }) => (<View>
    <Svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/Svg">
        <G filter="url(#filter0_dd_14409_266350)">
            <Path d="M25.2406 13.9199L23.0837 11.763C22.8882 11.5714 22.6254 11.4641 22.3516 11.4641C22.0779 11.4641 21.8151 11.5714 21.6196 11.763L12.4689 20.9136V24.5346H16.0834L25.2341 15.384C25.4257 15.1885 25.533 14.9257 25.533 14.652C25.533 14.3782 25.4257 14.1154 25.2341 13.9199H25.2406ZM15.5409 23.2274H13.7762V21.4626L19.9463 15.286L21.7176 17.0573L15.5409 23.2274ZM22.6392 16.1357L20.8679 14.3644L22.3516 12.8807L24.1229 14.652L22.6392 16.1357Z" fill="#0CB0E7" />
            <Rect x="3.50098" y="2.5" width="31" height="31" rx="5.5" stroke="#0CB0E7" />
        </G>
    </Svg>

</View>
);

EditIconButton.propTypes = {};
EditIconButton.defaultProps = {};

export default EditIconButton;
