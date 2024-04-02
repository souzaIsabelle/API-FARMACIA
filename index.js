const dados = require('./dados.json')
const dadosMED = require('./med.json')

const express = require('express')
const fs = require('fs')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("O servidor está funcional");
})

server.get('/Usuarios', (req, res) => {
    return res.json({ mensagem: "Estou funcionando!" })
})

// CRUD DA API

// Create da API
server.post('/Usuarios', (req, res) => {
    const novoUsuario = req.body

    if (!novoUsuario.nome || !novoUsuario.idade || !novoUsuario.cidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.Usuarios.push(novoUsuario)
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso!" })
    }
})

// Read da API
server.get('/usuarios', (req, res) => {
    return res.json(dados.Usuarios)
})

// Update da API
server.put('/Usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id)
    const atualizarUser = req.body

    const indiceUsuario = dados.Usuarios.findIndex(u => u.id === usuarioId)

    if (indiceUsuario === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" })
    } else {
        dados.Usuarios[indiceUsuario].id = atualizarUser.id || dados.Usuarios[indiceUsuario].id

        dados.Usuarios[indiceUsuario].nome = atualizarUser.nome || dados.Usuarios[indiceUsuario].nome
        
        dados.Usuarios[indiceUsuario].idade = atualizarUser.idade || dados.Usuarios[indiceUsuario].idade

        dados.Usuarios[indiceUsuario].cidade = atualizarUser.cidade|| dados.Usuarios[indiceUsuario].cidade

        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})



//Delete da API
server.delete('/Usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // filtrar os usuarios, removendo pelo id correspondente

    dados.Usuarios = dados.Usuarios.filter(u => u.id !== id)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Usuario excluido com sucesso!" })
})



// Função que salva os dados
function salvarDados() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2))
}



//////////////////////// MEDICAMENTOS ////////////////////////////

server.post('/Medicamentos', (req, res) => {
    const novoMedicamentos = req.body

    if (!novoMedicamentos.nome || !novoMedicamentos.fabricante || !novoMedicamentos.preco) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosMED.Medicamentos.push(novoMedicamentos)
        salvarDadosMED(dadosMED)

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso!" })
    }
})

// Read da API
server.get('/Medicamentos', (req, res) => {
    return res.json(dadosMED.Medicamentos)
})

// Update da API
server.put('/Medicamentos/:id', (req, res) => {
    const MedicamentosId = parseInt(req.params.id)
    const atualizarMED = req.body

    const indiceMedicamentos = dadosMED.Medicamentos.findIndex(u => u.id === MedicamentosId)

    if (indiceMedicamentos === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado" })
    } else {
        dadosMED.Medicamentos[indiceMedicamentos].id = atualizarMED.id || dadosMED.Medicamentos[indiceMedicamentos].id

        dadosMED.Medicamentos[indiceMedicamentos].nome = atualizarMED.nome || dadosMED.Medicamentos[indiceMedicamentos].nome
        
        dadosMED.Medicamentos[indiceMedicamentos].fabricante = atualizarMED.fabricante || dadosMED.Medicamentos[indiceMedicamentos].fabricante

        dadosMED.Medicamentoss[indiceMedicamentos].preco = atualizarMED.preco|| dadosMED.Medicamentoss[indiceMedicamentos].preco

        salvarDadosMED(dadosMED)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})



//Delete da API
server.delete('/Medicamentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // filtrar os usuarios, removendo pelo id correspondente

    dadosMED.Medicamentos = dados.Medicamentos.filter(u => u.id !== id)

    salvarDadosMED(dadosMED)

    return res.status(200).json({ mensagem: "Medicamento excluido com sucesso!" })
})



// Função que salva os dados
function salvarDadosMED() {
    fs.writeFileSync(__dirname + '/med.json', JSON.stringify(dadosMED, null, 2))
}