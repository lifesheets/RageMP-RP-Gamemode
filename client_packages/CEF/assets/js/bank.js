let bankBrowser = null;

function triggerCloseBank() {
    mp.trigger('closeBankBrowser');

}
//state 0=for deposit, 1=withdraw
function triggerTransaction(amount, state) {


    if (state == 1) {
        if (amount == 1) {
            var indiAmount = document.getElementById("withdraw-amount");
            mp.trigger('triggerTransactionBridge', parseInt(indiAmount.value), state);
        }
        else {
            mp.trigger('triggerTransactionBridge', amount, state);
        }

    }
    else if (state == 0) {
        if (amount == 1) {
            var indiAmount = document.getElementById("deposit-amount");
            mp.trigger('triggerTransactionBridge', parseInt(indiAmount.value), state);
        }
        else {
            mp.trigger('triggerTransactionBridge', amount, state);
        }
    }
}

//state 0=deposit, 1=withdraw
function changeHTML(amount, state) {
    if (state == 0) {
        bankBrowser.execute(`document.getElementById("deposit-container-infobox").classList.add('d-block');
        document.getElementById("deposit-container-infobox").classList.remove('d-none');
        document.getElementById("deposit-message-infobox").innerHTML = 'You have deposited ${amount}$ into your bank account.';`);

    }
    else if (state == 1) {
  
            bankBrowser.execute(`document.getElementById("withdraw-container-infobox").classList.add('d-block');
            document.getElementById("withdraw-container-infobox").classList.remove('d-none');
            document.getElementById("withdraw-message-infobox").innerHTML = 'You have withdrawed ${amount}$ from your bank account.';`);

        

    }

}

mp.events.add('changeHTML', (amount, state) => {

    changeHTML(amount, state);

});

mp.events.add('triggerTransactionBridge', (amount, state) => {
    mp.events.callRemote('triggerTransaction', amount, state);
});


mp.events.add('closeBankBrowser', () => {
    bankBrowser.destroy();
    mp.gui.cursor.visible = false;
   
});

mp.events.add('reloadBankBrowser', (player, bankmoney, money) => {
    bankBrowser.execute(`document.getElementById('balance-bank-placeholder').innerHTML = '${bankmoney}';
                         document.getElementById('balance-hand-placeholder').innerHTML = '${money}';`);

});

mp.events.add('showBankBrowser', (player, bankmoney, money) => {


    bankBrowser = mp.browsers.new("package://CEF/bank.html");

    mp.gui.cursor.visible = true;
    bankBrowser.execute(`document.getElementById('name-placeholder-w').innerHTML = '${player.name}';
document.getElementById('name-placeholder-d').innerHTML = '${player.name}';
document.getElementById('balance-bank-placeholder').innerHTML = '${bankmoney}';
document.getElementById('balance-hand-placeholder').innerHTML = '${money}';

`);





});