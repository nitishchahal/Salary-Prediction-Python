from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

df = pd.read_csv("salary_data.csv")

X = df[["Experience"]]
y = df["Salary"]

model = LinearRegression()
model.fit(X, y)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    exp = float(data["experience"])

    prediction = model.predict([[exp]])

    return jsonify({"salary": int(prediction[0])})

@app.route("/data", methods=["GET"])
def get_data():
    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)