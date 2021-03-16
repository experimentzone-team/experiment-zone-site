var currentTab = 0; // Current tab is set to be the first tab (0)

var showTab = function(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == (x.length - 2)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";
        dynamicContent();
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    } 
    console.log("n", n)
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").innerHTML = "Start Quiz";
      document.getElementById("nextBtn-container").setAttribute("class", "row justify-content-center mt-5")
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

showTab(currentTab); // Display the current tab


function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    $("#_form_23_submit").trigger("click");
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

// Displays content on the results slide at the end of quiz based on the quiz answers 
function dynamicContent() {
  if ($(".goals-4").is(':checked') === true || $(".goals-5").is(':checked') === true) {
    if (output.value < 2000) {
    $(".dynamic-content").append('<h1>You got: "New Website Planing"</h1><h3>Based on your answers, you are looking to increase awareness of your brand and grow your traffic.</h3><div class="text-center"><h3 class="ml-n3 mb-3 mt-3">To do this, we recommend:</h3><ul class="text-left mb-4"><li>User Research</li><li>User Research Road Map</li><li>Something</li></ul></div>')  
    $(".quiz-direct").text("Want to chat with an expert?")
    }
  } if (output.value > 2000 && output.value < 30000) {
    $(".dynamic-content").append('<h1>You got: "Improve Revenue from Existing Traffic"</h1><h3>Based on your answers, you are looking to increase awareness of your brand and grow your traffic.</h3><div class="text-center"><h3 class="ml-n3 mb-3 mt-3">To do this, we recommend:</h3><ul class="text-left mb-4"><li>Downloading our conversion checklist</li><li>Book a Conversion Deep Dive Consult</li></ul></div>')
    $(".quiz-direct").text("Want to chat with an expert?")
  } if (output.value > 30000) {
    $(".dynamic-content").append('<h1>You got: "Experimentation Program"</h1><h3>Based on your answers, you are looking to increase awareness of your brand and grow your traffic.</h3><div class="text-center"><h3 class="ml-n3 mb-3 mt-3">To do this, we recommend:</h3><ul class="text-left mb-4"><li>Starting an experimentation program</li></ul></div>')
    $(".quiz-direct").text("Want to chat with an expert?")
  }
}

// Redirect page to correct service based on quiz answers
function quizRedirect() {
  if ($(".goals-4").is(':checked') === true || $(".goals-5").is(':checked') === true) {
    if (output.value < 2000) {
    window.location.href = "/services/conversion-consult/"
    }
  } if (output.value > 2000 && output.value < 30000) {
    window.location.href = "/services/conversion-deep-dive/"
  } if (output.value > 30000) {
    window.location.href = "/services/optimization-strategy-&-testing/"
  } 
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  var checkedArray = [];
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" ) {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // Make sure that at least one checkbox is checked
  if ($(".tab").eq(currentTab).find('input[type=checkbox]').length > 0 && $(".tab").eq(currentTab).find('input[type=checkbox]:checked').length === 0) {
    valid = false
  }
    // Make sure a radio button is checked
  if ($(".tab").eq(currentTab).find('input[type=radio]').length > 0 && $(".tab").eq(currentTab).find('input[type=radio]:checked').length === 0) {
    valid = false
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
$(document).ready(function(){
     $("#regForm input").keyup(function(){
        var currentName = $(this).attr("name");
        console.log(currentName);
        var location = "#_form_23_ input[name=" + "'" + currentName + "'" +"]";
        console.log(location);
        // Getting the current value of textarea
        var currentText = $(this).val();
        console.log(currentText);
        // Setting the Div content
        $(location).val(currentText);
    });
    //  $("#regForm select").change(function(){
    //     var currentSelectName = $(this).attr("name");
    //     console.log(this);
    //     var selectLocation = "#_form_23_ select[name=" + "'" + currentSelectName + "'" + "]";
    //     console.log(selectLocation);
    //     // Getting the current value of textarea
    //     var currentSelected = $(this)[0].selectedIndex;
    //     console.log(currentSelected);
    //     // Setting the Div content
    //     $(selectLocation).prop('selectedIndex', currentSelected);
    // });
     $("#regForm input[type=checkbox]").change(function(){
        var currentSelectCheckbox = $(this).parent().text();
        currentSelectCheckbox = currentSelectCheckbox.replace(/(\r\n|\n|\r)/gm,"").replace(/\s\s/g, '')
        console.log("currentSelectCheckbox", currentSelectCheckbox);
        var checkboxLocation = "#_form_23_" + " " + "input[value='" + currentSelectCheckbox +  "']" ;
        console.log(checkboxLocation);
        console.log(this.checked);
        this.checked ? $(checkboxLocation).prop('checked', true) : $(checkboxLocation).prop('checked', false);
    });
     $("#regForm input[type=radio]").change(function(){
        var currentSelectRadio = $(this).parent().text();
        currentSelectRadio = currentSelectRadio.replace(/(\r\n|\n|\r)/gm,"").replace(/\s\s/g, '')
        console.log(currentSelectRadio);
        var radioLocation = "#_form_23_" + " " + "select option[value='" + currentSelectRadio + "']";
        console.log(radioLocation);
        $(radioLocation).parent().val(currentSelectRadio);
    });
    // $("#regForm input[type=number]").change(function(){
    //     var currentSelectNumber = $(this).val();
    //     var currentLocation = $(this).attr("name");
    //     console.log(currentSelectNumber);
    //     console.log(currentLocation);
    //     var radioLocation = "#_form_23_" + " " + "input[name='" + currentLocation + "']";
    //     console.log(radioLocation);
    //     $(radioLocation).val(currentSelectNumber);
    // });

    var numberRange = function(type) {
        type.change(function(){
            var currentSelectNumber = $(this).val();
            var currentLocation = $(this).attr("name");
            console.log(currentSelectNumber);
            console.log(currentLocation);
            var radioLocation = "#_form_23_" + " " + "input[name='" + currentLocation + "']";
            console.log(radioLocation);
            $(radioLocation).val(currentSelectNumber);
        }) 
    }
    numberRange($("#regForm input[type=number]"));
    numberRange($("#regForm input[type=range]"));
});
