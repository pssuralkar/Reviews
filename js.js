// you can enter your JS here!
$(document).ready(function(){
	var getRatings = [];
	$.ajax({
	    url: 'http://s.trustpilot.com/tpelements/2577175/f.json',
	    dataType: 'json',
	    type: 'get',
	    cache: false,
	    success: function(data){
	    	showResults(data.Reviews);
	    	//Storing another array object for sorting 
	    	getRatings.push(data.Reviews);
	    }
	});

//Getting Sort value from Dropdown
$("#sort").change(function(e){
	var rating = $(this).val(); //Asc or desc 
	if(rating == "asc"){
		sortByRatings(true);
	}
	else{
		sortByRatings(false);
	}
});

function sortByRatings(asc){
	var sortData = getRatings[0].sort(function(a, b) {
        if (asc) return (a.TrustScore.Stars > b.TrustScore.Stars);
        else return (b.TrustScore.Stars > a.TrustScore.Stars);
    });
    showResults(sortData, true);
}
function showResults (data, issort) {
    var html = '';
    //Calculate days difference

   

    //Creating dom for reviews list
    $.each(data, function(i, content){
    	var created = content.Created.Human;
    	//daysDiff(created);

    	 html += "<div class='review-section'>"
        +"<div>"
        +"<span class='star-images'>"
        +"<img src='https:"+content.TrustScore.StarsImageUrls.large+"' alt=''/>"
        +"</span>"
        +"<span class='user-name'>"+content.User.Name+"</span>"
        +"<span class='created'>"+content.Created.Human+"</span>"
        +"</div>"
        +"<h2>"+content.Title+"</h2>"
        +"<p>"+content.Content+"</p>"
        +"</div>";
    });
    
    if(issort){ // if data is sorted then remove the old html
    	$("#reviews .review-section").remove();	
    }
    
    $('#reviews').append(html);
}	

}); 