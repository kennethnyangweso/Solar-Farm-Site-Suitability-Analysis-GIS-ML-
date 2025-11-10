from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load trained model
model = joblib.load('best_random_forest_regressor.pkl')

# Expected input features
FEATURES = ['DNI', 'DIF', 'GHI', 'GTI', 'TEMP', 'X', 'Y', 'water_area',
            'urban_area', 'forests_area', 'protected_area', 'DNI_to_GHI_ratio',
            'GTI_to_GHI_ratio', 'Diffuse_fraction', 'TEMP_log', 'X_sin', 'X_cos',
            'Y_sin', 'Y_cos']

@app.route('/')
def home():
    return jsonify({"message": "Solar PVOUT Regression API is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data], columns=FEATURES)
        prediction = model.predict(df)[0]
        return jsonify({'Predicted_PVOUT': float(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
