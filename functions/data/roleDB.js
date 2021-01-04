const admin = require('firebase-admin');

// roleID is returned from Discord, after the role is created by a user or the bot

module.exports.findRole = async roleID => {
	let obj;
	try {
		const role = await admin
				.firestore()
				.collection("roles")
				.doc(roleID)
				.get();
		if (!role.exists) {
			obj = { success: false, error: `role with id ${roleID} does not exist` };
		} else {
			obj = { success: true, role: role.data() };
		}
	} catch (error) {
		console.log(`SEARCH ROLE ERROR: ${error.message}`);
		obj = { success: false, error: error.message };
		console.log("RETURNING OBJECT:");
		console.log(obj);
	}
	return obj;
};

module.exports.getRoles = async () => {
	let obj;
	try {
		const roles = [];
		const data = await admin
				.firestore()
				.collection("roles")
				.orderBy("createdAt", "desc")
				.get();
		data.forEach(role => {
			roles.push(role.data());
		});
		obj = { success: true, roles: roles };
	} catch (error) {
		console.error(`Error getting roles: ${error}`);
		obj = { success: false, error: error.message };
	}
	return obj;
};

module.exports.newRole = async roleData => {
	let obj;
	try {
		await admin
				.firestore()
				.doc(`/roles/${roleData.roleID}`)
				.set(roleData);
		obj = { success: true, role: roleData };
	} catch (error) {
		console.error(`Error creating a role: ${error}`);
		obj = { success: false, error: error.message };
	}
	return obj;
};