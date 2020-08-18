import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import styled from '@emotion/native'
import {useTheme} from "emotion-theming";


const FrameTableItemWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-right: 20px;
`

const TitleContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-right: 10px;
  min-width: 70px;
`

const Title = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600']
}))


const ValueContainer = styled.View(({theme, enabled = {}}) => ({
    // ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-900'],
    flex: 1,
    backgroundColor: enabled ? theme.colors['--default-shade-white'] : theme.colors['--color-gray-100'],
    borderColor: theme.colors['--color-gray-400'],
    borderWidth: 1,
    borderRadius: 4,
    height: 32,
    justifyContent: 'center',
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    ...(enabled ? shadow : {})
}))

const Value = styled.TextInput(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-900']
}))

const FrameTableItem = ({
                            title = "",
                            value = "",
                            selectable = false,
                            enabled = false,
                            editable = false,
                            onPress,
                            onChangeValue = () => {
                            }
}) => {
    const theme = useTheme();

    return (
        <TouchableOpacity disabled={!selectable} onPress={onPress}>
            <FrameTableItemWrapper theme={theme}>

                {
                    !!title &&
                    <TitleContainer theme={theme}>
                        <Title
                            theme={theme}>{title.charAt(0).toUpperCase().concat(title.substring(1, title.length))}</Title>
                    </TitleContainer>
                }

                <ValueContainer theme={theme} enabled={enabled}>
                    {/*<Value theme={theme}> {value} </Value>*/}

                    <TextInput value={value + ""} editable={editable} onChangeText={onChangeValue}/>

                </ValueContainer>

            </FrameTableItemWrapper>
        </TouchableOpacity>
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
