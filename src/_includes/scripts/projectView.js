
const setScrollFraction = (newFrac) => {
  newFrac = Math.max(0, Math.min(newFrac, 1));

  window.targetScrollFraction = newFrac;
  //window.currentScrollFraction = newFrac;

  gsap.to(document.getElementById('projectView_outer'), {scrollLeft: newFrac * document.getElementById('projectView_outer').scrollWidth, duration: 0.5, ease: "power2.inOut"});
  //document.getElementById('projectView_outer').scrollLeft = newFrac * document.getElementById('projectView_outer').scrollWidth;
}

const scrollStep = (pages) =>{
  console.log("scrollStep( " + parseInt( pages ) + ")");

  frac = window.targetScrollFraction;
  frac = Math.min(1, frac + pages*window.scrollStep / 100);
  frac = Math.max(0, frac);

  setScrollFraction(frac);
}

const scrollStepRight = () => {scrollStep(2);}
const scrollStepLeft = () => {scrollStep(-2);}

document.getElementById('projectView_outer').addEventListener('wheel', function (e) {
    var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

    console.log("delta: " + delta );
    if(delta > 0){
        scrollStepLeft();
    } else {
        scrollStepRight();
    }
}, false);


window.addEventListener('load', function() {
  console.log('loaded');
  onResize();
  processSlug();
});

window.addEventListener('resize', function() {
onResize();
});

function onResize() {
numberOfColumns = document.getElementById('projectView_outer').scrollWidth / (416+30);
numberOfColumns = Math.floor(numberOfColumns);
window.numberOfColumns = numberOfColumns;
window.scrollStep = 100 / numberOfColumns;
console.log("number of columns: " + numberOfColumns);

document.getElementById('projectView_scrollNavBar').innerHTML = '';

newNav = '';
for (let i = 0; i < numberOfColumns; i++) {
  targetFraction = i*100 / numberOfColumns;
  targetFraction = parseFloat((i * 100 / numberOfColumns).toFixed(2));
  newNav = newNav + '<a href="?persent=' + targetFraction + '">' + i + '</a> ';
}
document.getElementById('projectView_scrollNavBar').innerHTML = newNav;
}

function processSlug(){
// Get the current URL
var currentUrl = window.location.href;

console.log(currentUrl);
// Extract the slug from the URL
var slug = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
console.log("slug: " + slug);

// Extract the parameter from the slug

var parameter = slug.split('=')[1];
if (typeof parameter === 'undefined') {
  parameter = 0;
}

console.log("parameter: " + parameter);
frac = parseFloat(parameter) / 100;

setScrollFraction(frac);

console.log("target scroll: " + frac + "; scrollStep: " + window.scrollStep);
}