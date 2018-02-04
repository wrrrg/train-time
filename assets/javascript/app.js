$(document).ready(function() {

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

$("#add-train-input").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim(),
      trainDest = $("#train-dest-input").val().trim(),
      trainStart = $("#train-start-input").val().trim(),
      trainFrequency = $("#train-frequency-input").val().trim();

  // make object of new train
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uplaod train data to firebase
  database.ref().push(newTrain);

  // logs are for the dogs
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Clear out the inputs
  $("#train-name-input").val("");
  $("#train-dest-input").val("");
  $("#first-train-input").val("");
  $("#train-frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(trainFrequency);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainStart + "</td><td>" + trainFrequency + "</td><td>" + "</td></tr>");
})



});
