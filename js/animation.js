var Animation=
{
	update:function(data)
	{
		Animation.coins(data);
	},
	coins:function(data)
	{
		data.entities.coinsArray.forEach(function(coin){
				coin.currentState.animation(data);
			});
	}
}