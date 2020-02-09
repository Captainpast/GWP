//javaScript by Captainpast

//preparation
var cooX;
var cooY;
var reX;
var reY;
var dragElement;
var dragdElement;
var xBevor;
var yBevor;
var overflow;
var snapping = {};
var blockid = 0;
var draging = 0;
var copies = 0;
var firstBlock = 0;
var notdrage = false;
var draggable = document.getElementsByClassName("draggable");
var draggabl = document.getElementsByClassName("draggabl");


//dragrequest (fragt ab ob ein draggable Objekt gegriffen wird)
addEventListener('mousemove', dragrequest);
function dragrequest() {
  for (let i = 0; i < draggable.length; i++) {
    draggable[i].onmousedown = function(event) {
      if (event.button == 0) {
        if (firstBlock != 1) {
          startMove(this);
        }
      }
      else if (event.which == 3 && alreadyRightClicked == false) {
        //console.log(event.target.offsetParent);
        let html = "";
        html = html + "<p onclick='" +
                      'let obj = document.getElementById("'+event.target.offsetParent.id+'");' +
                      'copyBlock(obj)' +
                      "'>"+translate("copy")+"</p>";
        html = html + "<p onclick='" +
                      'let obj = document.getElementById("'+event.target.offsetParent.id+'");' +
                      'obj.style.transition = "transform 0.4s";' +
                      'obj.style.transform = "scale(0)";' +
                      'setTimeout(function () {obj.parentElement.removeChild(dragdElement)}, 400, obj);' +
                      "'>"+translate("delete")+"</p>";

        rhigtClik(html, event.pageX, event.pageY);
      }
    };
    draggable[i].onmouseup = function(event) {
      if (event.which == 1) {
        stopMove(this)
      }
    };
  }
  if (draging == 1){
    move();
  }
}

//grabrequest (fragt ab ob ein draggabl Objekt gegriffen wird)
addEventListener('mousemove', grabrequest);
function grabrequest() {
  for (let i = 0; i < draggabl.length; i++) {
    draggabl[i].onmousedown = function(event) {
      if (notdrage != true) {
        if (event.button == 0) {
          blockid = blockid + 1;
          //kopiert das gegriffene Objekt
          let html = "";
          html = html + "<div class='draggable block "+this.classList[2]+"' id='block("+blockid+")' style='margin:0;' type='"+this.attributes.type.value+"'>";
          html = html + this.innerHTML;
          html = html + "</div>"
          //fügt die Kopie ein
          document.getElementById("blockfield").innerHTML = document.getElementById("blockfield").innerHTML + html;
          firstBlock = 1;
          startMove(document.getElementById("block("+blockid+")"));
        }
      }
    };
  }
}

function copyBlock(id) {
  blockid = blockid + 1;
  //kopiert das gegriffene Objekt
  let html = "";
  html = html + "<div class='draggable block "+id.classList[2]+"' id='block("+blockid+")' style='margin:0;' type='"+id.attributes.type.value+"'>";
  html = html + id.innerHTML;
  html = html + "</div>"
  //fügt die Kopie ein
  document.getElementById("blockfield").innerHTML = document.getElementById("blockfield").innerHTML + html;
  firstBlock = 1;
  startMove(document.getElementById("block("+blockid+")"));
}

//movepreparation (passt das dragElement Objekt an um es bewegen zu können)
function startMove(id) {
  if (copies == 0 && notdrage != true) {
    if (draging == 1) {
      copies = 1;
      let html = "";
      html = html + "<div class='draggable block "+dragElement.classList[2]+"' id='"+dragElement.id+"' style='margin:0;' type='"+dragElement.attributes.type.value+"'>";
      html = html + dragElement.innerHTML;
      html = html + "</div>"

      let obj = dragElement.id;
      document.getElementById("blockfield").innerHTML = document.getElementById("blockfield").innerHTML + html;
      dragElement = undefined;
      if (document.getElementById(obj).attributes.type.value == "var") {
        let parent = document.getElementById(obj).parentElement;
        document.getElementById(obj).parentElement.removeChild(document.getElementById(obj));
        parent.firstElementChild.style.display = "inline";
      } else {
        document.getElementById(document.getElementById(obj).parentElement.parentElement.id).lastElementChild.innerHTML = "";
      }

      dragElement = document.getElementById(obj);
      dragdElement = document.getElementById(obj);
    } else {
      dragElement = id;
      dragdElement = id;
    }
    draging = 1;
    dragElement.style.transition = "";
    dragElement.style.cursor = "grabbing";
    dragElement.style.position = "absolute";
    dragElement.style.zIndex = "5";
    snapping = undefined;
    move();
  }
}
//movepreparation (Stopp das Bewegen und verwandelt das Objekt wieder in ein statisches Objekt)
function stopMove(id) {
  if (dragElement != null) {
    dragElement.style.cursor = "url('/data/grab.png') 12.5 12.5, grab";
    dragElement.style.zIndex = "4";
    for (let i = 0; i < draggable.length; i++) {
      draggable[i].onmouseover = undefined;
    }
    //wirft das Objekt zurück ins canvas
    if (overflow == 1){
      dragElement.style.transition = "top 0.5s ,left 0.5s";
      dragElement.style.top = yBevor;
      dragElement.style.left = xBevor;
    }
    //löscht das Objekt
    else if (overflow == 2) {
      dragElement.style.transition = "transform 0.4s";
      dragElement.style.transform = "scale(0)";
      setTimeout(function () {dragdElement.parentElement.removeChild(dragdElement)}, 400);
    }
//    dragElement.style.left = (reX - (dragElement.offsetWidth / 2)) + "px";
//    dragElement.style.top = (reY - 20) + "px";
//    dragElement.style.position = "relative";
    //----
    if (snapping != undefined) {
      if (dragElement.attributes.type.value != "var") {
        let html = "";
        html = html + "<div class='draggable block "+dragElement.classList[2]+"' id='"+dragElement.id+"' style='margin:-19px 0;' type='"+dragElement.attributes.type.value+"'>";
        html = html + dragElement.innerHTML;
        html = html + "</div>";
        snapping.lastElementChild.innerHTML = html;
        dragElement.parentElement.removeChild(dragElement);
        for (let i = 0; i < draggable.length; i++) {
          draggable[i].style.borderBottom = "";
        }
      } else {
        let html = "";
        html = html + "<div class='draggable block "+dragElement.classList[2]+"' style='display:inline-block;' id='"+dragElement.id+"' style='margin:-19px 0;' type='"+dragElement.attributes.type.value+"'>";
        html = html + dragElement.innerHTML;
        html = html + "</div>";
        snapping.innerHTML = html + snapping.innerHTML;
        snapping.lastElementChild.style.display = "none";
        snapping.firstElementChild.children[2].style.boxShadow = "0px 0px 1px 1px #000";
        dragElement.parentElement.removeChild(dragElement);
      }
    }

  }
  draging = 0;
  copies = 0;
  firstBlock = 0;
  dragElement = undefined;
  cachingDesk();
}

//moving (händelt alle Abfragen während dem Bewegen des Objektes)
function move() {
  //--fix error--\\
  if (dragElement == null) {
    stopMove();
  }
  //--fix error--\\
  dragElement.style.position = "absolute";
  let parent = dragElement.parentElement;
  let canvas = document.getElementById("blockfield");
  //bewegt das Objekt zu Mauszeiger
  if (cooX != 0){
    dragElement.style.left = (cooX - (dragElement.offsetWidth / 2)) + "px";
    dragElement.style.top = (cooY - 20) + "px";
  }
  //fragt ab ob sich das Objekt außerhalb der Canvas aufhält
  if (
    dragElement.style.left.slice(0, -2) < document.getElementById("dp1").offsetWidth ||
    dragElement.style.top.slice(0, -2) < document.getElementsByClassName("navbar")[0].offsetHeight + document.getElementById("select").offsetHeight||
    dragElement.style.top.slice(0, -2) > ((canvas.offsetHeight + 45) - dragElement.offsetHeight) ||
    dragElement.style.left.slice(0, -2) > ((canvas.offsetWidth + document.getElementById("dp1").offsetWidth) - dragElement.offsetWidth)
    ) {
      if (cooX < document.getElementById("dp1").offsetWidth) {
        dragElement.style.opacity = "0.5";
        overflow = 2;
      } else {
        dragElement.style.opacity = "0.9";
        overflow = 1;
      }
  } else {
    dragElement.style.opacity = "1";
    xBevor = dragElement.style.left;
    yBevor = dragElement.style.top;
    overflow = 0;
  }
  //lässt das Objekt in ein Objekt in der nähe snappen
  if (dragElement.attributes.type.value != "hed") {
  if (dragElement.attributes.type.value != "var") {
    snapping = undefined;
    for (let i = 0; i < draggable.length; i++) {
    if (draggable[i].attributes.type.value != "var") {
      if (dragElement !== draggable[i]) {
        if (draggable[i].style.position == "absolute") {
          var distanceLeft = draggable[i].offsetLeft - dragElement.offsetLeft;
          var distanceTop = draggable[i].offsetTop - dragElement.offsetTop;
        } else {
          let parentID = document.getElementById(draggable[i].parentElement.parentElement.id);
          let successfully = false;
          while (successfully != true) {
            //--fix error--\\
            if (parentID == null) {
              stopMove();
            }
            //--fix error--\\
            if (parentID.style.position == "absolute") {
              var distanceLeft = (parentID.offsetLeft) - dragElement.offsetLeft;
              var distanceTop = ((parentID.offsetTop + parentID.offsetHeight) + draggable[i].offsetHeight) - dragElement.offsetTop;
              successfully = true;
            } else {
              parentID = document.getElementById(parentID.parentElement.parentElement.id);
            }
          }
        }
        if (distanceLeft < 80 && distanceTop < 80 && distanceLeft > -80 && distanceTop > -80 &&
           draggable[i].lastElementChild.innerHTML == "" && draggable[i].attributes.type.value != "end") {
          draggable[i].style.borderBottom = "solid black 2px";
          snapping = draggable[i];
          i = draggable.length;
        }else {
          draggable[i].style.borderBottom = "";
          snapping = undefined;
        }
      }
    }}
  } else {
    dragElement.children[2].style.boxShadow = "";
    setTimeout(function () {
      dragElement.style.left = "-100px";
      dragElement.style.top = "-100px";
      for (let i = 0; i < draggable.length; i++) {
        draggable[i].onmouseover = function(event) {
          if (event.target.parentElement.attributes.type != undefined) {
            if (event.target.parentElement.attributes.type.value == "input") {
              //console.log(event.target.offsetParent);
              if (event.target.offsetParent != dragElement) {
                snapping = event.target.parentElement;
                snapping.style.border = "solid black 2px";
                let obj = event.target.parentElement;
                setTimeout(function () {
                  obj.style.border = "";
                  snapping = undefined;
                }, 500, obj);
              }
            }
          }
        };
      }
      if (cooX != 0){
        dragElement.style.left = (cooX - (dragElement.offsetWidth / 2)) + "px";
        dragElement.style.top = (cooY - 20) + "px";
      }
    }, 1);
  }
  }
  dragElement.style.transition = "opacity 0.5s";
}

function noDrage() {
  notdrage = true;
  setTimeout(function () {notdrage = false;}, 1);
}

//coordinate aktualisiren
addEventListener('mousemove', coords, false);
function coords(event) {
  cooX = event.clientX;
  cooY = event.clientY;
  reX = cooX - document.getElementById("dp1").offsetWidth;
  reY = cooY - (document.getElementsByClassName("navbar")[0].offsetHeight + document.getElementById("select").offsetHeight);
  if (document.getElementById("blockfield") != null) {
    document.getElementById("blockfield").addEventListener("mousemove", function (event) {
    });
  }
}
