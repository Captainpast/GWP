//javaScript by Captainpast

var projectname = "programm"

document.addEventListener("DOMContentLoaded", function () {
   console.log("%cWarning!"+"%c\n• This is the developer area of ​​the browsers and only for the manipulation of special elements\n• Do not copy this code",
   "font-size:25px; color:#fb0303; width:100%; font-family: Arial, Helvetica, sans-serif;",
   "font-size:15px; color:#000000; width:100%; font-family: Arial, Helvetica, sans-serif;"
   );
   document.getElementById("navbar-user").onclick = function (event) {
    let html = document.createElement("div");
    html.id = "navbar-dropdown";
    html.innerHTML =  html.innerHTML +
                      "<p>"+translate("log_in")+"</p>" +
                      "<p>"+translate("profile")+"</p>";

    html.style.left = document.getElementById("navbar-user").offsetLeft + "px";

    navbarDropdown(html);
   };
   document.getElementById("navbar-project").onclick = function (event) {
    let html = document.createElement("div");
    html.id = "navbar-dropdown";
    html.innerHTML =  html.innerHTML +
                      "<p hoch='"+translate("ctrl")+"+s'>"+translate("save")+"</p>" +
                      "<p hoch='"+translate("ctrl")+"+z'>"+translate("undo")+"</p>" +
                      "<p hoch='"+translate("ctrl")+"+y'>"+translate("redo")+"</p>" +
                      "<div class='li'></div>" +
                      "<p>"+translate("export_project")+"</p>" +
                      "<p>"+translate("import_project")+"</p>" +
                      "<div class='li'></div>" +
                      "<p>"+translate("export_code")+"</p>";

    html.children[0].onclick = function () {saveDesk()};
    html.children[1].onclick = function () {undoDesk()};
    html.children[2].onclick = function () {redoDesk()};
    html.children[4].onclick = function () {
      var data = exportProject();
      console.log(data);

      downloadFile(data.title+".gwf", JSON.stringify(data), "text/gwp");
    };
    html.children[5].onclick = function () {
      let obj = openFile(".gwf");
      obj.onchange = function(event) {
        //console.log(obj.files[0]);
        let reader = new FileReader();
        reader.readAsText(obj.files[0], "UTF-8");
        reader.onload = function (event) {
          importProject(JSON.parse(event.target.result))
          document.body.removeChild(obj);
        }
      }
    };
    html.children[7].onclick = function () {
      let html = "";
      html = html + '<p>Code:</p>';
      html = html + '<textarea rows="27" cols="110" readonly>'+composeHtml()+'</textarea>';


      openWindow("Export code", 800, 500, html);
    };

    html.style.left = document.getElementById("navbar-project").offsetLeft + "px";

    navbarDropdown(html);
   };
   document.getElementById("navbar-settings").onclick = function (event) {

    let html = document.createElement("div");
    html.id = "navbar-dropdown";
    html.innerHTML =  html.innerHTML +
                      "<p>"+translate("languages")+"</p>" +
                      "<p>"+translate("info")+"</p>";

    html.children[0].onclick = function () {
      let html = "";
      html = html + '<button class="type2" onclick="'+"languageChanged('de');closeWindow(this.offsetParent);"+'">Deutsch</button>';
      html = html + '<button class="type2" onclick="'+"languageChanged('en');closeWindow(this.offsetParent);"+'">English</button>';


      openWindow(translate("languages"), 300, 85, html);
    };

    html.style.left = document.getElementById("navbar-settings").offsetLeft + "px";

    navbarDropdown(html);
   };
});

function navbarDropdown(obj) {
  obj.style.top = "45px";
  obj.style.height = "0px";
  document.body.appendChild(obj);
  setTimeout(function () {
    let height = 0;
    for (let i = 0; i < obj.children.length; i++) {
      height = height + obj.children[i].offsetHeight;
    }
    obj.style.height = height + "px";
  }, 10);

  setTimeout(function () {
    document.body.onclick = function () {
      document.getElementById("navbar-dropdown").style.height = "0px";
      setTimeout(function () {
        document.getElementById("navbar-dropdown").parentElement.removeChild(document.getElementById("navbar-dropdown"));
      }, 200);

      document.body.onclick = null;
    };
  }, 10);
}

window.onbeforeunload = function(event) {
  event.preventDefault();
  event.returnValue = "";
};

function rgbToHex(rgb) {
  rgb = rgb.slice(4).slice(0,-1).split(",");
  let r = parseInt(rgb[0]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2]);
 return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function ArrayWithout(array, without) {
  let ret = [];
  let a = 0;
  for (let i = 0; i < array.length; i++) {
    if (i != without) {
      if (a < array.length) {
        ret[i] = array[a];
      }
    } else {
      a++;
      if (a < array.length) {
        ret[i] = array[a];
      }
    }
    a++;
  }
  return ret;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function downloadFile(filename, text, type) {
  if (type == undefined) {
    type = "text/plain";
  }
  let obj = document.createElement("a");
  obj.setAttribute("href", "data:"+type+";charset=UTF-8," + encodeURIComponent(text));
  obj.setAttribute("download", filename);
  obj.style.display = "none";
  document.body.appendChild(obj);

  obj.click();

  document.body.removeChild(obj);
}

function openFile(accept, multiple) {
  var obj = document.createElement('input');
  obj.setAttribute("type", "file");
  obj.setAttribute("accept", accept);
  if (multiple == true) {
    obj.setAttribute("multiple", "multiple");
  }
  obj.style.display = "none";
  document.body.appendChild(obj);

  obj.click();

  return obj;
}

//serverRequest({
//  "URL": "http://127.0.0.1:1880/jar",
//  "data": {
//    "test": "lol",
//    "next": "ok",
//  },
//  "onresult": function (event) {
//    console.log(event);
//  },
//  "onerror": function () {
//    console.log("hi");
//  }
//});

function serverRequest(data) {
  //console.log(data);
  var connection = new XMLHttpRequest();
  var url;
  if (data.data != undefined) {
    let search = "?";
    for (var i = 0; i < Object.keys(data.data).length; i++) {
      search = search + Object.keys(data.data)[i] + "=" + data.data[Object.keys(data.data)[i]] + "&";
    }
    url = data.URL + search;
  }
  connection.open("GET", url, true);
  connection.withCredentials = true;
  connection.send();
  connection.onload = function (event) {data.onresult(event)};
  if (data.onerror != undefined) {
    connection.onerror = function (event) {data.onerror(event)};
  } else {
    connection.onerror = function (event) {
      console.log(event);
    }
  }
  //console.log(connection);
}
