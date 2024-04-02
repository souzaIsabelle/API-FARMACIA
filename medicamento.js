// User Form = Pega os dados do formulário e envia para o Banco de Dados
const medForm = document.getElementById('med-form')



// User List = Mostra os dados do Banco de Dados
const medList = document.getElementById('MED-list')

function listMED(){
    fetch('http://localhost:3000/Medicamentos')
        .then(response => response.json())
        .then(data => {
            medList.innerHTML = ''
            data.forEach(med => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${med.id}- Nome: ${med.nome} - Fabricante ${med.fabricante} - Preco: ${med.preco}`
                
                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Deletar';
                deleteButton.addEventListener('click', () => deleteMed(med.id)); // Chama a função deleteMed com o ID do usuário
                li.appendChild(deleteButton);
                
                const updateButton = document.createElement('button');
                updateButton.innerText =  'Editar';
                updateButton.addEventListener('click', () => editMed(med.id));
                li.appendChild(updateButton);
                

                medList.appendChild(li)
            })
        })
        
        .catch(error => console.error('Erro:', error))
}




function deleteMed(id) {
    fetch(`http://localhost:3000/Medicamentos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(listMED())
    .catch(error => console.error('Erro:', error));
}




function editMed(id) {
    
        const newId = prompt("Novo id:");
        const newName = prompt("Novo nome:");
        const newFabricante= prompt("Novo Fabricante:");
        const newPreco = prompt("Nova preco:");
    
        if (newId && newName && newFabricante && newPreco) {
            fetch(`http://localhost:3000/Medicamentos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: newId, nome: newName, fabricante: newFabricante, preco: newPreco }),
                
            })                
            .then(() => listMED())
            .catch(error => console.error('Erro:', error));
        }    
}




medForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id      = parseInt(document.getElementById('id').value)
    const name      = document.getElementById('name').value
    const fabricante     = document.getElementById('fabricante').value
    const preco    = document.getElementById('preco').value

    fetch('http://localhost:3000/Medicamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: name, fabricante: fabricante, preco: preco}),
    })
        .then(response => response.json())
        .then(() => {
            listMED()
            medForm.reset()
        })
        .catch(error => console.error('Erro:', error))
});

listMED()


