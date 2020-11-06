function addplayer() {
	if (document.getElementById("playername").value == "") {
		document.getElementById("setuperror").innerHTML = "Username cannot be empty!";
	} else if (document.getElementById("playername").value == "Free Parking") {
		document.getElementById("setuperror").innerHTML = "Free Parking is an invalid username!";
	} else if (document.getElementById("playername").value == "Management") {
		document.getElementById("setuperror").innerHTML = "Management is an invalid username!";
	} else if (document.getElementById("playername").value == "Bank") {
		document.getElementById("setuperror").innerHTML = "Bank is an invalid username!";
	} else if (playerlist.includes(document.getElementById("playername").value)) {
		document.getElementById("setuperror").innerHTML = document.getElementById("playername").value + " already exists!";
	} else {
		playerlist.push(document.getElementById("playername").value);
		document.getElementById("playername").value = "";
		document.getElementById("playername").placeholder = "Username " + (playerlist.length + 1);
		document.getElementById("setuperror").innerHTML = "";
	}
}
function submitsetup(x) {
	document.getElementById("money").innerHTML = "<h1>Game in progress</h1>";
	var i = 0;
	do {
		playermoney.push(1500);
		document.getElementById("money").innerHTML = document.getElementById("money").innerHTML + "<p>" + playerlist[i] + ": " + playermoney[i] + " M</p>";
		document.getElementById("playernav").innerHTML = document.getElementById("playernav").innerHTML + "<li><a href='#transfermoney' onClick='starttransfer(" + i + ")'>" + playerlist[i] + "</a></li>"
		i++;
	} while (i < playerlist.length);
	if (x) {
		playerlist.push("Free Parking");
		playermoney.push(0);
		document.getElementById("money").innerHTML = document.getElementById("money").innerHTML + "<p>" + playerlist[i] + ": " + playermoney[i] + " M</p>";
	}
	document.getElementById("playernav").innerHTML = document.getElementById("playernav").innerHTML + "<li><a href='#misc'>Management</a></li>";
	i = 0;
	do {
		document.getElementById("partner").innerHTML = document.getElementById("partner").innerHTML + '<option value="' + i + '">' + playerlist[i] + '</option>';
		document.getElementById("partnerbank").innerHTML = document.getElementById("partnerbank").innerHTML + '<option value="' + i + '">' + playerlist[i] + '</option>';
		i++;
	} while (i < playerlist.length);
	i = 0;
	do {
		document.getElementById("partnerfree").innerHTML = document.getElementById("partnerfree").innerHTML + '<option value="' + i + '">' + playerlist[i] + '</option>';
		i++;
	} while (i < (playerlist.length - 1));
	document.getElementById("partner").innerHTML = document.getElementById("partner").innerHTML + '<option value="' + 42069 + '">Bank</option>';
}
function starttransfer(x) {
	document.getElementById("transferh2").innerHTML = "Transfer Money as " + playerlist[x];
	transferring = x;
}
function sendmoney() {
	var money = parseInt(document.getElementById("amount").value);
	if (Number.isNaN(money)) {
		document.getElementById("transfererror").innerHTML = document.getElementById("amount").value + " is not a valid number!";
	} else if (document.getElementById("partner").value == transferring) {
		document.getElementById("transfererror").innerHTML = "You cannot send money to yourself!";
		document.getElementById("transfersuccess").innerHTML = "";
	} else if (money > playermoney[transferring]) {
		document.getElementById("transfererror").innerHTML = "You do not have enough money!";
		document.getElementById("transfersuccess").innerHTML = "";
	} else if (money < 1) {
		document.getElementById("transfererror").innerHTML = "You cannot send a negative amount!";
		document.getElementById("transfersuccess").innerHTML = "";
	} else if (document.getElementById("partner").value == 69420) {
		document.getElementById("transfererror").innerHTML = "Select a Recipient!";
		document.getElementById("transfersuccess").innerHTML = "";
	} else {
		playermoney[transferring] = playermoney[transferring] - money;
		if (document.getElementById("partner").value == 42069) {
			playermoney[document.getElementById("partner").value] = playermoney[document.getElementById("partner").value] + money;
			document.getElementById("transfersuccess").innerHTML = "You successfully transferred " + money + " M to the Bank!";
		} else {
			playermoney[document.getElementById("partner").value] = playermoney[document.getElementById("partner").value] + money;
			document.getElementById("transfersuccess").innerHTML = "You successfully transferred " + money + " M to " + playerlist[document.getElementById("partner").value] + "!";
		}
		document.getElementById("transfererror").innerHTML = "";
		var i = 0;
		document.getElementById("money").innerHTML = "";
		reloadmoney();
	}
}
function sendmoneybank() {
	var money = parseInt(document.getElementById("amountbank").value);
	if (Number.isNaN(money)) {
		document.getElementById("transfererrorbank").innerHTML = document.getElementById("amountbank").value + " is not a valid number!";
	} else if (money < 1) {
		document.getElementById("transfererrorbank").innerHTML = "You cannot send a negative amount!";
		document.getElementById("transfersuccessbank").innerHTML = "";
	} else if (document.getElementById("partnerbank").value == 69420) {
		document.getElementById("transfererrorbank").innerHTML = "Select a Recipient!";
		document.getElementById("transfersuccessbank").innerHTML = "";
	} else {
		playermoney[document.getElementById("partnerbank").value] = playermoney[document.getElementById("partnerbank").value] + money;
		document.getElementById("transfersuccessbank").innerHTML = "You successfully transferred " + money + " M from the Bank to " + playerlist[document.getElementById("partnerbank").value] + "!";
		document.getElementById("transfererrorbank").innerHTML = "";
		var i = 0;
		reloadmoney();
	}
}
function sendmoneyfree() {
	var money = playermoney[playerlist.length - 1];
	if (document.getElementById("partnerfree").value == 69420) {
		document.getElementById("transfererrorfree").innerHTML = "Select a Recipient!";
		document.getElementById("transfersuccessfree").innerHTML = "";
	} else {
		playermoney[document.getElementById("partnerfree").value] = playermoney[document.getElementById("partnerfree").value] + money;
		playermoney[playerlist.length -1] = 0;
		document.getElementById("transfersuccessfree").innerHTML = "You successfully transferred " + money + " M to " + playerlist[document.getElementById("partnerfree").value] + " for parking for free!";
		document.getElementById("transfererrorfree").innerHTML = "";
		var i = 0;
		reloadmoney();
	}
}
function reloadmoney() {
	var i = 0;
	document.getElementById("money").innerHTML = "<h1>Game in progress</h1>";
	do {
		document.getElementById("money").innerHTML = document.getElementById("money").innerHTML + "<p>" + playerlist[i] + ": " + playermoney[i] + " M</p>";
		i++;
	} while (i < playerlist.length);
}
var transferring = 0
var playerlist = new Array();
var playermoney = new Array();
