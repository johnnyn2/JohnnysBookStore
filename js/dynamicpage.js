$(function() {

    if(Modernizr.history){

    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0,
        $el;
        
    
    $("nav").delegate("a", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);
        return false;
    });

    // function loadContent(href){
    //     $mainContent
    //             .find("#guts")
    //             .fadeOut(200, function() {
    //                 $mainContent.hide().load(href + " #guts", function() {
    //                     $mainContent.fadeIn(200);
    //                     $("nav a").removeClass("active");
    //                     console.log(href);
    //                     $("nav a[href$="+href+"]").addClass("active");
    //                 });
    //             });
    // }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
    });

} // otherwise, history is not supported, so nothing fancy here.

    
});