import React from "react";
import { View, StatusBar, TouchableOpacity, Text, Image, Dimensions, FlatList, ScrollView } from "react-native";
const { width, height } = Dimensions.get("window")
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Colors } from "../colors";
import { Style_home } from "./style_home";
import { useDispatch, useSelector } from "react-redux";
import { Add_to_fav } from "../redux/actions/add_to_fav"
const Favorite = ({ navigation }) => {
    const select_products = useSelector(state => state.Global.products)
    const [have_fav_list, set_have_fav_list] = React.useState(false)
    const dispatch = useDispatch()
    React.useLayoutEffect(() => {
        for (let i = 0; i < select_products.length; i++) {
            if (select_products[i].fav == true) {
                set_have_fav_list(true)
                break
            } else {
                set_have_fav_list(false)
            }
        }
    }, [select_products])
    return (
        <>
        <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
            <View style={[Style_home.back_ground,{height:height*.935}]}>
                <StatusBar
                    backgroundColor={Colors.back_ground_color}
                    barStyle="dark-content"
                />
                <View style={Style_home.back_header_container}>
                    <View style={{ width: "16%" }}></View>
                    <View style={Style_home.view_name_in_header}>
                        <Text style={Style_home.name_header}>Wishes</Text>
                    </View>
                    <View style={{ width: "16%" }}></View>
                </View>
                <View style={[Style_home.container_products, {
                    height: height * .85,
                    marginTop: height * .01,
                    // borderWidth:1
                }]}>
                    <View style={Style_home.box_in_scroll_container}>
                        {have_fav_list==true ?(
                            <FlatList
                            data={select_products}
                            numColumns={6}
                            columnWrapperStyle={{ justifyContent: "space-between", flexWrap: "wrap" }}
                            renderItem={({ item, index }) => (
                                item.fav ? (
                                    <TouchableOpacity
                                        key={item => item.index}
                                        style={[Style_home.items_product]}
                                        onPress={() => {
                                            navigation.navigate('Details_product_stack',
                                                {
                                                    product_id: item.id,
                                                    item_det: item,
                                                    name_page: "fav",
                                                }
                                            )
                                        }}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={Style_home.image_product_in_item}
                                        />
                                        <TouchableOpacity
                                            style={Style_home.heart_button}
                                            onPress={() => {
                                                item.fav = !item.fav
                                                dispatch(Add_to_fav([...select_products]))
                                            }}
                                        >
                                            <Ionicons
                                                name="ios-heart-sharp"
                                                size={width * .08}
                                                color="#d00"
                                            />
                                        </TouchableOpacity>
                                        {item.sale != 0 ?
                                            <View
                                                style={Style_home.discound_view}
                                            >
                                                <Text style={{ color: "#fff" }}>{item.sale}%</Text>
                                            </View>
                                            : null}

                                        <Text style={Style_home.name_product_in_item}>{item.name}</Text>
                                        <View style={Style_home.view_price_in_item}>
                                            {item.sale !== 0 ?
                                                <Text style={{ color: "#a00" }}>$ {item.price - ((item.price * item.sale) * .01)}</Text>
                                                :
                                                <Text></Text>
                                            }
                                            <Text style={{ textDecorationLine: item.sale !== 0 ? "line-through" : "none" }}>$ {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    null
                                )
                            )}
                        />
                        ):(
                            <Image
                            style={{
                                width: width * .85,
                                height: height * .35,
                                alignSelf: "center",
                                marginTop:height*.2
                            }}
                            resizeMode="stretch"
                            source={require("../images/fav.png")}
                        />)}
                        
                    </View>


                </View>
            </View>
            </ScrollView>
        </>
    )
}



export default Favorite;