document.ready(function() {
  var config = {
    apiKey: "AIzaSyDye5HI5N-2bSbIDODEiX5gnoqVzIH4HQs",
    authDomain: "train-time-c337b.firebaseapp.com",
    databaseURL: "https://train-time-c337b.firebaseio.com",
    projectId: "train-time-c337b",
    storageBucket: "train-time-c337b.appspot.com",
    messagingSenderId: "551217474506"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


// The button to add Trains

$("#add-train-input").on("#click", function(event {
  event.preventDefault();

  var name = $("#train-name-input").val().trim(),
      dest = $("#train-dest-input").val().trim(),
      startTime = moment($("#first-train-input").val().trim(),"HH:mm")
      frequency = $("#train-frequency-input").val().trim();

  // make object of new train
  var newTrain = {
    name: name,
    destination: dest,
    startT: firstTrain,
    frequency: frequency
  };

  // Uplaod train data to firebase
  database.ref().push(newTrain);

  // logs are for the dogs
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);
}));



});
