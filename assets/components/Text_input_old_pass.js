import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native'
import { Styles } from "../pages/sign/style";
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector } from 'react-redux';

const Text_input_old_pass = ({ term, placeHolder, onTermChange, }) => {
    const select_data_user = useSelector(state => state.Global.data_user)
    const [error, setError] = React.useState('')
    const [secure, setSecure] = React.useState(true)
    const isOldPassValid = () => {
        if (select_data_user.password != term) {
            setError("It's not old pass")
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
                    onEndEditing={isOldPassValid}
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

export default Text_input_old_pass;