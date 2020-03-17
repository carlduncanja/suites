import React,{useState} from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { transformToSentence } from './useTextEditHook'

export const useFormHook = (dataTitles) =>{
    const { control, handleSubmit, errors } = useForm();
    const [data, setData] = useState({})
    const onSubmit = (data) => {
        setData(data)
        console.log("Data:",data )
    };
    const onChange = (args) => {
        return {
            value: args[0].nativeEvent.text,
        };
    };
  
    return (
        <View>
            {
                dataTitles.map((title,index)=>{
                    return(
                        <View key={index}>
                            <Text>{transformToSentence(title)}</Text>
                            <Controller
                                as={TextInput}
                                control={control}
                                name={title}
                                onChange={onChange}
                                // rules={{ required: true }}
                                defaultValue=""
                            />
                            {/* {errors.title && <Text>This is required.</Text>} */}
                        </View>
                    )
                    
                })
            }
            {/* <Text>First name</Text>
            <Controller
                as={TextInput}
                control={control}
                name="firstName"
                onChange={onChange}
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.firstName && <Text>This is required.</Text>}

            <Text>Last name</Text>
            <Controller as={TextInput} control={control} name="lastName" defaultValue="" /> */}

            <Button title = "Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}
