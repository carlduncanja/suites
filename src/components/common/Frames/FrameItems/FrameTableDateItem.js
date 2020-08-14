import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import styled from '@emotion/native'
import {useTheme} from "emotion-theming";
import DatePicker from "react-native-datepicker";

const FrameTableItemWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-right: 20px;
`

const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

const Title = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600']
}))


// const ValueContainer = styled.View(({theme, shadow = {}}) => ({
//     // ...theme.font['--text-base-regular'],
//     color: theme.colors['--color-gray-900'],
//     flex: 1,
//     backgroundColor: theme.colors['--default-shade-white'],
//     borderColor: theme.colors['--color-gray-400'],
//     borderWidth: 1,
//     borderRadius: 4,
//     height: 32,
//     justifyContent: 'center',
//     padding: 4,
//     paddingLeft: 12,
//     paddingRight: 12,
//     ...shadow
// }))
//
// const Value = styled.TextInput(({theme}) => ({
//     ...theme.font['--text-base-regular'],
//     color: theme.colors['--color-gray-900']
// }))

const FrameTableItem = ({
                            title = "",
                            value = "",
                            enabled = false,
                            handleOnDateChange = () => {
                            },
                            minDate,
                            maxDate,
                            placeholder,
                            format,
                            mode,
                            ...props
                        }) => {
    const theme = useTheme();

    return (
        <FrameTableItemWrapper theme={theme}>

            <TitleContainer theme={theme}>
                <Title
                    theme={theme}>{title.charAt(0).toUpperCase().concat(title.substring(1, title.length))}</Title>
            </TitleContainer>

            <DatePicker
                style={{flex: 1, height: 32}}
                date={value}
                mode={mode}
                disabled={!enabled}
                format={format}
                placeholder={placeholder}
                minDate={minDate}
                maxDate={maxDate}
                iconComponent={<View/>}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: {
                        color: theme.colors['--color-gray-900'],
                        backgroundColor: theme.colors['--default-shade-white'],
                        borderColor: theme.colors['--color-gray-400'],
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                        borderWidth: 1,
                        borderRadius: 4,
                        height: 32,
                        padding: 4,
                        paddingLeft: 12,
                        paddingRight: 12,
                        ...(enabled ? shadow: {})
                    },
                    disabled:  {
                        backgroundColor: theme.colors['--color-gray-100'],
                    }
                }}
                onDateChange={handleOnDateChange}
            />


        </FrameTableItemWrapper>
    );
}

export default FrameTableItem;


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0.2,
        height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 3,
};
