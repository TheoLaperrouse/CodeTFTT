function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Mettre à jour')
        .addItem('Catégories', 'updateCategories')
        .addItem('Brûlage', 'updateBurnings')
        .addToUi();
  }
  
  function deleteColumn(sheet, colonne, line) {
    var range = sheet.getRange(`${colonne}2:${colonne}${line}`);
    range.clearContent();
  }