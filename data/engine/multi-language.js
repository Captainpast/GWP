//javaScript by Captainpast
var al = "en";

var languages = {
  "de" : {
    "user":"Benutzer",
    "project":"Projekt",
    "settings":"Einstellungen",
    "log_in":"anmelden",
    "profile":"Profil",
    "save":"speichern",
    "undo":"rückgängig",
    "redo":"wiederherstellen",
    "export_project":"Projekt exportieren",
    "import_project":"Projekt importieren",
    "export_code":"Code exportieren",
    "ctrl":"strg",
    "undefined":"nicht festgelegt",
    "languages":"Sprachen",
    "add_variable":"Variable hinzufügen",
    "remove_variable":"Variable entfernen",
    "add":"hinzufügen",
    "set_text_form":"setze text von",
    "to":"zu",
    "change_title_to":"ändern Titel zu",
    "set_cursor_form":"setze Mauszeiger von",
    "if_page_loaded":"wenn Seite geladen",
    "if":"wenn",
    "clicked":"geklickt",
    "alert":"melde",
    "element_with_id":"Element mit id",
    "set":"setze",
    "var-add":"ändere",
    "var-by":"um",
    "var":"var",
    "delete":"löschen",
    "copy":"kopieren",
    "add_atribue":"Attribute hinzufügen",
    "delete_element":"Element entfernen",
    "do_you_want_to_delete_the_element":"Möchtest du das Element löschen?",
    "cancel":"abbrechen",
    "info":"Info",
    "add_file":"Datei hinzufügen",
    "filename":"Dateiname",
    "varname":"Variablennamen",
    "customname":"benutzerdefinierter Namen",
    "rename":"umbenenen",
    "delete_file":"Datei löschen",
    "do_you_want_to_delete_the_file":"Möchtest du die Datei löschen?",
  },
  "en" : {
    "user":"User",
    "project":"Project",
    "settings":"Settings",
    "log_in":"log in",
    "profile":"Profile",
    "save":"save",
    "undo":"undo",
    "redo":"redo",
    "export_project":"export project",
    "import_project":"import project",
    "export_code":"export code",
    "ctrl":"ctrl",
    "undefined":"undefined",
    "languages":"languages",
    "add_variable":"Add variable",
    "remove_variable":"Remove variable",
    "add":"add",
    "set_text_form":"set text form",
    "to":"to",
    "change_title_to":"change title to",
    "set_cursor_form":"change title to",
    "if_page_loaded":"if page loaded",
    "if":"if",
    "clicked":"clicked",
    "alert":"alert",
    "element_with_id":"element with id",
    "set":"set",
    "var-add":"add",
    "var-by":"by",
    "var":"var",
    "delete":"delete",
    "copy":"copy",
    "add_atribue":"Add Attribute",
    "delete_element":"Delete Element",
    "do_you_want_to_delete_the_element":"Do you want to delete the Element?",
    "cancel":"cancel",
    "info":"info",
    "add_file":"Add file",
    "filename":"filename",
    "varname":"variable name",
    "customname":"custom name",
    "rename":"rename",
    "delete_file":"delete file",
    "do_you_want_to_delete_the_file":"Do you want to delete the file?",
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (getCookie("language") == "") {
    if (navigator.language != "") {
      if (languages[navigator.language] != undefined) {
        al = navigator.language;
      }
    }
  } else {
    al = getCookie("language");
  }
  languageChanged();
});

function languageChanged(activeLanguage) {
  if (activeLanguage != undefined) {
    al = activeLanguage;
  }
  if (languages[al]!= undefined) {
    document.cookie = "language="+al+"; path=/jar";
    document.getElementById("navbar-user").firstElementChild.innerText = languages[al].user;
    document.getElementById("navbar-project").firstElementChild.innerText = languages[al].project;
    document.getElementById("navbar-settings").firstElementChild.innerText = languages[al].settings;

    return "success";
  } else {
    return "error";
  }
}

function translate(what) {
  if (languages[al][what] != undefined) {
    return languages[al][what];
  } else {
    if (languages["en"][what] != undefined) {
      return languages["en"][what];
    } else {
      return what;
    }
  }
}
