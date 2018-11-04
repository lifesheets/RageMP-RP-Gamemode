/*
	Credits:
		- MrPancakers
		- Root
		- Buckets
*/
require('./commands.js')
require('./admin_commands.js')


global.gm = {};

gm.mysql = require('./mysql.js');
gm.auth = require('./auth.js');

gm.mysql.connect(function () { });

const bankPos = new mp.Vector3(243.2230, 224.7587, 106.2868); //bank

mp.events.add("playerChat", (player, text) => {
    mp.players.broadcast(`${player.name}: ${text}`);
});

//0=deposit, 1=withdraw
mp.events.add('triggerTransaction', (player, amount, state) => {

    
    if (state == 0) {
        if (player.money >= amount) {
            gm.mysql.handle.query('UPDATE `accounts` SET bankmoney = bankmoney + ?, money = money - ? WHERE username = ?', [amount, amount, player.name], function (err, res) {
                if (!err) {
                    player.bankmoney += amount;
                    player.money -= amount;
                    player.call("reloadBankBrowser", [player, player.bankmoney, player.money]);
                    player.call("changeHTML", [amount, state]);
                } else {
                    console.log(err)
                }
            });
        }
        else {
            //player.outputChatBox(`nicht genug Geld`);
        }

    }
    else if (state == 1) {
        if (player.bankmoney >= amount) {
            gm.mysql.handle.query('UPDATE `accounts` SET bankmoney = bankmoney - ?, money = money + ? WHERE username = ?', [amount, amount, player.name], function (err, res) {
                if (!err) {
                    player.bankmoney -= amount;
                    player.money += amount;
                    player.call("reloadBankBrowser", [player, player.bankmoney, player.money]);
                    player.call("changeHTML", [amount, state]);
                } else {
                    console.log(err)
                }
            });
        }
        else {
            //player.outputChatBox(`nicht genug Geld`);
        }


    }

    
});


//action key
mp.events.add('keypress:F2', (player) => {

    
    if (player.dist(bankPos) < 5) { player.call("showBankBrowser", [player, player.bankmoney, player.money]); } //BANK
 

});