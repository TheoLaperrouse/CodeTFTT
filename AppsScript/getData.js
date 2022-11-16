function getMatches() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Rencontres');
  compteur = 2
  const regex = /^(THORIGNE-FOUILLARD TT)|^(THORIGNE FOUILLARD TT)|^(THORIGNE TT)|^(TFTT)/;
  var response = UrlFetchApp.fetch('https://tftt.barais.fr/teams/allmatches/numclub=03350060/phase=1', {'muteHttpExceptions': true});
  var matches = JSON.parse(response.getContentText());
  matches.map(function(match) {
    sheet.getRange(compteur,1).setValue(match.date);
    sheet.getRange(compteur,2).setValue(`${match.equipeA.replace(regex, 'TFTT')} vs ${match.equipeB.replace(regex, 'TFTT')}`);
    sheet.getRange(compteur,3).setValue(regex.exec(match.equipeA) !== null ? match.equipeA.match(/\d+/g).join('') : match.equipeB.match(/\d+/g).join(''));
    sheet.getRange(compteur,4).setValue(regex.exec(match.equipeA) !== null ? 'Domicile':'Extérieur');
    if(match.scoreA !== ''){
      sheet.getRange(compteur,5).setValue(regex.exec(match.equipeA) !== null && match.scoreA >= match.scoreB ? 'TRUE' : 'FALSE');
      sheet.getRange(compteur,6).setValue(`${match.scoreA}/${match.scoreB}`);
    }
    compteur += 1;
  })
}