// // https://www.freetogame.com/api/games

const grid = document.querySelector('.grid');
console.log(grid);
(async () => {
	try {
		const {data} = await axios.get("/api/game");
     console.log(data);

	} catch (error) {
		// window.location.pathname = "/login";
		console.log(error);
	}
})();

const dataGames = [ 
	{
		"id": 582,
		"title": "Tarisland",
		"thumbnail": "https://www.freetogame.com/g/582/thumbnail.jpg",
		"short_description": "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
		"game_url": "https://www.freetogame.com/open/tarisland",
		"genre": "MMORPG",
		"platform": "PC (Windows)",
		"publisher": "Tencent",
		"developer": "Level Infinite",
		"release_date": "2024-06-22",
		"freetogame_profile_url": "https://www.freetogame.com/tarisland"
	  },
	  {
		"id": 540,
		"title": "Overwatch 2",
		"thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
		"short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
		"game_url": "https://www.freetogame.com/open/overwatch-2",
		"genre": "Shooter",
		"platform": "PC (Windows)",
		"publisher": "Activision Blizzard",
		"developer": "Blizzard Entertainment",
		"release_date": "2022-10-04",
		"freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
	  },
	  {
		"id": 516,
		"title": "PUBG: BATTLEGROUNDS",
		"thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
		"short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
		"game_url": "https://www.freetogame.com/open/pubg",
		"genre": "Shooter",
		"platform": "PC (Windows)",
		"publisher": "KRAFTON, Inc.",
		"developer": "KRAFTON, Inc.",
		"release_date": "2022-01-12",
		"freetogame_profile_url": "https://www.freetogame.com/pubg"
	  },
	  {
		"id": 508,
		"title": "Enlisted",
		"thumbnail": "https://www.freetogame.com/g/508/thumbnail.jpg",
		"short_description": "Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted. ",
		"game_url": "https://www.freetogame.com/open/enlisted",
		"genre": "Shooter",
		"platform": "PC (Windows)",
		"publisher": "Gaijin Entertainment",
		"developer": "Darkflow Software",
		"release_date": "2021-04-08",
		"freetogame_profile_url": "https://www.freetogame.com/enlisted"
	  },
	  {
		"id": 345,
		"title": "Forge of Empires",
		"thumbnail": "https://www.freetogame.com/g/345/thumbnail.jpg",
		"short_description": "A free to play 2D browser-based online strategy game, become the leader and raise your city.",
		"game_url": "https://www.freetogame.com/open/forge-of-empires",
		"genre": "Strategy",
		"platform": "Web Browser",
		"publisher": "InnoGames",
		"developer": "InnoGames",
		"release_date": "2012-04-17",
		"freetogame_profile_url": "https://www.freetogame.com/forge-of-empires"
	  },
	  {
		"id": 604,
		"title": "FragPunk",
		"thumbnail": "https://www.freetogame.com/g/604/thumbnail.jpg",
		"short_description": "A free-to-play 5v5 hero shooter that uses cards to modify matches.",
		"game_url": "https://www.freetogame.com/open/fragpunk",
		"genre": "Shooter",
		"platform": "PC (Windows)",
		"publisher": "Bad Guitar Studio",
		"developer": "Bad Guitar Studio",
		"release_date": "2025-03-06",
		"freetogame_profile_url": "https://www.freetogame.com/fragpunk"
	  }
]

dataGames.forEach((game) => {

const cardGame = document.createElement("div");

cardGame.innerHTML = `<div class="producto">
                <!-- <a href="producto.html"> -->
                    <img class="producto__imagen" src="${game.thumbnail}" alt="imagen">
                    <div class="productp__informacion">
                        <p class="producto__nombre">${game.title}</p>
                        <p class="producto__precio">25$</p>
                    </div>
                </a>
            </div> `;
grid.append(cardGame);
});
