// Função para processar o log e extrair as informações de name e phone
function processarLog(body) {
    try {
      // Parseia o corpo JSON
      var dados = JSON.parse(body);
  
      // Verifica se o evento é 'lead.create'
      if (dados.event_type === 'lead.create') {
        // Retorna um objeto com name e phone
        return {
          name: dados.name,
          phone: dados.phone
        };
      } else {
        // Caso não seja 'lead.create', retorna null
        return null;
      }
    } catch (error) {
      // Caso o JSON seja inválido ou outro erro aconteça, retorna null
      console.error("Erro ao processar o log:", error);
      return null;
    }
  }
  // Processa o log e exibe o objeto com os dados extraídos
  var resultado = processarLog(body);