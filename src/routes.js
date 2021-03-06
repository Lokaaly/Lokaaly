const userRoutes = require('./user/routes.user');
const adminRoutes = require('./admin/routes.admin');
const vendorRoutes = require('./vendor/routes.vendor');
const productRoutes = require('./product/routes.product');
const cartRoutes = require('./cart/routes.cart');
const staticRoutes = require('./static/routes.static');
const orderRoutes = require('./order/routes.order');
const tookanRoutes = require('./tookan/routes.tookan');
const paytabsRoutes = require('./paytabs/routes.paytabs');

module.exports = [{
	path: 'users',
	router: userRoutes,
}, {
	path: 'admin',
	router: adminRoutes,
}, {
	path: 'vendors',
	router: vendorRoutes,
}, {
	path: 'tookan',
	router: tookanRoutes,
}, {
	path: 'products',
	router: productRoutes,
}, {
	path: 'static',
	router: staticRoutes,
}, {
	path: 'cart',
	router: cartRoutes
}, {
	path:'orders',
	router: orderRoutes
}, {
	path: 'paytabs',
	router: paytabsRoutes
}];