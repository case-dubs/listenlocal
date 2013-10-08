	console.log("document loads!");

	/*  
		
			this link came up when I typed in "spotify api"
		http://stackoverflow.com/questions/14055609/get-my-current-playlist-with-rest-api-in-spotify
		
		it took me to this link
		https://developer.spotify.com/technologies/widgets/spotify-play-button/
		
		
		I think you want the user input an artist then get a song that artist does
		In terms of the API that would be 
			1. get artist from user
			2. search for tracks associated with that artist
			3. play one of the tracks
		
		SONGKICK API KEY: 35THAG0Bg0dhRmSN

		*/

	var songkickKEY = "35THAG0Bg0dhRmSN";
	var geocoder;

	function initialize() {
  		geocoder = new google.maps.Geocoder();
	}


	function codeAddress() {
 		var address = document.getElementById('zipCode').value;
  		geocoder.geocode( { 'address': address}, function(results, status) {
   		if (status == google.maps.GeocoderStatus.OK) {
	  	console.dir(results);
     	 var latitude = results[0].geometry.location.lb;
     	 var longitude = results[0].geometry.location.mb;
     	  console.log("your latitude is: " + latitude + " your longitude is: " + longitude);

     	  skEventSearchAPI = "http://api.songkick.com/api/3.0/events.json?location=geo:" + latitude + 
     	  ","+ longitude + "&apikey=" + songkickKEY + "&jsoncallback=?";
     	  
     	  $.getJSON(skEventSearchAPI, function(skEventsReturned){
     	  	console.log("this was returned from the SK API call: ");
     	  	console.dir(skEventsReturned);
     	  	var skEventHeadline = skEventsReturned.resultsPage.results.event[0].displayName;
     	  	var skArtistName = skEventsReturned.resultsPage.results.event[0].performance[0].artist.displayName;
     	  	var eventVenue = skEventsReturned.resultsPage.results.event[0].venue.displayName;
     	  	var eventDate = skEventsReturned.resultsPage.results.event[0].start.date;
     	  	var eventTime = skEventsReturned.resultsPage.results.event[0].start.time;
     	  	console.log(skArtistName + " is performing at " + eventVenue + " on " + eventDate + "at " + eventTime);
     	  
     	  	var spotifyArtistApi = "http://ws.spotify.com/search/1/track?q=artist:"+skArtistName	
		
			var spotifyID = "";
		
	
		
			var getStuff = $.getJSON(spotifyArtistApi, function(stuffReturned) {
				console.log( "in success method for the first API call" );
				console.log("this was retruned from first API call:" + stuffReturned);
			
			//getting tack information for song we want to play
				var spotifyID = stuffReturned.tracks[0].href;	
				console.log("this is the href returned " + spotifyID);
			
			//creating URI that will be passed to spotify widget
				artistInfo =  "http://ws.spotify.com/lookup/1/?uri=" + spotifyID;
				
			//get spoity widget
				var firstButton = document.getElementById("firstSpotifyButton");
			
			//adding SK artist info before spotify widget loads:

				var artistHeader = document.getElementById('artistName');
				var artistNode = document.createTextNode(skArtistName);

				var date = document.getElementById('eventDate');
				var dateNode = document.createTextNode('Date: '+ eventDate);

				var venue = document.getElementById('eventVenue');
				var venueNode = document.createTextNode('Venue: ' + eventVenue);

			//prints the artist and event info on the page above the listen app
				artistHeader.appendChild(artistNode);
				date.appendChild(dateNode);
				venue.appendChild(venueNode);

			//give widget the URI
				firstButton.src = "https://embed.spotify.com/?uri="+spotifyID;
			
			   
			})
     	  });


    	} else {
    	alert('Geocode was not successful for the following reason: ' + status);
   		}
 	 });
	}

google.maps.event.addDomListener(window, 'load', initialize);
		
	function submit(){
		console.log("Submit button works");
		
		//artistName is the name that the user enters in the front end
		var artistField = document.getElementById('artistName');
		var artistName = artistField.value;
		console.log("artist name is " + artistName);
		
		
		//this URI returns all tracks associated with a certain artist (artistName)
		var spotifyArtistApi = "http://ws.spotify.com/search/1/track?q=artist:"+artistName	
		
		var spotifyID = "";
		
	
		
		var getStuff = $.getJSON(spotifyArtistApi, function(stuffReturned) {
			console.log( "in success method for the first API call" );
			console.log("this was retruned from first API call:" + stuffReturned);
			
			//getting tack information for song we want to play
			var spotifyID = stuffReturned.tracks[0].href;	
			console.log("this is the href returned " + spotifyID);
			
			//creating URI that will be passed to spotify widget
			artistInfo =  "http://ws.spotify.com/lookup/1/?uri=" + spotifyID;
				
			//get spoity widget
			var firstButton = document.getElementById("firstSpotifyButton");
			
			//give widget the URI
			firstButton.src = "https://embed.spotify.com/?uri="+spotifyID;
			
			  
		})
		

	};

	/*
		obviously this code is not done. How do you know you have the correct artist? How do you know you have the correct song? 
	*/
	