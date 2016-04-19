var MIN_LENGTH = 2;

$( document ).ready(function() {
var timeArray = [];
$('#calendar').fullCalendar({
			header: {
				left: false,
				center: false,
				right: false
			},
			minTime: "08:00:00",
			maxTime: "18:00:00",
			defaultView: 'agendaWeek',
			allDaySlot : false,
			slotDuration: "00:20:00",
			
			editable: false,
			eventLimit: true, // allow "more" link when too many events,
        eventRender: function(event, element) {
            element.find('.fc-title').append("<br/>" + event.description + "<br>" + event.classroom); 
            
        },
        eventClick: function(calEvent, jsEvent, view)
        {
            var r=confirm("Delete " + calEvent.title);
            if (r===true)
              {
              		var classnum = calEvent.description;
              		var rows = $('table tr').filter(":contains('"+classnum+"')");
              		rows.removeClass("btn-success");

                  $('#calendar').fullCalendar('removeEvents', calEvent._id);

              }
        }
    });
		




	$("#keyword").keyup(function() {
		var keyword = $("#keyword").val();
		if (keyword.length >= MIN_LENGTH) {
			$.get( "auto-complete.php", { keyword: keyword } )
			.done(function( data ) {
				$('#results').html('');
				var results = jQuery.parseJSON(data);
				results = results.slice(0, 10);
				$(results).each(function(key, value) {
					$('#results').append('<div class="item"><div class="rawName">' + value['course_name'] + ' </div><span class="course_code">'+value['course_code']+'</span></div>');
					
				})

			    $('.item').click(function() {
			    	var text = $(this).find('.rawName').html();
			    
			    	$('#keyword').val(text);
			    	$('.classTable').html('<table class="table"> <thead> <tr> <th> Instructor </th> <th> Time </th> <th> Room </th> <th> Class # </th> </tr> </thead> <tbody id = "main"></tbody></table>');
				$('.classTable2').html('<table class="table"> <thead> <tr> <th> Instructor </th> <th> Time </th> <th> Room </th> <th> Class # </th> </tr> </thead> <tbody id = "main2"></tbody></table>');
			    	var clickedcourse;
				for(i = 0; i< results.length; i++){

					if (text.indexOf(results[i]['course_name']) >= 0){
						clickedcourse = results[i]['course_name'];
						$("#desc").html("<b>Course Description</b><br>"+ results[i]['course_description']);
						if (results[i]['course_requisite'].length > 0){
						$("#desc").append("<br><br><b>Course Requisites</b><br>"+ results[i]['course_requisite']);
						}
						var profs = results[i]['course_instructors'];
						var rooms = results[i]['course_rooms'];
						var times = results[i]['course_timings'];
						var classes = results[i]['class_numbers'];

						for (var x in profs){

							//console.log(profs[x]);
							$('#main').append('<tr data-times="'+times[x]+'"> <td> '+profs[x]+' </td> <td> '+times[x]+' </td> <td> '+rooms[x]+' </td> <td> '+classes[x]+' </td> </tr>');
						}
					}
				}


				$('.table tbody tr').click( function () {

					timeArray = $('#calendar').fullCalendar('clientEvents');
					console.log(timeArray);
				    var fullCourseDay = $(this).find('td:eq(1)').text();
				    var classNum = $(this).find('td:eq(3)').text();
				    var classroom = $(this).find('td:eq(2)').text();
				    var day;
				    var time;


				    if(fullCourseDay.indexOf("Su ") >= 0){
				    	day = 0;
				    	time = fullCourseDay.replace("Su ", "");
				    } else if(fullCourseDay.indexOf("Mo ") >= 0){
				    	day = 1;
				    	time = fullCourseDay.replace("Mo ", "");
				    } else if(fullCourseDay.indexOf("Tu ") >= 0){
				    	day = 2;
				    	time = fullCourseDay.replace("Tu ", "");
				    } else if(fullCourseDay.indexOf("We ") >= 0){
				    	day = 3;
				    	time = fullCourseDay.replace("We ", "");
				    } else if(fullCourseDay.indexOf("Th ") >= 0){
				    	day = 4;
				    	time = fullCourseDay.replace("Th ", "");
				    } else if(fullCourseDay.indexOf("Fr ") >= 0){
				    	day = 5;
				    	time = fullCourseDay.replace("Fr ", "");
				    } else if(fullCourseDay.indexOf("Sa ") >= 0){
				    	day = 6;
				    	time = fullCourseDay.replace("Sa ", "");
				    }
					var date = moment(moment().day(day)).format("YYYY-MM-DD");
					var timeArr = time.split(" - ");
					var timeStart = timeArr[0];
					var timeEnd = timeArr[1];
					timeStart = formatTime(timeStart);
					timeEnd = formatTime(timeEnd);
										
					var timeStringStart = date + "T" + timeStart + ":00";
					var timeStringEnd = date + "T" + timeEnd + ":00";
					timeObj = {};
					timeObj['title'] = clickedcourse;
					timeObj['start'] = timeStringStart;
					timeObj['end']   = timeStringEnd;
					timeObj['description'] =  classNum;
					timeObj['classroom'] = classroom;

					var overlapping = false;

					for (var x in timeArray){
						var startTimeArr = timeArray[x]['start']["_i"].split("T");
						var startTime = startTimeArr[1];
						var endTimeArr =   timeArray[x]['end']["_i"].split("T");
						var endTime = endTimeArr[1];

						var dateOfNewObject = startTimeArr[0];
						var dateOfOldObject = date;


						startTime = startTime.substring(0, startTime.indexOf(':'));
						startTime = startTime.replace(":", "");

						endTime = endTime.substring(0, endTime.indexOf(':'));
						endTime = endTime.replace(":", "");

						startTime = startTime.replace(/\b0+/g, '');
						endTime = endTime.replace(/\b0+/g, '');


						var currentStartTime = timeStart;
						currentStartTimeArr = currentStartTime.substr(currentStartTime.indexOf("T") + 1);
						currentStartTime = currentStartTime.substring(0, currentStartTime.indexOf(":"));
						currentStartTime = currentStartTime.replace(":", "");
						currentStartTime = currentStartTime.replace(/\b0+/g, '');

						var currentEndTime = timeEnd;
						currentEndTimeArr = currentEndTime.substr(currentEndTime.indexOf("T") + 1);
						currentEndTime = currentEndTime.substring(0, currentEndTime.indexOf(":"));
						currentEndTime = currentEndTime.replace(":", "");
						currentEndTime = currentEndTime.replace(/\b0+/g, '');
						//console.log(startTime);
						startTime = parseInt(startTime);
						endTime = parseInt(endTime);
						currentStartTime = parseInt(currentStartTime);
						currentEndTime = parseInt(currentEndTime);

						if ((currentStartTime >= startTime && currentStartTime < endTime && dateOfOldObject == dateOfNewObject) ||(currentStartTime < startTime && currentEndTime <= endTime && currentEndTime > startTime && dateOfOldObject == dateOfNewObject)){
							overlapping = true;

						}
					}

					if (!overlapping){
					//timeArray.push(timeObj);
					$('#calendar').fullCalendar( 'renderEvent', timeObj );
					$('#main2').append('<tr> <td> '+'x'+' </td> <td> '+fullCourseDay+' </td> <td> '+classroom+' </td> <td> '+classNum+' </td> </tr>');
					$(this).addClass("btn-success");
					//setCalendar(timeArray);
					//console.log(timeArray);
					}
					
				} );
					
			    	
			    })

			});
		} else {
			$('#results').html('');
		}
	});

    $("#keyword").blur(function(){
    		$("#results").fadeOut(500);
    	})
        .focus(function() {		
    	    $("#results").show();
    	});

});



 

function formatTime(timeStart){
	timeStart = timeStart.trim();
						if (timeStart.indexOf("AM") >= 0){
						timeStart = timeStart.replace("AM", "");
						if (timeStart.length == 4){
							timeStart = "0" + timeStart.trim();
						}
					} else if (timeStart.indexOf("PM") >= 0){
						timeStart = timeStart.replace("PM", "");
						if (timeStart.length == 4){
							var firstDigit = timeStart.charAt(0);
							//(firstDigit);
							firstDigit = parseInt(firstDigit);
							firstDigit += 12;
							firstDigit = firstDigit.toString();
							timeStart = timeStart.replace(timeStart.charAt(0), firstDigit);
						}// } else if (timeStart.length == 6){
						// 	var digit = timeStart.trim().substring(0, 2);
						// 	digit = parseInt(digit);
						// 	digit += 12;
						// 	digit = digit.toString();
						// 	timeStart = timeStart.replace(timeStart.trim().substring(0, 2), digit);
						// }
					}

					return timeStart;
}