let _userInformation = null;
const _toDoApiUrl = 'https://localhost:7171/api/ToDo'
const _messageStyles = { complete: 'ok', information: 'info', error: 'err' }
const selectedListType = () => sessionStorage.getItem(`${_userInformation === null ? '' : _userInformation.id}selectedListType`)
if (document.getElementById('logo')) document.getElementById('logo').addEventListener('click', () => document.location.href = '../index.html')
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
    } else {
        if (document.getElementById('userName')) {
            document.getElementById('userName').innerHTML = `${_userInformation.userName}`
            document.getElementById('userEmail').innerHTML = `${_userInformation.email}`
        }
    }
}

const fetchForm = (formEvent, ifOkMethod, ifErrorMethod) => {
    formEvent.preventDefault()
    apiRequest(requestInit(formEvent), requestInfo(formEvent), ifOkMethod, ifErrorMethod)
}

function apiRequest(url, header, ifOkMethod, ifErrorMethod) {
    fetch(
        url,
        header
    ).then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw text;
        } else {
            return res.text()
        }
    }).then(data => {
        ifOkMethod(data ? JSON.parse(data) : {})
    }).catch(err => {
        let errMessage;
        if (isJsonString(err)) {
            const js = JSON.parse(err)
            switch (true) {
                case 'error' in js:
                    errMessage = js.error
                    break;
            }
        }  
        ifErrorMethod(errMessage ? errMessage : 'Unexpected error')
    })
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const requestInit = (formEvent) => {
    if (formEvent.target.method !== 'get') return formEvent.target.action
    const data = Object.fromEntries(new FormData(formEvent.target))
    return formEvent.target.action + '?' + Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
}

const requestInfo = (formEvent) => {
    if (formEvent.target.method === 'get') return null
    return (formEvent.target.action, {
        method: formEvent.target.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formEvent.target)))
    })
}

// HowTo: setOnLoadWindowNotify('your text here',_messageStyles.complete)
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

const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function removeChildElements(parentId, childClassName) {
    const parentElement = document.getElementById(parentId)
    if (parentElement.querySelectorAll('.' + childClassName)) {
        parentElement.querySelectorAll('.' + childClassName)
            .forEach(element => element.remove())
    }
}