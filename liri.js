// code to read and set any environment variables with the dotenv package

require("dotenv").config();

// Take user command and input and store as variables
    var command = process.argv[2]
    // Allows for spaces in input
    var input = process.argv.slice(3).join(" ")



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
var picky = function annoyingWorkAround(arg1, arg2){
switch (arg1) {
    case 'spotify-this-song':
            spotThat(arg2);
        break;
    case 'concert-this':
            concertMeOneMoreTime(arg2);
        break;
    case 'movie-this':
            movieTime(arg2);
        break;

    case 'do-what-it-says':
            doSomethingRandom();
        break;

    default:
            console.log("LIRI DOESN'T DO THAT")
        break;
}
}




// Function for Spotify
    function spotThat(cb){
        spotify.search({ type: 'track', query: cb, limit: 3 }, function(err, data) {
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
    function concertMeOneMoreTime(cb){
            let searchURL = "https://rest.bandsintown.com/artists/" + cb + "/events?app_id=codingbootcamp"

            request(searchURL, function(error, response, data){
                if (!error && response.statusCode === 200) {

                let arrayOfShows =   JSON.parse(data);
                    for(let x = 0; x < arrayOfShows.length; x++){
                        
                        // Reformat date using moment
                        let mmddyyyy = moment(JSON.parse(data)[x].datetime).toObject();
                        
                        console.log("Venue: ", arrayOfShows[x].venue.name);
                        console.log("Location: ", arrayOfShows[x].venue.city, ", ", arrayOfShows[x].venue.country);
                        console.log("Date (MM-DD-YYYY): " ,mmddyyyy.months,'-',mmddyyyy.date,'-',mmddyyyy.years, "\n");





                        
                    }

                }




                else{
                    console.log("ERROR BABY");
                }


            })

    }







 // Function for OMDB
function movieTime(cb){
    if(input)   {  
        
        let queryUrl = "http://www.omdbapi.com/?t=" + cb + "&y=&plot=short&apikey=trilogy";

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



    
//Function for random shit.txt

function doSomethingRandom(){
fs.readFile("random.txt", "utf8", function(error, data) {
    
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then turn the text into an argument to be passed in the command line
    var dataArr = data.split(',');
    if(dataArr.length==2){
        picky(dataArr[0], dataArr[1]);
    } else if(dataArr.length==1){
        picky(dataArr[0]);
    };

    

})};

var runTheWholeThing = function(argOne, argTwo){
    picky(argOne,argTwo)
};

runTheWholeThing(command, input);
