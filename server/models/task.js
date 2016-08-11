var mongoose =  require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
    name: String,
    description: String,
    time_range: Date,
    date_start: Date,
    date_end: Date,
    status: Number,
    projekt_id: String,
    reporter_id: String,
    assignee_id: String
}));   