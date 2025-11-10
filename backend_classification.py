from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained classification model
model = joblib.load('best_ensemble_classifier.pkl')

# Expected input features (including Suitability_Index)
FEATURES = ['DNI', 'DIF', 'GHI', 'GTI', 'PVOUT', 'TEMP', 'X', 'Y', 'water_area',
            'urban_area', 'forests_area', 'protected_area', 'DNI_to_GHI_ratio',
            'GTI_to_GHI_ratio', 'Diffuse_fraction', 'TEMP_log', 'X_sin', 'X_cos',
            'Y_sin', 'Y_cos', 'Solar_Potential_Index', 'Suitability_Index']

@app.route('/')
def home():
    return jsonify({"message": "Solar Site Suitability Classification API is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data], columns=FEATURES)
        prediction = model.predict(df)[0]
        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(df)[0].tolist()
            return jsonify({'Predicted_Class': str(prediction), 'Probabilities': probabilities})
        else:
            return jsonify({'Predicted_Class': str(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
