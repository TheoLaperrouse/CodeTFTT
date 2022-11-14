
function getMatches() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Rencontres');
  compteur = 2
  const regex = /(THORIGNE)|(TFTT)/gm;
  var matches = UrlFetchApp.fetch('https://tftt.barais.fr/teams/allmatches/numclub=03350060/phase=1', {'muteHttpExceptions': true});
  var sortedMatches = matches.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
  sortedMatches.map(function(match) {
    sheet.getRange(compteur,1).setValue(match.date);
    sheet.getRange(compteur,2).setValue(`${match.equipeA} vs ${match.equipeB}`);
    sheet.getRange(compteur,3).setValue(regex.test(equipeA) ? equipeA.match(/\d+/g).join('') : equipeB.match(/\d+/g).join(''));
    sheet.getRange(compteur,4).setValue(regex.test(equipeA) ? 'Domicile':'Extérieur');
    if(match.scoreA != ''){
      sheet.getRange(compteur,5).setValue(regex.test(equipeA) && match.scoreA >= match.scoreB ? 'TRUE' : 'FALSE');
      sheet.getRange(compteur,6).setValue(`${match.scoreA}/${match.scoreB}`);
    }
    compteur += 1;
  })
}