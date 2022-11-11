const db = require("../models");
const User = db.user;
exports.allAccess = (req, res) => {
   User.find()
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!users) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send(users);
    });
};

exports.userBoard = (req, res) => {

  User.findOne({
    _id:req.userId
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
        avatar:user.avatar,
        id: user._id,
        username: user.username,
        email: user.email,
        bio:user.bio
      });
    });
};

exports.userUpdate = (req, res) => {
     var user = {
        username: req.body.username,
        bio: req.body.bio,
    };
            User.findByIdAndUpdate(req.userId, user, {
                new: true
            }, function (error, doc) {
                if (error) {
                    if (error.code == 11000) {
                        res.json({
                            success: false,
                            message: 'Update Failed ,username Already Exist.'
                        });
                    } else {
                        res.json({
                            success: false,
                            message: error
                        });
                    }
                } else if (doc) {
                    res.json({
                        success: true,
                        status: res.statusCode,
                        message: 'User Updated Successfully.',
                        data: doc
                    });
                } else {
                    res.json({
                        success: false,
                        status: 404,
                        message: 'User Not Found.',
                        data: doc
                    });
                }
            });
};
