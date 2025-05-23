import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const EditLockIcon = ({strokeColor}) => (<View>
        <Svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 5H8V3C8 2.20435 7.68393 1.44129 7.12132 0.87868C6.55871 0.31607 5.79565 0 5 0C4.20435 0 3.44129 0.31607 2.87868 0.87868C2.31607 1.44129 2 2.20435 2 3V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H9C9.26522 12 9.51957 11.8946 9.70711 11.7071C9.89464 11.5196 10 11.2652 10 11V6C10 5.73478 9.89464 5.48043 9.70711 5.29289C9.51957 5.10536 9.26522 5 9 5ZM6 5H4V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2C5.26522 2 5.51957 2.10536 5.70711 2.29289C5.89464 2.48043 6 2.73478 6 3V5Z" fill="#718096"/>
        </Svg>
    </View>
);

EditLockIcon.propTypes = {};
EditLockIcon.defaultProps = {};

export default EditLockIcon;
