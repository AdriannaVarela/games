const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener("click", async (e) => {
	console.log(e);
	try {
		await axios.get("/api/logout");
		window.location.pathname = "/login";
	} catch (error) {
		console.log(error);
	}
});