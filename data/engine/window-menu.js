//javaScript by Captainpast

function openWindow(title, width, height, html) {
  let endHtml = document.createElement("div");
  endHtml.className = "window";
  endHtml.style.width = width + "px";
  endHtml.style.height = "20px";
  endHtml.innerHTML = '<div class="windowHead">' +
                      '<p id="title" value="'+title+'"></p>' +
                      '<div id="close" onclick="closeWindow(this.offsetParent)"></div>' +
                      '</div>' +
                      '<div class="windowBody">' +
                      html +
                      '</div>';

  document.body.appendChild(endHtml);
  setTimeout(function () {
    let obj = document.body.children[document.body.children.length-1]
    obj.style.height = height + "px";
    obj.style.opacity = 1;
  }, 10);
  return document.body.lastElementChild;
}

function closeWindow(obj) {
  obj.style.height = "20px";
  obj.style.opacity = 0;
  setTimeout(function () {
    document.body.removeChild(obj)
  }, 500, obj);
}

//preparation
var cooX;
var cooY;
var dWindow;
var wind = 0;

addEventListener('mousemove', windowgrab);
function windowgrab() {
  for (let i = 0; i < document.getElementsByClassName("windowHead").length; i++) {
    document.getElementsByClassName("windowHead")[i].firstElementChild.onmousedown = function(event) {
      if (event.button == 0) {
        wimStart(event.target.offsetParent);
      }
    };
    document.getElementsByClassName("windowHead")[i].firstElementChild.onmouseup = function(event) {
      wimEnd(event)
    };
  }
  if (wind == 1) {
    wimMove();
  }
}

function wimStart(obj) {
  dWindow = obj;
  obj.firstElementChild.style.cursor = "grabbing";
  dWindow.style.boxShadow = "5px 5px 4px 0px rgba(0,0,0,0.28)";
  wind = 1;
  wimMove();
}
function wimEnd(event) {
  dWindow.firstElementChild.style.cursor = "url('/data/grab.png') 12.5 12.5, grab";
  dWindow.style.boxShadow = "5px 5px 2px 0px rgba(0,0,0,0.28)";
  wind = 0;
  dWindow = undefined;
}

function wimMove() {
  dWindow.style.top = (cooY - 10) + "px";
  dWindow.style.left = (cooX - (dWindow.offsetWidth / 2)) + "px";
}

//coordinate aktualisiren
addEventListener('mousemove', coords, false);
function coords(event) {
  cooX = event.clientX;
  cooY = event.clientY;
}
