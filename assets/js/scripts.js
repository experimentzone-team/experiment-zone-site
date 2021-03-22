// Email Subscription POPUP Window

// Sets the cookie with Name, Value, and number of day before cookie expires.
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Searches all cookies for the cookie with the provided Name.
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Actives the POPUP window and sets the 'email-popup' cookie when the mouse leaves the body element. 

var popup = function() {
    $( "body" ).mouseleave(function() {
        if (getCookie('email-popup') === null) {
            $('#popupModalCenter').modal('show')
            return setCookie('email-popup', 'true', 7)
        }
    })
}
popup();
