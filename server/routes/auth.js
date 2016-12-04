import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { validLoginData } from '../utils/validators'
import User from '../models/user'
import Role from '../models/role'
import Config from '../config'

const router = express.Router();

//login
router.post('/', function (req, res) {
  const {errors, isValid} = validLoginData(req.body);

  if (!isValid) {
    res.status(400).json({ errors });
  } else {
    const {userId, password} = req.body;

    User.findOne({ email: email })
      .populate('role')
      .exec((err, user) => {
        if (err) { throw err; }
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            let params = {
              _id: user.id,
              email: user.email,
              permissions: user.permissions
            };

            const token = jwt.sign(params, Config.jwtSecret);
            res.json({ token });

          } else {
            errors.password = "密码不正确";
            res.status(401).json({ errors });
          }
        } else {
          errors.userId = "该用户不存在";
          res.status(401).json({ errors });
        }
      })
  }
});

module.exports = router;
