import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid
} from "react-native"
const { width, height } = Dimensions.get("window")

import { Colors } from "../colors";
import { Styles } from "./style";

import AntDesign from "react-native-vector-icons/AntDesign"
import Text_input_confirm_pass from "../../components/Text_input_confirm_pass";
import Text_input_pass from "../../components/Text_input_pass";

const Reset_password = ({navigation}) => {
    const [valid_sign_pass, set_valid_sign_pass] = React.useState(false)
    const [valid_sign_confirm_pass, set_valid_sign_confirm_pass] = React.useState(false)
    const [Password, setPassword] = React.useState()
    const [ConfirmPassword, setConfirmPassword] = React.useState()

    const isPassValid = () => {
        if (String(Password).length < 8) {
            set_valid_sign_pass(false)
        } else {
            set_valid_sign_pass(true)
        }
    }

    const isConfirmPassValid = () => {
        if (String(ConfirmPassword) != String(Password)) {
            set_valid_sign_confirm_pass(false)
        } else {
            set_valid_sign_confirm_pass(true)
        }
    }

    React.useEffect(() => {
        isPassValid()
        isConfirmPassValid()
    }, [ConfirmPassword, Password])

    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <View style={[Styles.back_ground, { alignItems: "flex-end" }]}>
                    <StatusBar
                        backgroundColor={Colors.back_ground_color}
                        barStyle="dark-content"
                    />
                    <View style={Styles.back_header_container}>
                        <View style={{ width: "16%" }}></View>
                        <View style={Styles.view_name_in_header}>
                            <Text style={Styles.name_header}>Reset Password</Text>
                        </View>
                        <TouchableOpacity style={{ width: "16%" }}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={Styles_in.title}>Reset Password</Text>

                    <Text style={Styles_in.content}>Enter your New Password Please.{' '}</Text>
                    <View style={{
                        alignSelf: "center",
                        alignItems: "center"
                    }}>
                        <Text_input_pass
                            term={Password}
                            placeHolder="Password"
                            onTermChange={newPassword => setPassword(newPassword)}
                        />
                    </View>
                    <View style={{
                        alignSelf: "center",
                        alignItems: "center"
                    }}>
                        <Text_input_confirm_pass
                            pass={Password}
                            placeHolder="Confirm Password"
                            onTermChange={newConfirmPass => setConfirmPassword(newConfirmPass)}
                            term={ConfirmPassword}
                        />
                    </View>
                    <TouchableOpacity style={Styles_in.verify_button}
                        onPress={() => {
                            if ((valid_sign_pass && valid_sign_confirm_pass) === true) {
                                ToastAndroid.show("Updated", ToastAndroid.SHORT)
                                // navigation.navigate("Tab_switch")
                            } else {
                                ToastAndroid.show("Error Password", ToastAndroid.SHORT)
                            }
                        }}
                    >
                        <Text style={[Styles.text_in_button, { fontWeight: "400" }]}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
};

const Styles_in = StyleSheet.create({
    title: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        marginTop: height * .06,
        marginBottom: height * .012,
        marginHorizontal: width * .04,
    },
    content: {
        fontSize: 16,
        fontWeight: "300",
        marginTop: height * .01,
        marginBottom: height * .02,
        marginHorizontal: width * .04,
    },
    verify_button: {
        backgroundColor: Colors.button_check_out,
        width: width * .75,
        height: height * .065,
        alignSelf: "center",
        borderRadius: width * .02,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * .075
    },
    Container_input: {
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: width * .9,
        alignItems: "center",
        marginTop: height * .03
    },
    box_left_input: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: width * .18,
        borderRadius: width * .03,
        borderColor: Colors.button_check_out,
        borderWidth: 1,
        height: "100%"
    },
    textInput: {
        width: width * .9,
        height: height * .08,
        borderRadius: width * .03,
        elevation: 4,
        backgroundColor: Colors.back_ground_color,
        borderWidth: 1,
        borderColor: Colors.button_check_out,
        color: "#000"
    },
    errors: {
        textAlign: "center",
        alignSelf: "center",
        fontSize: width * .03,
        color: Colors.invalid_input_color
    }
})



export default Reset_password