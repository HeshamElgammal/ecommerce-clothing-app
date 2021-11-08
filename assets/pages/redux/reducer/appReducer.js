import AsyncStorage from '@react-native-async-storage/async-storage';

const GLOBAL_STATE = {
    products: [
        {
            id: 1,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 100,
            sale: 2,
            fav: false,
            show_search: true,
            selected_cat_id: 1,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 2,
            name: "Shoses",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 0,
            fav: false,
            show_search: true,
            selected_cat_id: 1,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 3,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 3,
            fav: false,
            show_search: true,
            selected_cat_id: 1,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 4,
            name: "Shoses",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 1,
            fav: false,
            show_search: true,
            selected_cat_id: 2,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 5,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 0,
            fav: false,
            show_search: true,
            selected_cat_id: 2,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 6,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 3,
            fav: false,
            show_search: true,
            selected_cat_id: 3,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 7,
            name: "Shoses",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 1,
            fav: false,
            show_search: true,
            selected_cat_id: 4,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
        {
            id: 8,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
            price: 10,
            sale: 0,
            fav: false,
            show_search: true,
            selected_cat_id: 4,
            colors: ["#a00", "#566", "#123", "#ada"],
            sizes: ["XL", "L", "M", "S"],
            selected_size: "",
            selected_color: "",
            counter: 1,
            total: null,
        },
    ],
    Categories: [
        {
            id: 1,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg"
        },
        {
            id: 2,
            name: "Shoses",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg"
        },
        {
            id: 3,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg"
        },
        {
            id: 4,
            name: "Shoses",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg"
        },
        {
            id: 5,
            name: "Blozers",
            image: "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg"
        },
    ],
    data_user: {
        name: "",
        email: "",
        phone: "",
        password: "",
        image: "",
        type: "",
        birthDate: "",
    },
    cart_list: [],

    item_found_in_cart: -1
}
const storage_data_user = async (data_user) => {
    return (
        await AsyncStorage.setItem("storage_data_user", JSON.stringify(data_user))
    )
}

const storage_cart_list = async (cart_list) => {
    return (
        await AsyncStorage.setItem("storage_cart_list", JSON.stringify(cart_list))
    )
}
const storage_fav_list = async (fav_list) => {
    return (
        await AsyncStorage.setItem("storage_fav_list", JSON.stringify(fav_list))
    )
}

const AppReducer = (state = GLOBAL_STATE, action) => {
    switch (action.type) {
        case "ADD_FAV":
            storage_fav_list(state.products)
            return {
                ...state, products: action.payload
            }
        case "CHANGE_IN_CART":
            storage_cart_list(action.payload_list)
            return {
                ...state, cart_list: action.payload_list
            }
        case "Delete_item_from_cart":
            storage_cart_list(action.payload)
            return {
                ...state, cart_list: action.payload
            }
        case "ADD_cart":
            state.item_found_in_cart = -1
            if (state.cart_list.length < 1) {
                state.cart_list.unshift(action.payload)
                if (state.cart_list[0].sale == 0 || state.cart_list[0].sale == "" || state.cart_list[0].sale == null) {
                    state.cart_list[0].total_check_item = (state.cart_list[0].price * state.cart_list[0].counter)
                } else {
                    let sale = state.cart_list[0].price - ((state.cart_list[0].price * state.cart_list[0].sale) * .01)
                    state.cart_list[0].total_check_item = (sale * state.cart_list[0].counter)
                }
            } else {
                for (let i = 0; i < state.cart_list.length; i++) {
                    if (state.cart_list[i].id != action.payload.id) {
                        state.item_found_in_cart = -1
                    } else {
                        if (
                            state.cart_list[i].selected_Color == action.payload.selected_Color &&
                            state.cart_list[i].selected_Size == action.payload.selected_Size
                        ) {
                            state.cart_list[i].counter += action.payload.counter
                            if (action.payload.sale == 0 ||
                                action.payload.sale == "" ||
                                action.payload.sale == null) {
                                action.payload.total_check_item = (action.payload.price * state.cart_list[i].counter
                                )
                            } else {
                                let sale = action.payload.price - ((action.payload.price * action.payload.sale) * .01)
                                state.cart_list[i].total_check_item = (sale * state.cart_list[i].counter)
                            }
                            state.item_found_in_cart = 0
                            break;

                        }
                        else {
                            state.item_found_in_cart = -1
                        }
                    }
                }
                if (state.item_found_in_cart == -1) {
                    let item = action.payload
                    if (item.sale == 0 || item.sale == "" || item.sale == null) {
                        item.total_check_item = (item.price * item.counter)
                    } else {
                        let sale = item.price - ((item.price * item.sale) * .01)
                        item.total_check_item = (sale * item.counter)
                    }
                    state.cart_list.unshift(item)
                }
            }
            storage_cart_list(state.cart_list)
            return {
                ...state, cart_list: [...state.cart_list]
            }
        case "Add_data_user":
            console.log("reducer" + JSON.stringify(action.payload))
            storage_data_user(action.payload)
            return {
                ...state, data_user: action.payload
            }
        case "TOTAL_CHECK_OUT":
            return {
                ...state, total_check_out_all_items: action.payload
            }
        case "change_data_user":
            console.log(action.payload)
            storage_data_user(action.payload)
            return {
                ...state, data_user: action.payload
            }
        case "ADD_TO_FAV_IN_DETAILS":
            storage_fav_list(action.payload)
            return {
                ...state, products: action.payload
            }
        case "STORAGE_DATA_USER":
            return {
                ...state, data_user: action.payload
            }
        case "STORAGE_FAV_PRODUCTS":
            return {
                ...state, products: action.payload
            }
        case "STORAGE_CART_LIST":
            return {
                ...state, cart_list: action.payload
            }


        default:
            return state
    }
}

export { AppReducer }
