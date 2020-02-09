//javaScript by Captainpast

//preparation
var cooX;
var cooY;
var elemid = 1;
var elemd = 0;
var elementDrag;
var delem = document.getElementsByClassName("delement");

addEventListener('mousemove', elementgrab);
function elementgrab() {
  for (let i = 0; i < delem.length; i++) {
    delem[i].onmousedown = function(event) {
      if (event.button == 0) {
        elemid = elemid + 1;
        let html = "";
        html = html + "<div class='"+this.classList[0]+" elem' id='element("+elemid+")' code='"+this.attributes.code.value+"'><p>"+this.innerText+"</p></div>";
        //fügt die Kopie ein
        document.getElementById("hz1").innerHTML = document.getElementById("hz1").innerHTML + html;
        elmetStart(document.getElementById("element("+elemid+")"));
      }
    };
  }
  if (elemd == 1) {
    elemMove();
  }
}

function elmetStart(id) {
  elementDrag = id;
  elemd = 1;
  elementDrag.style.transition = "opacity 0.5s";
  elementDrag.style.cursor = "grabbing";
  elementDrag.style.position = "absolute";
  elementDrag.style.zIndex = "5";
  elemMove();
}
function elmetEnd(event) {
  elemd = 0;
  var parent = elementDrag.parentElement;
  if (overflow == 1){
    elementDrag.style.transition = "transform 0.4s";
    elementDrag.style.transform = "scale(0)";
    setTimeout(function () {
      elementDrag.parentElement.removeChild(elementDrag);
      elementDrag = undefined;
    }, 400);
  } else {
    elementDrag.style.left = "-100px";
    elementDrag.style.top = "-100px";
    cachingDesk()
    document.getElementById("hz2").onmouseup = function (event) {
      event.target.innerHTML = event.target.innerHTML + elementDrag.attributes.code.value;
      selectetElem = event.target.lastElementChild;
      selectElementHZ();

      parent.removeChild(elementDrag);
      elementDrag = undefined;
      document.getElementById("hz2").onmouseup = undefined;
      document.getElementById("hz3").onmouseup = undefined;
    }
    document.getElementById("hz3").onmouseup = function (event) {
      selectetElem.innerHTML = selectetElem.innerHTML + elementDrag.attributes.code.value;
      selectetElem = selectetElem.lastElementChild;
      selectElementHZ();

      parent.removeChild(elementDrag);
      elementDrag = undefined;
      document.getElementById("hz2").onmouseup = undefined;
      document.getElementById("hz3").onmouseup = undefined;
    }
  }
}

function elemMove() {
  let canvas = document.getElementById("hz2");
  if (cooX != 0){
    elementDrag.style.left = (cooX - 80) + "px";
    elementDrag.style.top = (cooY - 20) + "px";
  }
  //fragt ab ob sich das Objekt außerhalb der Canvas aufhält
  if (
    elementDrag.style.left.slice(0, -2) < document.getElementById("hz1").offsetWidth ||
    elementDrag.style.top.slice(0, -2) < document.getElementsByClassName("navbar")[0].offsetHeight + document.getElementById("select").offsetHeight||
    elementDrag.style.top.slice(0, -2) > ((canvas.offsetHeight + 45) - elementDrag.offsetHeight) ||
    elementDrag.style.left.slice(0, -2) > ((canvas.offsetWidth + document.getElementById("hz1").offsetWidth + document.getElementById("hz3").offsetWidth) - elementDrag.offsetWidth)
    )
    {
      elementDrag.style.opacity = "0.5";
      overflow = 1;
  } else {
    elementDrag.style.opacity = "1";
    overflow = 0;
  }
  elementDrag.onmousedown = function() {elmetEnd(event)};
}

//coordinate aktualisiren
addEventListener('mousemove', coords, false);
function coords(event) {
  cooX = event.clientX;
  cooY = event.clientY;
}
