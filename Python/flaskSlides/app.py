from flask import Flask
import pyautogui
import time

app = Flask(__name__)


@app.route("/")
def reloadPage():
    pyautogui.press('f5')
    time.sleep(2)
    pyautogui.press('f11')
    return "OK"


@app.route("/slides/<number>")
def goToSlide(number):
    for i in number:
        pyautogui.press(i)
    pyautogui.press('enter')
    return f"OK slide = {number}"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port="8080")


def create_app():
    return app
