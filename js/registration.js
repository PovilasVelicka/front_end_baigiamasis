document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target))
    const url = `${_apiUrl}/api/Auth`

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    })
        .then(res => {
            if (res.ok) {
                showNotify('YOUR REGISTRATION SUCESSFUL!', _messageStyles.information)
                document.location.href='./login.html'
            } else {
                throw Error(res) 
            }
        })
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            showNotify(`${err.status}: ${err}`, _messageStyles.error)
        })
});