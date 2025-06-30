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
