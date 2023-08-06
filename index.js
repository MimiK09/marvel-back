const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB); 
app.use(express.json()); // si besoin de récupérer des body

// mon api Marvel
const marvelApi = process.env.MARVEL_API;

// Mes routes
const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

const usersRoutes = require("./routes/users");
app.use(usersRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

// // ma route générale avant création d'un fichiers routes
// app.get("/", (req, res) => {
// 	try {
//         res.status(200).json("RES je passe dans ma route /");
// 		console.log("je passe dans ma route /");
// 	} catch (error) {
// 		res.status(400).json("Bienvenue sur l'API de Vinted");
// 	}
// });

app.listen(process.env.PORT, () => {
	console.log("Server has started 🚀🚀", process.env.PORT);
});
