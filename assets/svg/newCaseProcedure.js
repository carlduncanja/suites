import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const procedures = ({strokeColor, fillColor}) => (<View>
        <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9.46521 8.12109L0.29321 17.2931C-0.00679019 17.5931 -0.0847902 18.0501 0.0992098 18.4331C0.26721 18.7821 0.61921 19.0001 1.00021 19.0001C1.03721 19.0001 1.07421 18.9981 1.11121 18.9941L10.1112 17.9941C10.6172 17.9371 11.0002 17.5101 11.0002 17.0001V13.4141L12.8792 11.5351L9.46521 8.12109Z" fill={fillColor}/>
            <Path d="M21.7024 0.92094C20.2174 -0.37706 17.7504 -0.16506 16.3564 1.22994C14.3594 3.22694 10.8794 6.70694 10.8794 6.70694L15.5864 11.4139C15.7814 11.6089 16.0374 11.7069 16.2934 11.7069C16.5494 11.7069 16.8054 11.6089 17.0004 11.4139L21.7764 6.63794C22.4294 5.98494 22.9004 5.14494 22.9974 4.22694C23.1294 2.96194 22.6534 1.75294 21.7024 0.92094Z" fill={strokeColor}/>
        </Svg>
    </View>
);

procedures.propTypes = {};
procedures.defaultProps = {};

export default procedures;
