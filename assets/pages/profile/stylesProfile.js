import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../colors";
const { width, height } = Dimensions.get("window")
export const StylesProfile = StyleSheet.create({
    back_ground: {
        width: "100%",
        height: height,
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
        paddingHorizontal: "5%"
    },
    header: {
        width: "100%",
        height: height * .07,
        backgroundColor: Colors.header_color,
        justifyContent: "center",
        paddingHorizontal: "7%",
    },
    name_header: {
        fontSize: width * .05,
        fontWeight: "400",
        letterSpacing: .5,
        color: "#000",
        textAlign: "center"
    },
    view_name_in_header: {
        width: "68%",
        alignItems: "center"
    },
    back_header_container: {
        width: "100%",
        backgroundColor: Colors.header_color,
        height: height * .075,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    text_title: {
        fontSize: width * .04,
        fontWeight: "400",
        color: "#000"
    },
    container_part_feilds: {
        width: "100%",
        height: height * .1,
        backgroundColor: "#fff",
        marginTop: height * .01,
        borderBottomWidth: .7,
        borderColor:Colors.button_check_out
    },
    image_style:{
        width: width * .3,
        height: width * .3,
        resizeMode: "cover",
        borderRadius: width * .15,
        marginTop: -height * .05
    },
    header_main_profile:{
        width: "100%",
        height: height * .16,
        alignItems: "center",
        justifyContent: "flex-end"
    }

})