/**
 * Created by akhlebaev on 06.04.2015.
 */
var mongoose = require("mongoose");

var LinkSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    href : {
        type: String,
        index: true
    },
    tags : {
        type: String,
        index: true
    },
    author : {
        type: String,
        index: true
    },
    date : {
        type: String,
        index: true
    }
});

var Link= mongoose.model('Link', LinkSchema);

module.exports = {
    Link : Link
};