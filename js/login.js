document.querySelector('form').addEventListener('submit', (event) => {
    fetchForm(event, registrationComplete, registrationError)
});

function registrationComplete(data) {
    sessionStorage.setItem('user-info', JSON.stringify(data))
    document.location.href = '../pages/todo-list.html'
}

function registrationError(errMessage) {
    showNotify(errMessage, _messageStyles.error)
}