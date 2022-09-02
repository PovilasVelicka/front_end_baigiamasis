let _userInformation = null;
const _messageStyles = { complete: 'ok', information: 'info', error: 'err' }
const _apiUrl = 'https://localhost:7171'

document.getElementById('acceptCookie').addEventListener('click', () => {
    sessionStorage.setItem('accepted_cookies', true)
    document.querySelector('footer').style = ('display: none;')
})

window.onload = () => {
    if (!sessionStorage.getItem('accepted_cookies')) {
        document.querySelector('footer').style = ('display: block;')
    }

    if (sessionStorage.getItem('notify-message')) {
        const notify = JSON.parse(sessionStorage.getItem('notify-message'))
        showNotify(notify.message, notify.messageStyle)
    }

    _userInformation = JSON.parse(sessionStorage.getItem('user-info'))

    if (!_userInformation) {
        if (!(document.location.href.endsWith('/pages/login.html')
            || document.location.href.endsWith('/pages/registration.html')
            || document.location.href.endsWith('/index.html')
        )) {
            document.location.href = '../pages/login.html';
            
        }
    }
    else{
        if(document.getElementById('userInfo')){
            document.getElementById('userInfo').innerHTML = `${_userInformation.userName}<br/>${_userInformation.email}`
        }
        
    }
}

// to use it setOnLoadWindowNotify('your text here',_messageStyles.complete)
const setOnLoadWindowNotify = (text, style) => sessionStorage.setItem('notify-message', JSON.stringify({ message: text, messageStyle: style }))

const showNotify = (message, messageStyle) => {
    const notifyWindow = document.createElement('div')
    const text = document.createElement('span')
    text.textContent = message
    notifyWindow.className = 'notify'
    notifyWindow.append(text)
    switch (messageStyle) {
        case _messageStyles.complete:
            notifyWindow.style.backgroundColor = '#00FF00'
            break
        case _messageStyles.error:
            notifyWindow.style.backgroundColor = '#FF0000'
            notifyWindow.style.color = '#FFFFFF'
            break
        default:
            notifyWindow.style.backgroundColor = '#CDCDCD'
            break
    }

    document.body.append(notifyWindow)
    notifyWindow.querySelector('span').innerHTML = message

    notifyWindow.style.opacity = '.9'
    setTimeout(() => {
        notifyWindow.style.opacity = '0'
        setTimeout(() => {
            notifyWindow.remove();
        }, 1000);
    }, 2000)
    sessionStorage.removeItem('notify-message')
}

