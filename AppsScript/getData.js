function getMatchesWithJoueurs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Rencontres');
  const regex = /(THORIGNE-FOUILLARD TT)|(THORIGNE FOUILLARD TT)|^(THORIGNE TT)|^(TFTT)/;
  const response = UrlFetchApp.fetch('https://tftt.barais.fr/teams/allmatches/phase=2/joueurs=true', {'muteHttpExceptions': true});
  const matches = JSON.parse(response.getContentText());
  const values = [];
  matches.forEach(function(match) {
    const numEquipe = match.equipeA.match(regex) ? match.equipeA.match(/\d+/g).join('') : match.equipeB.match(/\d+/g).join('')
    const numEquipeFinal =  match.equipeA.match(/^Féminines/) || match.equipeB.match(/^Féminines/)? parseInt(numEquipe) + 15 : numEquipe
    const equipe = `${match.equipeA.replace(regex, 'TFTT')} vs ${match.equipeB.replace(regex, 'TFTT')}`
    const rowValues = [
      match.date,
      equipe,
      numEquipeFinal,
      match.equipeA.match(regex) ? 'Domicile' : 'Extérieur',
      match.scoreA !== '' ? match.equipeA.match(regex) && match.scoreA >= match.scoreB ? 'TRUE' : 'FALSE' : '',
      match.scoreA !== '' ? `${match.scoreA}/${match.scoreB}` : '',
    ];
    if (match.joueursA && match.equipeA.match(regex)) {
      rowValues.push(...match.joueursA.slice(0, 4));
    } else if (match.joueursB) {
      rowValues.push(...match.joueursB.slice(0, 4));
    }
    values.push(rowValues);
  });
  sheet.getRange(2, 1, values.length, values[0].length).setValues(values);
  supprProA()
}

function supprProA() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Rencontres');
  var data = sheet.getDataRange().getValues();
  var numRows = sheet.getLastRow();
  for (var i = numRows; i > 0; i--) {
    if (data[i-1][11] === "Pro A") {
      sheet.deleteRow(i);
    }
  }
}

function getProAStats(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Performance Pro A');
  var response = UrlFetchApp.fetch('http://fastapifftt.thorigne-tt.net/proA', {'muteHttpExceptions': true});
  var joueurs = JSON.parse(response.getContentText());
  compteur = 2
  joueurs.map(function(joueur) {
    sheet.getRange(compteur,1).setValue(joueur[0]);
    sheet.getRange(compteur,2).setValue(joueur[1]['vict']);
    sheet.getRange(compteur,3).setValue(joueur[1]['matches']);
    sheet.getRange(compteur,4).setValue(joueur[1]['win_ratio']);
    compteur += 1
  });
}
