const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const base64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (email && password !== undefined) {
			const isUserExist = await User.findOne({ email });
			// je vérifie que le user existe
			if (isUserExist) {
				// je cherche la correlation entre mot de passe envoyé et la BDD
				const newHash = SHA256(password + isUserExist.salt).toString(base64);
				if (newHash === isUserExist.hash) {
					//le cas où le mdp est bon
					return res.status(200).json({
						_id: isUserExist._id,
						token: isUserExist.token,
						username: isUserExist.username,
					});
				} else {
					return res
						.status(201)
						.json({ message: "mail or password not found" });
					//le cas ou le mot de passe est mauvais
				}
			} else {
				// le cas où le user n'existe pas
				return res.status(201).json({ message: "mail or password not found" });
			}
		} else {
			return res.status(404).json({ message: "il manque des données" });
		}
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (username && email && password !== undefined) {
			const isUserExist = await User.findOne({ email });

			// Je vérifie que le user n'existe pas déjà
			if (isUserExist) {
				return res.status(404).json({ message: "Cet utilisateur existe déjà" });
			} else {
				// Je créé mon user
				const salt = uid2(12);
				const token = uid2(16);
				const hash = SHA256(password + salt).toString(base64);
				const newUser = new User({ email, username, token, salt, hash });
				await newUser.save();
				return res.status(201).json({
					_id: newUser._id,
					token: newUser.token,
					username: newUser.username,
				});
			}
		} else {
			return res.status(404).json("Il manque des paramètres");
		}
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

module.exports = router;
