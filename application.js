	console.log("document loads!");


	function submit(){
		console.log("Submit button works");
		var artistField = document.getElementById('artistName');
		//artistName is the name that the user enters in the frontend
		var artistName = artistField.value;
		
		/*  ORIGINAL CODE
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
		});*/
		
		
		
		//URL copied form https://developer.spotify.com/technologies/web-api/search/
		var spotifyArtistApi = "http://ws.spotify.com/search/1/artist?q=artist:Bj%C3%B6rk"
		
		// The following code was cute and pasted from "The jqXHR Object" section example of this page http://api.jquery.com/jQuery.getJSON/
		var jqxhr = $.getJSON(spotifyArtistApi, function() {
			console.log( "success from first API attempt" );
		})  
		.done(function(data) {
			console.log( "second success first API attempt" );
			console.dir(data); //this line was added to show what is returned
		  })
		  .fail(function() {
			console.log( "error" );
		  })
		  .always(function() {
			console.log( "complete first API attempt" );
		  });
		 
		// Set another completion function for the request above
		jqxhr.complete(function() {
		  console.log( "second complete first API attempt \n\n\n" );
		});
		
		
		
		
		//this is the same as the example above, just with out all the extra functions
		$.getJSON(spotifyArtistApi, function(data) {
			console.log( "success for the second API attempt" );
			$('#jsonOutput').prepend(data); 
			console.log(data);
				/****** GOING BEYOND WHAT WE TALKED ABOUT *******************
					you can get the part of the object that is retuned
					*/
				var info = data.info
				console.log("following is the info part of object what was returned")
				$('#jsonOutput').prepend(info); 
				console.log( info);
				
			console.log( "END of function called on success for the second API attempt \n\n\n" );
		})  
		
		
		

	};



/*	console.log("document loads!");


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
*/
	
	