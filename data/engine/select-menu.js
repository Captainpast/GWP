//javaScript by Captainpast
var openDock = "";
var dragingSel = undefined;
var selisdrag = 0;
var activeStorage = undefined;

document.addEventListener("DOMContentLoaded", function () {
  refreshDesk();

  document.getElementById("file-add").onclick = function (event) {
    let html =  "<p>"+translate("add_file")+":</p>" +
                '<input type="text" id="addFile_name" placeholder="'+translate("filename")+'">' +
                '<input type="radio" name="file" value="html" checked><label>HTML</label>' +
                '<input type="radio" name="file" value="js"><label>javaScript</label>' +
                '<button type="button" onclick="'+
                "let result = '';" +
                "let radio = document.getElementsByName('file');" +
                "for (let i = 0; i < radio.length; i++) {" +
                " if (radio[i].checked == true) {" +
                "   result = radio[i].value;" +
                " }" +
                "}" +
                "if (document.getElementById('addFile_name').value != '') {" +
                "  createDesk(document.getElementById('addFile_name').value, result);" +
                "  closeWindow(this.offsetParent);" +
                "}" +
                '">'+translate("add")+'</button>';

    openWindow(translate("add_file"), 270, 160, html);
  }
});

function refreshDesk() {
  document.getElementById("select").innerHTML = "";
  var html = "";
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    html = html + "<li onclick='loadDesk(this)' onmousedown='selectMenu(event, this)' onmouseover='selectDrag(event, this)'><p title='"+document.getElementById("storage").children[i].attributes.title.value+"'></p></li>"
  }
  document.getElementById("select").innerHTML = html;
  loadDesk(document.getElementById("select").children[0])
}

function loadDesk(id) {
  saveDesk()
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.title.value == id.firstElementChild.title) {
      document.getElementById("desk").innerHTML = document.getElementById("storage").children[i].lastElementChild.innerHTML;
      if (document.getElementById("storage").children[i].attributes.type.value == "js") {
        loadBlocks("attributes");
      }
      else if (document.getElementById("storage").children[i].attributes.type.value == "html") {
        loadElements("normal");
        selectetElem = document.getElementById("hz2");
        selectElementHZ();
      }
    }
  }
  for (let i = 0; i < document.getElementById("select").children.length; i++) {
    document.getElementById("select").children[i].classList.remove("active");
  }
  id.classList.add("active");
  openDock = id.innerText;
}

function saveDesk() {
  activeStorage = undefined;
  var newobj = document.createElement("div");
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.title.value == openDock) {
      document.getElementById("storage").children[i].innerHTML = "";
      document.getElementById("storage").children[i].appendChild(newobj);
      document.getElementById("storage").children[i].lastElementChild.innerHTML = document.getElementById("desk").innerHTML;
    }
  }
}

function cachingDesk() {
  var newobj = document.createElement("div");
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.title.value == openDock) {
      document.getElementById("storage").children[i].appendChild(newobj);
      document.getElementById("storage").children[i].lastElementChild.innerHTML = document.getElementById("desk").innerHTML;
    }
  }
}

function undoDesk() {
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.title.value == openDock) {
      if (activeStorage == undefined) {
        activeStorage = document.getElementById("storage").children[i].children.length -2;
      } else {
        activeStorage = activeStorage -1;
      }
      document.getElementById("desk").innerHTML = document.getElementById("storage").children[i].children[activeStorage].innerHTML;
    }
  }
}

function redoDesk() {
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.title.value == openDock) {
      if (activeStorage == undefined || activeStorage > (document.getElementById("storage").children[i].children.length -2)) {
      } else {
          activeStorage = activeStorage +1;
          document.getElementById("desk").innerHTML = document.getElementById("storage").children[i].children[activeStorage].innerHTML;
      }
    }
  }
}

function createDesk(name, type, input) {
  //console.log(name +", "+ type);
  if (input == undefined) {
    input = "";
  }
  obj = document.createElement("div");
  obj.setAttribute("title", name);
  obj.setAttribute("type", type);

  if (type == "html") {
    obj.innerHTML = '<div>' +
                    '<div id="hz1">' +
                    '  <ul class="typbar element">' +
                    '    <button id="normal" onclick="loadElements('+"'normal'"+')" type="button">Normal</button>' +
                    '    <button id="special" onclick="loadElements('+"'special'"+')" type="button">Special</button>' +
                    '  </ul>' +
                    '  <div id="elementzone"> </div>' +
                    '</div>' +
                    '<div id="hz2" onmousedown="selectElementHZ(event)" style="background:#ffffff;" docname="">' +
                    input +
                    '</div>' +
                    '<div id="hz3">' +
                    '  <h2 id="elem-name">DIV</h2>' +
                    '  <button type="button" id="elem-delete">delete</button>' +
                    '  <form id="elem-attri"> </form>' +
                    '  <button type="button" id="attri-add">+</button>' +
                    '</div>' +
                    '</div>';
  }
  else if (type == "js") {
    obj.innerHTML = '<div>' +
                    '  <div id="dp1">' +
                    '    <ul class="typbar block">' +
                    '      <button id="attributes" onclick="loadBlocks('+"'attributes'"+')" type="button">Attributes</button>' +
                    '      <button id="style" onclick="loadBlocks('+"'style'"+')" type="button">Style</button>' +
                    '      <button id="control" onclick="loadBlocks('+"'control'"+')" type="button">Control</button>' +
                    '      <button id="var" onclick="loadBlocks('+"'var'"+')" type="button">Variables</button>' +
                    '    </ul>' +
                    '    <div id="blockzone"> </div>' +
                    '  </div>' +
                    '  <div id="dp2">' +
                    '    <div id="blockfield">' +
                          input +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
  }



  document.getElementById("storage").appendChild(obj);
  refreshDesk();
}

function deskRemove(type, target) {
  if (type == 1) {
    let html = "";
    html = html + '<p>'+translate("do_you_want_to_delete_the_file")+'</p>';
    html = html + '<button type="button" class="we-elem-re-button" onclick="';
    html = html + "deskRemove(2, "+"'"+ target +"'"+");";
    html = html + "closeWindow(this.offsetParent);";
    html = html + '">'+translate("delete")+'</button>';
    html = html + '<button type="button" class="we-elem-ca-button" onclick="closeWindow(this.offsetParent)">'+translate("cancel")+'</button>';

    openWindow(translate("delete_file"), 300, 130, html);
  } else if (type == 2) {
    for (let i = 0; i < document.getElementById("storage").children.length; i++) {
      if (document.getElementById("storage").children[i].attributes.title.value == target) {
        document.getElementById("storage").children[i].parentElement.removeChild(document.getElementById("storage").children[i]);
        refreshDesk();
      }
    }
  }
}

function selectMenu(event, target) {
  if (event.button == 2) {
    let html = "";
    if (target.firstElementChild.title != "main.html") {
      html = html + "<p onclick='deskRemove(1, "+'"'+ target.firstElementChild.title +'"'+")'>"+translate("delete")+"</p>";
    }
    html = html + "<p onclick='" +
                  "'>"+translate("rename")+"</p>";

    rhigtClik(html, event.pageX, event.pageY);
  }
}

function selectDrag(event, target) {
  if (event.buttons == 1 && selisdrag == 0) {
    console.log(target);
    selisdrag = 1;
    dragingSel = target;
    if ((dragingSel.offsetLeft + 5) > event.clientX) {
      console.log("left");
    } else if ((dragingSel.offsetLeft + dragingSel.offsetWidth) > event.clientX) {
      console.log("right");
    }
  }
}
