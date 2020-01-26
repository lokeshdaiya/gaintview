const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user')

async function signup (req, res) {
    // Joi Validation
    const {error} = Joi.validate(req.body, {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        role: Joi.string().required()
    });
    if (error) return res.status(400).send({ error: error.details[0].message });

    // save data
    try {
        let { email, password, role, name } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)
        const user = new User({ email, password, role, name });
        await user.save();
        res.send({ message: "User registered successfully" });
    } catch (ex) {
        if (ex.name && ex.name === 'ValidationError')
            return res.status(400).send(ex.message);
        res.status(500).send(err)
    }

}

async function login (req, res) {
    const {error} = Joi.validate(req.body, {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    if (error) return res.status(400).send({ error: error.details[0].message });

    try {
        const {email, password} = req.body
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({error: 'Invalid email or password'});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json({error: 'Invalid email or password'});

        const token = jwt.sign({_id: user._id, email: user.email, role: user.role}, 'giantview_jwt');
        res.send({ accessToken: token });
    } catch (ex) {
        if (ex.name && ex.name === 'ValidationError')
            return res.status(400).send(ex.message);
        res.statu(500).send(err)
    }
}

module.exports = { signup, login}
