import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, Animated, Text, TouchableOpacity, Dimensions, FlatList, BackHandler, ToastAndroid, ScrollView } from "react-native"
const { width, height } = Dimensions.get("window")
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Style_home } from './style_home';
import { Colors } from '../colors';
import { useDispatch, useSelector } from 'react-redux';
import { Add_to_cart } from '../redux/actions/add_to_cart';
import { Add_to_fav_inDetails } from '../redux/actions/add_to_fav_inDetails';

const Details_product = ({ props, navigation }) => {
    // state ...............
    React.useLayoutEffect(() => {
        setProduct(navigation.getParam('item_det'))

    }, {})
    // ///////////////////////////////////////////////////////////
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
        if (navigation.getParam('name_page') == "home") {
            navigation.navigate('Home_tab')
        } else if (navigation.getParam('name_page') == "cat") {
            navigation.navigate('Products_stack')
        } else if (navigation.getParam('name_page') == "fav") {
            navigation.navigate('Favorite_tab')
        }

        // We have handled the back button
        // Return `true` to prevent react-navigation from handling it
        return true;
    };
    // ///////////////////////////////////////////////////////////



    const [selected_Color, setSelectedColor] = useState()
    const [selected_Size, setSelectedSize] = useState()
    const [counter, setCounter] = useState(1)
    const [Total, setTotal] = useState(0)
    const [product_id, setProduct_id] = React.useState(navigation.getParam('product_id'))

    const [product, setProduct] = React.useState(navigation.getParam('item_det'))
    const [price, set_price] = useState(product.price)
    const [sale, set_sale] = useState(product.sale)

    const [colors, setcolors] = useState(product.colors)
    const [size, setSize] = useState(product.sizes)

    // dispatch ...............
    const dispatch = useDispatch()
    const select_products = useSelector(state => state.Global.products)
    // animated_photo .................
    const HEADER_MAX_HEIGHT = height * .5;
    const HEADER_MIN_HEIGHT = height * .08;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 1.5, HEADER_SCROLL_DISTANCE],
        outputRange: [1, .5, 0],
        extrapolate: 'clamp',
    });
    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, HEADER_SCROLL_DISTANCE - HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    // .................

    useEffect(() => {
        const sale = product.price - ((product.price * product.sale) * .01)
        if (product.sale === 0 ||
            product.sale == "" ||
            product.sale == null) {
            setTotal(price * counter)
        } else {
            setTotal(sale * counter)
        }

        console.log(product)
    }, [])
    useEffect(() => {
        const sale = product.price - ((product.price * product.sale) * .01)
        if (product.sale === 0 ||
            product.sale == "" ||
            product.sale == null) {
            setTotal(price * counter)
        } else {
            setTotal(sale * counter)
        }
    }, [counter])
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <View style={[Style_home.back_ground,{height:"100%"}]}>
                    <Animated.ScrollView
                        scrollEventThrottle={30}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollY, y: scrollY } } }],
                            { useNativeDriver: true }
                        )}
                    >
                        <View style={{ width: "100%" }}>
                            <StatusBar
                                backgroundColor="transparent"
                                translucent={true}
                            />
                            <Animated.View
                                style={[{ transform: [{ translateY: headerTranslateY }] }]}>
                                <Animated.Image source={{ uri: product.image }}
                                    style={{
                                        width: width,
                                        height: HEADER_MAX_HEIGHT,
                                        opacity: imageOpacity,
                                        resizeMode: "stretch",
                                        alignSelf: "stretch",
                                        borderBottomLeftRadius: width * 0,
                                        borderBottomRightRadius: width * 0,
                                        transform: [{ translateY: imageTranslateY }],
                                    }}
                                />
                            </Animated.View>

                            <View style={Style_home.details_product}>
                                <View style={Style_home.view_top_details} />
                                <View
                                    style={Style_home.name_product_details_box}
                                >
                                    <Text style={{ fontSize: 25, fontWeight: "400", }}>{product.name}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "300" }}>
                                        One of the biggest lyrics libraries with daily updated newest Song Lyrics, Artists & Albums Info of all genres all around the world.
                                    </Text>
                                </View>
                                <View style={Style_home.divider} />
                                <View
                                    style={[Style_home.name_product_details_box, {
                                        flexDirection: "row-reverse",
                                        justifyContent: "space-between"

                                    }]}
                                >
                                    <Text style={{
                                        fontSize: 25,
                                        fontWeight: "400",
                                        textDecorationLine:
                                            (
                                                product.sale === 0 ||
                                                product.sale == "" ||
                                                product.sale == null
                                            ) ?
                                                ("none") :
                                                ("line-through")
                                    }}>$ {product.price}</Text>
                                    {product.sale === 0 || product.sale == "" || product.sale == null ? (
                                        null
                                    ) : (<Text style={{
                                        fontSize: 25,
                                        fontWeight: "400",
                                        color: "#a00"
                                        // marginRight: "5%"
                                    }}>$ {product.price - ((product.price * product.sale) * .01)}</Text>)}

                                </View>
                                <View
                                    style={[Style_home.name_product_details_box]}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: "400" }}>Select Color :</Text>
                                    <View style={Style_home.box_selected_color_size}>
                                        <FlatList
                                            data={colors}
                                            horizontal={true}
                                            renderItem={({ item, index }) => (
                                                <>
                                                    <TouchableOpacity style={{
                                                        marginLeft: width * .03,
                                                        borderWidth: selected_Color == item ? 1 : 0,
                                                        borderRadius: width * .05
                                                    }}
                                                        onPress={() => {
                                                            setSelectedColor(item)
                                                        }}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="circle-slice-8"
                                                            size={35}
                                                            color={item}
                                                        />
                                                    </TouchableOpacity>
                                                </>
                                            )}
                                        />

                                    </View>
                                </View>
                                <View
                                    style={[Style_home.name_product_details_box,
                                    {
                                        marginTop: height * .02
                                    }]}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: "400" }}>Select Size :</Text>
                                    <View style={Style_home.box_selected_color_size}>
                                        <FlatList
                                            data={size}
                                            horizontal={true}
                                            renderItem={({ item, index }) => (
                                                <>
                                                    <TouchableOpacity style={{
                                                        marginLeft: width * .03,
                                                        borderWidth: selected_Size == item ? 1 : 0,
                                                        borderRadius: width * .05,
                                                        width: width * .09,
                                                        height: width * .09,
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    }}
                                                        onPress={() => {
                                                            setSelectedSize(item)
                                                        }}
                                                    >
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                </>
                                            )}
                                        />

                                    </View>
                                </View>
                                <View style={[Style_home.name_product_details_box, {
                                    justifyContent: "flex-end",
                                    flexDirection: "row",
                                    marginTop: height * .02
                                }]} >
                                    <TouchableOpacity style={Style_home.button_coounter}
                                        onPress={() => {
                                            if (counter > 1) {
                                                setTotal(counter * price)
                                                setCounter(counter - 1)
                                            }
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="minus"
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{
                                        fontSize: 25,
                                        textAlign: "center",
                                        marginHorizontal: 10
                                    }}>{counter}</Text>
                                    <TouchableOpacity style={Style_home.button_coounter}
                                        onPress={() => {
                                            setTotal(counter * price)
                                            setCounter(counter + 1)

                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="plus"
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[Style_home.back_footer_buttons, { paddingHorizontal: width * .06 }]}>
                                    <Text style={{ fontSize: 18, fontWeight: "300", color: "#000" }}>$ {Total}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", color: "#000" }}>Total</Text>
                                </View>
                                <View style={Style_home.back_footer_buttons}>
                                    <TouchableOpacity style={Style_home.button_add_to_cart}
                                        onPress={() => {
                                            if ((selected_Color || selected_Size) == (null || "" || undefined)) {
                                                ToastAndroid.show("Please select color and size", ToastAndroid.SHORT)
                                            } else {
                                                let product_cart = {
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    sale: product.sale,
                                                    counter: counter,
                                                    Total: Total,
                                                    selected_Color: selected_Color,
                                                    selected_Size: selected_Size,
                                                    image: product.image,
                                                    total_chek_item: Total
                                                }

                                                dispatch(Add_to_cart(product_cart))
                                                ToastAndroid.show("Done", ToastAndroid.SHORT)
                                            }
                                        }
                                        }
                                    >
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: "300",
                                            color: "#ffff"
                                        }}>Add To Cart</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Style_home.button_add_to_cart,
                                    {
                                        width: "20%",
                                        backgroundColor: "#fff",
                                        borderWidth: 1,
                                        borderColor: Colors.button_check_out
                                    }]}
                                        onPress={() => {
                                            for (let i = 0; i < select_products.length; i++) {
                                                if (select_products[i].id == product_id) {
                                                    select_products[i].fav = !select_products[i].fav
                                                    break;
                                                }
                                            }
                                            dispatch(Add_to_fav_inDetails([...select_products]))
                                            console.log("add to  det" + product_id)
                                        }}
                                    >
                                        {product.fav == true ? (
                                            <Ionicons
                                                name="ios-heart-sharp"
                                                size={width * .1}
                                                color="#a00"
                                            />

                                        ) : (
                                            <Ionicons
                                                name="ios-heart-outline"
                                                size={width * .1}
                                                color="#777"
                                            />
                                        )}

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Animated.ScrollView>
                </View >
            </ScrollView>
        </>
    )
}



export default Details_product;
