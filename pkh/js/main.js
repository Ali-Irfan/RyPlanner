updateFeed();
function updateFeed() {
  $.ajax({
	url: 'test.php',
	type: 'POST',
	async: 'false',
	data: {
		format: 'json'
	},
	success: function(data){
		data = JSON.parse(data);
		var helpers = data[0];
		var mods = data[1];
		var admins = data[2];
		var owners = data[3];
$("#helpers").html("");
$("#mods").html("");
$("#admins").html("");
$("#owners").html("");
		for (i=0;i<helpers.length; i++){
			$("#helpers").append("<br>" + helpers[i]);
		}
		for (i=0;i<mods.length; i++){
			$("#mods").append("<br>" + mods[i]);
		}
		for (i=0;i<admins.length; i++){
			$("#admins").append("<br>" + admins[i]);
		}
		for (i=0;i<owners.length; i++){
			$("#owners").append("<br>" + owners[i]);
		}
		
		
		if ($("#helpers").html() == ""){
		  $("#helpers1").css('display', 'none');
		} else {
		  $("#helpers1").css('display', 'block');
		}
		
		if ($("#mods").html() == ""){
		  $("#mods1").css('display', 'none');
		} else {
		  $("#mods1").css('display', 'block');
		}
		
		if ($("#admins").html() == ""){
		  $("#admins1").css('display', 'none');
		} else {
		  $("#admins1").css('display', 'block');
		}
		
		if ($("#owners").html() == ""){
		  $("#owners1").css('display', 'none');
		} else {
		  $("#owners1").css('display', 'block');
		}
		
		setTimeout(updateFeed, 5000);
		
	}
});


if ($("#helpers").html() == "" && $("#admins").html() == "" && $("#mods").html() == "" && $("#owners").html() == ""){
	$("#nostaff").css('display', 'block');
} else {
	$('#nostaff').css('display', 'none');
}

}