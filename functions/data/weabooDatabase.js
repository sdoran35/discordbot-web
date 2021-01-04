const admin = require('firebase-admin');

module.exports = class WeabooDatabase {
    constructor(params) {
        this.db = admin.firestore();
    }
}