const apiUrl = "https://localhost:7090/Funcionario";
let funcionarioIdParaEditar = null;
async function carregarFuncionarios() {
    const response = await fetch(apiUrl);
    const funcionarios = await response.json();

    const tbody = document.getElementById("lista-funcionarios");
    tbody.innerHTML = "";

    funcionarios.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${f.id}</td>
      <td>${f.nome}</td>
      <td>${f.departamento}</td>
      <td>${f.emailProfissional}</td>
      <td>R$ ${f.salario}</td>
      <td>${f.dataAdmissao}</td>
      <td>
        <button onclick="deletarFuncionario(${f.id})">Excluir</button>
        <button onclick="preencherFormulario(${f.id})">Editar</button>
      </td>
    `;
        tbody.appendChild(tr);
    });
}

document.getElementById("form-funcionario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const funcionario = {
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        dataAdmissao: document.getElementById("dataAdmissao").value,
        ramal: document.getElementById("ramal").value,
        emailProfissional: document.getElementById("email").value,
        departamento: document.getElementById("departamento").value,
        salario: parseFloat(document.getElementById("salario").value)
    };

    if (funcionarioIdParaEditar) {
        // Modo edição
        const funcionarioAtualizacao = {
            nome: funcionario.nome,
            endereco: funcionario.endereco,
            ramal: funcionario.ramal,
            emailProfissional: funcionario.emailProfissional,
            departamento: funcionario.departamento,
            salario: funcionario.salario
            // NÃO incluir dataAdmissao
        };

        await fetch(`${apiUrl}/${funcionarioIdParaEditar}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcionarioAtualizacao)
        });

        alert("Funcionário atualizado com sucesso!");
        funcionarioIdParaEditar = null; // volta para modo cadastro
    }

    e.target.reset();
    carregarFuncionarios();
});

async function deletarFuncionario(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    carregarFuncionarios();
}

async function atualizarFuncionario(id) {
    const funcionario = {
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        ramal: document.getElementById("ramal").value,
        emailProfissional: document.getElementById("email").value,
        departamento: document.getElementById("departamento").value,
        salario: parseFloat(document.getElementById("salario").value)
    };

    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcionario)
        });

        if (res.ok) {
            alert("Funcionário atualizado com sucesso!");
            carregarFuncionarios();
        } else {
            alert("Erro ao atualizar funcionário.");
        }
    } catch (err) {
        console.error("Erro no fetch:", err);
    }
}
async function preencherFormulario(id) {
    try {
        const res = await fetch(`${apiUrl}/${id}`);
        const f = await res.json();

        document.getElementById("nome").value = f.nome;
        document.getElementById("endereco").value = f.endereco;
        document.getElementById("ramal").value = f.ramal;
        document.getElementById("email").value = f.emailProfissional;
        document.getElementById("departamento").value = f.departamento;
        document.getElementById("salario").value = f.salario;

        funcionarioIdParaEditar = id;
    } catch (err) {
        console.error("Erro ao buscar funcionário:", err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const inputDataAdmissao = document.getElementById("dataAdmissao");

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const ano = hoje.getFullYear();

    inputDataAdmissao.value = `${ano}-${mes}-${dia}`;

    carregarFuncionarios();
});

carregarFuncionarios();
