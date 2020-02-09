//javaScript by Captainpast

//preparation
var selectetElem;
var elements = {
    "normal": [
      {
        "name":"div",
        "create": {
          "code":'<div style=""></div>'
        }
      },
      {
        "name":"p",
        "create": {
          "code":"<p></p>"
        }
      },
      {
        "name":"button",
        "create": {
          "code":'<button name=""></button>'
        }
      },
      {
        "name":"input",
        "create": {
          "code":'<input name="" type="text" value="">'
        }
      },
    ],
    "special": [
      {
        "name":"test",
        "create": {
          "code":'<div style="padding: 10px;\nheight: 200px;\nbackground: aquamarine;\nborder: black solid;"></div>'
        }
      },
    ],
  };

function loadElements(which) {
  let html = "";
  for (let i = 0; i < elements[which].length; i++) {
    html = html + "<div class='"+which+" delement elem' code='"+elements[which][i].create.code+"'><p>"+elements[which][i].name+"</p></div>";
  }
  document.getElementById("elementzone").innerHTML = html;
}

function elementAddAttribut(which) {
  selectetElem.setAttribute(which, "");
  selectElementHZ();
}

function selectElementHZ(event) {
  document.getElementById("attri-add").style.display = "block";
  document.getElementById("attri-add").onclick = function (event) {
    if (selectetElem.id != "hz2") {
      let html = "";
      html = html + '<p>'+translate("add_atribue")+'t</p>';
      html = html + '<button class="type2" onclick="'+"elementAddAttribut('style');closeWindow(this.offsetParent);"+'">style</button>';
      html = html + '<button class="type2" onclick="'+"elementAddAttribut('id');closeWindow(this.offsetParent);"+'">id</button>';
      html = html + '<button class="type2" onclick="'+"elementAddAttribut('class');closeWindow(this.offsetParent);"+'">class</button>';
      html = html + '<input type="text" id="attri-toadd" placeholder="'+translate("customname")+'">';
      html = html + '<button type="button" onclick="';
      html = html + "elementAddAttribut(document.getElementById('attri-toadd').value);";
      html = html + 'closeWindow(this.offsetParent);';
      html = html + '">'+translate("add")+'</button>';

      openWindow(translate("add_atribue"), 300, 220, html);
    }
  }
  if (event != undefined){
    selectetElem = event.target;
  }
  let html = "";
  if (selectetElem.id == "hz2") {
    document.getElementById("elem-name").innerText = "DOCUMENT";
    document.getElementById("elem-delete").style.display = "none";
    document.getElementById("attri-add").style.display = "none";
    html = html + "<span>title:</span><input type='text' path='attributes' name='docname' value='"+projectname+"'>"
    html = html + "<span>background:</span><input type='color' path='style' name='backgroundColor' value='"+rgbToHex(selectetElem.style.backgroundColor)+"'>"

    if (selectetElem.children.length != 0) {
      html = html + "<span>children:</span>"
      for (var i = 0; i < selectetElem.children.length; i++) {
        html = html + "<button class='children' onclick='selectetElem = selectetElem.children["+i+"]; selectElementHZ();'>"+selectetElem.children[i].localName;
        if (selectetElem.children[i].id != "") {
          html = html + "#"+selectetElem.children[i].id;
        }
        if (selectetElem.children[i].innerText != "") {
          if (selectetElem.children[i].innerText.length < 11) {
            html = html + " ["+selectetElem.children[i].innerText+"]";
          } else {
            html = html + " ["+selectetElem.children[i].innerText.slice(0, 8)+"...]";
          }
        }
        html = html + "</button>";
      }
    }
  } else {
    document.getElementById("elem-name").innerText = selectetElem.nodeName;

    if (selectetElem.parentElement.id != "hz2") {
      html = html + "<button class='parentElement' onclick='selectetElem = selectetElem.parentElement; selectElementHZ();'>"+selectetElem.parentElement.localName+"</button>";
    } else {
      html = html + "<button class='parentElement' onclick='selectetElem = selectetElem.parentElement; selectElementHZ();'>document</button>";
    }

    for (var i = 0; i < selectetElem.attributes.length; i++) {
      if (selectetElem.attributes[i].name == "style") {
        html = html + "<span>style:</span><textarea path='attributes' name='"+selectetElem.attributes[i].name+"' rows='8'>"+selectetElem.attributes[i].value+"</textarea>";
      } else {
        html = html + "<span>"+selectetElem.attributes[i].name+":</span><input type='text' path='attributes' name='"+selectetElem.attributes[i].name+"' value='"+selectetElem.attributes[i].value+"'>";
      }
    }
    html = html + "<span>text:</span><input type='text' path='' name='innerText' value='"+selectetElem.innerText+"'>"
    if (selectetElem.children.length != 0) {
      html = html + "<span>children:</span>"
      for (var i = 0; i < selectetElem.children.length; i++) {
        html = html + "<button class='children' onclick='selectetElem = selectetElem.children["+i+"]; selectElementHZ();'>"+selectetElem.children[i].localName;
        if (selectetElem.children[i].id != "") {
          html = html + "#"+selectetElem.children[i].id;
        }
        if (selectetElem.children[i].innerText != "") {
          if (selectetElem.children[i].innerText.length < 11) {
            html = html + " ["+selectetElem.children[i].innerText+"]";
          } else {
            html = html + " ["+selectetElem.children[i].innerText.slice(0, 8)+"...]";
          }
        }
        html = html + "</button>";
      }
    }
    document.getElementById("elem-delete").style.display = "block";
    document.getElementById("elem-delete").onclick = function(event) {
      let html = "";
      html = html + '<p>'+translate("do_you_want_to_delete_the_element")+'</p>';
      html = html + '<button type="button" class="we-elem-re-button" onclick="';
      html = html + "selectetElem.parentElement.removeChild(selectetElem);";
      html = html + "selectetElem = document.getElementById('hz2');";
      html = html + "selectElementHZ();closeWindow(this.offsetParent);";
      html = html + '">'+translate("delete")+'</button>';
      html = html + '<button type="button" class="we-elem-ca-button" onclick="closeWindow(this.offsetParent)">'+translate("cancel")+'</button>';

      openWindow(translate("delete_element"), 300, 130, html);
    }
    document.getElementById("elem-name").onmousedown = function(event) {
      if (event.button == 0 && selectetElem.id != "hz2") {
        let obj = selectetElem;
        let html = "";

        html = html + "<"+ obj.localName;
        for (let i = 0; i < obj.attributes.length; i++) {
          html = html + " "+ obj.attributes[i].name +'="'+ obj.attributes[i].value +'"';
        }
        html = html + ">"+ obj.innerText +"</"+ obj.localName +">";

        elemid = elemid + 1;
        let input = "<div class='special elem' id='element("+elemid+")' code='"+html+"'><p>"+obj.localName+"</p></div>";
        //fügt die Kopie ein
        document.getElementById("hz1").innerHTML = document.getElementById("hz1").innerHTML + input;
        elmetStart(document.getElementById("element("+elemid+")"));
      }
    }
  }

  document.getElementById("elem-attri").innerHTML = html;
  document.getElementById("elem-attri").addEventListener("input", elemChange);
}
function elemChange(event) {
  if (event.target.attributes.path.value == '') {
    selectetElem[event.target.name] = event.target.value;
  } else if (event.target.attributes.path.value == 'attributes') {
    selectetElem[event.target.attributes.path.value][event.target.name].value = event.target.value;
    if (event.target.name == "docname") {
      projectname = event.target.value;
    }
  } else {
    selectetElem[event.target.attributes.path.value][event.target.name] = event.target.value;
  }
  cachingDesk();
}
