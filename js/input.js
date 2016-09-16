var Input:
{
	init:function()
	{
		var self=this;
		$(window).on("keydown",function(event)
		{
			self.helpers.down[event.keyCode]=true;
		})
		$(window).on("keyup",function(event)
		{
			delete self.helpers.down[event.keyCode];
			delete self.helpers.pressed[event.keyCode];

		})
	},
	helpers:
	{
		isDown:function(code)
		{
			return Input.helpers.down[code];
		},
		isPressed:function(code)
		{
			if(Input.helpers.pressed[code]){
				return false;
			}
			else if(Input.helpers.down[code])
			{
				return Input.helpers.pressed[code]=true;
			}
			return false;
		},
		down:{},
		pressed:{}
	}
}