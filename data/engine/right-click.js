//javaScript by Captainpast
var alreadyRightClicked = false;

document.addEventListener("DOMContentLoaded", function () {
 document.getElementById("blockfield").addEventListener("mousedown", function (event) {
   if (event.which == 3 && alreadyRightClicked == false) {
     let html = "";
     html = html + "<p></p>";

     //rhigtClik(html, event.pageX, event.pageY);
   }
 });
});

function rhigtClik(html, x, y) {
  let obj = document.createElement("div");
  obj.id = "rhigtClik-dropdown";
  obj.innerHTML = html;

  obj.style.left = x + "px";
  obj.style.top = y + "px";

  obj.style.height = "0px";
  document.body.appendChild(obj);
  alreadyRightClicked = true;
  setTimeout(function () {
    let height = 0;
    for (let i = 0; i < obj.children.length; i++) {
      height = height + obj.children[i].offsetHeight;
    }
    obj.style.height = height + "px";
  }, 10);

  setTimeout(function () {
    document.body.onmousedown = function (event) {
      document.getElementById("rhigtClik-dropdown").style.transition = "height 0.2s, top 0.3s, left 0.3s"
      document.getElementById("rhigtClik-dropdown").style.height = "0px";
      document.getElementById("rhigtClik-dropdown").style.left = event.pageX + "px";
      document.getElementById("rhigtClik-dropdown").style.top = event.pageY + "px";

      setTimeout(function () {
        document.getElementById("rhigtClik-dropdown").parentElement.removeChild(document.getElementById("rhigtClik-dropdown"));
      }, 200);

      alreadyRightClicked = false;
      document.body.onmousedown = null;
    };
  }, 10);
}

//rechs click sperren
document.oncontextmenu = click;
function click (e) {
if ((e.type == "contextmenu") || (e.button == 2) || (e.which == 3))
  return false;
};
