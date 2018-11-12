// code to read and set any environment variables with the dotenv package

require("dotenv").config();

// Take user command and input and store as variables
    const command = process.argv[2]
    // Allows for spaces in input
    const input = process.argv.slice(3).join(" ")



// All the requirements
var Spotify = require('node-spotify-api');  
var request = require("request");
var fs = require("fs");
var moment = require('moment');
    moment().format();

    // the code required to import the `keys.js` file and stored in a variable.
    var keys = require('./keys.js');

        // accesses keys information
    
    var spotify = new Spotify(keys.spotify);

// Switch case for taking in user input and outputting proper function (( listed below this ))
switch (command) {
    case 'spotify-this-song':
            spotThat();
        break;
    case 'concert-this':
            concertMeOneMoreTime();
        break;
    case 'movie-this':
            movieTime();
        break;

    case 'do-what-it-says':

        break;

    default:
        break;
}

// Function for Spotify
    function spotThat(){
        spotify.search({ type: 'track', query: input, limit: 3 }, function(err, data) {
            if (err) {
              return console.log('Spotify Error occurred: ' + err);
                     }
           // output Artists, song's name, a preview link of the song from spotify, the album that the song is from
           
           for(let i = 0; i < data.tracks.items.length; i++){
           console.log("Artist: ", data.tracks.items[i].artists[0].name); 
           console.log("Song Name: ", data.tracks.items[i].name); 
           console.log("Album Title: ", data.tracks.items[i].album.name); 
           console.log("Preview Link: ", data.tracks.items[i].artists[0].external_urls.spotify , "\n"); 
                                                            }
        });
    }
// Function for Bands in Town
    function concertMeOneMoreTime(){
            let searchURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

            request(searchURL, function(error, response, data){
                if (!error && response.statusCode === 200) {

                    console.log(JSON.parse(data)[0].datetime);
                    console.log(moment(JSON.parse(data)[0].datetime).toObject();)
                    // for(let i =0; i < data.length; i++){
                    //     console.log(data)[i]
                    // }

                }




                else{
                    console.log("ERROR BABY");
                }


            })

    }















 // Function for OMDB
function movieTime(){
    if(input)   {  
        
        let queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body)   {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200)  {
          
              
              console.log("Title: ", JSON.parse(body).Title);
              console.log("Date Released: ", JSON.parse(body).Released);
              console.log("IMDB Rating: ", JSON.parse(body).imdbRating);
              console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
              console.log("Produced in : ", JSON.parse(body).Country);
              console.log("Languaged in : ", JSON.parse(body).Language);
              console.log("Plot Synopsis : ", JSON.parse(body).Plot);
              console.log("Starring : ", JSON.parse(body).Actors);

                                                        }
                                                            }
                );



        
                }
    else{



        console.log( "Well how about this then?");
        request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {


                //Console: * Title of the movie * Year the movie came out. * IMDB Rating of the movie. * Rotten Tomatoes Rating of the movie. * Country where the movie was produced. * Language of the movie. * Plot of the movie. * Actors in the movie.

                console.log("Title: ", JSON.parse(body).Title);
                console.log("Date Released: ", JSON.parse(body).Released);
                console.log("IMDB Rating: ", JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
                console.log("Produced in : ", JSON.parse(body).Country);
                console.log("Languaged in : ", JSON.parse(body).Language);
                console.log("Plot Synopsis : ", JSON.parse(body).Plot);
                console.log("Starring : ", JSON.parse(body).Actors);          
              
              
            }
          });




    }


}



    
//Function for random shit