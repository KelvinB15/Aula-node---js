function validarmedico(medico) {
  const medicosValidos = [
    'Dr. Carlos Alberto Pirondi',
    'Dr. Eduardo Moreira',
    'Dr. Hugo da Cunha',
    'Dr. Jonivan Siqueira',
    'Dra. Wattusy Araújo',
    '1',
    '2',
    '3',
    '4',
    '5',
    'Carlos',
    'Eduardo',
    'Hugo',
    'Jonivan',
    'Wattusy'
  ];

  // Remove espaços extras e compara exatamente
  if (medicosValidos.includes(medico.trim())) {
    return 'SIM';
  }

  return 'NAO';
}
function run(arrApi) {
  let url = '';
  let dados;

  if (arrApi) {
    try {
      dados = JSON.parse(arrApi);
    } catch (e) {
      return url;
    }
  }
  
  // if (dados && dados.length && dados[0].atendimento) {
  //   const { atendimento } = dados[0];
  //   if (atendimento) {      
  //     const atendUrl = atendimento.find((x) => x.codigoOs === protocolo);
  //     if (atendUrl) {
  //       url = atendUrl.urlPdfResultado;
  //     }
  //   }
  // }
if (dados && dados.length > 0 && Array.isArray(dados[0].atendimento)) {
    const { atendimento } = dados[0];

    // Ordena por data e hora de cadastro (garantindo os mais recentes)
    const ordenado = atendimento.sort((a, b) => {
      const dataHoraA = new Date(`${a.dataCadastro}T${a.horaCadastro}`);
      const dataHoraB = new Date(`${b.dataCadastro}T${b.horaCadastro}`);
      return dataHoraA - dataHoraB;
    });

    // Pega os 3 últimos e extrai os URLs dos resultados
    urls = ordenado
      .slice(-3)
      .map(item => item.urlPdfResultado)
      .filter(Boolean); // Remove valores nulos ou vazios
  }
  return url;
}



function verificarExameDisponivel(url_pdf_1, url_pdf_2, url_pdf_3) {
  let count = 0;

  if (url_pdf_1) count++;
  if (url_pdf_2) count++;
  if (url_pdf_3) count++;

  if (count === 1) {
    return "você tem um exame disponível, digite 'sim' para acessar";
  } else if (count === 2) {
    return "você tem dois exames disponíveis, digite 'sim' para acessar";
  } else if (count === 3) {
    return "você tem três exames disponíveis, digite 'sim' para acessar";
  } else {
    return "nenhum exame disponível";
  }
}




function run(arrApi) {
  let urls = [];
  let dados;

  if (arrApi) {
    try {
      dados = JSON.parse(arrApi);
    } catch (e) {
      return { pdf1: '', pdf2: '', pdf3: '' };
    }
  }

  if (dados && dados.length > 0 && Array.isArray(dados[0].atendimento)) {
    const { atendimento } = dados[0];

    const ordenado = atendimento.sort((a, b) => {
      const dataHoraA = new Date(`${a.dataCadastro}T${a.horaCadastro}`);
      const dataHoraB = new Date(`${b.dataCadastro}T${b.horaCadastro}`);
      return dataHoraA - dataHoraB;
    });

    urls = ordenado
      .slice(-3)
      .map(item => item.urlPdfResultado)
      .filter(Boolean);
  }

  // Garantir que urls tenha 3 itens, preenchendo com string vazia se precisar
  while (urls.length < 3) {
    urls.push('');
  }

  // Retorna um objeto com as 3 variáveis
  return {
    pdf1: urls[0],
    pdf2: urls[1],
    pdf3: urls[2],
  };
}



function verificarExameDisponivel(url_pdf_1, url_pdf_2, url_pdf_3) {
  function extrairCodOs(url) {
    if (!url) return null;
    const match = url.match(/CodOs=([^&]+)/);
    return match ? match[1] : null;
  }

  const codigos = [];

  const cod1 = extrairCodOs(url_pdf_1);
  const cod2 = extrairCodOs(url_pdf_2);
  const cod3 = extrairCodOs(url_pdf_3);

  if (cod1) codigos.push(cod1);
  if (cod2) codigos.push(cod2);
  if (cod3) codigos.push(cod3);

  const count = codigos.length;

  if (count === 1) {
    return "você tem um exame disponível, digite 'sim' para acessar";
  } else if (count === 2) {
    return `você tem dois exames disponíveis, escolha uma das opções:\n1 - CodigoOS: ${codigos[0]}\n2 - CodigoOS: ${codigos[1]}`;
  } else if (count === 3) {
    return `você tem três exames disponíveis, escolha uma das opções:\n1 - CodigoOS: ${codigos[0]}\n2 - CodigoOS: ${codigos[1]}\n3 - CodigoOS: ${codigos[2]}`;
  } else {
    return "nenhum exame disponível";
  }
}


function extrairData1(url_pdf) {
  try {
    const obj = JSON.parse(url_pdf);
    return obj.data1 || '';
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error);
    return '';
  }
}


function extrairPdf1(url_pdf) {
  try {
    const obj = JSON.parse(url_pdf);
    return obj.pdf1 || '';
  } catch (error) {
    // Se der erro no parse, retorna string vazia ou mensagem
    console.error('Erro ao fazer parse do JSON:', error);
    return '';
  }
}
