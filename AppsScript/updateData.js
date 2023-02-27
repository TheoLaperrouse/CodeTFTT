function updateDataPlayers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Joueurs');
  var response = UrlFetchApp.fetch('https://tftt.barais.fr/players/club/03350060', {'muteHttpExceptions': true});
  var players = JSON.parse(response.getContentText());
  var numToCat = {}
  
  players.map(function(player) {
    numToCat[player.licence] = {cat : player.cat, points: parseInt(player.points)};
  });
  var maxRow = sheet.getMaxRows()
  let numLicences = sheet.getRange(`C2:C${maxRow}`).getValues();
  compteur = 2;
  deleteColumn(sheet,'H',maxRow)

  numLicences.map(function(numLicence) {
    if(numLicence != ''){
      sheet.getRange(compteur,8).setValue(numToCat[numLicence].cat);
      if(sheet.getRange(compteur,4) != NaN){
        sheet.getRange(compteur,4).setValue(numToCat[numLicence].points);
      }
      
    }
    compteur += 1;
  });
}
function updateBurnings() {
  var now = new Date();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetMatches = ss.getSheetByName('Rencontres');  
  var maxRow = sheetMatches.getMaxRows();
  var rencontres = sheetMatches.getRange(`A2:J${maxRow}`).getValues().filter(rencontre => rencontre[0] != '');
  
  var brulage = {};
  var joueurs = ss.getSheetByName('Joueurs');  
  var maxRow = joueurs.getMaxRows();
  var nomJoueurs = joueurs.getRange(`A2:A${maxRow}`).getValues();
  
  deleteColumn(joueurs,'Q',maxRow);

  rencontres.forEach(function(rencontre) {
    if (now.valueOf() > rencontre[0].valueOf()) {
      for(var joueur = 6; joueur <= 9; joueur++) {
        var nom = rencontre[joueur];
        var numeroEquipe = rencontre[2];
        if(nom !== '') {
          if(!Object.keys(brulage).includes(nom)) {
            brulage[nom] = [numeroEquipe];
          } else {
            brulage[nom].push(numeroEquipe);
          }
        }
      }
    }
  });

  nomJoueurs.forEach(function(nom, index) {
    if(Object.keys(brulage).includes(nom[0])) {
      var numeroEquipe = brulage[nom[0]].length >= 2 ? brulage[nom[0]].sort()[1] : '';
      joueurs.getRange(index+2,17).setValue(numeroEquipe); 
    }
  });
}