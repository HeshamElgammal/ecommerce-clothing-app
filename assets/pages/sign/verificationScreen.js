import React, { useState, useRef } from "react";
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
import { useSelector } from "react-redux";

const VerificationScreen = ({ navigation }) => {
    const selctPhone = useSelector(state => state.Global.data_user)
    const [error_code1, set_error_code1] = React.useState(true)
    const [error_code2, set_error_code2] = React.useState(true)
    const [error_code3, set_error_code3] = React.useState(true)
    const [error_code4, set_error_code4] = React.useState(true)

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });

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
                            <Text style={Styles.name_header}>Verification</Text>
                        </View>
                        <TouchableOpacity style={{ width: "16%" }}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={Styles_in.title}>OTP Verification</Text>
                    <Text style={Styles_in.content}>Enter the OTP number just sent you at{' '}
                        <Text style={Styles_in.phone_text}>+2{selctPhone.phone}</Text>
                    </Text>
                    <View
                        style={Styles_in.optContainer}
                    >
                        <View style={Styles_in.otpBox}>
                            <TextInput
                                style={Styles_in.otpText}
                                placeholder="4"
                                placeholderTextColor="#e0e0e0"
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={fourthInput}

                                onChangeText={(value) => {
                                    if (value.length > 0) {
                                        set_error_code4(false)
                                    } else {
                                        set_error_code4(true)
                                    }
                                    setOtp({ ...otp, 4: value });

                                }}
                            />
                        </View>
                        <View style={Styles_in.otpBox}>
                            <TextInput
                                style={Styles_in.otpText}
                                placeholder="3"
                                placeholderTextColor="#e0e0e0"
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={thirdInput}
                                onChangeText={(value) => {
                                    if (value.length > 0) {
                                        set_error_code3(false)
                                    } else {
                                        set_error_code3(true)
                                    }
                                    setOtp({ ...otp, 3: value })
                                    value && fourthInput.current.focus()
                                }}
                            />
                        </View>
                        <View style={Styles_in.otpBox}>
                            <TextInput
                                style={Styles_in.otpText}
                                placeholder="2"
                                placeholderTextColor="#e0e0e0"
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={secondInput}
                                onChangeText={(value) => {
                                    if (value.length > 0) {
                                        set_error_code2(false)
                                    } else {
                                        set_error_code2(true)
                                    }
                                    setOtp({ ...otp, 2: value })
                                    value && thirdInput.current.focus()
                                }}
                            />
                        </View>
                        <View style={Styles_in.otpBox}>
                            <TextInput
                                style={Styles_in.otpText}
                                placeholder="1"
                                placeholderTextColor="#e0e0e0"
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={firstInput}
                                onChangeText={(value) => {
                                    if (value.length > 0) {
                                        set_error_code1(false)
                                    } else {
                                        set_error_code1(true)
                                    }
                                    setOtp({ ...otp, 1: value })
                                    value && secondInput.current.focus()
                                }}
                            />
                        </View>
                    </View>
                    <View style={Styles_in.title_sms_container}>
                        <TouchableOpacity style={Styles_in.title_button_code}>
                            <Text style={{ color: Colors.button_check_out, fontWeight: "400" }}>Resend Code</Text>
                        </TouchableOpacity>
                        <Text >Didn't receive SMS?</Text>
                    </View>
                    <TouchableOpacity style={Styles_in.verify_button}
                        onPress={() => {
                            if ((error_code1 && error_code2 && error_code3 && error_code4) === false) {
                                navigation.navigate("ResetPass_stack")
                                ToastAndroid.show("code Valid", ToastAndroid.SHORT)
                            } else {
                                ToastAndroid.show("Code Not Valid", ToastAndroid.SHORT)
                            }

                        }}
                    >
                        <Text style={[Styles.text_in_button, { fontWeight: "400" }]}>Verify</Text>
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
    phone_text: {
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 18 * 1.4,
        color: Colors.button_check_out
    },
    optContainer: {
        marginBottom: height * .02,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: width * .8,
        alignSelf: 'center',
        marginTop: height * .02
    },
    otpBox: {
        borderRadius: 5,
        borderWidth: .8,
        borderColor: Colors.button_check_out
    },
    otpText: {
        fontSize: 25,
        color: "#000",
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: width * .02,
    },
    title_sms_container: {
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: width * .04,
        marginTop: height * .08
    },
    title_button_code: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFFFF"
    },
    verify_button: {
        backgroundColor: Colors.button_check_out,
        width: width * .75,
        height: height * .065,
        alignSelf: "center",
        borderRadius: width * .02,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * .08
    }
})



export default VerificationScreen