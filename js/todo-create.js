document.getElementById('logOff').addEventListener('click', () => {
    sessionStorage.removeItem('user-info')
    document.location.reload()
})

window.addEventListener('load', () => { 
    if(selectedListType()) document.getElementById('type').value = selectedListType()
})

document.querySelector('form').addEventListener('submit', (event) => {
    fetchForm(event, registrationComplete, registrationError)
});

document.getElementById('submit').addEventListener('mousedown',(e)=>{
    const parent = document.getElementById('userId')
    parent.value = _userInformation.id
})

function registrationComplete(data) {
    setOnLoadWindowNotify('ToDo item created', _messageStyles.complete)
    document.location.href = './todo-list.html'
}

function registrationError(errMessage) {
    showNotify(errMessage, _messageStyles.error)
}
