import qrcode

if __name__ == '__main__':
    qrcode.make(input('Renseignez votre lien : ')).save("QRCode.png")
