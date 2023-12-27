const User = require('../models/user');

module.exports.addData = function (req, res) {
    let { name, gender, nationality, email, phoneNumber, address, message } = req.body;

    const user = {
        name: name,
        gender: gender,
        nationality: nationality,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        message: message
    };

    User.create(user)
    .then((user) => {
        console.log('Data Added: ', user);
        res.status(200).json({ success: true, message: "Data added successfully" });
    })
    .catch((err) => {
        if (err.code === 11000 && err.keyPattern.email) {
            res.status(400).json({ success: false, message: "Email already in use. Please enter a different email." });
        } else if (err.code === 11000 && err.keyPattern.phoneNumber) {
            res.status(400).json({ success: false, message: "Phone number already in use. Please enter a different phone number." });
        } else {
            console.log('Error in adding ', err);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });
};


module.exports.loginUser = async function (req, res) {
    try {
        const { name, email, phoneNumber } = req.body;
        const user = await User.findOne({ name, email, phoneNumber });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User found", user });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports.getAllData = async function (req, res) {
    try {
        const allData = await User.find();
        res.status(200).json(allData);
    } catch (error) {
        console.error('Error in fetching all data:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
