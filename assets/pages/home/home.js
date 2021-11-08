import React from 'react';
import { ScrollView, View, StatusBar, Text, TextInput, TouchableOpacity, FlatList, Image, Dimensions, ToastAndroid } from "react-native"
const { width, height } = Dimensions.get("window")
import Ionicons from "react-native-vector-icons/Ionicons"
import { Style_home } from './style_home';
import { Colors } from '../colors';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch, useSelector } from 'react-redux';
import { Add_to_fav } from "../redux/actions/add_to_fav"
const Home = ({ navigation }) => {
    const select_products = useSelector(state => state.Global.products)
    const select_categories = useSelector(state => state.Global.Categories)
    const dispatch = useDispatch()
    const select_data_user = useSelector(state => state.Global.data_user)

    const [search, setSearch] = React.useState("");
    const search_request = (search_text) => {
        for (let i = 0; i < select_products.length; i++) {
            if ((select_products[i].name.toUpperCase()).includes(search_text.toUpperCase())) {
                select_products[i].show_search = true
            } else {
                select_products[i].show_search = false
            }
        }
    }



    return (
        <>
            {/* <View style={{ width: "100%", height: height, backgroundColor: "#ffff" }}> */}
            <ScrollView style={{ flex: 1,backgroundColor:"#fff" }}>
                <View style={[Style_home.back_ground, { height: height * .935 }]}>
                    <StatusBar
                        backgroundColor={Colors.header_color}
                        barStyle="dark-content"
                    />
                    <View style={[Style_home.header_home, {
                        alignItems: "flex-end",
                        height: height * .107
                    }]}>
                        <Text style={Style_home.name_header}>Hello!</Text>
                        <Text style={Style_home.name_header}>{select_data_user.name}</Text>
                    </View>
                    <View style={Style_home.search_input_view}>
                        <TextInput style={Style_home.text_input}
                            placeholder="Let's find new .."
                            placeholderTextColor="#888"
                            value={search}
                            onChangeText={(value) => {
                                setSearch(value.trim())
                                search_request(value)
                            }}
                        />
                        <View style={Style_home.view_icon_input}>
                            <AntDesign
                                name="search1"
                                size={25}
                                color="#888"
                            />
                        </View>
                    </View>
                    <View style={{ width: "90%", marginVertical: 3 }}>
                        <Text style={{ fontSize: 20, fontWeight: "400" }}>Categories</Text>
                    </View>
                    <View style={Style_home.container_categories}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={select_categories}
                            ItemSeparatorComponent={() => {
                                return (
                                    <>
                                        <View style={{ width: 20 }}></View>
                                    </>
                                )
                            }}

                            renderItem={({ item, index }) => (
                                <>
                                    <TouchableOpacity
                                        style={Style_home.items_category}
                                        onPress={() => {
                                            navigation.navigate('Products_stack',
                                                {
                                                    select_cat_id: item.id,
                                                    name_header: item.name
                                                }
                                            )
                                        }}
                                    >
                                        <Image
                                            style={Style_home.image_cat}
                                            source={{ uri: item.image }}
                                            resizeMode="cover"
                                        />
                                        <Text style={{ fontSize: 15, fontWeight: "300" }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        />
                    </View>
                    <View style={{ width: "90%", marginVertical: 3 }}>
                        <Text style={{ fontSize: 20, fontWeight: "400" }}>All Products</Text>
                    </View>
                    <View style={Style_home.container_products}>
                        <ScrollView>
                            <View style={Style_home.box_in_scroll_container}>
                                {select_products.map((item, index) =>

                                (
                                    <>
                                        {item.show_search ? (
                                            <TouchableOpacity
                                                style={Style_home.items_product}
                                                onPress={() => {
                                                    navigation.navigate('Details_product_stack',
                                                        {
                                                            product_id: item.id,
                                                            item_det: item,
                                                            name_page: "home",
                                                        }
                                                    )
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        width: "100%",
                                                        height: "70%",
                                                        borderTopLeftRadius: width * .04,
                                                        borderTopRightRadius: width * .04
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    style={{ position: "absolute", left: 0, top: "79%" }}
                                                    onPress={() => {
                                                        item.fav = !item.fav
                                                        dispatch(Add_to_fav([...select_products]))
                                                        if (item.fav == true) {
                                                            ToastAndroid.show("Added to Favorite", ToastAndroid.SHORT)
                                                        } else {
                                                            ToastAndroid.show("Removed from Favorite", ToastAndroid.SHORT)
                                                        }
                                                    }}
                                                >
                                                    {item.fav == true ? (
                                                        <Ionicons
                                                            name="ios-heart-sharp"
                                                            size={width * .08}
                                                            color="#d00"
                                                        />
                                                    ) : (
                                                        <Ionicons
                                                            name="ios-heart-outline"
                                                            size={width * .08}
                                                            color="#777"
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                                {item.sale != 0 && item.sale != "" && item.sale != null ?
                                                    <View
                                                        style={Style_home.discound_view}
                                                    >
                                                        <Text style={{ color: "#FFFFFF" }}>{item.sale}%</Text>
                                                    </View>
                                                    : null}

                                                <Text style={{ fontSize: 16, fontWeight: "300" }}>{item.name}</Text>
                                                <View style={{
                                                    width: "70%",
                                                    justifyContent: "space-between",
                                                    flexDirection: "row",
                                                    alignSelf: "flex-end",
                                                    alignItems: "center",
                                                    marginTop: "1%"
                                                }}>
                                                    {item.sale != 0 && item.sale != "" && item.sale != null ?
                                                        <Text style={{ color: "#a00" }}>$ {item.price - ((item.price * item.sale) * .01)}</Text>
                                                        :
                                                        <Text></Text>
                                                    }
                                                    <Text style={{ textDecorationLine: item.sale !== 0 ? "line-through" : "none" }}>$ {item.price}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ) : null}

                                    </>
                                )

                                )}
                            </View>

                        </ScrollView>

                    </View>
                </View>
            </ScrollView >
            {/* </View > */}
        </>
    )
}



export default Home;
