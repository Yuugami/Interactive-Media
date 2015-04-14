#pragma strict

var speed: double;

function Start () 
{
	speed = 500.0;
}

function FixedUpdate () 
{
	var x: double;
	var y: double;
	var z: double;
	
	x = Input.GetAxis("Horizontal");
	z = Input.GetAxis("Vertical");
	
	if (Input.GetButton("Jump"))
	{
		y = 4.0*speed;
	}
	else
	{
		y = 3.0;
	}
	
	rigidbody.AddForce(x*Time.deltaTime, y*Time.deltaTime, z*Time.deltaTime);
}