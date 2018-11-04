
mp.events.addCommand('stats', (player) => {

    player.call("showStatsBrowser", [player]);

    //player.outputChatBox(`Admin Level: ${player.admin_level} Money: ${player.data.money} X: ${player.position.x.toFixed(2)} Y: ${player.position.y.toFixed(2)} Z: ${player.position.z.toFixed(2)}`);
});


mp.events.addCommand('bankneu', (player) => {

    const bankPos = new mp.Vector3(243.2230, 224.7587, 106.2868);
    if (player.dist(bankPos) < 5) {


        let bankmoney = player.bankmoney;
        let money = player.money;
        player.call("showBankBrowser", [player, bankmoney, money]);
    }
    else {
        player.outputChatBox(`nicht in if`);
        player.outputChatBox(player.dist(bankPos).toString());
    }
});

mp.events.addCommand('statstext', (player) => {

    player.outputChatBox(`${player.name} | ${player.money} | ${player.bankmoney} | ${player.admin_level} | ${player.level} | ${player.fraction_level} | ${player.fraction_rank} | ${player.duty}`);

});