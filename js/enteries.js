var Enteries={

	init:function (data) 
	{
		var background={
				sprite:new Enteries.helpers.Sprite(data.spriteSheet,0,35,256,200),
				x:0,
				y:0,
				w:768,
				h:600
			};

		var coinLocations=[[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                           [201, 246], [249, 246], [297, 246], [345, 246], [393, 246], [441, 246], [489, 246],
                           [201, 342], [249, 342], [297, 342], [345, 342], [393, 342], [441, 342], [489, 342]]
		data.entities={};
		data.entities.background=background;
		data.entities.coinsArray=[];
		coinLocations.forEach(function(location)
			{
				data.entities.coinsArray.push(new Enteries.helpers.Coin(data.spriteSheet,location[0],location[1],30,42));
			});
	},
	helpers:
	{
		Sprite:function(img,srcX,srcY,srcW,srcH)
		{
			this.img=img;
			this.srcX=srcX;
			this.srcY=srcY;
			this.srcH=srcH;
			this.srcW=srcW;

		},
		Coin:function(img,x,y,w,h)
		{
			var self=this;
			this.type="coin";
			this.sound=new Audio("audio/lumberjack_coin.mp3");
			this.sprite=new Enteries.helpers.Sprite(img,99,0,10,14);
			this.spriteAnimations=
			{
				spin:{
					frames:[
					new Enteries.helpers.Sprite(img,99,0,10,14),
					new Enteries.helpers.Sprite(img,115,0,10,14),
					new Enteries.helpers.Sprite(img,131,0,10,14),
					new Enteries.helpers.Sprite(img,147,0,10,14)
					],
					curentFrame:0
				},
			}
			this.states=
			{
				spinning:{
					animation:function(data)
					{
						if(data.animationFrame%13===0)
						{
							self.sprite=self.spriteAnimations.spin.frames[self.spriteAnimations.spin.curentFrame];
							self.spriteAnimations.spin.curentFrame++;

							if(self.spriteAnimations.spin.curentFrame>2)
							{
								self.spriteAnimations.spin.curentFrame=0;
							}
						}
					}
				}
			}
			this.currentState=self.states.spinning;
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;
		}
	}
}