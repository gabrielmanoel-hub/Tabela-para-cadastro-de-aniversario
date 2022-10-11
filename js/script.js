const  dados = JSON.parse(localStorage.getItem('dados')) || []
const erroNome = document.getElementById('erroNome')
const erroNascimento = document.getElementById ('erroNascimento')
const container = document.querySelector('#container')
const toEdit = container.getElementsByTagName('button')
const form = document.getElementById('form')
const div = document.getElementsByClassName('div')
const modal = document.querySelector('.modal')
const toRemove = document.getElementById('excluir')
const input = container.getElementsByTagName('input')
const selectAll = document.getElementById('selectTodos')
const deleteAll = document.getElementById('excluirTodos')
const formModal = document.getElementById('formModal')
const close = document.getElementById('close')
const modalErroName = document.getElementById('erroName')
const modalErroDataDeNascimento = document.getElementById('erroDataDeNascimento')

//Button abrir e fechar modal
function openModal () {
    modal.style.display = 'block'
}
function closeModal() {
    modal.style.display = 'none' 
}
//Atualizar documento
function reload () {
    document.location.reload(true)
}

//form 
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let Name = form[0].value
    let birthDate = form[1].value

    const regexData = /^\d{2}\/\d{2}\/\d{4}$/g
    const regexNome = /^[A-Z]{1}[a-zá-ú]+\s[A-Z]{1}[a-zá-ú]+$|^[A-Z]{1}[a-zá-ú]+\s[A-Z]{1}$/g
    const arrayData = birthDate.split('/')
    const dia = Number(arrayData[0])
    const mes = Number(arrayData[1])
    if(!regexNome.test(Name)){
        form[0].value= ''
        erroNome.innerText = 'Nome com formato inválido ex: Pedro Miguel ou Pedro M'
    } else {
        erroNome.innerText = ''
    }
    if(!regexData.test(birthDate) || dia > 31 || mes > 12) {
        form[1].value = ''
        erroNascimento.innerText = 'Data com formato inválido! ex: DD/MM/AA'
    } else {
        erroNascimento.innerText = ''
    }

    if(erroNome.innerText === '' && erroNascimento.innerText === '') {
        dados.push({nome: Name, dataDeNascimento: birthDate})
        localStorage.setItem('dados', JSON.stringify(dados))
        reload()
    }
})

for(let i = 0; i < dados.length; i++) {
//Inserir uma linha no final da tabela
    let data = container.insertRow(-1)
    
//Insira uma célula na linha no índice 0 a 2
    let Name = data.insertCell(0)
    let birthDate = data.insertCell(1)
    let actions = data.insertCell(2) 
    
//Inserir Conteudo nos elementos
    Name.textContent =  dados[i].nome
    birthDate.textContent = dados[i].dataDeNascimento
    actions.innerHTML = `
    <div class='div'>
        <button id= ${i}>Editar</button>
        <input type='checkbox' aria-label= ${dados[i].nome}>
    </div>`
}

//Aplicar estilo a <div class='div'>
for(let i = 0; i < div.length; i++ ) {
    div[i].style.display = 'flex'
    div[i].style.justifyContent = 'space-evenly'
    div[i].style.alignItems = 'center'
}

//Button excluir
toRemove.addEventListener('click', to_remove)
function to_remove(e) {
    for(let i = 0; i < input.length; i++) {
        if(input[i].checked) {
            dados[i] = 0
        } 
    }
    let newDados = dados.filter(dado => dado)
    localStorage.setItem('dados', JSON.stringify(newDados))
    reload()
}

// Button selecionar todos 
selectAll.addEventListener('click', selectAllInput)
function selectAllInput() {
    for(let i = 0; i < input.length; i++) {
        if(!selectAll.checked ) {
            input[i].checked = false
        } else {
            input[i].checked = true
        }
    }
}

//Aplicar addEventListener a todos buttons editar
for(let i= 0; i < toEdit.length; i++) {
    toEdit[i].addEventListener('click', Editar,)
}
//Pegar index do button editar
let index = null
function Editar(e) {
    openModal()
//Pegar (id) do button
    const getId = e.target.id
    for(let i = 0; i < toEdit.length; i++) {
        if(toEdit[i].id === getId) {
            index = i
        }
    }
}

//form Modal
formModal.addEventListener('submit', (e) => {
    e.preventDefault()
    let i = index


    let modalName = formModal[0].value
    let modalBirthDate = formModal[1].value

    const regexData = /^\d{2}\/\d{2}\/\d{4}$|^(\s+)?$/g
    const regexNome = /^[A-Z]{1}[a-zá-ú]+\s[A-Z]{1}[a-zá-ú]+$|^[A-Z]{1}[a-zá-ú]+\s[A-Z]{1}$|^(\s+)?$/g
    const arrayData = modalBirthDate.split('/')
    const dia = Number(arrayData[0])
    const mes = Number(arrayData[1])
    if(!regexNome.test(modalName)){
        formModal[0].value= ''
        modalErroName.style.fontSize = '12px'
        modalErroName.style.color = 'red'
        modalErroName.innerText = 'Nome com formato inválido ex: Pedro Miguel ou Pedro M'
    } else {
        modalErroName.innerText = ''
    }
    
    if(!regexData.test(modalBirthDate) || dia > 31 || mes > 12) {
        formModal[1].value= ''
        modalErroDataDeNascimento.style.fontSize = '12px'
        modalErroDataDeNascimento.style.color = 'red'
        modalErroDataDeNascimento.innerText = 'Data com formato inválido! ex: DD/MM/AA'
    } else {
        modalErroDataDeNascimento.innerText = ''
    }

    if(modalErroName.innerText === '' && modalErroDataDeNascimento.innerText === '') {
        closeModal()
        const Name = formModal[0].value || dados[i].nome
        const birthDate = formModal[1].value  || dados[i].dataDeNascimento
        dados[index] = {nome: Name, dataDeNascimento: birthDate}
        localStorage.setItem('dados', JSON.stringify(dados))
        reload()
    }

    console.log(dados[i].nome)
})

//Button close modal
close.addEventListener('click', (e )=>  closeModal())
