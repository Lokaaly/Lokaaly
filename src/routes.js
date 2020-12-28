const userRoutes = require('./user/routes.user');
const adminRoutes = require('./admin/routes.admin');
const vendorRoutes = require('./vendor/routes.vendor');
const productRoutes = require('./product/routes.product');
const staticRoutes = require('./static/routes.static');

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
}, {
	path: 'static',
	router: staticRoutes,
}];