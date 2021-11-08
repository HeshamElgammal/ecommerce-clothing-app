import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import { StylesProfile } from "./stylesProfile";
import { Colors } from "../colors";

const MainProfileScreen = () => {
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <View style={StylesProfile.back_ground}>
                    <StatusBar
                        backgroundColor={Colors.back_ground_color}
                        barStyle="dark-content"
                    />
                     <View style={StylesProfile.back_header_container}>
                        <View style={{ width: "16%" }}></View>
                        <View style={StylesProfile.view_name_in_header}>
                            <Text style={StylesProfile.name_header}>Reset Password</Text>
                        </View>
                        <TouchableOpacity style={{ width: "16%" }}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default MainProfileScreen;