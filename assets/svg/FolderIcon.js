import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const FolderIcon = ({strokeColor}) => (<View>
        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M4.809 0H0V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H10C10.5304 11 11.0391 10.7893 11.4142 10.4142C11.7893 10.0391 12 9.53043 12 9V2H5.809L4.809 0Z" fill="#90CDF4"/>
        </Svg>
    </View>
);

FolderIcon.propTypes = {};
FolderIcon.defaultProps = {};

export default FolderIcon;
