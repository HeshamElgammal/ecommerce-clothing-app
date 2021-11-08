import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window")
import { Colors } from "../colors";
export const Style_home = StyleSheet.create({
    back_ground: {
        width: "100%",
        height: height,
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
    },
    header_home: {
        width: "90%",
        height: height * .15,
        backgroundColor: Colors.header_color,
        justifyContent: "center"
    },
    name_header: {
        fontSize: width * .05,
        fontWeight: "400",
        letterSpacing: .5,
        color: "#000000",
        textAlign: "center"
    },
    search_input_view: {
        width: "90%",
        height: height * .07,
        backgroundColor: Colors.back_ground_color,
        elevation: 5,
        borderRadius: height * .02,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
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
        color: "#000",
        paddingHorizontal: "3%"
    },
    details_product: {
        width: width,
        height: height * .75,
        backgroundColor: "#ffff",
        paddingTop: height * .02,
        alignItems: "center",
        borderTopLeftRadius: height * .025,
        borderTopRightRadius: height * .03,
        elevation: 6,
        marginTop: -height * .03,
        borderColor: "#345",
        // paddingBottom:height*.06
    },
    name_product_details_box: {
        width: "90%",
        minHeight: height * .065,
        backgroundColor: "#FFFFFFFF",
        marginTop: height * .005
    },
    box_selected_color_size: {
        width: width * .9,
        flexDirection: "row",
        alignSelf: "flex-end",
        marginTop: height * .01,
        // backgroundColor: "#456",
        justifyContent: "flex-end",
        paddingHorizontal: 0
    },
    divider: {
        width: "90%",
        borderWidth: .2,
        borderColor: "#000",
        marginVertical: height * .006
    },
    button_add_to_cart: {
        width: "78%",
        height: "100%",
        backgroundColor: Colors.button_check_out,
        borderRadius: width * .025,
        alignItems: "center",
        justifyContent: "center"
    },
    back_footer_buttons: {
        width: "90%",
        height: height * .08,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: height * .01
    },
    button_coounter: {
        width: width * .1,
        height: width * .1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: width * .03,
    },
    container_categories: {
        width: "95%",
        height: height * .13,
        backgroundColor:Colors.back_ground_color,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        
    },
    items_category: {
        width: width * .2,
        height: height * .13,
        backgroundColor: "#fff",
        marginHorizontal: 2,
        alignItems: "center",
        justifyContent: "space-around",
    },
    image_cat: {
        width: "100%",
        height: height * .09,
        borderRadius: height * .2
    },
    items_product: {
        width: 170,
        height: 200,
        marginBottom: 10,
        elevation: 4,
        backgroundColor: Colors.back_ground_color,
        borderRadius: width * .04
    },
    box_in_scroll_container: {
        width: "100%",
        height: "100%",
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    container_products: {
        width: "95%",
        height: height * .547,
        backgroundColor: Colors.back_ground_color,
    },
    discound_view: {
        position: "absolute",
        right: 0,
        backgroundColor: "#a00",
        padding: 4,
        borderTopRightRadius: width * .04
    },
    heart_button: {
        position: "absolute",
        left: 0,
        top: "79%"
    },
    name_product_in_item: {
        fontSize: 16,
        fontWeight: "300"
    },
    view_price_in_item: {
        width: "70%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "flex-end"
    },
    image_product_in_item: {
        width: "100%",
        height: "70%",
        borderTopLeftRadius: width * .04,
        borderTopRightRadius: width * .04
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
        paddingHorizontal: "5%"
    },
    item_container_cart: {
        width: "100%",
        // height: height * .14,
        backgroundColor: Colors.back_ground_color,
        borderRadius: height * .02,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        borderWidth: .5,
        borderColor: Colors.button_check_out,
        padding: "1%",
        marginBottom: 5
    },
    right_box_item_cart: {
        width: "70%",
        height: "95%",
        paddingHorizontal: "3%",
        borderRadius: height * .02
    },
    buttons_name_box_right_cart: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: height * .01
    },
    counter_items_text: {
        fontSize: 20,
        textAlign: "center",
        marginHorizontal: 10
    },
    left_box_image_cart: {
        width: "30%",
        height: "95%",
        borderRadius: height * .02
    },
    view_top_details: {
        width: width * .15,
        height: height * .006,
        backgroundColor: "#00000040",
        marginTop: height * .003,
        alignSelf: "center",
        borderRadius: width * .2,
        marginBottom: 1
    }

})