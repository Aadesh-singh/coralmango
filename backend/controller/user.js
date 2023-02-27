const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, type, password } = req.body;
    console.log("req: ", req.body);

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(200).json({
        result: false,
        msg: "Mandatory fields are not present",
      });
    }
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({
        result: false,
        msg: "An User already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const password1 = await bcrypt.hash(password, salt);
    user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      type: type,
      password: password1,
    });

    let tokenValue = await jwt.sign({userId: user._id, email: user.email}, 'coralMangoJsonTopSecret');

    return res.status(200).json({
      result: true,
      msg: "User registered successfully",
      user: user,
      token: tokenValue
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      msg: "INTERNAL_SERVER_ERROR",
      err: error.msg,
    });
  }
};

const userLogin = async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(200).json({
                result: true,
                msg: 'Email not registered pls create an account',
                token: '----'
            });
        }
        let checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            return res.status(200).json({
                result: true,
                msg: 'Invalid Credentials'
            });
        }
        const token = await jwt.sign({ userId: user._id, email: user.email }, "coralMangoJsonTopSecret");
        return res.status(200).json({
            result: true,
            msg: `${user.type} logged in succesfully`,
            user: user,
            token: token
        });
    } catch (error) {
        console.log('Error in logging in user: ', error);
        return res.status(200).json({
            result: false,
            msg: 'Error in loggin in user',
            token: '----'
        });
    }
}


const fetchAllUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({
      result: true,
      msg: "All users fetched successfully",
      users: user,
    });
  } catch (error) {
    return res.status(200).json({
      result: false,
      msg: "Error in fetching all users",
      error: error.msg,
    });
  }
};

module.exports = {
  createUser,
  fetchAllUser,
  userLogin
};
