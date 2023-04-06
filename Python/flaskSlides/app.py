import time
import pyautogui
from flask import Flask


app = Flask(__name__)


@app.route("/")
def reload_page():
    pyautogui.press('f5')
    # Temps pour que la page s'actualise
    time.sleep(2)
    pyautogui.press('f11')
    return "Page refreshed"

# For my Dell :
#   with pyautogui.hold('fn'):
#     pyautogui.press('f5')
#     time.sleep(3)
#     pyautogui.press('f11')


@app.route("/slides/<number>")
def go_to_slide(number):
    for digit in number:
        pyautogui.press(digit)
    pyautogui.press('enter')
    return f"Slide {number} activate"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port="8080")
