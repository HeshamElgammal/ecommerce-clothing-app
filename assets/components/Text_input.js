import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Styles } from "../pages/sign/style";


const Text_input = ({
    placeholder,
    icon_name,
    onChange,
    value,
    validion,
    error,
    border_color,
    border_width,
    secure,
    change_lock,
    type,
    Type_icon
}) => {
    return (
        <>

            <View
                style={[Styles.Text_input_field, { borderWidth: border_width, borderColor: border_color }]}
            >
                <TextInput style={Styles.text_input}
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor="#888"
                    onChangeText={onChange}
                    onEndEditing={validion}
                    secureTextEntry={secure}
                    keyboardType={type}
                />
                <TouchableOpacity style={Styles.view_icon_input}
                    onPress={change_lock}
                >
                    <Type_icon
                        name={icon_name}
                        size={25}
                        color="#888"
                    />
                </TouchableOpacity>

            </View>
            <Text style={Styles.error}>{error}</Text>
        </>
    )
}

export default Text_input