

const refreshItemsFromApi = (refreshMethod) => { apiRequest(_toDoApiUrl, null, refreshMethod, errorMessage) }
const deleteToDoItem = (id, ifOkMethod) => { apiRequest(_toDoApiUrl + '/' + id, { method: 'DELETE' }, itemDeletedCompleteMessage, errorMessage) }
let toDoGroupedItems;

window.addEventListener('load', () => refreshItemsFromApi(updateDocumentVeiw))

document.getElementById('createTodo').addEventListener('click', () => document.location.href = './todo-create.html')

document.getElementById('deleteTodo').addEventListener('click', () => {
    document
        .querySelectorAll('.todo-radio')
        .forEach(r => {
            if (r.checked) {
                if (confirm('Are You shure you want to delete ToDo item?')) {
                    deleteToDoItem(r.id, 'ToDo item deleted sucessfuly!')
                }
            }
        })
})

document.getElementById('editTodo').addEventListener('click', () => {
    document
        .querySelectorAll('.todo-radio')
        .forEach(r => {
            if (r.checked) {
                sessionStorage.setItem(`${_userInformation.id}selectedToDoItem`, r.id)
                document.location.href = './todo-edit.html'
            }
        })
})

document.getElementById('logOff').addEventListener('click', () => {
    sessionStorage.removeItem('user-info')
    document.location.reload()
})

function updateDocumentVeiw(todoItems) {
    toDoGroupedItems = groupBy(
        todoItems.filter(x => x.userId === _userInformation.id),
        'type'
    )
    showToDoItemTypes()
    showItemsBySelectedType()
}

function showToDoItemTypes() {
    const holder = document.querySelector('.left-aside')
    if (holder.querySelectorAll('.list-item')) holder.querySelectorAll('.list-item').forEach(item => item.remove())

    for (i = 0; i < Object.keys(toDoGroupedItems).length; i++) {
        const itm = Object.values(toDoGroupedItems)[i].length
        const div = document.createElement('div')
        div.className = 'list-item'
        const link = document.createElement('a')
        div.addEventListener('click', (e) => {
            let itemText;
            const event = e
            if (event.target.childElementCount > 0) {
                itemText = event.path[0].childNodes[0].textContent
            } else {
                itemText = event.path[1].children[0].textContent
            }
            e.className = 'list-item selected';
            sessionStorage.setItem(`${_userInformation.id}selectedListType`, itemText)
            showToDoListItems(itemText)
        })
        const span = document.createElement('span')
        link.textContent = Object.keys(toDoGroupedItems)[i]
        span.textContent = Object.values(toDoGroupedItems)[i].length
        div.append(link)
        div.append(span)
        holder.append(div)
    }
}

function showItemsBySelectedType(items) {
    removeChildElements('todoItems', 'todo-item')
    const holder = document.getElementById('todoItems')
    for (i = 0; i < Object.keys(toDoGroupedItems).length; i++) {
        if (Object.keys(toDoGroupedItems)[i] === selectedListType()) {
            for (y = 0; y < Object.values(
                toDoGroupedItems)[i].sort(function (a, b) {
                    if (a.endDate < b.endDate) { return -1; }
                    if (a.endDate > b.endDate) { return 1; }
                }).length; y++) {

                const todoItem = document.createElement('div')
                todoItem.className = 'todo-item'

                const todoHeader = document.createElement('div')
                todoHeader.className = 'todo-item-header'

                const radio = document.createElement('input')
                radio.setAttribute('type', 'radio')
                radio.setAttribute('id', Object.values(toDoGroupedItems)[i][y].id)
                radio.setAttribute('name', 'todoItem')
                radio.className = 'todo-radio'

                const todoType = document.createElement('span')
                todoType.textContent = Object.values(toDoGroupedItems)[i][y].type
                todoType.className = 'type-field'

                const todoEndDate = document.createElement('span')
                todoEndDate.textContent = new Date(
                    Object.values(toDoGroupedItems)[i][y].endDate)
                    .toLocaleString('lt-LT', { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
                todoEndDate.className = 'end-date-field'

                todoHeader.append(radio)
                todoHeader.append(todoType)
                todoHeader.append(todoEndDate)

                todoItem.append(todoHeader)

                const todoContent = document.createElement('div')
                todoContent.classList = 'content-field'
                todoContent.innerHTML = Object.values(toDoGroupedItems)[i][y].content.replaceAll('\n', '<br/><hr>')
                todoItem.append(todoContent)

                holder.append(todoItem)

            }
        }
    }
}

function errorMessage(errMessage) {
    showNotify(errMessage, _messageStyles.error)
}

function itemDeletedCompleteMessage() {
    showNotify('ToDo item deleted sucessfuly', _messageStyles.complete)
    refreshItemsFromApi(updateDocumentVeiw)
}