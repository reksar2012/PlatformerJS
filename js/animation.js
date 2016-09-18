var Animation=
{
	update:function(data)
	{
		Animation.jack(data);
		Animation.coins(data);
	},
	jack:function(data)
	{
		
		console.log(data.entities.jack.currentState.name);
		data.entities.jack.currentState.animation(data);
	},
	coins:function(data)
	{
		data.entities.coinsArray.forEach(function(coin){
				coin.currentState.animation(data);
			});
	}
}