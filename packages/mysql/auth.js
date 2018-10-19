module.exports =
{
    registerAccount: function(player){
        player.data.money = 5000;
        player.position = new mp.Vector3(15, 15, 71);   //  Use the same values that are default inside your DB
        player.health = 100;
        player.armour = 50;
        player.loggedInAs = player.name;
        player.admin_level = 0;
        player.fraction_level = 0;
        player.fraction_rank = 0;
    },
    saveAccount: function(player){
        gm.mysql.handle.query('UPDATE `accounts` SET money = ?, posX = ?, posY = ?, posZ = ?, health = ?, armour = ?, admin_level = ?, fraction_level = ?, fraction_rank = ? WHERE username = ?',
            [player.data.money,
                player.position.x.toFixed(2),
                player.position.y.toFixed(2),
                player.position.z.toFixed(2),
                player.health,
                player.armour,
                player.admin_level,
                player.fraction_level,
                player.fraction_rank,
                player.name],
            function (err, res, row) {
            if(err) console.log(err);
        });
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM `accounts` WHERE username = ?', [player.name], function(err, res, row){
            if(err) console.log(err);
            if(res.length){
                res.forEach(function(playerData){
                    player.name = playerData.username;
                    player.data.money = playerData.money;
                    player.position = new mp.Vector3(playerData.posX, playerData.posY, playerData.posZ);
                    player.health = playerData.health;
                    player.armour = playerData.armour;
                    player.admin_level = playerData.admin_level;
                    player.fraction_level = playerData.fraction_level;
                    player.fraction_rank = playerData.fraction_rank;
                    player.loggedInAs = playerData.username;
                });
            }
        });
        console.log(`${player.name} has logged in`);
    }
}