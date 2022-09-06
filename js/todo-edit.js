const todoId = () => sessionStorage.getItem(`${_userInformation.id}selectedToDoItem`)
window.addEventListener('load', () => {
    apiRequest(_toDoApiUrl + '/' + todoId(), null, updateEditForm, errorMessage)
})

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    apiRequest(_toDoApiUrl + '/' + todoId(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    }, updateComplete, errorMessage)
});

function updateEditForm(jsonValue) {
    const form = document.querySelector('form')
    form.userId = jsonValue.userId
    form.type.value = jsonValue.type
    form.content.value = jsonValue.content
    form.endDate.value = jsonValue.endDate
    form.userId.value = jsonValue.userId
    form.todoId.value = jsonValue.id

}

function updateComplete(item) {
    setOnLoadWindowNotify('ToDo item update sucessfully', _messageStyles.complete)
    document.location.href = './todo-list.html'
}
function errorMessage(errMessage) {
    showNotify(errMessage, _messageStyles.error)
}

