var slidenum = 1;
slideshow(slidenum);

function nextslide(n) {
slideshow(slidenum += n);
}

function currentSSlide(n) {
slideshow(slidenum = n);
}

function slideshow(n) {
    var sslides = document.getElementsByClassName("myS");
    var ddots = document.getElementsByClassName("dott");
    if (n > sslides.length) {slidenum = 1}    
    if (n < 1) {slidenum = sslides.length}
    for (i = 0; i < sslides.length; i++) {
        sslides[i].style.display = "none";  
    }
    for (i = 0; i < ddots.length; i++) {
        ddots[i].className = ddots[i].className.replace(" active", "");
    }
    sslides[slidenum-1].style.display = "block";  
    ddots[slidenum-1].className += " active";
}