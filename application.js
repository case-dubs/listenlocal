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
     	  	
     	  	var eventsLength = skEventsReturned.resultsPage.results.event.length;
     	  	var loopCounter = "";

//TODO: need to add instances for eventsLength = 0 and 1-19

     	  	if (eventsLength > 20){
     	  			loopCounter = 20;
     	  		}else{
     	  			loopCounter = eventsLength;
     	  		}

     	  	console.log("this is loopcounter's value: " + loopCounter);

     	  	for (i = 0; i<loopCounter; i++){

     	  	console.log("counter =" + i);
     	  	console.dir(skEventsReturned.resultsPage.results.event[i]);
     	  	

    	  	var skEventHeadline = skEventsReturned.resultsPage.results.event[i].displayName;
     	  	var skArtistName = skEventsReturned.resultsPage.results.event[i].performance[0].artist.displayName;
     	  	var eventVenue = skEventsReturned.resultsPage.results.event[i].venue.displayName;
     	  	var eventDate = skEventsReturned.resultsPage.results.event[i].start.date;
     	  	var eventTime = skEventsReturned.resultsPage.results.event[i].start.time;
     	  	var eventLocation = skEventsReturned.resultsPage.results.event[i].location.city;
     	  	console.log(skArtistName + " is performing at " + eventVenue + " on " + eventDate + "at " + eventTime);
     	  
     	  	var spotifyArtistApi = "http://ws.spotify.com/search/1/track?q=artist:"+skArtistName;	
			console.log("this is the name of the skArtistName before it goes to spotify: " + skArtistName);
			
			var spotifyID = "";
		
			var getStuff = $.getJSON(spotifyArtistApi, function(stuffReturned) {
				console.log( "in success method for the first API call" );
				console.log("this was retruned from first API call:" + stuffReturned);
			
			//success method for page loading....

			//getting tack information for song we want to play
				var spotifyID = stuffReturned.tracks[0].href;	
				console.log("this is the href returned " + spotifyID);
			
			//creating URI that will be passed to spotify widget
				artistInfo =  "http://ws.spotify.com/lookup/1/?uri=" + spotifyID;
				
				console.log("this is the name of the skArtistName after the spotify calls: " + skArtistName);

				var holderDiv = document.createElement('div');
				//holderDiv.style.height = '800px';
				//holderDiv.style.border = '3px solid black';
				holderDiv.className = 'holderDiv';

				var testButton = document.createElement('iframe');
				testButton.id = "SpotifyButton" + i;
				testButton.class = "spotifyIframe";
				testButton.width = '300';
				testButton.height = '380';
				testButton.frameborder = '0';
				testButton.allowtransparency = 'true';

				holderDiv.appendChild(testButton);
				$('#jsonOutput').before(holderDiv);

				var skEventInfo = document.createElement('div');
				skEventInfo.className= "eventInformation";

				var artistHeader = document.createElement('h2');
				var artistNode = document.createTextNode(skArtistName);

				skEventInfo.appendChild(artistNode);
				console.log("this is the name of the skArtistName: " + skArtistName);
				//PROBLEM! : why is a single div being added to all of the iframes?

				holderDiv.appendChild(skEventInfo);

			//get spoity widget
			//	var firstButton = document.getElementById("SpotifyButton");
			
			//adding SK artist info before spotify widget loads:

	
//				var artistNode = document.createTextNode(skArtistName);

			/*	var date = document.getElementById('eventDate');
				var dateNode = document.createTextNode('Date: '+ eventDate);

				var venue = document.getElementById('eventVenue');
				var venueNode = document.createTextNode('Venue: ' + eventVenue);

				var city = document.getElementById('eventCity');
				var cityNode = document.createTextNode('Location: ' + eventLocation);
			
			//TODO: need to add a function that erases the content in #Basic Details before it's propogated by new content

			//prints the artist and event info on the page above the listen app

			/*	artistHeader.appendChild(artistNode);
				date.appendChild(dateNode);
				venue.appendChild(venueNode);
				city.appendChild(cityNode);*/

			//give widget the URI
				testButton.src = "https://embed.spotify.com/?uri="+spotifyID;
			
			   
			})
     	  }
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
	