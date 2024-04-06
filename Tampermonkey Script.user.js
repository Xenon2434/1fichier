// ==UserScript==
// @name        	1fichier Copy Links
// @match       	https://*.1fichier.com/*
// @icon        	https://www.google.com/s2/favicons?sz=64&domain=1fichier.com
// @require	    	https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require     	https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js
// @resource    	IMPORTED_CSS https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css
// @resource		  https://fonts.googleapis.com/icon?family=Roboto;
// @import			  url(https://fonts.googleapis.com/icon?family=Roboto);
// @grant       	GM_getResourceText
// @grant       	GM_addStyle
// @font-face 	  {font-family: 'Roboto'; src: url('https://fonts.googleapis.com/icon?family=Roboto'); }
// ==/UserScript==

const my_css = GM_getResourceText("IMPORTED_CSS");
GM_addStyle(my_css);

const buttonSpan = document.createElement("div");
buttonSpan.className = 'buttonContainer';
buttonSpan.innerHTML = `<button id="filterButton" class="" style="line-height: 14px !important;font-weight: 700 !important; font-family: Roboto !important;float:left; outline: 0; text-align: center; cursor: pointer; padding: 0px 16px; border-radius: 6px; min-width: 80px; height: 32px; background-color: rgb(0, 120, 212); color: rgb(255, 255, 255) !important; font-size: 14px;  box-sizing: border-box; border: 1px solid rgb(0, 120, 212); :hover { background-color: rgb(16, 110, 190); border: 1px solid rgb(16, 110, 190);}">Get Forum Text</button>`;
$('.buttonContainer').attr(
    "style",
    " float:right !important;"
);
var otherButtonsDiv = document.querySelector("table.premium");
otherButtonsDiv.prepend(buttonSpan);

$(document).ready(function() {
    $("#filterButton").click(function() {
        ButtonClickAction();
    });
});

function ButtonClickAction() {
    $("table.premium").before(
        '<div id="tableDataModal" class="modal" style="max-width: 45vw !important;width: 45vw !important;border-radius: 0px !important;color: #000 !important;top:-15vh !important;"><p id="modalContent" style="padding-bottom: 3px !important;font-family: Roboto !important;"></p></div>'
    );
    var full_text = '<span style="font-family: Roboto !important;"><h2 style="margin-bottom:5px !important;font-family: Roboto !important;">Video Links</h4><hr><br>';

    $("tr").each(function(index) {
        var firstColumn = $(this).find("td.normal:eq(0):not(.titre) ").text();
        var thirdColumn = $(this).find("td.normal:eq(2):not(.titre) ").text();
        if (firstColumn != "") {
            full_text += "<b>" + firstColumn + "</b>: " + thirdColumn + "<br>";
        }

    });
    full_text += "</span>";


    // Populate the modal with the combined text
    $("#modalContent").html(full_text);

    // Open the modal
    $("#tableDataModal").modal({
        closeClass: "icon-remove",
        closeText: "❌",
    });
    $('.modal a.close-modal[class*="icon-"]').attr(
        "style",
        " top: 10px;  right: 10px;  width: 20px;  height: 20px;  color: #d9443f !important; line-height: 1.25;font-weight: bold;  text-align: center;  text-decoration: none;  text-indent: 0;  background: #fff !important;  border: 0px !important; -webkit-border-radius: 26px; -moz-border-radius:26px; -o-border-radius: 26px;-ms-border-radius: 26px; -moz-box-shadow:0px 0px 0px rgba(0,0,0,0) !important; -webkit-box-shadow: 0px 0px 0px rgba(0,0,0,0) !important;  box-shadow: 0px 0px 0px rgba(0,0,0,0) !important;"
    );
}
