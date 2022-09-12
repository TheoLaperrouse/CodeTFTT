import csv
import xlsxwriter
 
def write_line(worksheet, row_compteur, row) :
    column_compteur = 0
    for field in row :             
        worksheet.write(row_compteur, column_compteur, field)
        column_compteur += 1

if __name__ == '__main__':
    licenceNum = []
    # compteur = 0
    workbook = xlsxwriter.Workbook('tableaux.xlsx')
    table_names = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
    name_compteur,column_compteur,row_compteur = [0, 0, 0]
    with open('thorigne.csv') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in reader:
            if(row.__contains__('numLicence')):
                worksheet = None
                worksheet = workbook.add_worksheet(f'Tableau{table_names[name_compteur]}')         
                name_compteur += 1
                row = ['Numéro Licence', 'Prénom', 'Nom', 'Nombre de points', 'Nom Club']  
                write_line(worksheet, 0, row)  
                row_compteur = 1
            else :
                # if row[0].startswith('35') and row[0] not in licenceNum:
                #     compteur += 1
                #     licenceNum.append(row[0])
                write_line(worksheet,row_compteur, row)  
                row_compteur += 1
    workbook.close()