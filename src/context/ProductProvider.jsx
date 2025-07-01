import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UseAuthContext } from "./AuthProvider";
import axios from "axios";
import { API_URL } from "../App";

// Create context
const Context = createContext();

// Provider component
const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const { isAuth } = UseAuthContext() || {};
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Filter products by category
    const filterByCategory = (categoryLabel) => {
        if (categoryLabel === "All") {
            setFilteredProducts(products);
            return;
        }
        const filtered = products.filter(product => product.category === categoryLabel);
        setFilteredProducts(filtered);
    };

    // Cart calculations
    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const subtotal = getTotalAmount();
    const discount = subtotal > 50000 ? Math.floor(subtotal * 0.1) : 0;
    const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 50;
    const totalAmount = subtotal - discount + shipping;

    // Get all products
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/product/all`);
            setProducts(data.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [products]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    // Search handler
    const handleSearchProducts = async (keyword) => {
        try {
            const { data } = await axios.get(`${API_URL}/api/product/search?search=${keyword}`);
            setFilteredProducts(data.products);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    // Add to cart
    const handlerAddCard = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!isAuth) {
            return toast.error("Please Login before adding to cart.");
        }

        const alreadyExists = existingCart.some(item => item.name === product.name);
        if (alreadyExists) {
            toast.error(`${product.name} Already Exist`);
            return;
        }

        const updatedCart = [...existingCart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success(`${product.name} Added to cart`);
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Increase quantity
    const increaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Decrease quantity
    const decreaseQuantity = (productId) => {
        const updatedCart = cart
            .map(item =>
                item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <Context.Provider
            value={{
                products,
                filteredProducts,
                setProducts,
                cart,
                totalAmount,
                shipping,
                discount,
                subtotal,
                filterByCategory,
                setFilteredProducts,
                handlerAddCard,
                removeFromCart,
                getTotalAmount,
                increaseQuantity,
                decreaseQuantity,
                handleSearchProducts,
            }}
        >
            {children}
        </Context.Provider>
    );
};

const UseProductContext = () => useContext(Context);

export { UseProductContext };
export default ProductProvider;
