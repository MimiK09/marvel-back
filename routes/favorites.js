const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/User");

router.post("/favorites/add", isAuthenticated, async (req, res) => {
	const { type, id } = req.body;

	try {
		// je regarde si je cherche à ajouter un comic ou un character grâce au type de body
		if (type === "comic") {
			const foundFav = await User.findOne({
				username: req.user.username,
			});

			let tab = foundFav.fav_comics;
			// je regarde si j'ai déjà ajouté cet item
			if (tab.includes(id)) {
				return res
					.status(201)
					.json({ message: "You have already added this comic in your fav'" });
			} else {
				tab.push(id);
				foundFav.fav_comics = tab;
				foundFav.save();
				return res.status(201).json({ message: "Comic hhas been add to fav'" });
			}
		} else if (type === "character") {
			const foundFav = await User.findOne({
				username: req.user.username,
			});

			let tab = foundFav.fav_characters;
			// je regarde si j'ai déjà ajouté cet item
			if (tab.includes(id)) {
				return res.status(201).json({
					message: "You have already added this character in your fav'",
				});
			} else {
				tab.push(id);
				foundFav.fav_characters = tab;
				foundFav.save();
				return res
					.status(201)
					.json({ message: "Character has been add to fav'" });
			}
		} else {
			return res.status(201).json({ message: "error sending fav" });
		}
	} catch (error) {
		return res.status(201).json({ message: "Not conncted, try again" });
	}
});

router.post("/favorites/remove", async (req, res) => {
	try {
	} catch (error) {}
});

router.get("/favorites", isAuthenticated, async (req, res) => {
	try {
		const foundFav = await User.findOne({
			username: req.user.username,
		});
		return res.status(201).json({
			comics: foundFav.fav_comics,
			characters: foundFav.fav_characters,
		});
	} catch (error) {
		return res.status(201).json({ message: "error to get fav" });
	}
});

module.exports = router;
