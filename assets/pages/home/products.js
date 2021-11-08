import React from 'react';
import { ScrollView, View, StatusBar, Text, TextInput, TouchableOpacity, FlatList, ToastAndroid, Image, Dimensions, BackHandler } from "react-native"
const { width, height } = Dimensions.get("window")
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Style_home } from './style_home';
import { Colors } from '../colors';
import { useDispatch, useSelector } from 'react-redux';
import { Add_to_fav } from "../redux/actions/add_to_fav"

const Products = ({ props, navigation }) => {
    const select_products = useSelector(state => state.Global.products)
    React.useEffect(() => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonPressAndroid
        )
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonPressAndroid
            );
        }
    }, [])

    const handleBackButtonPressAndroid = () => {
        navigation.navigate('Home_tab')
        // We have handled the back button
        // Return `true` to prevent react-navigation from handling it
        return true;
    };
    const dispatch = useDispatch()
    const [search, setSearch] = React.useState("");
    const [select_id, setSelectId] = React.useState(navigation.getParam('select_cat_id'));
    const [select_name, setSelectName] = React.useState(navigation.getParam('name_header'));
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
            <View style={{ width: "100%", height: height, backgroundColor: Colors.back_ground_color }}>
                <ScrollView style={{flex:1,backgroundColor:"#fff" }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={Style_home.back_ground}>
                        <StatusBar
                            backgroundColor={Colors.back_ground_color}
                            barStyle="dark-content"
                        />
                        <View style={Style_home.back_header_container}>
                            <View style={{ width: "16%" }}></View>
                            <View style={Style_home.view_name_in_header}>
                                <Text style={Style_home.name_header}>{select_name}</Text>
                            </View>
                            <TouchableOpacity style={{ width: "16%" }}
                                onPress={() => {
                                    navigation.navigate('Home_tab')
                                }}
                            >
                                <AntDesign
                                    name="arrowleft"
                                    size={25}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style_home.search_input_view}>
                            <TextInput style={Style_home.text_input}
                                placeholder="Let's find new .."
                                placeholderTextColor="#888"
                                keyboardType="default"
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
                        <View style={[Style_home.container_products, {
                            height: height * .84,
                            marginTop: height * .01,
                        }]}>


                            <FlatList
                                data={select_products}
                                numColumns={6}
                                columnWrapperStyle={{ justifyContent: "space-around", flexWrap: "wrap" }}
                                renderItem={({ item, index }) => (

                                    (item.show_search &&
                                        (item.selected_cat_id == select_id)) ? (
                                        <TouchableOpacity
                                            key={item => item.index}
                                            style={Style_home.items_product}
                                            onPress={() => {
                                                navigation.navigate('Details_product_stack', {
                                                    product_id: item.id,
                                                    item_det: item,
                                                    name_page: "cat"
                                                })
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
                                    ) : null

                                )}
                            />
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}



export default Products;
