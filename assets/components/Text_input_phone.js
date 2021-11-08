import React from 'react';
import { TextInput, Text, View } from 'react-native'
import { Styles } from "../pages/sign/style";
import AntDesign from "react-native-vector-icons/AntDesign"

const Text_input_phone = ({ term, placeHolder, onTermChange, onTermSubmit }) => {
    const [error, setError] = React.useState('')
    const isPhoneValid = () => {
        if (String(term).length < 11 || String(term).length > 14) {
            setError("phone number should be 11 nums ")
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
                    placeholder={placeHolder}
                    value={term}
                    placeholderTextColor="#888"
                    onChangeText={onTermChange}
                    onEndEditing={isPhoneValid}
                    keyboardType="phone-pad"
                />
                <View style={Styles.view_icon_input}>
                    <AntDesign
                        name={"mobile1"}
                        size={25}
                        color="#888"
                    />
                </View>

            </View>
            <Text style={Styles.error}>{error}</Text>
        </>
    );
}

export default Text_input_phone;