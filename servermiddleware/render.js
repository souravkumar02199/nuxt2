export default function(req, res, next) {
    const paths = ['/','/cart/cart-delivery','/quotation/place-order/checkout','/signup','/signin' , '/dashboard/address','/reset-password','/request_quote','/forgot_password','/bespoke_services','/cart/upload-artwork'] //you can edit to your own pages

    if (req.originalUrl.startsWith('/') ) {      
        res.spa = true
    }
       
    next && next.call && next()
}