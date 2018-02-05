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

// Show current time as of page load
  var timeRightNow = moment();
  $("#current-time").text((moment(timeRightNow).format("HH:mm")));


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

//  Snapshot
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

  // Let's do some Math

  var currentTime = moment();
  console.log("This is the moment js time: " + moment(currentTime).format("HH:mm"));

  var startConvert = moment(trainStart, "HH:mm").subtract(1, "years");
  console.log("This is the start time through moment.js: " + moment(startConvert).format("HH:mm"));

  var diffTime = moment().diff(moment(startConvert), "minutes");
  console.log("Difference between these: " + diffTime);

  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  var tMinutesTilTrain = trainFrequency - tRemainder;
  console.log("Minutes until train: " + tMinutesTilTrain);

  var nextTrain = moment().add(tMinutesTilTrain, "minutes");
  console.log("Next Train Arrives at: " + moment(nextTrain).format("HH:mm"));



  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td class='t-dest'>" + trainDest + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTilTrain + "</td></tr>");
});

convertMilitaryToMinutes = function(time){
  var minutes = (time.hour()*60) + time.minute();
  return minutes
};

// getMomentFromString = function(str){
//   var t = moment(str, 'HH:MM a');
//   return t;
// };



});
