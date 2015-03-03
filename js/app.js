$(document).foundation();

window.addEventListener('load', function () {
  Notification.requestPermission(function (status) {
    // This allows to use Notification.permission with Chrome/Safari
    if (Notification.permission !== status) {
      Notification.permission = status;
    }
  });
});

var reminderFrequency = 1800000
$('#minutes').change(function(){
	remindersAreSent = false;
	sendReminders()
})
var notificationLoop;

function sendReminders(){

	if (remindersAreSent == false){
		clearInterval(notificationLoop)
		console.log('its false')
	}

	var reminders = new Array(
			"Sit up straight.",
			"Go for a 5 minute walk.",
			"Pull your shoulders back.",
			"Look away from your screen.",
			"Go get a glass of water.",
			"Focus your eyes on something far away.",
			"Look at something across the room.",
			"Take a deep breath.",
			"Close your eyes for a moment."
		);
	var numberOfReminders = reminders.length
	reminderFrequency = 1800000
	
	var notificationLoop = setInterval(function(){	
		var number = Math.floor(Math.random() * numberOfReminders);	
		if (remindersAreSent){
			new Notification(reminders[number])	
			console.log('sent')
		}
		else {
			clearInterval(notificationLoop);
			console.log('timer stopped')
		}		
	}, reminderFrequency)
	

}

function testReminders(){
	new Notification("Look at something across the room.")	
}

function checkReminderStatus(){
	if(remindersAreSent){
		sendReminders()
		$('.remindersOff').fadeOut(250, function(){
			$('.remindersOn').fadeIn(250);
			$('.intervalSettings').removeClass('inactive')
		})
	} else {
		$('.remindersOn').fadeOut(250, function(){
			$('.remindersOff').fadeIn(250);
			$('.intervalSettings').addClass('inactive')
		})
	}
}


var remindersAreSent = false;
$(document).ready(function(){
	// check if reminders are turned on when page is ready
	checkReminderStatus()

	// check status when toggle is clicked
	$('#remindersToggle').click(function(){
		remindersAreSent = !remindersAreSent
		checkReminderStatus()
	})
})






//console.log(Notification.permission)


