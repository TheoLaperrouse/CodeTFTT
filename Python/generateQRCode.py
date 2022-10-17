import qrcode

lien = input('Renseignez votre lien : ')
img = qrcode.make(lien)
img.save("QRCode.png")