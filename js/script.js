// Script JS usado nas páginas HTML

// Quando carrega a página
document.addEventListener("DOMContentLoaded", () => {
  // Mostra data e hora atual no rodapé
  const footer = document.querySelector("footer");
  if (footer) {
    const now = new Date();
    const p = document.createElement("p");
    p.textContent = "Página carregada em: " + now.toLocaleString();
    p.style.fontSize = "0.9em";
    p.style.color = "#ccc";
    footer.appendChild(p);
  }
  
  // Validação do formulário de cadastro
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // pega os valores informados pelo usário no cadastro
      const nome = form.querySelector("input[placeholder='Digite seu nome']");
      const email = form.querySelector("input[type='email']");
      const cpf = form.querySelector("input[name='cpf']");
      const telefone = form.querySelector("input[name='telefone']");
      const servico = form.querySelector("select");
      const endereco = form.querySelector("#campo-endereco input");
      const agendamento = form.querySelector("input[type='datetime-local']");
      
      // Verifica se os campos foram preenchidos, caso não, envia um alert
      if (!nome.value || !email.value || !cpf.value || !telefone.value) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
      
      // Verifica se o campo CPF está correto, apenas digitos e o tamanho correto
      const cpfDigitos = cpf.value.replace(/\D/g, "");
      if (cpfDigitos.length !== 11) {
        alert("CPF inválido!");
        return;
      }
      
      // Verifica se o campo TELEFONE está correto, apenas digitos e o tamanho correto
      const telNumeros = telefone.value.replace(/\D/g, "");
      if (telNumeros.length < 10 || telNumeros.length > 11) {
        alert("Número de telefone inválido. Digite o DDD + número");
        return;
      }

      // Pega os valores que o usuário inseriu no formulário para carregar na janela de confirmação
      document.getElementById("resNome").textContent = nome.value;
      document.getElementById("resCpf").textContent = cpf.value;
      document.getElementById("resTelefone").textContent = telefone.value;
      document.getElementById("resEmail").textContent = email.value;
      document.getElementById("resServico").textContent = servico.value === "retirada" ? "Retirada no local" : "Tele-entrega";
      document.getElementById("resEndereco").textContent = servico.value === "entrega" ? endereco.value : "-";
      document.getElementById("resAgendamento").textContent = agendamento.value ? new Date(agendamento.value).toLocaleString("pt-BR") : "Não informado";
      
      const modal = new bootstrap.Modal(document.getElementById("cadastroModal"));
      modal.show();

      form.reset();
    });
  }
  
  // Verifica qual serviço o cliente escolheu, se escolhido 'retirada', o formulário oculta o campo endereço (porquê não se faz necessário)
  const servicoEscolhido = form.querySelector("select");
  if (servicoEscolhido) {
    servicoEscolhido.addEventListener("change", () => {
      const campoEndereco = form.querySelector("#campo-endereco");
      const inputEndereco = campoEndereco.querySelector("input");
      if (servicoEscolhido.value === "retirada") {
        campoEndereco.style.display = "none";
        inputEndereco.removeAttribute("required");
      } else {
        campoEndereco.style.display = "block";
        inputEndereco.setAttribute("required", "required");
      }
    });
  }

  // Validação do formulário do contato (reclamação)
  const contato = document.querySelector("#contato");
  if (contato) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = form.querySelector("input[type='email']");
      const texto = form.querySelector("textarea");

      if (!email || !texto) {
        alert("Prencha todo os campos!");
        return;
      }

      alert("Enviado com sucesso!");
      form.reset();
    });
  }

});
