function getMatchesWithJoueurs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Rencontres');
  compteur = 2
  const regex = /(THORIGNE-FOUILLARD TT)|(THORIGNE FOUILLARD TT)|^(THORIGNE TT)|^(TFTT)/;
  var response = UrlFetchApp.fetch('https://tftt.barais.fr/teams/allmatches/phase=2/joueurs=true', {'muteHttpExceptions': true});
  var matches = JSON.parse(response.getContentText());
  matches.map(function(match) {
    const numEquipe = match.equipeA.match(regex) ? match.equipeA.match(/\d+/g).join('') : match.equipeB.match(/\d+/g).join('')
    const numEquipeFinal =  match.equipeA.match(/^Féminines/) || match.equipeB.match(/^Féminines/)? parseInt(numEquipe) + 15 : numEquipe
    sheet.getRange(compteur,1).setValue(match.date);
    sheet.getRange(compteur,2).setValue(`${match.equipeA.replace(regex, 'TFTT')} vs ${match.equipeB.replace(regex, 'TFTT')}`);
    sheet.getRange(compteur,3).setValue(numEquipeFinal);
    sheet.getRange(compteur,4).setValue(match.equipeA.match(regex) ? 'Domicile':'Extérieur');
    if(match.scoreA !== ''){
      sheet.getRange(compteur,5).setValue(match.equipeA.match(regex) && match.scoreA >= match.scoreB ? 'TRUE' : 'FALSE');
      sheet.getRange(compteur,6).setValue(`${match.scoreA}/${match.scoreB}`);
      const joueurs =  match.equipeA.match(regex) ? match.joueursA: match.joueursB
      if(joueurs && joueurs != []){
        columnIndex = 7
        for(var index = 0; index <= 3; index = index + 1) {
          if(joueurs.length > index && joueurs[index] != ''){
            sheet.getRange(compteur,columnIndex + index).setValue(joueurs[index]);
          } 
        }
      }
    }
    compteur += 1;
  })
}