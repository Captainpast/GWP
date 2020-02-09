//javaScript by Captainpast
addEventListener("keydown", keydown);
 function keydown(event) {
   //console.log(event);
   if (event.ctrlKey == true && event.keyCode == 83){
     event.preventDefault();
     saveDesk();
   }
   else if (event.ctrlKey == true && event.keyCode == 90) {
     event.preventDefault();
     undoDesk();
   }
   else if (event.ctrlKey == true && event.keyCode == 89) {
     event.preventDefault();
     redoDesk();
   }
 }
