#pragma strict

var target: Transform;
var distance: double;

function Start () {
	distance = 5.0;
}

function Update () {
	transform.position.x = target.transform.position.x - distance;
	transform.position.z = target.transform.position.z - distance;
	transform.position.y = 12;
	transform.LookAt(target);
}