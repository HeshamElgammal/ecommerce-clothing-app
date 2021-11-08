import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../colors";
const { width, height } = Dimensions.get("window")
export const Styles = StyleSheet.create({
    back_ground: {
        width: "100%",
        height: height,
        backgroundColor: Colors.back_ground_color,
        alignItems: "center"
    },
    header: {
        width: "100%",
        height: height * .07,
        backgroundColor: Colors.header_color,
        justifyContent:"center",
        paddingHorizontal:"7%",
    },
    logo_sign_in: {
        width: width * .6,
        marginTop: height * .05,
        height: height * .22,
    },
    view_lyrics: {
        width: "90%",
        alignItems: "center",
        padding: 2,
        marginBottom:height*.01
    },
    Text_input_field: {
        width: "90%",
        height: height * .07,
        // borderWidth: .4,
        borderRadius: height * .02,
        marginTop: height * .01,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 5,
        backgroundColor:Colors.back_ground_color,
        // borderColor: Colors.button_check_out 
    },
    view_icon_input: {
        width: "20%",
        height: "100%",
        backgroundColor: Colors.back_ground_color,
        borderTopEndRadius: height * .02,
        borderBottomEndRadius: height * .02,
        alignItems: "center",
        justifyContent: "center"
    },
    text_input: {
        width: "80%",
        height: "100%",
        backgroundColor: Colors.back_ground_color,
        borderTopRightRadius: height * .02,
        borderBottomRightRadius: height * .02,
        color:"#000",
        paddingHorizontal:"3%"
    },
    log_create_button: {
        width: "50%",
        height: height * .07,
        backgroundColor: Colors.button_check_out,
        borderRadius: height * .017,
        marginTop: height * .02,
        alignItems: "center",
        justifyContent: "center",
        elevation:3
    },
    text_in_button: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    box_buttons_face_google: {
        width: "90%",
        height: height * .07,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffff",
        marginTop: height * .01
    },
    button_face_google: {
        width: "45%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: height * .01,
        backgroundColor: Colors.button_check_out,
        flexDirection: "row",
        paddingHorizontal: "8%",
        elevation:2,
        
    },
    footer_lyrics_view: {
        marginTop: height * .05,
        flexDirection: "row"
    },
    error: {
        color: "#a00",
        marginBottom:height*.005
    },
     header_home: {
        width: "90%",
        height: height * .15,
        backgroundColor: "#ffff",
        justifyContent: "center"
    },
    name_header: {
        fontSize: width * .06,
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
        paddingHorizontal:"5%"
    },

})