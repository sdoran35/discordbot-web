module.exports = hello => {
	app.get("/hello", (req, res) => {
		res.status(200).json('Hello World');
	});
	
};
