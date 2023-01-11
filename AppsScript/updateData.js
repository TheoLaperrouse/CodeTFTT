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
  var now = new Date()
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetMatches = ss.getSheetByName('Rencontres');  
  var maxRow = sheetMatches.getMaxRows()
  let rencontres = sheetMatches.getRange(`A2:J${maxRow}`).getValues().filter(rencontre => rencontre[0] != '');
  let brulageObject ={}

  rencontres.forEach(function(rencontre) {
    if (now.valueOf() > rencontre[0].valueOf()) {
      for(var joueur = 6; joueur <= 9; joueur = joueur + 1){
        var nom = rencontre[joueur];
        var numeroEquipe = rencontre[2];
        if(rencontre[joueur] !== ''){
          if(!Object.keys(brulageObject).includes(nom)) {
            brulageObject[nom] = [numeroEquipe]
          }
          else{
            brulageObject[rencontre[joueur]].push(numeroEquipe)
          }
        }
      }
    }
  })

  brulage = {}

  Object.keys(brulageObject).forEach(function(nom){
    if(brulageObject[nom].length >= 2){
      sorted = brulageObject[nom].sort(function(a,b){
        return a - b
      })
      brulage[nom.trim()] = sorted[1]
    }
  })

  var joueurs = ss.getSheetByName('Joueurs');  
  var maxRow = joueurs.getMaxRows()
  var nomJoueurs = joueurs.getRange(`A2:A${maxRow}`).getValues();
  
  deleteColumn(joueurs,'Q',maxRow)

  var compteur = 2;

  nomJoueurs.forEach(function(nom){
    if(Object.keys(brulage).includes(nom[0])){
      joueurs.getRange(compteur,17).setValue(brulage[nom]); 
    }
    compteur += 1;
  })

}