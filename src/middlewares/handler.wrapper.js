const wrapErrorHandler = (res, error) => {
	res.status(409).send({
		error: {
			message: error.message
		}
	});
};

const wrapResponse = (res, data) => {
	res.status(200).send(data || null);
};

const wrapAsync = (handler) => (req, res) => {
	handler(req, res).then((data) => {
		wrapResponse(res, data);
	}).catch(err => {
		wrapErrorHandler(res, err);
	});
};

module.exports = {
	wrapAsync,
};


