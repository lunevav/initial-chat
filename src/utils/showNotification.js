

document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
});

 export function  notifyMe(body) {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {

        var notification = new Notification('Notification title', {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: body,
        });

        notification.onclick = function () {
            window.open("http://localhost:3000/");
        };

    }

}


export default  {
    notifyMe
}
