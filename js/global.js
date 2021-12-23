var contributors = document.getElementById("people");
var contributorsBtn = document.getElementById("contributors");

contributorsBtn.onclick = function() {
    if (contributors.style.display == "block") {
        contributors.style.display = "none";
    } else {
        contributors.style.display = "block";
    }
}