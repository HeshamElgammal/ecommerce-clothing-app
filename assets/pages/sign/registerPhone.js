import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    StyleSheet,
    ToastAndroid
} from "react-native"
const { width, height } = Dimensions.get("window")

import { Colors } from "../colors";
import { Styles } from "./style"
import AntDesign from "react-native-vector-icons/AntDesign"
import Text_input_phone from "../../components/Text_input_phone";

const Register_phoneScreen = ({ navigation }) => {
    const [valid_sign_phone, set_valid_sign_phone] = React.useState(false)
    const [phone, setPhone] = React.useState("")
    const isPhoneValid = () => {
        if (String(phone).length < 11 || String(phone).length > 14) {
            set_valid_sign_phone(false)
        } else {
            set_valid_sign_phone(true)
        }
    }
    React.useEffect(() => {
        isPhoneValid()
    }, [phone])
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
                            <Text style={Styles.name_header}>Register Phone</Text>
                        </View>
                        <TouchableOpacity style={{ width: "16%" }}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={Styles_in.title}>Register Phone</Text>

                    <Text style={Styles_in.content}>Enter your registered phone number to login.{' '}</Text>
                    <View style={{
                        alignSelf: "center",
                        alignItems: "center"
                    }}>
                        <Text_input_phone
                            placeHolder="phone"
                            term={phone}
                            onTermChange={newPassword => setPhone(newPassword)}
                        />
                    </View>


                    <TouchableOpacity style={Styles_in.verify_button}
                        onPress={() => {

                            if (valid_sign_phone === true) {

                                navigation.navigate("Code_stack")
                            } else {
                                ToastAndroid.show("Email Not Valid", ToastAndroid.SHORT)
                            }
                        }}
                    >
                        <Text style={[Styles.text_in_button, { fontWeight: "400" }]}>Continue</Text>
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
        marginTop: height * .08
    },
    Container_input: {
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: width * .9,
        alignItems: "center",
        marginTop: height * .06
    },
    box_left_input: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // width: width * .18,
        borderRadius: width * .03,
        borderColor: Colors.button_check_out,
        borderWidth: 1,
        height: "100%",
        paddingHorizontal: width * .03
    },
    textInput: {
        width: width * .7,
        height: height * .08,
        borderRadius: width * .03,
        elevation: 4,
        backgroundColor: Colors.back_ground_color,
        borderWidth: 1,
        borderColor: Colors.button_check_out,
        color: "#000"
    },
    error_phone: {
        textAlign: "center",
        fontSize: width * .035,
        alignSelf: "center",
        marginTop: height * .01,
        color: Colors.invalid_input_color
    }
})



export default Register_phoneScreen