import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const InsurerIcon = () => (<View>
        <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 -6.10352e-05H13C12.4 -6.10352e-05 12 0.399939 12 0.999939C12 1.59994 11.6 1.99994 11 1.99994C10.4 1.99994 10 1.59994 10 0.999939C10 0.399939 9.6 -6.10352e-05 9 -6.10352e-05H7C6.4 -6.10352e-05 6 0.399939 6 0.999939C6 1.59994 5.6 1.99994 5 1.99994C4.4 1.99994 4 1.59994 4 0.999939C4 0.399939 3.6 -6.10352e-05 3 -6.10352e-05H1C0.4 -6.10352e-05 0 0.399939 0 0.999939V10.9999C0 11.5999 0.4 11.9999 1 11.9999H15C15.6 11.9999 16 11.5999 16 10.9999V0.999939C16 0.399939 15.6 -6.10352e-05 15 -6.10352e-05ZM7 8.99994H3V4.99994H7V8.99994ZM13 8.99994H9V7.99994H13V8.99994ZM13 5.99994H9V4.99994H13V5.99994Z" fill="#718096"/>
        </Svg>
    </View>
);

InsurerIcon.propTypes = {};
InsurerIcon.defaultProps = {};

export default InsurerIcon;
