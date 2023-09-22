let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('service worker registriert')
        })
        .catch(
            err => { console.log(err); }
        );
}

function displayConfirmNotification() {
    new Notification('Benachrichtigung eingeschaltet')
}

function askForNotificationPermission() {
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {
            displayConfirmNotification();
        }
    });
}

if('Notification' in window) {
    for(let checkbox of enableNotificationsButtons) {
        checkbox.style.display = 'inline-block';
        checkbox.addEventListener('change', askForNotificationPermission);
        /*folgendes ist experimentell, wenn toggle an dann */
        if (this.checked) {
            if (Notification.permission === 'default') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  // Berechtigung wurde erteilt, Benachrichtigung anzeigen
                  new Notification('Benachrichtigung', { body: 'Dies ist eine Benachrichtigung.' });
                }
              });
            }
          } else {
            // Switch wurde deaktiviert, Berechtigung zurückgesetzt
            Notification.permission = 'default';
          }
        };
    }