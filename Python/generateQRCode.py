import qrcode
from PIL import Image

lien = input('Renseignez votre lien : ')
img = qrcode.make(lien)
img.save("QRCode.png")