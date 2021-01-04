// USER ROUTES TO HANDLE NEW USERS, FETCHING ALL USERS AND/OR CURRENT USER

const database = require('../data/roleDB');

module.exports = app => {
	app.get("/role", (req, res) => {
		if (req.role) {
			res.status(200).json(req.role);
		} else {
			res.status(404).json({ success: false, error: "Role does not exist" });
		}
	});
	
	// GET ALL ROLES FROM DATABASE
	app.get("/role/roles", async (req, res) => {
		try {
			const roles = await database.getRoles();
			return res.json(roles);
		} catch (error) {
			console.error(`Error getting roles: ${error.message}`);
			return res.status(500).json({ success: false, error: error.message });
		}
	});
	
	// CREATE NEW ROLE IN DATABASE
	app.post("/role/new", async (req, res) => {
		try {
			const newRole = await database.newRole(req.body);
			return res.status(201).json({ success: true, role: newRole });
		} catch (error) {
			console.error(`Error creating a role: ${error.message}`);
			return res.status(500).json({ success: false, error: error.message });
		}
	});
	
	// FIND SPECIFIC ROLE OR CHECK IF SPECIFIC ROLE EXISTS
	app.post("/role/find", async (req, res) => {
		try {
			const search = await database.findRole(req.body.roleID);
			return res.status(200).json(search);
		} catch (error) {
			console.error(`Error finding a role: ${error.message}`);
			return res.status(500).json({ success: false, error: error.message });
		}
	})
};
