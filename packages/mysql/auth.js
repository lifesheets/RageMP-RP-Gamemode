module.exports =
{
    registerAccount: function (player) {
        player.money = 5000;
        player.bankmoney = 1;
        player.position = new mp.Vector3(15, 15, 71);   //  Use the same values that are default inside your DB
        player.health = 100;
        player.armour = 50;
        player.loggedInAs = player.name;
        player.admin_level = 1;
        player.level = 1;
        player.xp = 0;
        player.phone;
        player.fraction_level = 1;
        player.fraction_rank = 1;
        player.duty = 0;
    },
    saveAccount: function(player){
        gm.mysql.handle.query('UPDATE `accounts` SET money = ?, bankmoney = ?, posX = ?, posY = ?, posZ = ?, health = ?, armour = ?, admin_level = ?, level = ?, xp = ?, phone = ? WHERE username = ?',
            [player.money,
                player.bankmoney,
                player.position.x.toFixed(2),
                player.position.y.toFixed(2),
                player.position.z.toFixed(2),
                player.health,
                player.armour,
                player.admin_level,
                player.level,
                player.xp,
                player.phone,
                player.name],
            function (err, res, row) {
            if(err) console.log(err);
            });
        gm.mysql.handle.query('UPDATE `fraction` SET fraction_level = ?, fraction_rank = ?, duty = ? WHERE username = ?',
            [player.fraction_level,
                player.fraction_rank,
                player.duty, 
            player.name],
            function (err, res, row) {
                if (err) console.log(err);
            });
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM `accounts` INNER JOIN `fraction` ON accounts.username = ? AND fraction.username = ?', [player.name, player.name], function(err, res, row){
            if(err) console.log(err);
            if(res.length){
                res.forEach(function(playerData){
                    player.name = playerData.username;
                    player.money = playerData.money;
                    player.bankmoney = playerData.bankmoney;
                    player.position = new mp.Vector3(playerData.posX, playerData.posY, playerData.posZ);
                    player.health = playerData.health;
                    player.armour = playerData.armour;
                    player.admin_level = playerData.admin_level;
                    player.level = playerData.level;
                    player.xp = playerData.xp;
                    player.phone = playerData.phone;
                    player.fraction_level = playerData.fraction_level;
                    player.fraction_rank = playerData.fraction_rank;
                    player.duty = playerData.duty;
                    player.loggedInAs = playerData.username;
                });
            }
        });
        console.log(`${player.name} has logged in`);
    }
}