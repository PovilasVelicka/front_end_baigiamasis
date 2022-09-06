let _selectedIndex = 0;
const _selectedListType = () => sessionStorage.getItem('selectedListType')
let toDoGroupedItems;
document.getElementById('logOff').addEventListener('click', () => {
    sessionStorage.removeItem('user-info')
    document.location.reload()
})

window.addEventListener('load', () => refreshItemsFromApi(updateDocumentVeiw))

const showToDoItem = (id, showMethod) => apiRequest(_toDoApiUrl + '/' + id, null, showMethod, errorMessage)
const refreshItemsFromApi = (refreshMethod) => { apiRequest(_toDoApiUrl, null, refreshMethod, errorMessage) }
const deleteToDoItem = (id, completeMessage) => { apiRequest(_toDoApiUrl + '/' + id, null, completeMessage, errorMessage) }

function updateDocumentVeiw(todoItems) {
    toDoGroupedItems = groupBy(todoItems.filter(x => x.userId === _userInformation.id), 'type')
    showToDoItems()
    showToDoListItems()
}

function showToDoItems() {
    const holder = document.querySelector('.left-aside')
    if (holder.querySelectorAll('.list-item')) holder.querySelectorAll('.list-item').forEach(item => item.remove())

    for (i = 0; i < Object.keys(toDoGroupedItems).length; i++) {
        const itm = Object.values(toDoGroupedItems)[i].length
        const div = document.createElement('div')
        div.className = 'list-item'
        const link = document.createElement('a')
        div.addEventListener('click', (e) => {
            e.className = 'list-item selected';
            const type = e.target.innerText
            sessionStorage.setItem('selectedListType', e.target.innerText)
            showToDoListItems(e.target.innerText)
        })
        const span = document.createElement('span')
        link.textContent = Object.keys(toDoGroupedItems)[i]
        span.textContent = Object.values(toDoGroupedItems)[i].length
        div.append(link)
        div.append(span)
        holder.append(div)
    }
}

function showToDoListItems(items) {
    removeChildElements('todoItems', 'todo-item')
    const holder = document.getElementById('todoItems')
    for (i = 0; i < Object.keys(toDoGroupedItems).length; i++) {
        if (Object.keys(toDoGroupedItems)[i] = _selectedListType) {
            for (y = 0; y < Object.values(toDoGroupedItems)[i].length; y++) {
                const div = document.createElement('div')
                const radio = document.createElement('input')
                const span = document.createElement('span')

                div.className = 'todo-item'
                radio.setAttribute('type', 'radio')
                radio.setAttribute('id', Object.values(toDoGroupedItems)[i].id)
                div.append(radio)
                span.textContent = Object.values(toDoGroupedItems)[i].type
                div.append(span)
                holder.append(div)
            }
        }
    }
}

function errorMessage(errMessage) {
    showNotify(errMessage, _messageStyles.error)
}

