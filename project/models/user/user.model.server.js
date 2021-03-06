/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();

    var User = mongoose.model("swUser", UserSchema);

    var api = {
        CreateUser: CreateUser,
        FindUserById: FindUserById,
        FindUserByCredentials: FindUserByCredentials,
        DeleteUser: DeleteUser,
        UpdateUser: UpdateUser,
        FindUserByUserName: FindUserByUserName,
        FindFacebookUser: FindFacebookUser,
        FindGoogleUser: FindGoogleUser,
        GetExperts: GetExperts
    }

    return api;

    function GetExperts() {
    return User.find({"type" : "expert"});
    }

    function FindFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }
    function FindGoogleUser(id) {
        return User.findOne({"google.id": id});
    }

    function FindUserByUserName(username) {
        return User.findOne({username: username});
    }

    function UpdateUser(userId, updatedUser) {
        delete updatedUser._id;
        return User
            .update({_id: userId},
                {$set: updatedUser});
    }

    function CreateUser(user) {
        return User.create(user);
    }

    function FindUserById(userId) {
        return User.findById({_id: userId});
    }

    function FindUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function DeleteUser(userId) {
        return User.remove({_id : userId});
    }
};