function updateDataPlayers() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Joueurs');
  let response = UrlFetchApp.fetch('https://tftt.barais.fr/players/club/03350060', {'muteHttpExceptions': true});
  let players = JSON.parse(response.getContentText());
  let numToCat = {}
  
  players.map(function(player) {
    numToCat[player.licence] = {cat : player.cat, points: parseInt(player.points)};
  });
  let maxRow = sheet.getMaxRows()
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
  let now = new Date();
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let sheetMatches = ss.getSheetByName('Rencontres');  
  let maxRow = sheetMatches.getMaxRows();
  
  let rencontres = sheetMatches.getRange(`A2:J${maxRow}`).getValues().filter(rencontre => rencontre[0] != '');
  let nomJoueurs = joueurs.getRange(`A2:A${maxRow}`).getValues();

  let brulage = {};
  let joueurs = ss.getSheetByName('Joueurs');  
  
  
  deleteColumn(joueurs,'Q',maxRow);

  rencontres.forEach(function(rencontre) {
    if (now.valueOf() > rencontre[0].valueOf()) {
      for(let joueur = 6; joueur <= 9; joueur++) {
        let nom = rencontre[joueur];
        let numeroEquipe = rencontre[2];
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
      let numeroEquipe = brulage[nom[0]].length >= 2 ? brulage[nom[0]].sort()[1] : '';
      joueurs.getRange(index+2,17).setValue(numeroEquipe); 
    }
  });
}

function checkDuplicates() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Rencontres');  
  let maxRow = sheet.getMaxRows();
  let day_number = sheet.getRange(`P2:P${maxRow}`).getValues().flat();
  for (let i = 1; i <= 7; i++) {
    let firstIndex = day_number.indexOf(i)+2;
    let lastIndex = day_number.lastIndexOf(i)+2;
    let data = sheet.getRange(`G${firstIndex}:J${lastIndex}`).getValues().flat();
    const duplicates = findDuplicates(data);
    duplicates.forEach((duplicate) =>{
      const name_match = sheet.getRange(firstIndex + parseInt(duplicate[0]),2).getValue();
      sheet.getRange(firstIndex + parseInt(duplicate[0]),15).setValue(`${name_match} : ${duplicate[1].toString()}`);
    })
  }
}