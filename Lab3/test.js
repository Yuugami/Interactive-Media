function init()
{
	console.log("Display an alert");
	alert("Welcome.");
	//var name = prompt("What's your name?");
	//alert("Welcome " + name);
}

function add(obj)
{
	obj.form.answer.value = 
	Number(obj.form.first.value) + Number(obj.form.second.value);
}

function minus(obj)
{
	obj.form.answer.value = 
	Number(obj.form.first.value) - Number(obj.form.second.value);
}

function multiply(obj)
{
	obj.form.answer.value = 
	Number(obj.form.first.value) * Number(obj.form.second.value);
}

function divide(obj)
{
	obj.form.answer.value = 
	Number(obj.form.first.value) / Number(obj.form.second.value);
}