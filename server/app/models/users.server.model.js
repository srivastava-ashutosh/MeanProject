var Schema = require('mongoose').Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    username: String,
    password: String
});
var users = mongoose.model('User', userSchema);

var resourceSchema = new Schema({
    fullName: String,
    designation: String,
    email: {
        type: String,
        unique: true
    },
    exp: Number
});
var resource = mongoose.model('Resource', resourceSchema);

var BookSchema = new Schema({
    title:String,
    author:String,
    category:String,
    users : [{ type: Schema.Types.ObjectId, ref: 'User' }]
})
var book = mongoose.model("Book",BookSchema);

module.exports = {
    User: users,
    Resources: resource,
    Book:book
}