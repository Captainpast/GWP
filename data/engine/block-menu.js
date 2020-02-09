//javaScript by Captainpast

//preparation
var projectVar = [];
var listInput;
var blocks = {
    "attributes": [
      {
        "type":"center",
        "class":"attributes",
        "input":[
          {
            "type":"text",
            "value":"set_text_form"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i1"
          },
          {
            "type":"text",
            "value":"to"
          },
          {
            "type":"input",
            "value":"'Hello World'",
            "id":"i2"
          },
        ],
        "code":"§i1~.innerText =  §i2~ ;§c~"
      },
      {
        "type":"center",
        "class":"attributes",
        "input":[
          {
            "type":"text",
            "value":"change_title_to"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i1"
          },
        ],
        "code":"document.title =  §i1~ ;§c~"
      },
    ],
    "style": [
      {
        "type":"center",
        "class":"style",
        "input":[
          {
            "type":"text",
            "value":"set_cursor_form"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i1"
          },
          {
            "type":"text",
            "value":"to"
          },
          {
            "type":"input",
            "value":"'auto'",
            "list":"cursers",
            "id":"i2"
          },
        ],
        "code":"§i1~.style.cursor =  §i2~ ;§c~"
      },
    ],
    "control": [
      {
        "type":"hed",
        "class":"control",
        "input":[
          {
            "type":"text",
            "value":"if_page_loaded"
          }
        ],
        "code":"document.onload = function(event){ §c~ }; "
      },
      {
        "type":"hed",
        "class":"control",
        "input":[
          {
            "type":"text",
            "value":"if"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i1"
          },
          {
            "type":"text",
            "value":"clicked"
          },
        ],
        "code":"§i1~.addEventListener('click', function () { §c~ });"
      },
      {
        "type":"center",
        "class":"control",
        "input":[
          {
            "type":"text",
            "value":"alert"
          },
          {
            "type":"input",
            "value":"'Hello World'",
            "id":"i1"
          }
        ],
        "code":"alert( §i1~ );§c"
      },
      {
        "type":"var",
        "class":"control",
        "input":[
          {
            "type":"text",
            "value":"element_with_id"
          },
          {
            "type":"input",
            "value":"''",
            "list":"id",
            "id":"i1"
          }
        ],
        "code":"document.getElementById(§i1~)"
      },
    ],
    "var": [
      {
        "type":"HTML",
        "code":"<button type='button' onclick='varAdd();' id='var-add'>+</button><button type='button' onclick='varRemove();' id='var-del'>-</button>"
      },
      {
        "type":"center",
        "class":"var",
        "input":[
          {
            "type":"text",
            "value":"set"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i1"
          },
          {
            "type":"text",
            "value":"to"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i2"
          },
        ],
        "code":"§i1~ = §i2~ ;§c~"
      },
      {
        "type":"center",
        "class":"var",
        "input":[
          {
            "type":"text",
            "value":"var-add"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i1"
          },
          {
            "type":"text",
            "value":"var-by"
          },
          {
            "type":"input",
            "value":"''",
            "id":"i2"
          },
        ],
        "code":"§i1~ = §i2~ ;§c~"
      },
      {
        "type":"var",
        "class":"var",
        "input":[
          {
            "type":"text",
            "value":"var"
          },
          {
            "type":"input",
            "value":"''",
            "list":"var",
            "id":"v1"
          }
        ],
        "code":"var§v1~"
      },
    ],
  };

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("input", resize);
});

function loadBlocks(which) {
  let html = "";
  for (let i = 0; i < blocks[which].length; i++) {
    if (blocks[which][i].type != "HTML") {
      let input = "";
      for (let a = 0; a < blocks[which][i].input.length; a++) {
        if (blocks[which][i].input[a].type == "text") {
          input = input + "<span value='"+translate(blocks[which][i].input[a].value)+"'></span>";
        }
        else if (blocks[which][i].input[a].type == "input") {
          input = input + "<div style='display:inline;border-radius:5px;' type='input' mark='"+blocks[which][i].input[a].id+"'><input class='blockInput' type='text' value="+blocks[which][i].input[a].value+" onmousedown='noDrage()'>";
          if (blocks[which][i].input[a].list != undefined) {
            input = input + "<button onmousedown='noDrage()' onclick='openBlockList(this.previousElementSibling, "+'"'+blocks[which][i].input[a].list+'"'+")'; type='button'></button>"
          }
          input = input + "</div>";
        }
      }
      html = html + "<div onmousedown='blockClick(event)' class='draggabl block "+blocks[which][i].class+"' type='"+blocks[which][i].type+"'>";
      html = html + "<div class='top'></div>";
      html = html + "<div class='doCode'>"+blocks[which][i].code+"</div>";
      html = html + "<div class='input'>"+input+"</div>";
      html = html + "<div class='buttom'></div>";
      html = html + "<div class='content'></div>"
      html = html + "</div>"
    } else {
      html = html + blocks[which][i].code;
    }
  }
  document.getElementById("blockzone").innerHTML = html;
}

function varAdd() {
  let html = "";
  html = html + '<p styl="var-add">'+translate("add_variable")+'</p>';
  html = html + '<input type="text" id="var-toadd" placeholder="'+translate("varname")+'">';
  html = html + '<button type="button" styl="var-add" onclick="';
  html = html + "projectVar[projectVar.length] = 'var'+document.getElementById('var-toadd').value;";
  html = html + 'closeWindow(this.offsetParent);';
  html = html + '">'+translate("add")+'</button>';

  openWindow(translate("add_variable"), 300, 150, html);
}
function varRemove() {
  let html = "";
  let height = 80;
  html = html + '<p styl="var-add">'+translate("remove_variable")+'</p>';

  for (let i = 0; i < projectVar.length; i++) {
    html = html + '<button styl="var-rem" onclick="projectVar = ArrayWithout(projectVar, '+i+');closeWindow(this.offsetParent);">'+projectVar[i].slice(3)+'</button>';
    height = height + 26;
  }

  openWindow("Remove Variable", 300, height, html);
}

function openBlockList(who, which) {
  listInput = who;
  let list = [];

  if (which == "cursers") {
    list = ["none", "auto", "alias", "cell", "?-resize", "copy", "crosshair", "grab", "grabbing", "help", "not-allowed", "pointer", "progress", "text", "vertical-text", "wait", "zoom-in", "zoom-out"];
  } else if (which == "id") {
    list = ["WIP"];
  }
  else if (which == "var") {
    for (let i = 0; i < projectVar.length; i++) {
      list[list.length] = projectVar[i].slice(3);
    }
  }

  let html = "";
  for (let i = 0; i < list.length; i++) {
    html = html + "<p onclick='" +
                  'listInput.attributes.value.value = "'+list[i]+'"' +
                  "'>"+list[i]+"</p>";
  }

  rhigtClik(html, event.pageX, event.pageY);
}

function resize() {
  for (var i = 0; i < event.target.classList.length; i++) {
    if (event.target.classList[i] == "blockInput"){
      var select = document.createElement("span");
      select.id = "resizeSelect";
      select.style.fontSize = "11px";
      select.innerText = event.target.value;
      document.body.appendChild(select);
      if (select.offsetWidth > 30) {
        if (select.offsetWidth > 80) {
          event.target.style.width = "80px";
        } else {
          event.target.style.width = select.offsetWidth+"px";
        }
    } else {
      event.target.style.width = "30px";
    }
      document.body.removeChild(select);
      event.target.attributes.value.value = event.target.value;
    }
  }
}
