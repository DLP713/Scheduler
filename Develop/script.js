//Javascript file
 
var $today = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");
 
var toDoItems = [];
// Each object has an hour property and a text property
 
var date = moment().format("dddd, MMMM Do");
var hour = moment().format("H");
 
// Setting up array of objects
function initializeSchedule(){
//  console.log(toDoItems);
 
// For each time block
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
 
    var todoObj = {
      // Set related todo hour to same as data-hour
      hour: thisBlockHr,
      // Get text ready to accept string input
      text: "",
    }
    // Adding todo object to todoitems array
    toDoItems.push(todoObj);
  });
 
  // Saving array of objects to local storage by stringifying it first
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  //console.log(toDoItems);
}
 
// Formats timeblock colors depending on time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
 
      // Adds style to time blocks to show where we are in the day
      if (thisBlockHr == hour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < hour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > hour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}
 
function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);
 
  // Loops through array then assigns the text to the timeBlock with data-hour equal to hour. 
  // Makes a variable where [data-hour={hour}] then plugs it in to the selector $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }
 
  console.log(toDoItems);
}
 
function saveHandler(){
  var $thisBlock = $(this).parent();
 
  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();
 
  // Sees which item needs to updated based on the hour of the button clicked matching
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}
 
// when the document loads
$(document).ready(function(){
 
  // Formats the timeblocks depending on time
  setUpTimeBlocks();
  // If there's nothing for the todos in local storage
  if(!localStorage.getItem("todos")){
    // Initializes the array of objects
    initializeSchedule();
  } // Otherwise it will not format because we get it from local storage
 
  // Displays current date
  $today.text(date);
 
  // Renders schedule from local storage
  renderSchedule();
  // When a todo item save button is clicked, save it
  $scheduleArea.on("click", "button", saveHandler);
  
});
