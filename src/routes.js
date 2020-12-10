const userRoutes = require('./user/routes.user');
const adminRoutes = require('./admin/routes.admin');
const vendorRoutes = require('./vendor/routes.vendor');
const productRoutes = require('./product/routes.product');

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
	path: 'products',
	router: productRoutes,
}];