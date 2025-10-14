function feriadoFuncionamento(datas) {
    const arrayDeDatas = JSON.parse(datas); // Datas fornecidas no formato "YYYY-MM-DD"
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const hojeFormatado = hoje.toISOString().split('T')[0]; // "YYYY-MM-DD"
  
    // Feriados fixos no Brasil (mês e dia)
    const feriadosFixos = [
      "01-01", // Ano Novo
      "04-21", // Tiradentes
      "05-01", // Dia do Trabalho
      "05-24", // Nossa Senhora Auxiliadora (Padroeira de Goiânia)
      "09-07", // Independência
      "10-12", // Nossa Sra. Aparecida
      "10-24", // Aniversário de Goiânia
      "11-02", // Finados
      "11-15", // Proclamação da República
      "11-20", // Consciência Negra/Zumbi
      "12-25", // Natal
      "06-30", // Data teste
    ];
  
    // Converte para formato "YYYY-MM-DD" com o ano atual
    const feriadosFixosComAno = feriadosFixos.map(dm => `${anoAtual}-${dm}`);
  
    // Cálculo dos feriados móveis
    function calculaPascoa(ano) {
      const f = Math.floor,
        G = ano % 19,
        C = f(ano / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (ano + f(ano / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        mes = 3 + f((L + 40) / 44),
        dia = L + 28 - 31 * f(mes / 4);
      return new Date(ano, mes - 1, dia);
    }
  
    function formatarData(data) {
      return data.toISOString().split('T')[0]; // "YYYY-MM-DD"
    }
  
    const pascoa = calculaPascoa(anoAtual);
  
    const sextaSanta = new Date(pascoa);
    sextaSanta.setDate(pascoa.getDate() - 2);
  
    const corpusChristi = new Date(pascoa);
    corpusChristi.setDate(pascoa.getDate() + 60);
  
    const feriadosMoveis = [
      formatarData(sextaSanta),
      formatarData(corpusChristi)
    ];
  
    const todosFeriados = arrayDeDatas
      .concat(feriadosFixosComAno)
      .concat(feriadosMoveis);
   // 🖨️ LOGS DE DEPURAÇÃO
   console.log("Data de hoje:", hojeFormatado);
   console.log("Feriados fixos:", feriadosFixosComAno);
   console.log("Data da Páscoa:", formatarData(pascoa));
   console.log("Sexta-feira Santa:", formatarData(sextaSanta));
   console.log("Corpus Christi:", formatarData(corpusChristi));
   console.log("Todos os feriados computados:", todosFeriados);
 
   return todosFeriados.includes(hojeFormatado) ? "SIM" : "NAO";
 }
 console.log(feriadoFuncionamento('[]'));