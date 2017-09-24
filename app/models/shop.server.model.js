var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShopSchema = new Schema({
    producto: String,
    precio: Number,
    nivel: Number,
    todos: {}//we will use this in the next tutorial to store TODOs
});


mongoose.model('Shop', ShopSchema);
