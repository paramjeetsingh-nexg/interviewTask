const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    Customer: {
        id: String,
        firstname: String,
        lastname: String,
        avatarUrl: String,
        email: String,
        phone: String,
        hasPremium: String,
        bids: [String],
    },
    Bid: {
        id: String,
        carTitle: String,
        amount: String,
        created: {
            type: String,
            default: Date.now()
        }
    }
});

const itemModel = new mongoose.model('Data', itemsSchema);
module.exports = itemModel;
