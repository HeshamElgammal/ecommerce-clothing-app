import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native'
import { Styles } from "../pages/sign/style";
import AntDesign from "react-native-vector-icons/AntDesign"

const Text_input_confirm_pass = ({ term, placeHolder, onTermChange, pass }) => {
    const [error, setError] = React.useState('')
    const [secure, setSecure] = React.useState(true)
    const isConfirmPassValid = () => {
        if (String(term) != String(pass)) {
            setError("password not matched")
        } else {
            setError('')
        }
    }
    return (
        <>
            <View
                style={[Styles.Text_input_field]}
            >
                <TextInput
                    style={Styles.text_input}
                    autoCorrect={false}
                    secureTextEntry={secure}
                    placeholder={placeHolder}
                    value={term}
                    placeholderTextColor="#888"
                    onChangeText={onTermChange}
                    onEndEditing={isConfirmPassValid}
                />
                <TouchableOpacity style={Styles.view_icon_input}
                    onPress={() => {
                        setSecure(!secure)
                    }}
                >
                    <AntDesign
                        name={secure ? "unlock" : "lock"}
                        size={25}
                        color="#888"
                    />

                </TouchableOpacity>

            </View>
            <Text style={Styles.error}>{error}</Text>
        </>
    );
}

export default Text_input_confirm_pass;