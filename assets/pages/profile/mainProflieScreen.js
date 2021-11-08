import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
    Linking
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const { width, height } = Dimensions.get("window")
import { StylesProfile } from "./stylesProfile";
import { Colors } from "../colors";
import { useSelector } from "react-redux"

const MainProfileScreen = ({ navigation }) => {
    const select_data_user = useSelector(state => state.Global.data_user)
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <View style={StylesProfile.back_ground}>
                    <StatusBar
                        backgroundColor={Colors.back_ground_color}
                        barStyle="dark-content"
                    />
                    <View style={StylesProfile.header_main_profile}>
                        <Image
                            source={(select_data_user.image == "" || select_data_user.image == null) ?
                                (require("../images/user.png")) : { uri: select_data_user.image }}
                            style={StylesProfile.image_style}
                        />
                    </View>
                    <TouchableOpacity style={StylesProfile.container_part_feilds}
                        onPress={() => {
                            navigation.navigate("info_profile_stack")
                        }}
                    >
                        <View style={Style_in.conatainer_name_icon}>
                            <Text style={StylesProfile.text_title}>{select_data_user.name}</Text>

                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color={Colors.button_check_out}
                            />

                        </View>
                        <View style={Style_in.conatainer_email}>
                            <Text style={Style_in.text_email}>{select_data_user.email}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[StylesProfile.container_part_feilds, {
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }]}>
                        <View style={Style_in.box_in_part_feild}>
                            <Image
                                source={require("../images/orders.png")}
                                style={Style_in.icon_feild}
                                resizeMode="stretch"
                            />
                            <Text style={[StylesProfile.text_title, { marginHorizontal: "5%" }]}>Orders</Text>
                        </View>
                        <View style={[Style_in.box_in_part_feild, {
                            width: "15%",
                            justifyContent: "flex-end"
                        }]}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color={Colors.button_check_out}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[StylesProfile.container_part_feilds, {
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }]}>
                        <View style={Style_in.box_in_part_feild}>
                            <Image
                                source={require("../images/adresses.png")}
                                style={Style_in.icon_feild}
                                resizeMode="stretch"
                            />
                            <Text style={[StylesProfile.text_title, { marginHorizontal: "5%" }]}>Adresses</Text>
                        </View>
                        <View style={[Style_in.box_in_part_feild, {
                            width: "15%",
                            justifyContent: "flex-end"
                        }]}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color={Colors.button_check_out}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[StylesProfile.container_part_feilds, {
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }]}>
                        <View style={Style_in.box_in_part_feild}>
                            <Image
                                source={require("../images/cards.png")}
                                style={Style_in.icon_feild}
                                resizeMode="stretch"

                            />
                            <Text style={[StylesProfile.text_title, { marginHorizontal: "5%" }]}>Cards</Text>
                        </View>
                        <View style={[Style_in.box_in_part_feild, {
                            width: "15%",
                            justifyContent: "flex-end"
                        }]}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color={Colors.button_check_out}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style_in.container_part_contact}
                        onPressIn={() => {
                            Linking.openURL('tel:${01092901319}')
                        }}
                    >

                        <AntDesign
                            name="phone"
                            size={25}
                            color="#333"
                        />
                        <Text style={[StylesProfile.text_title,
                        {
                            marginHorizontal: "3%"
                        }]}>Contact Us</Text>
                    </TouchableOpacity>
                    <View style={Style_in.box_contacts}>
                        <TouchableOpacity
                            onPressIn={() => {
                                Linking.openURL('https://www.facebook.com/hesham.elgammal.735/')
                            }}
                        >
                            <MaterialCommunityIcons
                                name="facebook"
                                size={width * .08}
                                color={Colors.button_check_out}
                                style={{ paddingRight: "10%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPressIn={() => {
                                Linking.openURL('whatsapp://send?phone=+201092901319')
                            }}
                        >
                            <MaterialCommunityIcons
                                name="whatsapp"
                                size={width * .08}
                                color="#4caf50"
                                style={{ paddingRight: "10%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPressIn={() => {
                                Linking.openURL('mailto:heshamelgammal001@gmail.com')
                            }}
                        >
                            <AntDesign
                                name="google"
                                size={width * .08}
                                color="#a00"
                                style={{ paddingRight: "10%" }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
const Style_in = StyleSheet.create({
    conatainer_name_icon: {
        width: "100%",
        height: "50%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    conatainer_email: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    text_email: {
        fontWeight: "300",
        fontSize: width * .03
    },
    box_in_part_feild: {
        height: "100%",
        width: "85%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    icon_feild: {
        width: width * .08,
        height: width * .08
    },
    container_part_contact: {
        width: "90%",
        marginTop: height * .1,
        alignItems: "center",
        height: height * .06,
        backgroundColor: "#FFFFFF",
        elevation: 2,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: width * .02
    },
    button_contact: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    box_contacts: {
        width: "50%",
        marginTop: height * .04,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        alignSelf: "center",
    }
})

export default MainProfileScreen;