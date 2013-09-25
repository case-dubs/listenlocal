//Tomorrow AM: create manual api callback. Once that works, create automated url based off of band name

	console.log("document loads!");


	function submit(){
		console.log("Submit button works");
		var artistField = document.getElementById('artistName');
		var artistName = artistField.value;
		var spotifyArtistApi = 'http://ws.spotify.com/search/1/artist?q='

		$.getJSON(spotifyArtistApi, {
			format: 'json',
			data: data,
			url: spotifyArtistApi + 'artistName',
		})
		.done(function(data){
			console.log("json callback done");
			console.log(data);
		});
	};

	
	