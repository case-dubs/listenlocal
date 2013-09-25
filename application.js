	console.log("document loads!");


	function submit(){
		console.log("Submit button works");
		var artistField = document.getElementById('artistName');
		//artistName is the name that the user enters in the frontend
		var artistName = artistField.value;
		//Below is the generic url for looking up an artist on spotify's api...more info: https://developer.spotify.com/technologies/web-api/#introduction
		var spotifyArtistApi = 'http://ws.spotify.com/search/1/artist?q='

		$.getJSON(spotifyArtistApi, {
			format: 'json',
			data: data,
			//the below url add's the artist name that the user enters on the frontend and adds it to the end of api callback url - to look up the specific artist
			url: spotifyArtistApi + 'artistName',
		})
		.done(function(data){
			console.log("json callback done");
			//console returns an error saying that data is not defined
			//callback returns a 400 bad callback error
			console.log(data);
		});
	};

	
	