document.querySelector('form').addEventListener('submit', (event) => {
    fetchForm(event, registrationComplete, registrationError)
});

function registrationComplete(data) {
    setOnLoadWindowNotify('Registration complete, please login', _messageStyles.complete)
    document.location.href = './login.html'
}

function registrationError(errMessage) {
    showNotify(errMessage, _messageStyles.error)
}



