function onOpen() {
    let ui = SpreadsheetApp.getUi();
    ui.createMenu('Mettre à jour')
        .addItem('Catégories', 'updateCategories')
        .addItem('Brûlage', 'updateBurnings')
        .addToUi();
  }
  
  function deleteColumn(sheet, colonne, line) {
    let range = sheet.getRange(`${colonne}2:${colonne}${line}`);
    range.clearContent();
  }