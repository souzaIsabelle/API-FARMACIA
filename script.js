// User Form = Pega os dados do formulário e envia para o Banco de Dados
const userForm = document.getElementById('user-form')



// User List = Mostra os dados do Banco de Dados
const userList = document.getElementById('user-list')

function listUsers(){
    fetch('http://localhost:3000/Usuarios')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ''
            data.forEach(user => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${user.id}- Nome: ${user.nome} - Idade: ${user.idade} - Cidade: ${user.cidade}`
                
                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Deletar';
                deleteButton.addEventListener('click', () => deleteUser(user.id)); // Chama a função deleteUser com o ID do usuário
                li.appendChild(deleteButton);
                
                const updateButton = document.createElement('button');
                updateButton.innerText =  'Editar';
                updateButton.addEventListener('click', () => editUser(user.id));
                li.appendChild(updateButton);
                

                userList.appendChild(li)
            })
        })
        
        .catch(error => console.error('Erro:', error))
}




function deleteUser(id) {
    fetch(`http://localhost:3000/Usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(listUsers())
    .catch(error => console.error('Erro:', error));
}




function editUser(id) {
    
        const newId = prompt("Novo id:");
        const newName = prompt("Novo nome:");
        const newAge = prompt("Nova idade:");
        const newCidade = prompt("Nova cidade:");
    
        if (newId && newName && newAge && newCourse) {
            fetch(`http://localhost:3000/Usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: newId, nome: newName, idade: newAge, cidade: newCidade }),
                
            })                
            .then(() => listUsers())
            .catch(error => console.error('Erro:', error));
        }    
}




userForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id      = parseInt(document.getElementById('id').value)
    const name      = document.getElementById('name').value
    const age       = document.getElementById('age').value
    const cidade    = document.getElementById('cidade').value

    fetch('http://localhost:3000/Usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: name, idade: age, cidade: cidade}),
    })
        .then(response => response.json())
        .then(() => {
            listUsers()
            userForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

listUsers()


