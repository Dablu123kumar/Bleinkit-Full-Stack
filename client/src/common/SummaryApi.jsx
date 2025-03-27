export const baseURL =  import.meta.env.VITE_BACKEND_API_URL

const SummaryAPI = {
    register : {
        url : "/api/user/register",
        method : "post"
    },
    login : {
        url : "/api/user/login",
        method : "post"
    },
    forgot_password : {
        url : "/api/user/forgot-password",
        method : "put"
    },
    verify_OTP : {
        url : "/api/user/verify-forgot-password-otp",
        method : "put"
    },
    reset_password : {
        url : "/api/user/reset-password",
        method : "put"
    },
    refresh_token : {
        url : "/api/user/refreshToken",
        method : "post"
    },
    user_details : {
        url : "/api/user/user-details",
        method : "get"
    },
    logout : {
        url : "/api/user/logout",
        method : "post"
    },
    uploadAvtar : {
        url : "/api/user/upload-avatar",
        method : "put"
    },
    updateUser : {
        url : "/api/user/update-user",
        method : "put"
    },
    addCategory : {
        url : "/api/category/add-category",
        method : "post"
    },
    getCategory : {
        url : "/api/category/get-category",
        method : "get"
    },
    updateCategory : {
        url : "/api/category/update-category",
        method : "put"
    },
    deleteCategory : {
        url : "/api/category/delete-category",
        method : "delete"
    },
    uploadImage : {
        url : "/api/file/upload",
        method : "post"
    },
    addSubCategory : {
        url : "/api/subCategory/add-sub-category",
        method : "post"
    },
    getSubCategory : {
        url : "/api/subCategory/get-sub-category",
        method : "post"
    },
    EditSubCategory : {
        url : "/api/subCategory/update-sub-category",
        method : "put"
    },
    DeleteSubCategory : {
        url : "/api/subCategory/delete-sub-category",
        method : "delete"
    },
    createProduct : {
        url : "/api/product/create-product",
        method : "post"
    },
    getProduct : {
        url : "/api/product/get-product",
        method : "post"
    },
    getProductByCategory : {
        url : "/api/product/get-product-by-category",
        method : "post"
    },
    getProductByCategoryAndSubCategory  : {
        url : "/api/product/get-product-by-category&subcategory",
        method : "post"
    },
    getProductDetails  : {
        url : "/api/product/get-product-details",
        method : "post"
    },
    updateProductDetails  : {
        url : "/api/product/update-product-details",
        method : "put"
    },
    deleteProduct  : {
        url : "/api/product/delete-product",
        method : "delete"
    },
    searchProduct  : {
        url : "/api/product/search-products",
        method : "post"
    },
    addToCart  : {
        url : "/api/cart/create",
        method : "post"
    },
    getCartItem  : {
        url : "/api/cart/get",
        method : "get"
    },
    updateCartItemQty  : {
        url : "/api/cart/update_qty",
        method : "put"
    },
    deleteCartItem  : {
        url : "/api/cart/delete_cart_item",
        method : "delete"
    },
    createAddress  : {
        url : "/api/address/create",
        method : "post"
    },
    getAddress  : {
        url : "/api/address/get",
        method : "get"
    },
    updateAddress  : {
        url : "/api/address/update",
        method : "put"
    },
    dissableAddress  : {
        url : "/api/address/dissable",
        method : "delete"
    },
    cashOnDelivery  : {
        url : "/api/order/cash-on-delivery",
        method : "post"
    },
    payment_url_online  : {
        url : "/api/order/checkout-online",
        method : "post"
    },
    getOrderItems  : {
        url : "/api/order/order_list",
        method : "get"
    },
}




export default SummaryAPI;