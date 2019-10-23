import SelectableText from 'react-native-selectable-text';

export default function SelectText({ text, onSelectionChange }){
    <SelectableText
        selectable
        multiline
        scrollEnabled={false}
        editable={false}
        onSelectionChange={(event) => {
            const {
                nativeEvent: {
                    selection: { start, end },
                },
            } = event

            const str = text.substring(start, end)

            onSelectionChange({ str, start, end })

        }}

        style={{color: "#BAB6C8"}}
        value={text}
    />
}
