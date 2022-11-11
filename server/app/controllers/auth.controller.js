const config = require("../config/auth.config");
const db = require("../models");
const aws = require('aws-sdk');
const fs = require('fs')
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId:  "AKIA2HOEFEBBVLUV4KOE",
    secretAccessKey: "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",
    region: "us-east-2"
  });
  const s3 = new aws.S3();
  var params = {
    ACL: 'public-read',
    Bucket: "nodejs-images-test",
    Body: fs.createReadStream(req.file.path),
    Key: `userAvatar/${req.file.originalname}`
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }
    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      const locationUrl = data.Location;
      const user = new User({
        bio: req.body.bio,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        avatar: locationUrl
      });
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
      });
    }
  });

};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        avatar:user.avatar,
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        bio: user.bio,
      });
    });
};
