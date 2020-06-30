var sslideIndex = 1;
sshowSlides(sslideIndex);

function plusSSlides(n) {
  sshowSlides(sslideIndex += n);
}

function currentSSlide(n) {
  sshowSlides(slideIndex = n);
}

function sshowSlides(n) {
  var i;
  var sslides = document.getElementsByClassName("container4");
  var dotts = document.getElementsByClassName("dot");
  if (n > sslides.length) {sslideIndex = 1}    
  if (n < 1) {sslideIndex = sslides.length}
  for (i = 0; i < sslides.length; i++) {
      sslides[i].style.display = "none";  
  }
  for (i = 0; i < dotts.length; i++) {
      dotts[i].className = dotts[i].className.replace(" active", "");
  }
  sslides[sslideIndex-1].style.display = "block";  
  dotts[sslideIndex-1].className += " active";
}
