
mp.events.addCommand('stats', (player) => {

    player.call("showStatsBrowser", [player]);

    //player.outputChatBox(`Admin Level: ${player.admin_level} Money: ${player.data.money} X: ${player.position.x.toFixed(2)} Y: ${player.position.y.toFixed(2)} Z: ${player.position.z.toFixed(2)}`);
});


mp.events.addCommand('bankneu', (player) => {

    const bankPos = new mp.Vector3(243.2230, 224.7587, 106.2868);
    if (player.dist(bankPos) < 5) {


        let bankmoney = player.bankmoney;
        player.outputChatBox(`command: ${player.bankmoney}`);
        player.call("showBankBrowser", [player, bankmoney]);
    }
    else {
        player.outputChatBox(`nicht in if`);
        player.outputChatBox(player.dist(bankPos).toString());
    }
});