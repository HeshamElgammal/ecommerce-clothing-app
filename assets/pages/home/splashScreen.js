import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, Dimensions, StatusBar, Text } from 'react-native';
import *as Animatable from "react-native-animatable"
import { Colors } from '../colors';
const { width, height } = Dimensions.get("window")

const SplashScreen = ({ props, navigation }) => {
    const dispatch = useDispatch()
    const select_data_users = useSelector(state => state.Global.data_user)
    const get_data_user = async () => {
        let data_user = await AsyncStorage.getItem("storage_data_user")
        if (data_user == null) {
            dispatch({
                type: "STORAGE_DATA_USER",
                payload: select_data_users
            })
        } else {
            dispatch({
                type: "STORAGE_DATA_USER",
                payload: JSON.parse(data_user)
            })
        }
    }
    React.useLayoutEffect(() => {
        get_data_user()
        // alert(JSON.stringify(select_data_users))
    }, [])


    React.useEffect(() => {
        setTimeout(() => {

            if ((
                select_data_users.email &&
                select_data_users.password) == "") {
                navigation.navigate("Sign_stack")
            } else {
                navigation.navigate("Tab_switch")
            }
        }, 3000);
    }, [])
    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.back_ground_color,
                    alignItems: "center",
                    // paddingTop: height * .25,
                    justifyContent: "center"
                }}

            >
                <StatusBar
                    backgroundColor={Colors.back_ground_color}
                    barStyle="dark-content"
                />


                <Animatable.Image
                    style={{ width: width * .7, height: height * .3 }}
                    source={require("../images/splash.png")}
                    animation="zoomInDown"
                    direction="alternate"
                    delay={10}
                    easing="ease-in-out"
                />
                {/* <Text style={{
                    fontSize: width * .09,
                    marginTop: height * .1,
                    fontWeight: "400",
                    color:Colors.dark
                }}>Welcome!</Text> */}
            </View>

        </>
    );
}

export default SplashScreen;