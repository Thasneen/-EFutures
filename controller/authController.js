const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req,res) => {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    user.password = await bcrypt.hash(user.password, 8);

    user = await User.create(user);

    return res.json({
        message: 'user created',
        user,
    })
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password  = req.body.password;
    console.log(req.body)

    const user = await User.findOne({email});

    if (!user) {
        return res.json('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.json('Invalid email or password');
    }

    const payload = {
        userId: user._id,
        name: user.name,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1h'});

    res.json({token});
};

exports.profile = async (req, res) => {
    if (!req.isAuth) {
        return res.json({message: 'Unathorized'}).status(401);
    }

    const user = await User.findById(req.userId);

    return res.json(user);
};