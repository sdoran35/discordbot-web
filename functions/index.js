const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const express = require('express');
const passport = require('passport');
require('./services/discordOauth');

// YOUR FIREBASE CONFIG OBJECT GOES HERE
const firebaseConfig = {
	apiKey: functions.config().fbconfig.apikey,
	authDomain: 'weaboo-bot-73b07.firebaseapp.com',
	projectId: 'weaboo-bot-73b07',
	storageBucket: 'weaboo-bot-73b07.appspot.com',
	messagingSenderId: functions.config().fbconfig.messagingsenderid,
	appId: functions.config().fbconfig.appid,
	measurementId: functions.config().fbconfig.measurementid,
};



const app = express();

// COOKIE PARSER AND EXPRESS SESSION ARE NEEDED
// TO MAINTAIN THE USER'S SESSION ACROSS REQUESTS
// SEND A PR IF YOU FIND WAYS TO IMPROVE THIS SYSTEM

app.use(require('cookie-parser')());

app.use(
		require('express-session')({
			secret: 'MY_SECRET_COOKIE_KEY',
			resave: true,
			saveUninitialized: true
		})
);

// INITIALIZES PASSPORT. OAUTH2 WILL NOT WORK WITHOUT THESE 2 LINES
app.use(passport.initialize());
app.use(passport.session());

// MAKES OUR EXPRESS APP USE THE ROUTES DEFINED IN THE BELOW FILES
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);


// INITIALIZE OUR FIREBASE APP
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});
firebase.initializeApp(firebaseConfig);

// EXPORT OUR FIREBASE FUNCTIONS
exports.api = functions.https.onRequest(app);
exports.hello = functions.https.onRequest(require('./routes/helloRoutes'));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});