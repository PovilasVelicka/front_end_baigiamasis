document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target))
    const url = `${_apiUrl}/api/Auth?username=${data.username}&password=${data.password}`

    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => {
            sessionStorage.setItem('user-info', JSON.stringify(data))
            document.location.href = '../pages/todo-list.html'
        })
        .catch(err => {
            showNotify("Username or password is not correct.", _messageStyles.error)
        })
});