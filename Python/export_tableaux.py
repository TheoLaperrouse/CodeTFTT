import csv
import xlsxwriter

def write_line(sheet, row_index, row_fields) :
    column_index = 0
    for field in row_fields :
        sheet.write(row_index, column_index, field)
        column_index += 1

if __name__ == '__main__':
    licenceNum = []
    # compteur = 0
    workbook = xlsxwriter.Workbook('tableaux.xlsx')
    table_names = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
    name_compteur,column_compteur,ROW_COMPTEUR = [0, 0, 0]
    with open('thorigne.csv', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in reader:
            if row in 'numLicence':
                WORKSHEET = None
                WORKSHEET = workbook.add_worksheet(f'Tableau{table_names[name_compteur]}')
                name_compteur += 1
                row = ['Numéro Licence', 'Prénom', 'Nom', 'Nombre de points', 'Nom Club']
                write_line(WORKSHEET, 0, row)
                ROW_COMPTEUR = 1
            else :
                # if row[0].startswith('35') and row[0] not in licenceNum:
                #     compteur += 1
                #     licenceNum.append(row[0])
                write_line(WORKSHEET,ROW_COMPTEUR, row)
                ROW_COMPTEUR += 1
    workbook.close()
