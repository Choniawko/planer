var mongoose =  require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
    name: String,
    description: String,
    time_range: Date,
    start_date: Date,
    end_date: Date,
    status: Number,
    projekt_id: String,
    reporter_id: String,
    assignee_id: String
}));   