let statsBrowser = null;

function triggerCloseStats() {

    mp.trigger('closeStatsBrowser');

}

mp.events.add('showStatsBrowser', (player) => {

   
    statsBrowser = mp.browsers.new("package://CEF/stats.html");

    //mp.gui.cursor.show(true, true);
    mp.gui.chat.push("event aufgerufen");
    mp.gui.cursor.visible = true;

    statsBrowser.execute(`document.getElementById('name-placeholder').innerHTML = '${player.name}';

`);

    

});

mp.events.add('closeStatsBrowser', () => {
    statsBrowser.destroy();
    mp.gui.cursor.visible = false;
   
});