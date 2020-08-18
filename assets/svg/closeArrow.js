import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const CloseArrow = ({strokeColor}) => (<View>
        <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6.00002 0.599903L11.4 5.9999L10 7.3999L6.00002 3.3999L2.00002 7.3999L0.600025 5.9999L6.00002 0.599903Z" fill="#718096"/>
        </Svg>
    </View>
);

CloseArrow.propTypes = {};
CloseArrow.defaultProps = {};

export default CloseArrow;
