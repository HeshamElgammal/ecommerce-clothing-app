import React, { useState } from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    ToastAndroid
} from 'react-native';
import { Colors } from '../colors';
import { Styles } from './style';
import AntDesign from "react-native-vector-icons/AntDesign"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { Add_user } from '../redux/actions/add_user';
const { width, height } = Dimensions.get("window")
import { useDispatch, useSelector } from 'react-redux';
import Text_input_email from '../../components/Text_input_email';
import Text_input_pass from '../../components/Text_input_pass';
const Sign_in = ({ navigation }) => {
    const dispatch = useDispatch()
    const [valid_sign_email, set_valid_sign_email] = React.useState(false)
    const [valid_sign_pass, set_valid_sign_pass] = React.useState(false)
    const [Email, SetEmail] = useState()
    const [Password, setPassword] = useState()

    const isPassValid = () => {
        if (String(Password).length < 8) {
            set_valid_sign_pass(false)
        } else {
            set_valid_sign_pass(true)
        }
    }

    const isEmailValid = () => {
        let Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        Pattern.test(String(Email).toLowerCase()) ? set_valid_sign_email(true) : (set_valid_sign_email(false))
    }
    React.useEffect(() => {
        isEmailValid()
        isPassValid()
    }, [Password, Email])
    return (
        <>
            <ScrollView style={{ width: "100%", height: "100%" }}>
                <View style={[Styles.back_ground]}>
                    <StatusBar
                        backgroundColor={Colors.header_color}
                        barStyle="dark-content"
                    />
                    <Image style={Styles.logo_sign_in}
                        source={require('../images/log_in.png')}
                        resizeMode="stretch"
                    />
                    <View style={Styles.view_lyrics}>
                        <Text style={styles_in.welcome_lyrics}>
                            Welcome Back!
                        </Text>
                        <Text style={styles_in.lyrics_log_in}>
                            Log in your existant account of clothing app
                        </Text>
                    </View>

                    <Text_input_email
                        term={Email}
                        placeholder="Email Address"
                        onTermChange={newEmail => SetEmail(newEmail)}

                    />

                    <Text_input_pass
                        term={Password}
                        placeHolder="Password"
                        onTermChange={newPassword => setPassword(newPassword)}

                    />
                    <View style={{ width: "90%", alignItems: "flex-start" }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Email_stack")
                            }}
                        >
                            <Text style={[styles_in.lyrics_log_in, { color: "#000" }]}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={Styles.log_create_button}
                        onPress={() => {
                            
                            if (valid_sign_email == true && valid_sign_pass == true) {
                                let data_user = {
                                    name: "user",
                                    email: Email,
                                    phone: "",
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
                        <Text style={Styles.text_in_button}>LOG IN</Text>
                    </TouchableOpacity>
                    <Text style={[styles_in.lyrics_log_in, { marginTop: height * .03 }]}>Or connect using</Text>
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
                        <TouchableOpacity style={Styles.button_face_google}
                            onPress={() => {
                                // navigation.navigate("Tab_switch")
                            }}
                        >
                            <Text style={Styles.text_in_button}>FaceBook</Text>
                            <EvilIcons
                                name="sc-facebook"
                                size={25}
                                color="#fff"
                                style={{ paddingRight: "10%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.footer_lyrics_view}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SignUp_stack")
                            }}
                        ><Text style={[styles_in.footer_lyrics,]}> Sign_Up</Text></TouchableOpacity>
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
        fontSize: 15,
        color: "#666",
        textAlign: "center"
    },
    footer_lyrics: {
        fontSize: 17,
        color: "#0d47a1",
        fontWeight: "700"
    }
})



export default Sign_in;
