document.getElementById('logOff').addEventListener('click',()=>{
    sessionStorage.removeItem('user-info')    
    document.location.reload()
})