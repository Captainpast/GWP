//javaScript by Captainpast

function exportProject() {
  saveDesk();
  let result = {};
  result.title = projectname;
  result.by = "anonym";
  result.jarCode = 0.3;
  result.resources = [];
  for (let i = 0; i < document.getElementById("storage").children.length; i++) {
    //console.log(document.getElementById("storage").children[i]);
    result.resources[i] = {};
    result.resources[i].type = document.getElementById("storage").children[i].attributes.type.value;
    result.resources[i].title = document.getElementById("storage").children[i].attributes.title.value;

    if (document.getElementById("storage").children[i].attributes.type.value == "html") {
      result.resources[i].code = document.getElementById("storage").children[i].firstElementChild.children.hz2.innerHTML;
    }
    else if (document.getElementById("storage").children[i].attributes.type.value == "js") {
      result.resources[i].code = document.getElementById("storage").children[i].firstElementChild.children.dp2.firstElementChild.innerHTML;
    }
  }
  return result;
}

function importProject(json) {
  console.log(json);
  if (json.jarCode == 0.2) {
    projectname = json.title;
    document.getElementById("storage").innerHTML = "";
    for (let i = 0; i < json.resources.length; i++) {
      createDesk(json.resources[i].title, json.resources[i].type, json.resources[i].code);
    }
  }
  refreshDesk();
}
