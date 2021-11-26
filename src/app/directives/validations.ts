import { AbstractControl } from "@angular/forms";

export class Validations {

  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;
    const regex = new RegExp('[0-9]{11}');

    let soma;
    let resto;
    let i = 0;
    soma = 0;

    if (cpf == "00000000000") return { cpfInvalido: true };
    if (cpf == "11111111111") return { cpfInvalido: true };
    if (cpf == "22222222222") return { cpfInvalido: true };
    if (cpf == "33333333333") return { cpfInvalido: true };
    if (cpf == "44444444444") return { cpfInvalido: true };
    if (cpf == "55555555555") return { cpfInvalido: true };
    if (cpf == "66666666666") return { cpfInvalido: true };
    if (cpf == "77777777777") return { cpfInvalido: true };
    if (cpf == "88888888888") return { cpfInvalido: true };
    if (cpf == "99999999999") return { cpfInvalido: true };

    for (i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return { cpfInvalido: true };

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return { cpfInvalido: true };
    return null;
  }

  static ValidaNumero(control: AbstractControl) {
    const numero = control.value
    const regex = new RegExp('^[0-9]*$')
    if (regex.test(numero)) return null
    return { numeroInvalido: true }
  }

  static ValidarInscricaoEstadual(control: AbstractControl) {
    const ie: string = control.value
    let dig = 0
    function checkIEMS(ie: string) {
      if (ie.length != 9)
        return { numeroInvalido: true };
      if (ie.substring(0, 2) != '28')
        return { numeroInvalido: true };
      var nro = new Array(9);
      for (var i = 0; i <= 8; i++)
        nro[i] = Number(ie.charAt(i));
      let b = 9;
      let soma = 0;
      for (i = 0; i <= 7; i++) {
        soma += nro[i] * b;
        b--;
      }
      i = soma % 11;
      if (i <= 1)
        dig = 0;
      else
        dig = 11 - i;
      return null;
    }

    function checkIe(ie: string) {
      if ( ie == 'ISENTO') return null;
      return checkIEMS(ie)
    }

    return checkIe(ie)
  }
  
}