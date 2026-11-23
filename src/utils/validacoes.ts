// validar o nome
const validarNome = (nome: string): boolean => {
  const nomeLimpo = nome.trim();

  return nomeLimpo.length === 0 || nomeLimpo.length >= 3;
};

// validar e-mail
const validarEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
};

// validar telefone celular
const validarTelefone = (telefone: string): boolean => {
  const numeros = telefone.replace(/\D/g, "");

  return /^[1-9]{2}9[0-9]{8}$/.test(numeros);
};

// validar cpf
const validarCpf = (cpf: string): boolean => {
  const numeros = cpf.replace(/\D/g, "");

  if (!/^\d{11}$/.test(numeros) || /^(\d)\1{10}$/.test(numeros)) {
    return false;
  }

  const calcularDigito = (base: string, pesoInicial: number): number => {
    let soma = 0;

    for (let i = 0; i < base.length; i++) {
      soma += Number(base[i]) * (pesoInicial - i);
    }

    const resto = (soma * 10) % 11;

    return resto === 10 ? 0 : resto;
  };

  const primeiroDigito = calcularDigito(numeros.substring(0, 9), 10);
  const segundoDigito = calcularDigito(numeros.substring(0, 10), 11);

  return (
    primeiroDigito === Number(numeros[9]) &&
    segundoDigito === Number(numeros[10])
  );
};

// validar data de nascimento
const validarDataNascimento = (dataNascimento: string): boolean => {
  const partes = dataNascimento.split("/");

  if (partes.length !== 3) return false;

  const [dia, mes, ano] = partes.map(Number);

  if (!dia || !mes || !ano || ano < 1900) return false;

  const data = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia &&
    data <= hoje
  );
};

// validar senha
const validarSenha = (senha: string, confirmarSenha: string): boolean => {
  return senha.length >= 8 && senha === confirmarSenha;
};

// validar telefone fixo
const validarTelefoneFixo = (telefoneFixo: string): boolean => {
  const numeros = telefoneFixo.replace(/\D/g, "");

  return /^[1-9]{2}[2-5][0-9]{7}$/.test(numeros);
};

// validar rg
const validarRg = (rg: string): boolean => {
  const numeros = rg.replace(/\D/g, "");

  return numeros.length >= 7 && numeros.length <= 9;
};

// validar CNPJ
const validarCNPJ = (cnpj: string): boolean => {
  const numeros = cnpj.replace(/\D/g, "");

  if (!/^\d{14}$/.test(numeros) || /^(\d)\1{13}$/.test(numeros)) {
    return false;
  }

  const calcularDigito = (base: string, pesos: number[]): number => {
    const soma = base
      .split("")
      .reduce((total, numero, index) => {
        return total + Number(numero) * pesos[index];
      }, 0);

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(
    numeros.substring(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  const segundoDigito = calcularDigito(
    numeros.substring(0, 13),
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  return (
    primeiroDigito === Number(numeros[12]) &&
    segundoDigito === Number(numeros[13])
  );
};

// validar data de fundação
const validarDataFundacao = (dtFundacao: string): boolean => {
  return validarDataNascimento(dtFundacao);
};

// validar o cep
const validarCEP = (cep: string): boolean => {
  const numeros = cep.replace(/\D/g, "");

  return /^\d{8}$/.test(numeros);
};

const Validador = {
  validarNome,
  validarEmail,
  validarTelefone,
  validarDataNascimento,
  validarCpf,
  validarSenha,
  validarTelefoneFixo,
  validarRg,
  validarCNPJ,
  validarDataFundacao,
  validarCEP
};

export { Validador };

