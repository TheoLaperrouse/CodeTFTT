from PIL import Image


def convert_jpeg_to_png(img_name):
    img = Image.open(img_name)
    img = img.convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    name = f"{img_name.split('.')[-2]}.png"
    img.putdata(new_data)
    img.save(name, "PNG")
    return name

if __name__ == "__main__":
    input_name = input("Renseigner le nom de votre image (avec l'extension) : ")
    new_img_name = convert_jpeg_to_png(input_name)
    print(f"Image convertie en PNG : {new_img_name}")
