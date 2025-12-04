from flask import Flask, render_template, jsonify

app = Flask(__name__)

class Coffee:
    def __init__(self, name, price, image):
        self.name = name
        self.price = price
        self.image = image

menu = [
    Coffee("Espresso", 2.5, "/static/images/espresso.jpg"),
    Coffee("Latte", 3.5, "/static/images/latte.jpg"),
    Coffee("Cappuccino", 3.0, "/static/images/cappuccino.jpg"),
    Coffee("Americano", 2.0, "/static/images/americano.jpg"),
    Coffee("Mocha", 4.0, "/static/images/mocha.jpg"),
    Coffee("Cold Coffee", 3.8, "/static/images/coldcoffee.jpg")
]


@app.route("/")
def home():
    return render_template("home.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/menu")
def menu_page():
    return render_template("index.html")

@app.route("/order")
def order_page():
    return render_template("order.html")

@app.route("/api/menu")
def api_menu():
    return jsonify([{
        "name": c.name,
        "price": c.price,
        "image": c.image
    } for c in menu])

if __name__ == "__main__":
    app.run(debug=True)
