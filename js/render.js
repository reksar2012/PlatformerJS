var Render=
{
	init:function(data) {
		Render.helpers.drawEntity(data.entities.background,data.canvas.bgCtx);
	},
	helpers:
	{
		drawEntity:function(entity,ctx)
		{
			ctx.drawImage(entity.sprite.img,
				entity.sprite.srcX,
				entity.sprite.srcY,
				entity.sprite.srcW,
				entity.sprite.srcH,
				entity.x,entity.y,
				entity.w,entity.h)
		}
	}
}