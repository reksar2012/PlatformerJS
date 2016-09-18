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
		var jack=new  Enteries.helpers.Jack(data.spriteSheet,60,0,64,64);
		var exitPipe=new Enteries.helpers.ExitPipe(624,432,144,168);
		var score=new Enteries.helpers.Score(290,70);
		var wallLocations=[
		[0,0,48,600],
		[0,528,768,72],
		[192,384,336,216],
		[726,0,42,600]
		];
		var coinLocations=[[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                           [201, 246], [249, 246], [297, 246], [345, 246], [393, 246], [441, 246], [489, 246],
                           [201, 342], [249, 342], [297, 342], [345, 342], [393, 342], [441, 342], [489, 342]]
		data.entities={};

		
		data.entities.background=background;
		data.entities.score=score;
		data.entities.jack=jack;
		data.entities.exitPipe=exitPipe;
		data.entities.wallArray=[];
		data.entities.coinsArray=[];
		wallLocations.forEach(function(location)
			{
				data.entities.wallArray.push(new Enteries.helpers.Wall(location[0],location[1],location[2],location[3]));
			});
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
		Jack:function(img,x,y,w,h)
		{
			var self=this;
			this.jumpSound= new Audio("audio/lumberjack_jump.mp3");
			this.sprite= new Enteries.helpers.Sprite(img,0,0,16,16);
			this.spriteAnimations=
			{
				walkRight:
				{
					frames:[
					new Enteries.helpers.Sprite(img,16,0,16,16),
					new Enteries.helpers.Sprite(img,32,0,16,16),
					new Enteries.helpers.Sprite(img,48,0,16,16)
					],
					curentFrame:0
				},
				walkLeft:
				{
					frames:[
					new Enteries.helpers.Sprite(img,34,18,16,16),
					new Enteries.helpers.Sprite(img,18,18,16,16),
					new Enteries.helpers.Sprite(img,2,18,16,16)
					],
					curentFrame:0
				},
				standRight:new Enteries.helpers.Sprite(img,0,0,16,16),
				standLeft:new Enteries.helpers.Sprite(img,50,18,16,16),
				jumpRight:new Enteries.helpers.Sprite(img,67,0,16,16),
				jumpLeft:new Enteries.helpers.Sprite(img,67,18,16,16)

			}
			this.states=
			{
				jumping:{
					movement:function(data)
					{
						if(self.velY===0)
						{
							var jumpSound=self.jumpSound.cloneNode();
							jumpSound.play();
							self.velY-=23;
						}
					},
					animation:function(data)
					{
							if(self.direction==="right")
							{
								self.sprite=self.spriteAnimations.jumpRight;
							}
							else
								{
								self.sprite=self.spriteAnimations.jumpLeft;
							}
					},
					name:"jumping"
				},

				standing:{
					movement:function(data)
					{
						return;
					},
					animation:function(data)
					{
							if(self.direction==="right")
							{
								self.sprite=self.spriteAnimations.standRight;
							}
							else
								{
								self.sprite=self.spriteAnimations.standLeft;
							}
					},
					name:"standing"
				},

				walking:{
					movement:function(data)
					{
						if(self.direction==="right")
							{
								self.x+=self.velX;
							}
							else
							{
								self.x-=self.velX;
							}							
					},
					name:"walking",
					animation:function(data)
					{
							if(self.direction==="right")
							{
								if(data.animationFrame%5===0)
									{
										self.sprite=self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.curentFrame];
										self.spriteAnimations.walkRight.curentFrame++;
										if(self.spriteAnimations.walkRight.curentFrame>2)
											self.spriteAnimations.walkRight.curentFrame=0;
									}

							}
							else
								{
									if(data.animationFrame%5===0)
										{
											self.sprite=self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.curentFrame];
											self.spriteAnimations.walkLeft.curentFrame++;
											if(self.spriteAnimations.walkLeft.curentFrame>2)
												self.spriteAnimations.walkLeft.curentFrame=0;
										}									
								}							
					}}

			}

			this.currentState=self.states.standing;
			this.direction="right";
			this.velY=0;
			this.velX=3.8;
			this.coins=0;
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;

		},
		Wall:function(x,y,w,h){
			this.type="wall";
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;
		},
		Score:function(x,y){
			this.value=0;
			this.x=x;
			this.y=y;
			this.size="25px";
			this.font="Pixel_Emulator";
			this.color="red";
		},
		ExitPipe:function(x,y,w,h){
			this.type="exitPipe";
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;
		},
		Coin:function(img,x,y,w,h)
		{
			var self=this;
			this.type="coin";
			this.coinSound=new Audio("audio/lumberjack_coin.mp3");
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