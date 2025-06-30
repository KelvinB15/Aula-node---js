function createLead() {
    // Definição do objeto lead com as propriedades especificadas
    var lead = {
        lead_idestabelecimento: 1,
        lead_idcrm_funil: 44,
        lead_ie_etiqueta: 1,
        lead_ds_titulo: 'Título 2 => teste',
        pf_nm_pessoa: 'teste nome',
        pf_ds_profissao: 'estudante',
        pfc_ie_tipo_contato: 0,
        lead_ds_valor: 150,
        pjc_nr_telefone: '981789712',
        lead_idcrm_origem_lead: 28,
        pj_ds_razao_social: 'Raitonblack',
        item_codigo_item: '5566',
        item_entidade_relacionada: 'entidade_wendel',
        item_descricao: 'teste do item',
        ead_ds_observacao: 'teste informação lead',
        lead_idcrm_funil_etapa: 105,
        item_valor: 120
    };

    // Imprime o objeto lead no console
    console.log(lead);
    // Retorna o objeto lead
    return lead;
}



function run(body) {
  let result = {};  
  if (body) {
    result = JSON.parse(body);
  }

  let nome_da_pessoa = result?.name || '';
  let phone = result?.phone || null;
  let source = result?.source && result.source !== 'Não rastreada' ? result.source : null;
  let utm_medium = result?.visit?.params?.utm_medium || null;
  let id = result?.status?.id || null;
  let remote_addr = result?.visit?.meta?.remote_addr || null;
  let family_sistema = result?.visit?.meta?.http_user_agent?.os?.family || null;
  let family_dispositivo = result?.visit?.meta?.http_user_agent?.browser?.family || null;
  let type = result?.visit?.meta?.http_user_agent?.device?.type || null;
  let gclid = result?.visit?.params?.gclid || null;
  let utm_term = result?.visit?.params?.utm_term || null;
  let utm_source = result?.visit?.params?.utm_source || null;
  let nome_da_conta = result?.account?.name || null;
  let event_type = result?.event_type || null;
  
  return {nome_da_pessoa,phone,source,utm_medium,id,remote_addr,family_sistema,family_dispositivo,type,gclid,utm_term,utm_source,nome_da_conta,event_type};
}


  // "nome_da_pesso": "[:nome_da_pesso]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",
  // "phone": "[:phone]",


   let nome_da_pessoa = result.name;
   let phone = result.phone;
   let source = result.source;
   let utm_medium = result.visit.params.utm_medium
   let id = result.status.id
   let remote_addr = result.visit.meta.remote_addr
   let family_sistema = result.visit.meta.http_user_agent.os.family
   let family_dispositivo =  result.visit.meta.http_user_agent.browser.family
   let type = result.visit.meta.http_user_agent.device.type
   let gclid = result.visit.params.gclid
   let utm_term = result.visit.params.utm_term
   let utm_source = result.visit.params.utm_source
   let nome_da_conta = result.account.name
   let event_type = result.event_type














   function feriadoFuncionamento(datas) {
    const arrayDeDatas = JSON.parse(datas);
    const dataAtual = new Date().toISOString().split('T')[0];
    const diaDaSemana = agora.getUTCDay();//retorna o dia 
    const horaAtual = agora.getUTCHours();//retorna as horas
    const minutoAtual = agora.getUTCMinutes();//retorna os minutos

    const estaDentroHorarioFuncionamento = 
    (diaDaSemana >= 1 && diaDaSemana <= 5 && horaAtual >= 6 && (horaAtual < 18 || (horaAtual === 18 && minutoAtual < 0)))
    || (diaDaSemana === 6 && horaAtual >= 7 && (horaAtual < 11 || (horaAtual === 11 && minutoAtual < 0)));
    
    if (arrayDeDatas && arrayDeDatas.includes(dataAtual) && estaDentroHorarioFuncionamento ?) {
      return "SIM";
    } else {
      return "NAO";
    }
  }




  function feriadoFuncionamento(datas) {
    const arrayDeDatas = JSON.parse(datas);  // Transforma o JSON em array
    const agora = new Date();  // Definindo a variável 'agora' com a data/hora atual
    const dataAtual = agora.toISOString().split('T')[0]; // Pega a data atual no formato 'YYYY-MM-DD'
    const diaDaSemana = agora.getUTCDay(); // Retorna o dia da semana (0 - domingo, 6 - sábado)
    const horaAtual = agora.getUTCHours(); // Retorna a hora em UTC
    const minutoAtual = agora.getUTCMinutes(); // Retorna os minutos em UTC
    
    const estaDentroHorarioFuncionamento = 
    (diaDaSemana >= 1 && diaDaSemana <= 5 && horaAtual >= 7 && (horaAtual < 18 || (horaAtual === 18 && minutoAtual < 0)))
    || (diaDaSemana === 6 && horaAtual >= 7 && (horaAtual < 11 || (horaAtual === 11 && minutoAtual < 0)));
    
    // Verifica se a data atual está na lista de feriados e se está dentro do horário de funcionamento
    if (arrayDeDatas && arrayDeDatas.includes(dataAtual) && estaDentroHorarioFuncionamento) {
      return "SIM";
    } else {
      return "NAO";
    }
}






  function horarioFuncionamento() {
    const agora = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const diaDaSemana = agora.getUTCDay(); // Retorna o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const horaAtual = agora.getUTCHours(); // Retorna as horas
    const minutoAtual = agora.getUTCMinutes(); // Retorna os minutos

    const estaDentroHorarioFuncionamento =
        // Segunda a sexta-feira: das 07:00 às 11:00 e das 13:00 às 17:00
        ((diaDaSemana >= 1 && diaDaSemana <= 5 && ((horaAtual >= 7 && horaAtual < 11) || (horaAtual >= 13 && horaAtual < 17))) 

         // Sábado: das 08:00 às 11:00
        || (diaDaSemana === 6 && horaAtual >= 7 && horaAtual < 11)
       );

    return estaDentroHorarioFuncionamento ? "SIM" : "NAO";
}