const express = require("express");
const router = express.Router();
const axios = require("axios");

const marvelApi = process.env.MARVEL_API;

//*******************************//
// Ma route pour avoir tous les characters

router.get("/characters", async (req, res) => {
console.log("je suis passée dans la route /characters")
	let { name, skip, limit } = req.query;
	try {
		if (!name) {
			name = ""; // ou une valeur par défaut appropriée
		}

		if (!skip) {
			skip = 0; // ou une valeur par défaut appropriée
		}

		if (!limit) {
			limit = 100; // ou une valeur par défaut appropriée
		}

		let api = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvelApi}`;

		// Construire dynamiquement l'URL de l'API en ajoutant les queries si elles sont fournies
		if (name) {
			api += `&name=${name}`;
		}

		if (skip) {
			api += `&skip=${skip}`;
		}

		if (limit) {
			api += `&limit=${limit}`;
		}

		const responseApi = await axios(api);

		return res.status(200).json(responseApi.data);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

//*******************************//
// Ma route pour avoir des détails sur un characters

router.get("/character/:characterId", async (req, res) => {
	
	const characterId = req.params.characterId;
	try {
		const response = await axios(
			`https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${marvelApi}`
		);
		res.status(200).json(response.data);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

module.exports = router;
