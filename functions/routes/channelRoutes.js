// USER ROUTES TO HANDLE NEW USERS, FETCHING ALL USERS AND/OR CURRENT USER

const database = require('../data/channelDB');

module.exports = app => {
	app.get('/channel', (req, res) => {
		if (req.channel) {
			res.status(200).json(req.channel);
		} else {
			res.status(404).json({ success: false, error: 'Channel does not exist' });
		}
	});
	
	/**
     * Get all Channels from DB
     */
	app.get('/channel/channels', async (req, res) => {
		try {
			const channels = await database.getChannels();
			return res.json(channels);
		} catch (error) {
			console.error(`Error getting channels: ${error.message}`);
			return res.status(500).json({ success: false, error: error.message });
		}
	});
	
	/**
     * Create new Channel in DB
     */
	app.post('/channel/new', async (req, res) => {
		try {
			const newChannel = await database.newChannel(req.body);
			return res.status(201).json({ success: true, channel: newChannel });
		} catch (error) {
			console.error(`Error creating a channel: ${error.message}`);
			return res.status(500).json({ success: false, error: error.message });
		}
	});
	
	/**
     * Find specific channel in DB
     */
	app.post('/channel/find', async (req, res) => {
		try {
			const search = await database.findChannel(req.body.channelID);
			return res.status(200).json(search);
		} catch (error) {
			console.error(`Error finding a channel: ${error.message}`);
			return res.status(500).json({ success: false, error: error.message });
		}
	})
};
