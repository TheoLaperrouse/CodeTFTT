function getMatches() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Rencontres');
  let compteur = 2
  const regex = /(THORIGNE-FOUILLARD TT)|(THORIGNE FOUILLARD TT)|(THORIGNE TT)|(TFTT)/;
  let response = UrlFetchApp.fetch('http://fastapifftt.thorigne-tt.net/matches/tftt', {'muteHttpExceptions': true});
  let matches = JSON.parse(response.getContentText());
  for (const match of matches) {
    const TFTTEquipeA = match.equa.match(regex);
    const TFTTEquipeB = match.equb.match(regex);
    const numEquipe = TFTTEquipeA ? match.equa.match(/\d+/g).join('') : match.equb.match(/\d+/g).join('')
    const numEquipeFinal =  match.equa.match(/Féminines/) || match.equb.match(/Féminines/)? parseInt(numEquipe) + 15 : numEquipe
    const equipe = `${match.equa.replace(regex, 'TFTT')} vs ${match.equb.replace(regex, 'TFTT')}`
    const place = TFTTEquipeA ? 'Domicile' : 'Extérieur';
    
    sheet.appendRow([match.dateprevue, equipe, numEquipeFinal, place]);
    sheet.getRange(sheet.getLastRow(), 16).setValue(match.libelle.match(/n°(\d+)/)[1]);
    if (match.scorea != null) {
      const victory = (TFTTEquipeA && parseInt(match.scorea) > parseInt(match.scoreb)) || (TFTTEquipeB && parseInt(match.scorea) < parseInt(match.scoreb));
      const score = `${match.scorea}/${match.scoreb}`;
      const joueurs = TFTTEquipeA ? match.joueursA : match.joueursB;
      sheet.appendRow([victory ? 'TRUE' : 'FALSE', score, ...joueurs]);
    }
  }
}

function supprProA() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Rencontres');
  let data = sheet.getDataRange().getValues();
  let numRows = sheet.getLastRow();
  for (let i = numRows; i > 0; i--) {
    if (data[i-1][11] === "Pro A") {
      sheet.deleteRow(i);
    }
  }
}

function getProAStats(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Performance Pro A');
  let response = UrlFetchApp.fetch('http://fastapifftt.thorigne-tt.net/matches/proA', {'muteHttpExceptions': true});
  let joueurs = JSON.parse(response.getContentText());
  compteur = 2
  joueurs.map(function(joueur) {
    sheet.getRange(compteur,1).setValue(joueur[0]);
    sheet.getRange(compteur,2).setValue(joueur[1]['vict']);
    sheet.getRange(compteur,3).setValue(joueur[1]['matches']);
    sheet.getRange(compteur,4).setValue(joueur[1]['win_ratio']);
    sheet.getRange(compteur,5).setValue(joueur[1]['club']);
    compteur += 1
  });
}
