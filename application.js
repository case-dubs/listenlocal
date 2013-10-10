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
		document.getElementById('heroMessage').style.display = 'none';
		document.getElementById("loadingMessage").style.display = 'block';
 		var address = document.getElementById('zipCode').value;
  		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.dir(results);
						 var latitude = results[0].geometry.location.lb;
						 var longitude = results[0].geometry.location.mb;
						  //console.log("your latitude is: " + latitude + " your longitude is: " + longitude);

						  skEventSearchAPI = "http://api.songkick.com/api/3.0/events.json?location=geo:" + latitude + 
						  ","+ longitude + "&apikey=" + songkickKEY + "&jsoncallback=?";
						  
						  $.getJSON(skEventSearchAPI, function(skEventsReturned){
								console.log("this was returned from the SK API call: ");
								//console.dir(skEventsReturned);
							
								var eventsLength = skEventsReturned.resultsPage.results.event.length;
								var loopCounter = "";

								//TODO: need to add instances for eventsLength = 0 and 1-19

								/*if (eventsLength > 20){
										loopCounter = 20;
									}else{
										loopCounter = eventsLength;
									};*/

								//Testing pagination plug in...

								loopCounter = eventsLength;
							

								//console.log("this is loopcounter's value: " + loopCounter);

								for (i = 0; i<loopCounter; i++){

									console.log("counter =" + i);
									//console.dir(skEventsReturned.resultsPage.results.event[i]);
									

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
						

									$.ajax({
										type: 'GET',
										url: spotifyArtistApi,
										dataType: 'json',
										success: function(stuffReturned) {
											console.log("this is i value on line 79:" + i);
											//console.log( "in success method for the first API call" );
											//console.log("this was retruned from first API call:" + stuffReturned);
											console.dir(stuffReturned);
							
											//success method for page loading....

											//getting tack information for song we want to play
											if (stuffReturned.tracks.length > 0){
								

												var spotifyID = stuffReturned.tracks[0].href;	
												console.log("this is the href returned " + spotifyID);
									
												//creating URI that will be passed to spotify widget
												artistInfo =  "http://ws.spotify.com/lookup/1/?uri=" + spotifyID;
												console.log("this is i value on line 95:" + i);
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
												//PROBLEM! : why is a single div being added to all of the iframes?

												var skEventInfo = document.createElement('div');
												skEventInfo.className= "eventInformation";

												//TODO: need to figure out how to make artistNode a hyperlink to the artist's spotify url
												var artistHeader = document.createElement('h2');
												var artistNode = document.createTextNode(skArtistName);
												
												
												//console.log("this is the name of the skArtistName: " + skArtistName);


												var skEventDate = document.createElement('h3');
												var dateNode = document.createTextNode("Date: " + eventDate);


												var skEventVenue = document.createElement('h3');
												var venueNode = document.createTextNode("Venue: " + eventVenue);
												
												var skEventLocation = document.createElement('h3');
												var cityNode = document.createTextNode("Location: " + eventLocation);
												
												var buyTickets = document.createElement('h3');
												buyTickets.className = "buyTickets";
												var ticketsNode = document.createTextNode("Buy Tickets");

												skEventInfo.appendChild(artistNode);
												skEventInfo.appendChild(dateNode);
												skEventInfo.appendChild(venueNode)
												skEventInfo.appendChild(cityNode);
												skEventInfo.appendChild(ticketsNode);

												holderDiv.appendChild(skEventInfo);

												//TODO: need to figure out how to make this a hyperlink to the songkick url for the event

												
												//give widget the URI

												testButton.src = "https://embed.spotify.com/?uri="+spotifyID;

												$(function() {
   													$('#pagination').pagination({
     												items: i,
      												itemsOnPage: 25,
        											cssStyle: 'dark-theme'
   		 											});
												});
											} //end of...if (stuffReturned.tracks.length > 0)		
							   
									}, //end of success
									data: {},
									async: false
								});//ajax
							}//for loop
						}); //getJson
			}//if (status == google.maps....
		})//geocoder.geocode
		//document.getElementById("loadingMessage").style.display='none';
	};//end  function codeAddress
	
	//attempt to make the loading message disapear once the results from the query are loaded	
	document.getElementById("loadingMessage").style.display = 'none';
	document.getElementById('heroMessage').style.display = 'inline-block';
	
  

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
	