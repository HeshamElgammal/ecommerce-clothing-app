import React from 'react';
import { TextInput, Text, View } from 'react-native'
import { Colors } from '../pages/colors';
import { Styles } from "../pages/sign/style";
import Fontisto from "react-native-vector-icons/Fontisto"

const Text_input_email = ({ term, placeholder, onTermChange }) => {
    const [error, setError] = React.useState('')

    const isEmailValid = () => {
        let email = term
        let Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        Pattern.test(String(email).toLowerCase()) ? setError('') : (setError("Invalid Email Address"))
     
    }

    return (
        <>
            <View
                style={[Styles.Text_input_field]}
            >
                <TextInput
                    style={Styles.text_input}
                    autoCorrect={false}
                    placeholder={placeholder}
                    value={term}
                    placeholderTextColor="#888"
                    onChangeText={onTermChange}
                    onEndEditing={isEmailValid}
                />
                <View style={Styles.view_icon_input}>
                    <Fontisto
                        name={"email"}
                        size={25}
                        color="#888"
                    />
                </View>

            </View>
            <Text style={Styles.error}>{error}</Text>
        </>
    );
}

export default Text_input_email;