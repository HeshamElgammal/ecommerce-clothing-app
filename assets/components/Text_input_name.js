import React from 'react';
import { TextInput, Text, View } from 'react-native'
import { Styles } from "../pages/sign/style";
import AntDesign from "react-native-vector-icons/AntDesign"

const Text_input_name = ({ term, placeHolder, onTermChange, onTermSubmit }) => {
    const [error, setError] = React.useState('')
    const isNameValid = () => {
        if (String(term).length < 2) {
            setError("Name should be more than 2 characters ")
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
                    onEndEditing={isNameValid}
                />
                <View style={Styles.view_icon_input}>
                    <AntDesign
                        name={"user"}
                        size={25}
                        color="#888"
                    />

                </View>

            </View>
            <Text style={Styles.error}>{error}</Text>
        </>
    );
}

export default Text_input_name;