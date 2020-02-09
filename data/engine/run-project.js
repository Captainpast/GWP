//javaScript by Captainpast

var projectWindow;
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("start-project").onclick = function () {
    document.getElementById("start-project").style.color = "#fb0303";
    saveDesk();

    let mainHtml;
    for (let i = 0; i < document.getElementById("storage").children.length; i++) {
      if (document.getElementById("storage").children[i].attributes.title.value == "main.html") {
        mainHtml = document.getElementById("storage").children[i].lastElementChild;
      }
    }

    if (projectWindow == undefined) {
      projectWindow = window.open("", "", "width=800, height=600");
    }
    projectWindow.document.write(composeHtml());
    document.getElementById("start-project").style.color = "#bcbcbc";
  }
  document.getElementById("end-project").onclick = function () {
    projectWindow.close();
    projectWindow = undefined;
    document.getElementById("start-project").style.color = "#0ddb00";
  }
});

function composeHtml() {
  cachingDesk();
  let mainHtml;
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.title.value == "main.html") {
      mainHtml = document.getElementById("storage").children[i].lastElementChild;
    }
  }
  let javaScript = "";
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    if (document.getElementById("storage").children[i].attributes.type.value == "js") {
      //finde hed Blocks
      for (let a = 0; a < document.getElementById("storage").children[i].lastElementChild.children[1].firstElementChild.children.length; a++) {
        if (document.getElementById("storage").children[i].lastElementChild.children[1].firstElementChild.children.length != 0) {
          if (document.getElementById("storage").children[i].lastElementChild.children[1].firstElementChild.children[a].attributes.type.value == "hed") {
            let js = composeJS(document.getElementById("storage").children[i].lastElementChild.children[1].firstElementChild.children[a]);
            javaScript = javaScript + js + "\n\n"
          }
        }
      }
    }
  }
  //console.log(javaScript);

  var jsVar = "//javaScript by GWP \n";
  for (let i = 0; i < projectVar.length; i++) {
    jsVar = jsVar + "var " + projectVar[i] +"; \n";
  }

  let html = "<!doctype html>\n<!--HTML by GWP-->\n";
  html = html + '<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html = html + "<title>"+projectname+"</title>\n</head>\n"
  html = html + "<body style='margin:0;background-color:"+mainHtml.children.hz2.style.backgroundColor+"'>\n";
  html = html + mainHtml.children.hz2.innerHTML;
  html = html + "\n</body>\n";
  html = html + "<script>\n" + jsVar + "\n" + javaScript + "</script>";
  //console.log(html);
  return html
}

function composeJS(thisBlock) {
  let js = thisBlock.children[1].innerHTML.split("§");
  for (let b = 1; b < js.length; b++) {
    if (js[b].split("~")[0] == "c") {
      if (thisBlock.lastElementChild.innerHTML != "") {
        js[b] = composeJS(thisBlock.lastElementChild.firstElementChild) + js[b].split(" ")[1];
      }
      else {
        if (js[b].split("~").length > 1) {
          for (let i = 1; i < js[b].split("~").length; i++) {
            js[b] = js[b].split("~")[i];
          }
        } else {
          js[b] = "";
        }
      }
    } else {
      for (let i = 0; i < thisBlock.children.length; i++) {
        if (thisBlock.children[i].attributes.class.value == "input") {
          for (var c = 0; c < thisBlock.children[i].children.length; c++) {
            if (thisBlock.children[i].children[c].attributes.mark != undefined) {
              if (thisBlock.children[i].children[c].attributes.mark.value == js[b].split("~")[0]) {
                if (thisBlock.children[i].children[c].children[0].localName == "input") {
                  if (thisBlock.children[i].children[c].attributes.mark.value.slice(0,1) == "i") {
                    js[b] = "'"+thisBlock.children[i].children[c].children[0].value+"'" + js[b].split("~")[1];
                  } else {
                    js[b] = thisBlock.children[i].children[c].children[0].value + js[b].split("~")[1];
                  }
                }
                else if (thisBlock.children[i].children[c].children[0].localName == "div") {
                  js[b] = composeJS(thisBlock.children[i].children[c].children[0]) + js[b].split("~")[1];
                }
              }
            }
          }
        }
      }
    }
  }
  let ret = "";
  for (let i = 0; i < js.length; i++) {
    ret = ret + js[i];
  }
  return ret
}
