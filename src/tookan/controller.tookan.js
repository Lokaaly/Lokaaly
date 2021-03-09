const businessTookan = require('./business.tookan');

exports.sendRequestForAgentRegistration = async (req, res) => {
	debugger;
	const data = req.body;
	return await businessTookan.sendRequestForAgentRegistration({...data, ...req.files});
};

exports.getAgentsList = async (req, res) => {
	const query =  req.query;
	return await businessTookan.getTookanDrivers(query);
};

exports.getAgentById = async (req, res) => {
	const { agentId } = req.params;
	return await businessTookan.getTookanDriverById(agentId);
};

exports.updateAgentById = async (req, res) => {
	const { agentId } = req.params;
	const data = req.body || {};
	return await businessTookan.updateAgentById(agentId, data);
};

