// // https://www.freetogame.com/api/games


(async () => {
	try {
		const {data} = await axios.get("/api/game", {
			withcredentials: true,
		});

		// estoy mostrando las tareas
		data.forEach((todo) => {
			console.log("todo", todo);
			
		});
	} catch (error) {
		// window.location.pathname = "/login";
		console.log(error);
	}
})();