import React from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ToastAndroid
} from 'react-native';
const { width, height } = Dimensions.get("window")
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { Colors } from '../colors';
import { Styles } from './style';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch } from 'react-redux';
import { Add_user } from '../redux/actions/add_user';
import Text_input_phone from '../../components/Text_input_phone';
import Text_input_pass from '../../components/Text_input_pass';
import Text_input_email from '../../components/Text_input_email';
import Text_input_name from '../../components/Text_input_name';
import Text_input_confirm_pass from '../../components/Text_input_confirm_pass';
const Sign_Up = ({ navigation }) => {
    const [name, setName] = React.useState()
    const [phone, setPhone] = React.useState("")
    const [Email, SetEmail] = React.useState()
    const [Password, setPassword] = React.useState()
    const [ConfirmPassword, setConfirmPassword] = React.useState()
    const dispatch = useDispatch()

    const [valid_sign_email, set_valid_sign_email] = React.useState(false)
    const [valid_sign_name, set_valid_sign_name] = React.useState(false)
    const [valid_sign_phone, set_valid_sign_phone] = React.useState(false)
    const [valid_sign_pass, set_valid_sign_pass] = React.useState(false)
    const [valid_sign_confirm_pass, set_valid_sign_confirm_pass] = React.useState(false)





    const isNameValid = () => {
        if (String(name).length < 2) {
            set_valid_sign_name(false)
        } else {
            set_valid_sign_name(true)
        }
    }

    const isEmailValid = () => {
        let Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        Pattern.test(String(Email).toLowerCase()) ? set_valid_sign_email(true) : (set_valid_sign_email(false))
    }

    const isPhoneValid = () => {
        if (String(phone).length < 11 || String(phone).length > 14) {
            set_valid_sign_phone(false)
        } else {
            set_valid_sign_phone(true)
        }
    }

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
        isEmailValid()
        isConfirmPassValid()
        isNameValid()
        isPassValid()
        isPhoneValid()
    }, [ConfirmPassword, Password, name, Email, phone])
    //   ////////////////////////////////////////////////////



    return (
        <>
            <ScrollView style={{ width: "100%", height: "100%" }}>
                <View style={[Styles.back_ground]}>
                    <StatusBar
                        backgroundColor={Colors.header_color}
                        barStyle="dark-content"
                    />
                    <View style={Styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SignIn_stack")
                            }}
                        >
                            <AntDesign
                                name="arrowleft"
                                color="#000"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[Styles.view_lyrics, { marginBottom: "3%" }]}>
                        <Text style={styles_in.welcome_lyrics}>
                            Let's Get Started!
                        </Text>
                        <Text style={styles_in.lyrics_log_in}>
                            Create an account to clothing app to get all features
                        </Text>
                    </View>

                    <Text_input_name
                        placeHolder="Name"
                        term={name}
                        onTermChange={newName => setName(newName)}
                    />

                    <Text_input_email
                        term={Email}
                        placeholder="Email Address"
                        onTermChange={newEmail => SetEmail(newEmail)}
                    />

                    <Text_input_phone
                        placeHolder="phone"
                        term={phone}
                        onTermChange={newPhone => setPhone(newPhone)}
                    />

                    <Text_input_pass
                        term={Password}
                        placeHolder="Password"
                        onTermChange={newPassword => setPassword(newPassword)}
                    />

                    <Text_input_confirm_pass
                        pass={Password}
                        placeHolder="Confirm Password"
                        onTermChange={newConfirmPass => setConfirmPassword(newConfirmPass)}
                        term={ConfirmPassword}
                    />

                    <TouchableOpacity
                        style={[Styles.log_create_button, { marginTop: height * 0 }]}
                        onPress={() => {
                            console.log(valid_sign_email + " " + valid_sign_pass + " " + valid_sign_name + " " + valid_sign_phone + " " + valid_sign_confirm_pass)
                            if (valid_sign_email == true &&
                                valid_sign_pass == true &&
                                valid_sign_name == true &&
                                valid_sign_confirm_pass == true &&
                                valid_sign_phone == true) {
                                let data_user = {
                                    name: name,
                                    email: Email,
                                    phone: phone,
                                    password: Password,
                                    image: "",
                                    type: "",
                                    birthDate: "",
                                }
                                dispatch(Add_user(data_user))
                                navigation.navigate("Tab_switch")
                            } else {
                                ToastAndroid.show("please Enter valid Date",
                                    ToastAndroid.SHORT
                                )
                            }

                        }}
                    >
                        <Text style={Styles.text_in_button}>CREATE</Text>
                    </TouchableOpacity>
                    <Text style={[styles_in.lyrics_log_in, { marginTop: height * .01 }]}>Or connect using</Text>
                    <View style={Styles.box_buttons_face_google}>
                        <TouchableOpacity style={[Styles.button_face_google, { backgroundColor: Colors.invalid_input_color }]}>
                            <Text style={Styles.text_in_button}>Google</Text>
                            <AntDesign
                                name="google"
                                size={25}
                                color="#fff"
                                style={{ paddingRight: "10%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.button_face_google}>
                            <Text style={Styles.text_in_button}>FaceBook</Text>
                            <EvilIcons
                                name="sc-facebook"
                                size={25}
                                color="#fff"
                                style={{ paddingRight: "10%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[Styles.footer_lyrics_view, { marginTop: height * .015 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SignIn_stack")
                            }}
                        ><Text style={[styles_in.footer_lyrics,]}> Log_in</Text></TouchableOpacity>
                        <Text style={[styles_in.footer_lyrics, { color: "#000", fontWeight: "300" }]}>
                            Don't have an account?
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
const styles_in = StyleSheet.create({
    welcome_lyrics: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center"
    },
    lyrics_log_in: {
        fontSize: 13,
        fontWeight: "300",
        marginTop: height * .002,
        textAlign: "center"
    },
    footer_lyrics: {
        fontSize: 17,
        color: "#0d47a1",
        fontWeight: "700"
    }
})
export default Sign_Up;
