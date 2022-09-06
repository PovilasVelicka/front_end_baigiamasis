document.querySelector('button').addEventListener('click', () => buttonClicked)

function buttonClicked() {
    fetch('url', { method: 'GET' }).then(res => { return res.json() }).then(data => { return data })
}

function updateForm(data) {

}