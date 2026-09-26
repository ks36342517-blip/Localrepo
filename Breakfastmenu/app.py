from flask import Flask, render_template
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route("/")
def home():

    # Read the XML file
    tree = ET.parse("breakfast.xml")
    root = tree.getroot()

    menu = []

    # Read each food item
    for food in root.findall("food"):

        item = {
            "name": food.find("name").text.strip(),
            "price": food.find("price").text.strip(),
            "description": food.find("description").text.strip(),
            "calories": food.find("calories").text.strip()
        }

        menu.append(item)

    return render_template("index.html", menu=menu)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )