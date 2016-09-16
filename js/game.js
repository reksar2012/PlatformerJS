var Game={
	init:function()
	{
		var bgCanvas=document.getElementsById('bg_canvas');
		var fgCanvas=document.getElementsById('fg_canvas');

		var canvas={
			bgCanvas:bgCanvas;
			fgCanvas:fgCanvas;
			bgCtx:bgCanvas.getContext("2d");
			fgCtx:bgCanvas.getContext("2d");
		}
		var BackgroundMusic=new Audio("audio/back.wav");
		BackgroundMusic.loop=true;

		var spriteSheet=new Image();
		spriteSheet.src="img/sprite_sheet.png";
		spriteSheet.addEventListener("load",function()
		{
			var spriteSheet=this;
			var data={
				animationFrame:0;
				spriteSheet:spriteSheet;
				canvas:canvas;
			};
			BackgroundMusic.play();
			Input.init(data)
			Game.run(data);
		})
	},
	run:function(data)
	{
		var loop=function(){
			Game.input(data);
			Game.update(data);
			Game.render(data);
			
			data.animationFrame++;

			window.requestAnimationFrame(loop)
		};
		loop();
	};

};