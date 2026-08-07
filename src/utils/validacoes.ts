// validar o nome
const validarNome = (nome: string): boolean => {

  if (nome.length > 0 && nome.length < 3) {

    return false;
  }

  return true;
}

// validar e-mail
const validarEmail = (email: string): boolean => {

  return true;
}

// validar telefone
const validarTelefone = (telefone: string): boolean => {

  return true;
}

// validar cpf
const validarCpf = (cpf: string): boolean => {

  return true;
}

// validar data de nascimento
const validarDataNascimento = (dataNascimento: string): boolean => {

  return true;
}

// validar senha
const validarSenha = (senha: string, confirmarSenha: string): boolean => {

  return true;
}

const Validador = {

  validarNome: function (nome: string): boolean {

    return validarNome(nome);
  },
  validarEmail: (email: string): boolean => {

    return validarEmail(email);
  },
  validarTelefone: (telefone: string): boolean => {

    return validarTelefone(telefone);
  },
  validarDataNascimento,
  validarCpf,
  validarSenha

};

export { Validador };

