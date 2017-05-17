$.fn.extend({
animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

 $('.search-query').each(function() {
   var elem = $(this);

   var searchQuery = elem.val();
   var wikiUrl = "";
   var flag = true;
   var out = true;
   var nothing = true;

   elem.bind("propertychange change keyup keypress input paste blur", function(event){

      if(searchQuery != elem.val()) {
        searchQuery = elem.val();
        wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchQuery + '&format=json&callback=?';
//      START of JSON
        $.getJSON(wikiUrl, function(json) {
          $(".search-output").html("");
          $(".search-output").hide(); 
          var html = json[1].length;
          var arr1 = json[1].reverse();
          var arr2 = json[2].reverse();
          var arr3 = json[3].reverse();
        if(html>=1){
          for(i=0;i<html;i++){
            $(".search-output").show(); 
            $(".results-for").show();
            nothing = true;
            var wikiTitle = '<h3><a href="'+arr3[i]+'" class="wiki-title" target="_blank">'+arr1[i]+'</a></h3>';
            var wikiLink = '<a href="'+arr3[i]+'" target="_blank" class="wiki-link">'+arr3[i]+'</a>';
            var wikiDesc = '<p class="wiki-desc">' +arr2[i]+ '</p>';
            var searchResults = wikiTitle + wikiLink + wikiDesc;  
            $(".search-output").prepend( searchResults + '<hr>'); 
            $(".nothing").hide();
          }
          $(".results-for").html("Search results for "+"<strong>"+searchQuery+"</strong>  -  Showing <strong>"+html+" </strong>results");
        } else if (html<1){
           $(".results-for").hide();
          
            if(nothing==true){
              nothing = false;
              $(".nothing").show().animateCss("fadeInRight").addClass(".delay-1");
              flag = true;
              out = false;
              $(".search-output").hide(); 
            }     
          }
      });
//     END OF JSON        
        
          if(flag == true) {
            flag = false;
            out = true;
            $(".home").hide();
            $(".nothing").hide()
            $(".results-for").show();
            $(".search-output").show().animateCss("fadeInRight").addClass(".delay-1");
          }
      } else if (!searchQuery) {
        $(".results-for").hide();
        if (out==true){
          searchQuery = elem.val();
          flag = true;
          out = false;
         
          $(".search-output").hide();
          $(".nothing").hide();
          $(".home").show().animateCss("fadeInRight").addClass(".delay-1");
        }
        
     } 
     
   });
 });
