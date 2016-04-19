
function resetCookie(){
	document.cookie = "";
}

$(document).ready(function () {
$.fn.ignore = function(sel){
  return this.clone().find(sel||">*").remove().end();
};
	//VARS
	var time;
	var req = null;
	var lastClicked;
	var course = {};
	var day;
	var lettersToCheck = ["s", "u", "m", "t", "w", "a", "o", "r", "h", "e", "f", "p"];
	//VARS
$("#results").css("display", "none");
$("#info").css("display", "none");
$(".sidebar2").css("display", "none");
readCookie();



function getRate(name){
	var newname = name.replace(" ", "+");
	var URL = encodeURI("assets/php/getUrl.php?prof=" + newname);
	$.ajax({
	    type: "GET",
	    url: URL,
	    success: function(data){
	        getRating(data, name);
	    }
	});
}


function getRating(pUrl, name){
//console.log(pUrl);
$.ajax({
    type: "GET",
    url: 'assets/php/getRating.php?url=' + pUrl,
    success: function(data){
       // alert(data);
       var allData = JSON.parse(data);
       var grade = allData[0];
       var helpfulness = allData[1];
       var clarity = allData[2];
       var easiness = allData[3];
       helpfulness = helpfulness.replace("Helpfulness", "");
       clarity = helpfulness.replace("Clarity", "");
       easiness = helpfulness.replace("Easiness", "");
       //console.log("Doing ajax for " + name);
       // console.log(helpfulness);
       // console.log(clarity);
       // console.log(easiness);
       //console.log("************************************");
       //console.log(name + " : " + grade);
       var gradeClass;
       if (grade.indexOf("A") >= 0 && grade != "N/A"){
       	gradeClass = "gradeA";
      } else if (grade.indexOf("B") >= 0){
       	gradeClass = "gradeB";
	} else if (grade.indexOf("C") >= 0){
		gradeClass = "gradeC";
		} else if (grade.indexOf("D") >= 0){
       	gradeClass = "gradeD";
       } else {
       	gradeClass = "gradeNone";
       }

       if (grade == ""){
       	grade = "N/A";
       }
       $('.table tr').each(function(){
		    $(this).find('td').each(function(){
		        //do your stuff, you can use $(this) to get current cell
		        var text= $(this).text();
		        var newColumn =  $(this).closest('tr').find('td:eq(2)');
		        //console.log($(this).html());
		        $("img:last-child").remove();
		        if (text.indexOf(name) >= 0 && text.indexOf(grade) == -1){
		        	clarity = clarity.trim();
		        	easiness = easiness.trim();
		        	helpfulness = helpfulness.trim();
		        	if (grade == "N/A"){
		        		
		        		newColumn.html('Rating: <span style="color:#B6282C">N/A</span>');
		        	} else {
		        	newColumn.html('<span class="glyphicon glyphicon-chevron-down" id="toggleRatingsButton"></span>&nbsp;&nbsp;Rating: <a target="_blank" href="'+pUrl+'"><span class="linkTable gradeCircle '+gradeClass+'">'+grade+'</span></a><div id ="toggleRatings" style="display:none;">Easiness: <span class="easiness" style="background: '+checkColor(easiness)+';">' + easiness + '</span><br>Clarity: <span class="clarity" style="background: '+checkColor(clarity)+';">' + clarity + '</span><br>Helpful: <span class="helpfulness"  style="background: '+checkColor(helpfulness)+';">' + helpfulness + '</span></div>');
		        	}
		        	//$(".helpfulness").css("background", checkColor(helpfulness));
		        	//$(this).find(".col-md-4").append('<a target="_blank" href="'+pUrl+'"><span class=rating>'+grade+'</span></a>');
		        	$(this).find("span").addClass(gradeClass);

		        }
		    })
		})
	}
});

}


$(document).on("click", "#toggleRatingsButton", function(){
  $(this).siblings('div').toggle("show");
})


function checkColor(factor){

	factor = parseFloat(factor);
	//console.log(factor);
	if (factor <= 1.5){
		return '#cf3636!important';
	} else if (factor > 1.5 && factor < 3.0){
		return '#cf8236!important';
	} else if (factor >= 3 && factor < 4.0){
		return '#cfcf36!important';
		//console.log('this');
	} else if (factor >= 4.0){
		return '#B2CF36!important';
	}

}
		var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
    
        $('#calendar').fullCalendar({
            header: {
				left: false,
				center: false,
				right: false
			},
			minTime: "08:00:00",
			timeFormat: "h:mm A",
			maxTime: "22:00:00",
			defaultView: 'agendaWeek',
			allDaySlot : false,
			slotDuration: "00:30:00",
			axisFormat: 'h:mm A',
			columnFormat: 'dddd \n MMM DD',
			//contentHeight: "auto",
			height: "auto",
			aspectRatio: 2.27,
			editable: false,
			eventRender: function(event, element) {
            element.find('.fc-title').html("<br/><br>" + event.code + "<br/><br/>" + event.classroom + "<br/><span style='display: none;'>" + event.classNumber + "</span>");
     		//$(element).tooltip({title: event.title + "<br><br>" + event.code + "<br><br>" + event.classroom + "<br><br>" + event.instructor, html:true});
        	},
        	eventMouseover: function(event, jsEvent, view){
        		var listItems = $(".list-group li");
        		console.log(listItems.length);
				for (x=0; x<listItems.length; x++){
				    var product = $(listItems[x]);
				    console.log(product);
				    console.log(x);
				   
				   console.log(product.find('div').data('id'));
				   if (product.find('div').data('id') == event.id){
				     product.find('div').css("background-color", "#7daccf");
				   }
				    // var product2 = product.find('div').attr('data-id');
				    // if (product2.indexOf(event.id) >= 0){
				    // 	product.find("div").css("background-color", "#7daccf");
				    //}
				};
        	},
        	eventMouseout: function(event, jsEvent, view){
        		var listItems = $(".list-group li");
        		console.log(listItems.length);
				for (x=0; x<listItems.length; x++){
				    var product = $(listItems[x]);
				    console.log(product);
				    console.log(x);
				   
				   console.log(product.find('div').data('id'));
				   if (product.find('div').data('id') == event.id){
				     product.find('div').css("background-color", "#2980b9");
				   }
				    // var product2 = product.find('div').attr('data-id');
				    // if (product2.indexOf(event.id) >= 0){
				    // 	product.find("div").css("background-color", "#7daccf");
				    //}
				};
        	}
        });






$(document).on('click', '.delete-item', function(e){
	//$(this).parent().tooltip('hide');
	$(this).parent().remove();
	e.stopPropagation();

	$("#calendar").fullCalendar( 'removeEvents', $(this).parent().data('id'));
	writeCookie();
	//lastClicked.click();
});

$(document).on('click', '.course-list-item', function(){

  
  setSearch($(this).data('id'));
  
});

$(document).on('mouseenter', '.course-list-item', function(){
	var id = $(this).data('id');
	var allEvents = $("#calendar").fullCalendar('clientEvents');
				var instructor = [];
			var classroom = [];
	for (var x in allEvents){
		if (allEvents[x].id == id){
			instructor.push(allEvents[x].instructor);
			classroom.push(allEvents[x].classroom);
		}

	}
		// if (instructor.length > 1){
		// 	$(this).tooltip({title: classroom[0] + ", " + classroom[1] +'<br>'+instructor[0] + ", " + instructor[1] , placement: "right", html: true});
		// } else {
		// 	$(this).tooltip({title: classroom+'<br>'+instructor, placement: "right", html: true});
		// }


		$(this).find('.delete-item').css("display", "block");

	var id = $(this).data('id');
	var all = $(".fc-title").map(function(){
		if (this.innerHTML.indexOf(id) >= 0){
		  console.log("Find it");
			$(this).parent().parent().css('background-color', "#FADC00");
			$(this).parent().parent().css('border-color', "#478ABB");
		}
	});
})



$(document).on('mouseleave', '.course-list-item', function(){
	var id = $(this).data('id');

	$(this).find('.delete-item').css("display", "none");
	var all = $(".fc-title").map(function(){
		if (this.innerHTML.indexOf(id) >= 0){
			$(this).parent().parent().css('background-color', "");
			$(this).parent().parent().css('border-color', "");
		}
	});
})



$(document).on('click', '.fc-bg', function(){
	var code = $(this).prev().find(".fc-title").text();
	var thisName =
	code = code.substr(0, 7);
	setSearch(code);
});

$(document).on('click', '.fc-content', function(){
	var code = $(this).find(".fc-title").text();
	code = code.substr(0, 7);
	setSearch(code);
});

function setSearch(txt){
	$("#searchQuery").val(txt);
	$("#searchQuery").keyup();
	$("#info").css('display', 'none');
	$(".sidebar2").css("display", "none");
}




$("#searchQuery").click(function(){
	lastClicked.click();

	$("#results").css("display", "block");
})


$("#searchQuery").keyup(function(e){
var code = e.keyCode || e.which;
  if (code == 13) {
    e.preventDefault();
    return false;
  }

  if ($("#searchQuery").val().trim().length == 0){
  	$("#loader").html('<i class="glyphicon glyphicon-search form-control-feedback"></i>');
  } else {
  	 $("#loader").html('<img src="/assets/images/default.gif" />');
  }

 

	$(".containerForResults").css("display", "block");
	if ($("#searchQuery").html == "" || $("#searchQuery").val().length < 1){
		$("#results").css("display", "none");
		$("#info").css("display", "none");
		$(".sidebar2").css("display", "none");
	} else { $("#results").css("display", "block");	}


		if (req != null){
		req.abort();
		}
	var keyword = $("#searchQuery").val();
		if (keyword.length >= 1) {
				req = $.get( "assets/php/auto-complete.php", { keyword: keyword } )
			.done(function( data ) {
				$("#loader").html('<i class="glyphicon glyphicon-search form-control-feedback"></i>');
				req = null;
				$(window).trigger("resize");
				$('#results').html('');
				var results = jQuery.parseJSON(data);
				if (results.length == 0){
					$('#results').append('<div id="nothingFound">No courses found!<br><a href="#" id="bugLink" data-toggle="modal" data-target="#myModal2">Report a bug here.</a></div><div id="closeSearch" class="glyphicon glyphicon-remove"></div>');
					$(".sidebar2").css("display", "none");
				} else {
				results = results.slice(0, 10);
				$(results).each(function(key, value) {
					var new_course_code = value['course_code'].replace(" -", "");
					$('#results').append('<div class="item" data-description="'+value['course_description']+'" data-name="'+value['course_name']+'" data-code="'+new_course_code+'" data-requisite="'+value['course_requisite']+'" data-instructor="'+value['course_instructors']+'" data-timings="'+value['course_timings']+'" data-classnumbers="'+value['class_numbers']+'" data-classrooms="'+value['course_rooms']+'"><div class="rawName">' + new_course_code + ": " + value['course_name'] + ' </div></div>');
					
				});
				$('#results').append('<div id="closeSearch" class="glyphicon glyphicon-remove"></div><div class="disclaimer">Disclaimer: Professor ratings are extracted from an external website and may be inaccurate and do not reflect RyPlanner\'s opinions on certain professors.</div>');
			}
			})
	
		}
});



$(document).on('click', '.item', function(){
	////console.log("Clicked " + lastClicked);
	var item = $(this);
	lastClicked = $(this);
	var info = $("#info");
	info.html('');
	
	course.courseName = item.attr("data-name");
	course.courseCode = item.attr("data-code");
	course.courseDescription = item.attr("data-description");
	course.courseRequisite = item.attr("data-requisite");
	course.courseInstructors = item.attr("data-instructor").split(",");
	course.courseTimings = item.attr("data-timings").split(",");
	course.classNumbers = item.attr("data-classnumbers").split(",");
	course.classrooms = item.attr("data-classrooms").split(",");

	setupSidePanel(course, info);
	setupTable(course, info);
	
	//info.append('<br><br><table class="table table-striped table-bordered table-hover"> <thead> <tr> <th>#</th> <th>Instructor</th> <th>Timings</th> <th>Classroom</th> </tr> </thead> <tbody> <tr> <th scope="row">1</th> <td>Mark</td> <td>Otto</td> <td>@mdo</td> </tr> <tr> <th scope="row">2</th> <td>Jacob</td> <td>Thornton</td> <td>@fat</td> </tr> <tr> <th scope="row">3</th> <td>Larry</td> <td>the Bird</td> <td>@twitter</td> </tr> </tbody> </table>');
	
})

function setupSidePanel(course, info){
	info.css("height", $("#results").height() + 3);
	if (info.css("display") != "block"){
		info.css("display", "block");
		$(".sidebar2").css("left", "0px");
		$(".sidebar2").animate({left: '300px'});
	}
	
	
	$(".sidebar2").css("display", "block");
	info.append('<span class="glyphicon glyphicon-chevron-left backButton" aria-hidden="true"></span>');
	info.append('<span style="font-family:Typograph2">Course Name:</span> ' + course.courseName);
	info.append('<span style="font-family:Typograph2"><br>Course Code:</span> ' + course.courseCode);
	info.append('<span style="font-family:Typograph2; color:red"><br>' + course.courseRequisite);
	info.append('<span style="font-family:Typograph2"><br>Course Description: </span> <a href="#" id="showhide" ">Show/Hide</a><br><div id = "courseContent" style="display:none">' + course.courseDescription + "</div>");
	
	//$("#results").css("display", "none");
}

$(document).on('click', '#showhide', function(){
	$('#courseContent').toggle('show');
	
});

$(document).on("click", "#saveAsPng", function(){
  html2canvas($('.calendarContainer'), {
  onrendered: function(canvas) {
    
canvas.toBlob(function(blob) {
    saveAs(blob, "RyPlanner Mock Schedule.png");
});
  }
});
})

function setupTable(course, info){
	var tableContents = "";
	var tableVar = '\
	<table class="table table-hover classTable" id="classTable">\
    <thead>\
        <tr>\
            <th>Class</th>\
            <th style="width: 100px;">Instructor</th>\
            <th>Rating</th>\
            <th>Timings</th>\
            <th>Classroom</th>\
        </tr>\
    </thead>\
    <tbody>';

	for (var x in course.courseInstructors){
		var Instructor = course.courseInstructors[x];
		console.log(Instructor);
		Instructor = Instructor.replace("Staff", "");
		if (Instructor == "Staff"){
			Instructor = "N/A";
		}
		var uniqueList=Instructor.split(' ').filter(function(item,i,allItems){
		    return i==allItems.indexOf(item);
		}).join(' ');

		Instructor = uniqueList;
		console.log(Instructor);
		getRate(Instructor);
		var Time = course.courseTimings[x];
		var Classroom = course.classrooms[x];
		var Class_Number = course.classNumbers[x];
		//console.log(TimeArr);
		//Classroom = Classroom.replace("Classroom", "Classroom/<br>");
    Classroom = Classroom.replace(/Classroom/g, "");
    Classroom = Classroom.replace("PT", "");
		//if (Classroom.split('/').length != 2){
			//Classroom = Classroom.replace("/", "");
		//}
		if (Time.length > 20) {
		  TimeArr = Time.split(" ");
		  var time1 = TimeArr[0] + " " + TimeArr[1] + " " + TimeArr[2] + " " + TimeArr[3];
		  var time2 = TimeArr[4] + " " + TimeArr[5] + " " + TimeArr[6] + " " + TimeArr[7];
		  Time = '<div class="time1">' + time1 + '</div><br><div class="time2"> ' + time2 + "</div>";
		  } else {
		  	Time = '<div class="time1">' + Time + '</div>';
		  }
		Classroom = Classroom.replace("Lab", "Lab<br><br>");

		ClassroomArr = Classroom.split(" ");
		console.log(ClassroomArr);
		if (ClassroomArr.length > 3){
			Classroom = '<div class="class1">' + ClassroomArr[0] + '</div> <br><div class="class2">' + ClassroomArr[3] + '</div>';
		} else {
			Classroom = '<div class="class1">' + Classroom + '</div>';
		}

		$(".class1").css({'height':($(".time1").height()+'px')});

		tableContents += '\
		<tr">\
            <td id = "tablerow">' + Class_Number + '</td>\
            <td><div id="containerForInstructor"><div class="col-md-8 nameColumn">' + Instructor + '</div><div class = " gradeColumn col-md-4 rightSide"></div></div></td>\
            <td style="min-width: 120px;line-height: 2;text-align: right;"><img src="/assets/images/default.gif" /></td>\
            <td>' + Time + '</td>\
            <td>' + Classroom + '</td>\
       	</tr>\
        					';
	}

	tableVar += tableContents;
	tableVar += "</tbody></table>";
	info.append(tableVar);
	
	//info.append("<br><br>");

	var c = classExists();
	////console.log(c);
	highlightSelected(c);

}



$(document).on('click', '#closeSearch', function(){
	$(".sidebar2").css("display", "none");
	$("#results").css("display", "none");

})


$(document).on('click', '.backButton', function(){

	//$(".sidebar2").css("right", "0px");
	$(".sidebar2").animate({left: '300px'});
	$("#info").css("display", "none");
  $(".sidebar2").css("display", "none");
	$("#results").css("display", "block");
});



$(document).on('click', '.classTable td', function(e){
  console.log(e.target);
  if (e.target.id == "toggleRatingsButton"){
    return;
  }
preCalObj = {};
preCalObj.instructor = $(this).closest('tr').find('td:eq(1)').ignore("span").text();
preCalObj.classnum = $(this).closest('tr').find('td:eq(0)').text();
preCalObj.timing = $(this).closest('tr').find('td:eq(3)').text();
preCalObj.classroom = $(this).closest('tr').find('td:eq(4)').text();
console.log(preCalObj.classroom);

	 if (!alreadyExists(preCalObj.classnum)){
		$(this).parent().addClass("success");
	//	$(this).parent().attr("name", 'selected');
		removeHoverObject();
		if (preCalObj.timing.length > 20) {
			createEventObjects(preCalObj, false);
		} else {
			createEventObject(preCalObj, false);
		}
 	}
// 		if ($(this).parent().hasClass('success') == false){
// 		$(this).parent().addClass("animated pulse");
// 		$(this).parent().addClass("danger");
// 	}
// }
});

$(document).on('mouseenter', '.classTable td', function(){

	

	hoverObj = {};
	hoverObj.instructor = $(this).closest('tr').find('td:eq(1)').text();
	hoverObj.classnum = $(this).closest('tr').find('td:eq(0)').text();
	hoverObj.timing = $(this).closest('tr').find('td:eq(3)').text();
	hoverObj.classroom = $(this).closest('tr').find('td:eq(4)').text();
	if (!alreadyExists()){
		if (hoverObj.timing.length > 20) {
			createEventObjects(hoverObj, true);
		} else {
			createEventObject(hoverObj, true);
		}
	}

});

$(document).on('mouseleave', '.classTable td', function(){
	removeHoverObject();
	$("#info").css("opacity", '1');
});

function removeHoverObject(){
	var currentObjs = $("#calendar").fullCalendar("clientEvents");
	for (var x in currentObjs){
		if (currentObjs[x]['id'] == "h" && currentObjs[x]['title'] == "Hover Object"){
			$("#calendar").fullCalendar( 'removeEvents', currentObjs[x]['id']);
		}
	}
}


function alreadyExists(classnum){
	var currentObjs = $("#calendar").fullCalendar("clientEvents");
	var b = 0;
	for (var x in currentObjs){
		if (currentObjs[x]['id'].indexOf(classnum) >= 0){
			b++;
		} else {
			
		}
	}
	if (b > 0){
		return true;
	} else {
		return false;
	}
}

function classExists(){
	var currentObjs = $("#calendar").fullCalendar("clientEvents");
	////console.log("Current objs:");
	////console.log(currentObjs);
	var c = [];
	for (var x in currentObjs){
		//////console.log(currentObjs[x]['id']);
		c.push(currentObjs[x]['id']);
	}
	////console.log("SENDING THIS:");
	////console.log(c);
	return c;
}

function highlightSelected(c){
	////console.log("highlithing");
		for (i = 0; i < c.length; i++){
		$('tr:has(td:contains("'+c[i]+'"))').addClass('success');
	}
}

function createEventObject(obj, isHover){
	var eventObject = {};
	eventObject.instructor = obj.instructor;
	if (isHover){
		eventObject.title = "Hover Object";
		eventObject.id = "h";
		eventObject.color = "#7daccf";
	} else {
		eventObject.title = course.courseName;
		eventObject.id = obj.classnum;
	}
	eventObject.code = course.courseCode;
	eventObject.classroom = obj.classroom.replace('/', '');
	eventObject.classNumber = obj.classnum;
	eventObject.allDay = false;
	time = '';
	day = getAndRemoveDay(obj.timing)[1];
	time = getAndRemoveDay(obj.timing)[0];
	var timeArray = time.split(" - ");
	var timeBegin = formatTime(timeArray[0]);
	var timeEnd = formatTime(timeArray[1]);
	var date = moment(moment().day(day)).format("YYYY-MM-DD");
	timeBegin = date + "T" + timeBegin + ":00";
	timeEnd = date + "T" + timeEnd + ":00";
	eventObject.start = timeBegin;
	eventObject.end = timeEnd;
	//eventObject.className = "eventCSS";
	console.log(eventObject);
	$("#calendar").fullCalendar('renderEvent', eventObject);
	if(isHover == false){
	addCourseListItem(eventObject);
	 writeCookie();
	}
}


function createEventObjects(obj, isHover){

	var eventObject = {};
	eventObject.instructor = obj.instructor;
	var instructorArray = eventObject.instructor.split(" ");
	eventObject.instructor = instructorArray[0] + " " + instructorArray[1];
	var indexArray = [];
	var letterCounter = 0;
	if (isHover){
		eventObject.title = "Hover Object";
		eventObject.id = "h";
		eventObject.color = "#7daccf";
	} else {
		eventObject.title = course.courseName;
		eventObject.id = obj.classnum;
	}
	eventObject.code = course.courseCode;
	eventObject.classNumber = obj.classnum;
	//console.log('OBJ CLASSROOM IS *********************');
	//console.log(obj.classroom);
	classroomArray = obj.classroom.split(" ");
	//eventObject.classroom = classroomArray[0];
	////console.log(classroomArray);
	var result=obj.timing.split(" ");
	////console.log(result);d
	var firstTime = result[0] + " " + result[1] + " " + result[2] + " "  + result[3];
	var secondTime = result[4] + " " + result[5] + " " + result[6] + " "  + result[7];
	////console.log(firstTime);

	firstTime = getAndRemoveDay(firstTime);
	secondTime = getAndRemoveDay(secondTime);

	var day1 = firstTime[1];
	var day2 = secondTime[1];

	firstTime = firstTime[0];
	secondTime = secondTime[0];

	var firstTimeArray = firstTime.split(" - ");
	var firstTimeBegin = formatTime(firstTimeArray[0]);
	var firstTimeEnd = formatTime(firstTimeArray[1]);

	var date1 = moment(moment().day(day1)).format("YYYY-MM-DD");
	var date2 = moment(moment().day(day2)).format("YYYY-MM-DD");

	firstTimeBegin = date1 + "T" + firstTimeBegin + ":00";
	firstTimeEnd = date1 + "T" + firstTimeEnd + ":00";

	var secondTimeArray = secondTime.split(" - ");
	var secondTimeBegin = formatTime(secondTimeArray[0]);
	var secondTimeEnd = formatTime(secondTimeArray[1]);

	secondTimeBegin = date2 + "T" + secondTimeBegin + ":00";
	secondTimeEnd = date2 + "T" + secondTimeEnd + ":00";

	if(isHover == false){
	addCourseListItems(eventObject);
	//console.log(eventObject);
	 writeCookie();
	}
//eventObject.className = "eventCSS";
	createEventFrom(eventObject, firstTimeBegin, firstTimeEnd, classroomArray[0]);
	createEventFrom(eventObject, secondTimeBegin, secondTimeEnd, classroomArray[1]);
	
}

function createEventFrom(obj, begin, end, classroom){

	var eventObject = obj;
	eventObject.start = begin;
	eventObject.end = end;
	eventObject.classroom = classroom;
	////console.log("Set classroom to: " + eventObject.classroom);
	//console.log(eventObject);
	$("#calendar").fullCalendar('renderEvent', eventObject);

}


function addCourseListItem(eventObject){
	$(".course-list").append('<li>\
								<div data-id="'+eventObject.id+'" onclick=“” class = "course-list-item ryerson-blue">\
								'+eventObject.title+'<span id="hide" class="hiddenSpan"><br>'+eventObject.code+'<br>'+eventObject.instructor+ '<br>'+eventObject.classroom+'</span><span class="delete-item glyphicon glyphicon-remove"></span>\
								</div>');
								
}

function addCourseListItems(eventObject){
	console.log(classroomArray[0]);
	$(".course-list").append('<li>\
								<div data-id="'+eventObject.id+'" onclick=“” class = "course-list-item ryerson-blue">\
								'+eventObject.title+'<span id="hide" class="hiddenSpan"><br>'+eventObject.code+'<span id="hide" class="hiddenSpan"><br>' +classroomArray[0]+' | '+classroomArray[1]+'<br>'+eventObject.instructor+'</span><span class="delete-item glyphicon glyphicon-remove"></span>\
								</div>');

}



function getAndRemoveDay(s){
	////console.log("Got " + s);
	var time;
	var day;
	if(s.indexOf("Su ") >= 0){
				    	day = 0;
				    	time = s.replace("Su ", "");
				    } else if(s.indexOf("Mo ") >= 0){
				    	day = 1;
				    	time = s.replace("Mo ", "");
				    } else if(s.indexOf("Tu ") >= 0){
				    	day = 2;
				    	time = s.replace("Tu ", "");
				    } else if(s.indexOf("We ") >= 0){
				    	day = 3;
				    	time = s.replace("We ", "");
				    } else if(s.indexOf("Th ") >= 0){
				    	day = 4;
				    	time = s.replace("Th ", "");
				    } else if(s.indexOf("Fr ") >= 0){
				    	day = 5;
				    	time = s.replace("Fr ", "");
				    } else if(s.indexOf("Sa ") >= 0){
				    	day = 6;
				    	time = s.replace("Sa ", "");
	}
	return [time, day];
}



function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "," + escape(strData);


    if (window.MSBlobBuilder) {
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) {
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */
    ; //end if a[download]?

    //do iframe dataURL download:
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
} /* end download() */

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
						}
					}

					return timeStart;
}



  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });


$(document).on("click", "#results", function(e){
  if (e.target !== this)
    return;
  $(".sidebar2").css("display", "none");
})

function readCookie(){
  if(typeof(Storage) !== "undefined") {
	//if ($.cookie("events") != undefined || $.cookie("events") != null){
	//var events = JSON.parse($.cookie('events'));
	//var events = JSON.parse(window.localStorage.getItem())
	//console.log(events);
	if (window.localStorage.getItem('html') == null){
	  $("#course-list").html('');
	} else {
	$("#course-list").html(unescape(window.localStorage.getItem("html")));
	}
	//console.log(unescape($.cookie('html')));
	//var savedEvents = $.cookie("events");
	var savedEvents = window.localStorage.getItem("events");
   // console.log(JSON.parse(savedEvents));

            $('#calendar').fullCalendar({
            header: {
				left: false,
				center: false,
				right: false
			},
			minTime: "08:00:00",
			timeFormat: "h:mm A",
			maxTime: "22:00:00",
			defaultView: 'agendaWeek',
			allDaySlot : false,
			slotDuration: "00:30:00",
			axisFormat: 'h:mm A',
			columnFormat: 'dddd \n MMM DD',
			//contentHeight: "auto",
			//height: "450",
			aspectRatio: 2,
			editable: false,
			events: JSON.parse(savedEvents),
			eventRender: function(event, element) {
            element.find('.fc-title').html("<br/><br>" + event.code + "<br/><br/>" + event.classroom + "<br/><span style='display: none;'>" + event.classNumber + "</span>");
     		//$(element).tooltip({title: event.title + "<br><br>" + event.code + "<br><br>" + event.classroom + "<br><br>" + event.instructor, html:true});
        	},
        	eventMouseover: function(event, jsEvent, view){
        		var listItems = $(".list-group li");
        //		console.log(listItems.length);
				for (x=0; x<listItems.length; x++){
				    var product = $(listItems[x]);

				    $(this).closest('.fc-event').css('background-color', "#FADC00");
			      $(this).closest('.fc-event').css('border-color', "#478ABB");
				    
				   
				   console.log(product.find('div').data('id'));
				   if (product.find('div').data('id') == event.id){
				     product.find('div').css("background-color", "#7daccf");
				   }
				    // var product2 = product.find('div').attr('data-id');
				    // if (product2.indexOf(event.id) >= 0){
				    // 	product.find("div").css("background-color", "#7daccf");
				    //}
				};
        	},
        	eventMouseout: function(event, jsEvent, view){
        		var listItems = $(".list-group li");
        	//	console.log(listItems.length);
				for (x=0; x<listItems.length; x++){
				    var product = $(listItems[x]);
			
				  // console.log(product.find('div').data('id'));
				   if (product.find('div').data('id') == event.id){
				     product.find('div').css("background-color", "#2980b9");
				   }
				   
				   $(this).closest('.fc-event').css('background-color', "#B7D192");
			      $(this).closest('.fc-event').css('border-top-color', "rgb(255,255,255)");
			      $(this).closest('.fc-event').css('border-bottom-color', "rgb(95,154,35)");
			      $(this).closest('.fc-event').css('border-left-color', "rgb(255,255,255)");
			      $(this).closest('.fc-event').css('border-right-color', "rgb(95,154,35)");

				    // var product2 = product.find('div').attr('data-id');
				    // if (product2.indexOf(event.id) >= 0){
				    // 	product.find("div").css("background-color", "#7daccf");
				    //}
				};
        	}
        });




	}
}


function writeCookie(){
  var localStorage = window.localStorage;
	
	var divHTML = $("#course-list").html();
	localStorage.setItem("html", escape(divHTML));
	//var htmlOBJ = [];
	//htmlOBJ.push(divHTML);
  //ar html = JSON.stringify(htmlOBJ);
	//console.log(divHTML);
//	divHTML = escape(divHTML);
	//$.cookie('html', html, { expires : 10 });
//	console.log("Current cookie: " + unescape($.cookie('html')));

	var eventsFromCalendar = $('#calendar').fullCalendar( 'clientEvents');
    var eventsForCookie = [];
    
    $.each(eventsFromCalendar, function(index,value) {
        var event = new Object();
        event.id = value.id;
        event.start = value.start;
        event.end = value.end;
        event.title = value.title;
        event.instructor = value.instructor;
        event.classNumber = value.classNumber;
        event.classroom = value.classroom;
        event.code = value.code;
        eventsForCookie.push(event);
    });
  //  console.log(JSON.stringify(eventsForCookie));
    //$.cookie("events", JSON.stringify(eventsForCookie), {expires: 10});
    localStorage.setItem("events", JSON.stringify(eventsForCookie));
}

var extraSideThing = document.getElementsByClassName("fc-axis fc-time fc-widget-content");
var extraSideThing2 = document.getElementsByClassName("fc-widget-content");
////console.log(extraSideThing.length);
extraSideThing[extraSideThing.length - 1].style.display = "none";
extraSideThing2[extraSideThing2.length - 1].style.backgroundColor = "white"; //"rgb(247,247,247)";
$(window).resize(function() {
	$('.sidebar2').css('left', $(".sidebar").css('width'));
	$('sidebar2').css('max-height',$(window).height());
    $("#info").css("height", $("#results").height() + 3);
    var e = document.getElementById("searchQuery").offsetWidth + "px";
    $("#results").css("width", e)
});



$(document).on('click', '#resetButton', function(){
	$("#calendar").fullCalendar( 'removeEvents' );
	$("#course-list").html("");
	writeCookie();
});



document.documentElement.addEventListener('DOMAttrModified', function(e){
  if (e.attrName === 'display') {
   // console.log('prevValue: ' + e.prevValue, 'newValue: ' + e.newValue);
  }
}, false);



$(document).on("click", "#bug", function(){
 $('#bug').prop('disabled', true);
//console.log(pUrl);
  $.ajax({
     type: "GET",
     url: 'assets/php/sendEmail.php?body=' + escape($("#bodyText").val()),
     success: function(data){
       alert("Successfully sent report, thanks!");
$('#bug').prop('disabled', false);
     }
  });
})



	$(document).mouseup(function (e)
	{
	    var container = $(".myDiv");
	    var container2 = $("#results");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0 && !container2.is(e.target)) // ... nor a descendant of the container
	    {
	        $(".sidebar2").css("display", "none");
	        $("#results").css("display", "none");
	        
	    }
	});
});

    function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }
