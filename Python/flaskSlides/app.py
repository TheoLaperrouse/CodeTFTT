from flask import Flask
import pyautogui
import time

app = Flask(__name__)


@app.route("/")
def reloadPage():
    pyautogui.press('f5')
    # Temps pour que la page s'actualise
    time.sleep(2)
    pyautogui.press('f11')
    return "Page refreshed"


@app.route("/slides/<number>")
def goToSlide(number):
    for digit in number:
        pyautogui.press(digit)
    pyautogui.press('enter')
    return f"Slide {number} activate"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port="8080")


def create_app():
    return app
