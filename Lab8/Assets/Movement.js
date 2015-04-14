#pragma strict

var speed: double;

function Start () 
{
	speed = 0.3;
}

function Update () 
{
	var x: double;
	var y: double;
	var z: double;
	
	x = Input.GetAxis("Horizontal");
	z = Input.GetAxis("Vertical");
	
	if (Input.GetButton("Jump"))
	{
		y = 3.5;
	}
	else
	{
		y = 3;
		transform.position.y = 0.9*(transform.position.y - 0.05)+0.05;
	}
	
	transform.Translate(x*speed, y*speed, z*speed);
}