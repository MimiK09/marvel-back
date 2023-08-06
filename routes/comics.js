const express = require("express");
const router = express.Router();
const axios = require("axios");

const marvelApi = process.env.MARVEL_API;

//*******************************//
// Ma route pour avoir tous les comics

router.get("/comics", async (req, res) => {
	console.log("je suis passée dans la route /comics")
	try {
		let api = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvelApi}`;

		if (!req.query.title) {
			const responseApi = await axios(api);
			return res.status(200).json(responseApi.data);
		} else {
			let newApi = api + "&title=" + req.query.title;
			const responseApi = await axios(newApi);
			return res.status(200).json(responseApi.data);
		}
	} catch (error) {
		res.status(400).json("Erreur route /comics");
	}
});

//*******************************//
// Ma route pour avoir la liste des comics rattaché à un personnage

router.get("/comics/:characterId", async (req, res) => {
	try {
		const characterId = req.params.characterId;
		const response = await axios(
			`https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${marvelApi}`
		);
		res.status(200).json(response.data);

	} catch (error) {
		res.status(400).json("Erreur route /comics/:charactersId");
	}
});

//*******************************//
// Ma route pour avoir des détails sur un comic

router.get("/comic/:comicId", async (req, res) => {

	const comicId = req.params.comicId;
	try {
		const response = await axios.get(
			`https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${marvelApi}`
		);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(400).json("Erreur route /comic/:comicId");
	}
});

//*******************************//
// ma route générale

router.get("/", (req, res) => {
	try {
		res.status(200).json("RES je passe dans ma route /");

	} catch (error) {
		res.status(400).json("Bienvenue sur l'API de Vinted");
	}
});

//*******************************//
// ma route erreur

router.all("*", async (req, res) => {
	try {
		return res.status(404).json("Not found, route *");
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

module.exports = router;
