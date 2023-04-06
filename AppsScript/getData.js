function getMatchesWithJoueurs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Rencontres');
  var compteur = 2
  const regex = /(THORIGNE-FOUILLARD TT)|(THORIGNE FOUILLARD TT)|^(THORIGNE TT)|^(TFTT)/;
  var response = UrlFetchApp.fetch('http://fastapifftt.thorigne-tt.net/matches/tftt', {'muteHttpExceptions': true});
  var matches = JSON.parse(response.getContentText());
  matches.map(function(match) {
    const TFTTEquipeA = match.equa.match(regex);
    const numEquipe = TFTTEquipeA ? match.equa.match(/\d+/g).join('') : match.equb.match(/\d+/g).join('')
    const numEquipeFinal =  match.equa.match(/^Féminines/) || match.equb.match(/^Féminines/)? parseInt(numEquipe) + 15 : numEquipe
    const equipe = `${match.equa.replace(regex, 'TFTT')} vs ${match.equb.replace(regex, 'TFTT')}`
    const place = TFTTEquipeA ? 'Domicile' : 'Extérieur';
    sheet.getRange(compteur, 1, 1, 4).setValues([[match.date, equipe, numEquipeFinal,place]]);
    if(match.scorea != null){
      const victory = (TFTTEquipeA && match.scorea > match.scoreb ) || (match.equb.match(regex) && match.scorea < match.scoreb);
      const score = `${match.scorea}/${match.scoreb}`;
      const joueurs = TFTTEquipeA ? match.joueursA : match.joueursB;
      sheet.getRange(compteur, 5, 1, 4 + joueurs.length).setValues([[victory ? 'TRUE' : 'FALSE', score, ...joueurs.slice(0, 4)]]);
    }
    compteur += 1;
  })
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
