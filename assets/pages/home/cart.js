import React from "react";
import { View, StatusBar, TouchableOpacity, Text, Image, Dimensions, FlatList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("window")
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../colors";
import { Style_home } from "./style_home";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_DATA_IN_CART } from "../redux/actions/change_data_in_cart";
import { Delete_item_from_cart } from "../redux/actions/delete_item_from_cart";
const Cart = ({navigation}) => {
    const select_cart = useSelector(state => state.Global.cart_list)
    const dispatch = useDispatch()
    const get_cart_list = async () => {
        let cart_list = await AsyncStorage.getItem("storage_cart_list")
        if (cart_list == null) {
            dispatch({
                type: "STORAGE_CART_LIST",
                payload: select_cart
            })
        } else {
            dispatch({
                type: "STORAGE_CART_LIST",
                payload: JSON.parse(cart_list)
            })
        }
    }
    React.useLayoutEffect(() => {
        // AsyncStorage.clear()
        get_cart_list()
        console.log(JSON.stringify(select_cart))
    }, [])



    const [total_check_out_all_items, setTotal_check_out_all_items] = React.useState(0)
    const calculate_total_check = () => {
        let total_check = 0
        for (let i = 0; i < select_cart.length; i++) {
            total_check += select_cart[i].total_check_item
        }
        setTotal_check_out_all_items(total_check)
        dispatch({
            type: "TOTAL_CHECK_OUT",
            payload: total_check
        })
    }
    React.useEffect(() => {
        calculate_total_check()
    }, [])
    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={[Style_home.back_ground, { height: height * .938 }]}>
                    <StatusBar
                        backgroundColor={Colors.back_ground_color}
                        barStyle="dark-content"
                    />
                    <View style={Style_home.back_header_container}>
                        <View style={{ width: "16%" }}></View>
                        <View style={Style_home.view_name_in_header}>
                            <Text style={Style_home.name_header}>Cart</Text>
                        </View>
                        <View style={{ width: "16%" }}></View>
                    </View>
                    <View style={[Style_home.container_products, {
                        height: height * .756,
                        marginTop: height * .01,
                        paddingTop: 2,
                        borderWidth: 0
                    }]}>
                        {select_cart.length < 1 ? (
                            <Image
                                style={{
                                    width: width * .7,
                                    height: height * .3,
                                    alignSelf: "center",
                                    marginTop: height * .2
                                }}
                                resizeMode="stretch"
                                source={require("../images/cart_empty.png")}
                            />
                        ) : (
                            <FlatList
                                data={select_cart}
                                renderItem={({ item, index }) => (
                                    <View style={Style_home.item_container_cart}
                                        onPress={() => {
                                            console.log(item)
                                        }}
                                    >
                                        <View style={[Style_home.right_box_item_cart,
                                        {
                                            // backgroundColor: "#123"
                                        }]}>
                                            <Text style={{
                                                fontSize: 20,
                                                marginTop: height * .005
                                            }}>{item.name}</Text>
                                            <View style={Style_home.buttons_name_box_right_cart}>
                                                <View style={{
                                                    width: "40%",
                                                    flexDirection: "row",
                                                    // backgroundColor: "#458"
                                                }} >
                                                    <TouchableOpacity style={[Style_home.button_coounter,
                                                    {
                                                        height: 38,
                                                        width: 40,

                                                    }]}
                                                        onPress={() => {
                                                            if (item.counter > 1) {
                                                                item.counter = item.counter - 1
                                                                if (item.sale == 0 || item.sale == null || item.sale == "") {
                                                                    item.total_check_item = item.price * item.counter
                                                                } else {
                                                                    item.total_check_item = (item.price - ((item.price * item.sale) * .01)) * item.counter
                                                                }
                                                                calculate_total_check()
                                                                dispatch(CHANGE_DATA_IN_CART([...select_cart]))
                                                            }
                                                        }}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="minus"
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                    <View style={{ alignItems: "center", alignSelf: "center", justifyContent: "center" }}>
                                                        <Text style={Style_home.counter_items_text}>{item.counter}</Text>
                                                    </View>
                                                    <TouchableOpacity style={[Style_home.button_coounter, {
                                                        height: 38,
                                                        width: 40,
                                                        // backgroundColor: "#a00"
                                                    }]}
                                                        onPress={() => {
                                                            item.counter = item.counter + 1
                                                            if (item.sale == 0 || item.sale == null || item.sale == "") {
                                                                item.total_check_item = item.price * item.counter
                                                            } else {
                                                                item.total_check_item = (item.price - ((item.price * item.sale) * .01)) * item.counter
                                                            }
                                                            calculate_total_check()
                                                            dispatch(CHANGE_DATA_IN_CART([...select_cart]))
                                                        }}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="plus"
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{
                                                    height: "100%",
                                                    // backgroundColor: "#456",
                                                    marginBottom: height * .005,
                                                    marginTop: height * .003
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        textAlign: "right"
                                                    }}>$ {item.total_check_item}</Text>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        marginTop: height * .005,
                                                        width: "40%",
                                                        alignSelf: "flex-end",
                                                        marginRight: "3%"
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            marginHorizontal: width * .04,
                                                            color: "#000"
                                                        }}>{item.selected_Size}</Text>
                                                        <MaterialCommunityIcons
                                                            name="circle-slice-8"
                                                            size={20}
                                                            color={item.selected_Color}
                                                        />
                                                    </View>

                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                style={{ position: "absolute", top: "5%", left: "5%" }}
                                                onPress={() => {
                                                    select_cart.splice(index, 1)
                                                    dispatch(Delete_item_from_cart([...select_cart]))
                                                    calculate_total_check()
                                                }}
                                            >
                                                <Ionicons
                                                    name="ios-trash-outline"
                                                    size={25}
                                                    color="#b00"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={Style_home.left_box_image_cart}
                                        />

                                    </View>
                                )}
                            />
                        )}


                    </View>
                    <View style={Style_home.back_footer_buttons}>
                        <TouchableOpacity style={[Style_home.button_add_to_cart,
                        { width: "60%" }]}
                            onPress={() => {
                                navigation.navigate("Details_check_out")
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "300", color: "#ffff" }}>Check Out</Text>
                        </TouchableOpacity>
                        <View style={[Style_home.button_add_to_cart,
                        {
                            width: "37%",
                            backgroundColor: "#fff",
                            borderWidth: .2,
                            borderColor: "#345",
                            borderRadius: width * .01
                        }]}>
                            <Text style={{ fontSize: width * .035, fontWeight: "500", marginBottom: "3%" }}>Total Summary </Text>
                            <Text style={{ fontSize: width * .04, fontWeight: "300" }}>$ {total_check_out_all_items}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}



export default Cart;