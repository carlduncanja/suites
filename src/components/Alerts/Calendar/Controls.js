import React, { useState } from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import AlertLeft from '../../../../assets/svg/alertsLeftArrow';
import AlertRight from '../../../../assets/svg/alertsRightArrow';
import OptionsField from '../../common/Input Fields/OptionsField';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';

const Controlsrapper = styled.View`
    width: 100%;
    height: 32px;
`;

const ControlsContainer = styled.View`
    height: 100%;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ArrowContainer = styled.TouchableOpacity`
    height: 100%;
    width: 24px;
    border: ${ ({theme}) => theme.colors['--color-gray-400']};
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

const DateContainer = styled.View`
    width: 190px;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: yellowgreen;
`;

const MonthContainer = styled.View`
    width: 105px;
`;

const OptionsContainer = styled.View`
    width: 105px;
`;

const TextItem = styled.Text(({theme, color = '--color-gray-800', font = '--text-base-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};
   
function Controls() {
    const theme = useTheme();

    const [selectedMonth, setSelectedMonth] = useState(1);
    const onMonthPress = value => {
        console.log("Month: ", value);
        setSelectedMonth(value);
    };

    return (
        <Controlsrapper>
            <ControlsContainer>

                <ArrowContainer
                    theme={theme}
                    style={css`padding-right: 2px;`}
                    onPress={() => {}}
                >
                    <AlertLeft/>
                </ArrowContainer>

                <DateContainer>

                    <MonthContainer theme={theme}>
                        <OptionsField
                            text={MONTHS[selectedMonth]}
                            oneOptionsSelected={onMonthPress}
                            menuOption={(
                                <MenuOptions customStyles={styles}>
                                    <MenuOption value={1} text="January"/>
                                    <MenuOption value={2} text="February"/>
                                    <MenuOption value={3} text="March"/>
                                    <MenuOption value={4} text="April"/>
                                    <MenuOption value={5} text="May"/>
                                </MenuOptions>
                            )}
                        />
                    </MonthContainer>

                </DateContainer>

                <ArrowContainer
                    theme={theme}
                    style={css`padding-left: 2px;`}
                    onPress={() => {}}
                >
                    <AlertRight/>
                </ArrowContainer>

            </ControlsContainer>
        </Controlsrapper>
    );
}

const styles = {
    optionsContainer: {
        width: 105,
        backgroundColor:"white",
    }
};

Controls.propTypes = {};
Controls.defaultProps = {};

export default Controls;
