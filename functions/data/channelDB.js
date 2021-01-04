const admin = require('firebase-admin');

module.exports.findChannel = async channelID => {
	let obj;
	try {
		const channel = await admin
				.firestore()
				.collection("channels")
				.doc(channelID)
				.get();
		if (!channel.exists) {
			obj = { success: false, error: `channel with id ${channelID} does not exist` };
		} else {
			obj = { success: true, channel: channel.data() };
		}
	} catch (error) {
		console.log(`SEARCH CHANNEL ERROR: ${error.message}`);
		obj = { success: false, error: error.message };
		console.log("RETURNING OBJECT:");
		console.log(obj);
	}
	return obj;
};

module.exports.getChannels = async () => {
	let obj;
	try {
		const channels = [];
		const data = await admin
				.firestore()
				.collection("channels")
				.orderBy("createdAt", "desc")
				.get();
		data.forEach(channel => {
			channels.push(channel.data());
		});
		obj = { success: true, channels: channels };
	} catch (error) {
		console.error(`Error getting channels: ${error}`);
		obj = { success: false, error: error.message };
	}
	return obj;
};

module.exports.newChannel = async channelData => {
	let obj;
	try {
		await admin
				.firestore()
				.doc(`/channels/${channelData.channelID}`)
				.set(channelData);
		obj = { success: true, channel: channelData };
	} catch (error) {
		console.error(`Error creating a channel: ${error}`);
		obj = { success: false, error: error.message };
	}
	return obj;
};