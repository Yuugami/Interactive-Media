var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			document.getElementById("text1").style.color="#ffff00";
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			document.getElementById("text1").style.color="#ff00ff";
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			document.getElementById("text1").style.color="#ff0000";
			break;
		case tvKey.KEY_DOWN:
			document.getElementById("text1").style.color="#1fffff";
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
