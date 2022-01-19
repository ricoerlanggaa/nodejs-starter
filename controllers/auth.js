const user = require('../models').user;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
  register(req, res) {
    return user
      .create({
        role_id: req.body.role_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        phone_number: req.body.phone_number,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
    
  login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    user.findOne({
      where: {
        email: email,
      },
    })
      .then(async (users) => {
        var passwordIsValid = bcrypt.compareSync(password, users.password);

        if (!users) {
          return res.status(404).send({ message: "User Not found." });
        } else if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ users }, process.env.JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });

        const data = {
          id: users.id,
          name: users.name,
          email: users.email,
          username: users.username,
          phone_number: users.phone_number,
          updatedAt: users.updatedAt,
          createdAt: users.createdAt,
          accessToken: token,
        };

        res.status(200).send({
          success: true,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({ 
          message: err.message
        });
      });
  }
};