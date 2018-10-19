let bankBrowser = null;

function triggerCloseBank() {

    mp.trigger('closeBankBrowser');

}

mp.events.add('showBankBrowser', (player, bankmoney) => {

   
    bankBrowser = mp.browsers.new("package://CEF/bank.html");

    //mp.gui.cursor.show(true, true);
    mp.gui.chat.push("event aufgerufen");
    mp.gui.chat.push("event:" + bankmoney);
    mp.gui.cursor.visible = true;
    
    bankBrowser.execute(`document.getElementById('name-placeholder-w').innerHTML = '${player.name}';
document.getElementById('name-placeholder-d').innerHTML = '${player.name}';
document.getElementById('balance-placeholder').innerHTML = '${bankmoney}';

`);

    

});

mp.events.add('closeBankBrowser', () => {
    bankBrowser.destroy();
    mp.gui.cursor.visible = false;
   
});