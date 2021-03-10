const Tookan = require('tookan-api');
const tookanClient = new Tookan.Client({ api_key: process.env.TOOKAN_API_KEY });

exports.Tookan = {
	registerDriver: async function (driverData) {
		try {
			debugger;
			const response = await tookanClient.addAgent({
				email: driverData.email,
				phone: `+${driverData.phoneNumber}`,
				transport_type: `${driverData.transportType}`,
				transport_desc: driverData.transport_desc,
				license: driverData.drivingLicense,
				timezone: '-240', // UAE timezone
				team_id: '882932',
				username: driverData.email.split('@')[0].replace('.', '_'),
				password: '',
				first_name: driverData.firstName,
				last_name: driverData.lastName,
				rule_id: 199695,
				fleet_type: 2,
				profile_url: driverData.profile_url,
				profile_thumb_url: driverData.profile_thumb_url
			});
			if (!response || (response && response.status !== 200)) throw new Error(`Tookan driver error: ${response.message}`);
		
			return response.data;
		} catch (error) {
			debugger;
			console.log('Tookan agent registration error', error);
			throw new Error(error.message);	
		}
	},
}