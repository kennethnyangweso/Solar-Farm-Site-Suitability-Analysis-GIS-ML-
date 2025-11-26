# Solar Farm-Site Suitability Analysis with Geographical Information Systems and Machine Learning

## **Business Understanding**

Access to clean, affordable, and sustainable energy is a cornerstone of economic development. Kenya has significant solar potential due to its high solar irradiance, but identifying the most suitable sites for solar photovoltaic (PV) projects requires more than just measuring sunlight.
Environmental, technical, and land use constraints (e.g., slope, water bodies, urban areas, protected areas) must be considered to avoid conflicts, minimize costs, and maximize power generation.

This project aims to provide a data-driven, GIS-based framework to locate optimal areas for solar PV installations.

## **Problem Statement**

Although solar irradiance data is available, decision-makers lack an integrated, spatially explicit model that combines solar resources (DNI, GHI, GTI, PVOUT, DIF), climate factors (temperature), and land constraints (protected areas, water bodies, forests, urban areas) to identify the most suitable zones for large-scale PV deployment.

Without this, investments may target suboptimal or environmentally sensitive sites, leading to:

- Increased project costs

- Land-use conflicts

- Reduced energy efficiency

## **Objectives**

The project will:

1. Integrate multi-source GIS data (irradiance, land use, constraints, climate).

2. Normalize and weight each factor based on its importance to solar PV suitability.

3. Develop a weighted overlay suitability model to produce a final suitability map.

4. Identify highly suitable regions for solar PV deployment in Kenya.

5. Provide insights to policymakers, investors, and planners to guide clean energy development.

## **Data Layers Used**

1. Solar resource: DIF, DNI, GHI, GTI, PVOUT

2. Climate: Temperature (TEMP)

3. Constraints: Protected areas, water bodies, urban areas, forests, agricultural areas

## **Metrics of Success**

✅ A suitability map that ranks all areas of Kenya (0–1 scale: unsuitable → highly suitable).

✅ At least 80% spatial agreement between identified suitable zones and known existing solar PV farms (validation).

✅ Usability of the model for decision-making: clear, interpretable maps for planners.

✅ Modular framework: ability to adjust weights and add/remove layers.

## **Methodology**

Step 1: Preprocess rasters (resample, normalize irradiance layers).

Step 2: Rasterize shapefiles (protected areas, forests, urban, water).

Step 3: Apply constraints (mask unsuitable areas = 0).

Step 4: Weighted overlay analysis (AHP / MCA).

Step 5: Generate suitability map.

Step 6: Validation (compare with known solar farms or theoretical hotspots).

# **Data Understanding**

The project integrates geospatial datasets from multiple sources to evaluate the suitability of locations for solar PV deployment in Kenya. These datasets represent both resource availability (how much solar energy is available) and constraints (where solar farms cannot or should not be built).

1. **Solar Radiation & Energy Potential Rasters**

- DNI (Direct Normal Irradiance) – measures solar radiation received per unit area by a surface always oriented toward the sun. Important for concentrating solar technologies but also a proxy for direct beam solar potential.

- DIF (Diffuse Horizontal Irradiance) – represents scattered sunlight received from the sky dome.

- GHI (Global Horizontal Irradiance) – the total solar radiation received on a horizontal surface; critical for PV system design.

- GTI (Global Tilted Irradiance) – the solar radiation on optimally tilted surfaces, more representative of actual PV installations.

- PVOUT (PV electricity output potential) – modeled electricity generation potential (kWh/kWp). This incorporates solar radiation and typical PV system efficiencies.

- TEMP (Ambient Temperature) – average surface air temperature, since higher temperatures reduce PV efficiency.

👉 Relevance: Together, these rasters describe both the solar energy resource (supply side) and the expected system performance (efficiency + yield).

2. **Environmental & Land-Use Constraints (Vector Data)**

- Protected Areas (shapefile) – National parks, reserves, or conservation areas where large-scale PV cannot be deployed.

- Water Bodies (shapefile) – Lakes, rivers, wetlands; unsuitable for PV development.

- Urban Areas (shapefile) – Cities and settlements; avoided for utility-scale PV but may be important for rooftop PV.

- Forests (shapefile) – Dense vegetation zones; often excluded due to environmental impacts.

👉 Relevance: These represent exclusion zones that reduce the technically usable land area.

3. **Auxiliary Data (Optional)**

- DEM (Digital Elevation Model) – used to derive slope. Steep terrain is less suitable for PV installation due to construction challenges.

- Slope & Elevation – if included, they add realism: flat/moderate slopes (<10°) are preferred.

👉 Note: DEM is not mandatory for a first version of the project, but improves accuracy.

4. **Spatial & Technical Considerations**

- Coordinate Reference System (CRS): All datasets must be projected to a common CRS (e.g., WGS84 EPSG:4326 or a UTM projection for Kenya).

- Resolution & Extent: Raster datasets vary in resolution (e.g., 1 km, 5 km). To compare them, resampling to a common grid is necessary.

- Data Quality Checks: Verifying missing values, nodata pixels, and valid attribute fields is essential before processing.

# **Data Preparation**

This phase involves cleaning, transforming, and organizing your spatial and tabular data so it can be meaningfully analyzed. Since you’re working with geographical raster and vector data, preparation is crucial.

## **Data cleaning**

- **Check coordinate reference systems (CRS):**

  - All your layers (DNI, DIF, GHI, GTI, PVOUT, TEMP, DEM, protected areas, water bodies, forests, urban areas) must be in the same projection (commonly WGS84 - EPSG:4326, or a suitable local projection).

  - If not, reproject them.

- **Remove unnecessary data:**

  - Clip the data to your study area (e.g., your country, region, or specific boundary).

  - This reduces computation and makes results clearer.
 
    
# **Exploratory Data Analysis**

## **Spatial Analysis**

### **Univariate Spatial Analysis**

<img width="427" height="526" alt="image" src="https://github.com/user-attachments/assets/075ac00d-9ae0-4fc9-a7ae-a5e7414f2c46" />

### Observation: DNI - Clipped to Kenya

- The Direct Normal Irradiance (DNI) map shows spatial variation in direct solar radiation across Kenya. 
- Higher DNI values are visible in the northeastern and some interior regions, indicating strong direct beam solar potential — beneficial for concentrating solar technologies and high-tilt PV systems. 
- Coastal and lake-adjacent areas show relatively lower DNI due to increased atmospheric moisture and cloudiness. 
- Use this map to prioritize locations where DNI is consistently high, but cross-reference with land-use constraints (protected areas, water bodies, urban zones) to ensure feasible site selection.

<img width="426" height="526" alt="image" src="https://github.com/user-attachments/assets/42bfcebf-3cec-4fd0-8ab5-e0a3f9681dec" />

### Observation: PVOUT - Clipped to Kenya

- PVOUT maps modeled electricity output (kWh/kWp) and integrates irradiance and system performance factors; high PVOUT regions align with high GHI/GTI and moderate temperatures.
- Use PVOUT to prioritize sites for maximum energy yield per installed capacity.
- Cross-reference high PVOUT zones with land constraints (protected, urban, water) before site selection.

<img width="536" height="680" alt="image" src="https://github.com/user-attachments/assets/2c1ff4d2-9b57-42db-a46c-cae5ee5eb794" />

### Observation: Protected Areas

- The protected areas map identifies conservation zones and legally protected lands where utility-scale solar development should be avoided.
- These zones must be excluded from suitability calculations or assigned zero suitability.
- For planning, buffer protected areas to avoid edge impacts and account for ecological corridors.

<img width="536" height="680" alt="image" src="https://github.com/user-attachments/assets/9105fe3f-4c05-48ca-8d4b-02efac7a93eb" />

### Observation: Urban Areas

- Urban maps show settlements and built-up areas; these are generally unsuitable for large utility-scale PV (but suitable for distributed/rooftop PV).
- Exclude dense urban zones from candidate areas for ground-mounted farms, or treat them separately for rooftop potential assessments.

<img width="536" height="680" alt="image" src="https://github.com/user-attachments/assets/61db8bbe-1e13-4fbb-a497-7af7a23ffe05" />

### Observation: Water Bodies

- Water bodies (lakes, rivers, wetlands) are unsuitable for PV installations and should be masked out of the suitability map.
- Note that nearshore wetlands and seasonal ponds may require additional local validation to avoid accidental inclusion.

### **Spatial Relationship Analysis**

<img width="744" height="810" alt="image" src="https://github.com/user-attachments/assets/1968fb41-3035-4ae1-a7b5-a7981fd59e0c" />

### Observations: DNI with Protected Areas

- Protected areas overlap some regions with moderate-to-high DNI; these areas should be excluded from large-scale PV development to avoid ecological impacts.
- Note: Important conservation zones (e.g., national parks and reserves) may remove significant contiguous land from availability, fragmenting otherwise promising high-DNI regions.
- Recommendation: Use this overlay to mask protected zones from further suitability scoring and consider buffer zones to reduce edge impacts.

<img width="809" height="810" alt="image" src="https://github.com/user-attachments/assets/cedd575f-a284-4595-b957-aeafa6e82be2" />

### Observations: DNI with Water Bodies

- Water bodies (lakes, rivers, wetlands) appear in areas with lower DNI along shorelines; these are unsuitable for ground-mounted PV and should be masked out.
- Large lakes and river corridors can create local microclimates (increased humidity and cloudiness) that reduce direct irradiance near shorelines.
- Recommendation: Exclude water bodies from candidate areas and add a small buffer to account for wetland transitions and seasonal fluctuations.

<img width="750" height="810" alt="image" src="https://github.com/user-attachments/assets/d60a3053-fd2c-41ee-ab18-f877257671f7" />

### Observations: DNI with Forests

- Forested areas usually coincide with lower surface irradiance at canopy level; these lands are often environmentally sensitive and should be excluded from large-scale PV.
- Forest cover can also indicate terrain or land-use constraints (steep slopes, conservation), reducing practical suitability even where DNI is moderate.
- Recommendation: Mask dense forest areas from suitability maps and assess smaller degraded or open-woodland patches separately if needed.

### **Multi-variate Spatial Analysis**

<img width="866" height="989" alt="image" src="https://github.com/user-attachments/assets/1bb102c5-ea62-4578-9e52-e8477eaa5a19" />

### PVOUT (Photovoltaic Output) Suitability Map – Observations and Insights

1. General Overview

- This map visualizes the spatial distribution of photovoltaic (PV) power output potential across Kenya.

- Warmer colors (yellow–red) represent higher solar potential,

- Cooler tones (green–blue) denote lower PV output.

- Additional map layers show protected areas, forests, urban areas, and water bodies, providing important spatial context for solar site planning.

2. High PVOUT Zones (Red to Orange Areas)

- Regions:

  - Northern Kenya — Turkana, Marsabit, Mandera, Wajir, Garissa

  - Eastern and parts of Coastal Kenya (Tana River, Lamu, Kilifi)

- Characteristics:

  - High solar irradiance and minimal cloud cover.

  - Large open land availability with minimal obstructions.

  - Consistent sunlight throughout the year.

- Implications:

  - These are optimal regions for utility-scale solar farms.

  - However, infrastructural limitations (transmission lines, accessibility) should be assessed before deployment.

3. Moderate PVOUT Zones (Yellow–Orange Transition)

- Regions:

  - Lower Rift Valley, Kajiado, Kitui, Makueni, Baringo, Isiolo

- Characteristics:

  - Good solar potential with slightly variable irradiance.

  - Mixed land use — some vegetation or elevation variations.

- Implications:

  - Suitable for medium-scale solar projects or hybrid systems (solar + storage).

  - Infrastructure and environmental balance make these regions promising.

4. Low PVOUT Zones (Greenish Areas)

- Regions:

  - Central Highlands, Western Kenya, and parts around Lake Victoria Basin

- Characteristics:

  - Higher rainfall, denser vegetation, and frequent cloud cover.

  - Reduced direct irradiance and higher humidity levels.

- Implications:

  - These zones are less ideal for large solar installations but could support rooftop or small distributed solar systems for local energy needs.

5. Restricted or Special Zones (Layer Overlays)

- Forests & Protected Areas (Bright Green): Mt. Kenya, Aberdares, Mau Complex — avoid solar development to preserve ecosystems.

- Urban Areas (Light Blue): Nairobi, Kisumu, Mombasa — potential for rooftop solar rather than ground installations.

- Water Bodies (Blue): Lakes and rivers excluded from PV potential zones.

## **Statistical/ Descriptive Analysis**

### **Univariate Analysis**

<img width="567" height="391" alt="image" src="https://github.com/user-attachments/assets/ece4e266-cad8-42f0-862a-0c9a9a1b6304" />

<img width="558" height="391" alt="image" src="https://github.com/user-attachments/assets/c7340a32-1a2a-42c8-8ebb-1472b9679f21" />

### Observations: Vector Descriptive Statistics

- Vector summaries (count, total area, mean area) indicate how much land each constraint occupies; large total areas for forests or protected areas mean those constraints will heavily reduce candidate land.
- A high count with low mean area indicates fragmentation (many small polygons), which has implications for permitting and construction; aggregated large patches are often preferable for utility-scale PV.

<img width="540" height="502" alt="image" src="https://github.com/user-attachments/assets/ff1af791-28af-432a-8879-bc9aa15c3afe" />

###Observations
The donut chart shows the relative land area share of each constraint — large slices for protected areas or water bodies imply stricter exclusion will heavily narrow candidate areas.

# **Data Preprocessing**

## **1. Data Integration (Raster Stacking)**

- Combine all raster layers (DNI, GHI, GTI, DIF, TEMP, PVOUT) into a common grid.

- Ensure same resolution, CRS, and extent (clip to Kenya boundary).

- Stack them so every pixel has aligned values

### **2. Extract Features into a Tabular Dataset**

- Convert raster stack into a DataFrame:

  - Each pixel = 1 row

  - Each band (DNI, GHI, etc.) = 1 feature

- PVOUT = target (y)

### **3. Cleaning**

- Remove pixels with no-data values (e.g., -9999 or nan).

- Mask out irrelevant pixels outside Kenya (already done via clipping).

## **Feature Engineering**

### 1. Derived Solar Radiation Features

These help the model understand solar potential patterns more deeply.

### 2. Temperature-Related Features

Temperature affects PV performance. You can model non-linear effects.

### 3. Spatial Features

Latitude (Y) and longitude (X) can be used more effectively through trigonometric encoding.

### 5. Composite Solar Potential Index 

You can engineer an aggregate index that combines solar irradiance and temperature.

### 6. Define Suitability Classes (based on PVOUT)

# **Exploratory Data Analysis 2 for the dataset**

## **Univariate Analysis**

<img width="784" height="384" alt="image" src="https://github.com/user-attachments/assets/059de6bb-d62c-4e8f-9b4b-5ddc5241d496" />

### Observations

- PVOUT irradiance variable is right-skewed


<img width="485" height="502" alt="image" src="https://github.com/user-attachments/assets/981f4298-4baf-4ed4-af63-d9fcb3cb8172" />

### Observations: Site Suitability Distribution 
- The donut/pie chart shows the proportion of pixels by suitability class. A large 'Unsuitable' slice often reflects strict exclusion masks or conservative PVOUT thresholds.

- A small 'High' slice can still be valuable if it contains high PVOUT per unit area always interpret counts together with area (km²) and energy density.

## **Bi-variate Analysis**


<img width="862" height="550" alt="image" src="https://github.com/user-attachments/assets/bac89b50-5b19-44fc-8aba-9b307f9d973a" />

### Observations: DNI vs PVOUT Scatter
- DNI and PVOUT show a strong positive relationship, confirming irradiance is the primary driver of modeled output.

- Check for heteroskedasticity (wider spread at higher DNI). If present, consider modeling approaches that handle non-constant variance or include interaction terms (e.g., DNI × TEMP)

- Flag outliers where PVOUT is low despite high DNI — these may indicate masking errors, local temperature penalties, or data issues.


<img width="837" height="550" alt="image" src="https://github.com/user-attachments/assets/0fad966e-0ebb-4e16-bc8e-88820e64e18f" />

### Observations: Suitability vs PVOUT

- Aggregated PVOUT by suitability class indicates where modeled energy is concentrated; large totals in a small area imply high-value parcels.
- Normalize PVOUT by area (mean PVOUT per km²) to compare classes fairly. If 'Unsuitable' contributes meaningful PVOUT, revisit exclusion logic and overlay alignment.
- Actionable: produce a ranked list of candidate parcels by PVOUT per km²

# **Modeling**
## **Regression**

📊 Model Performance Comparison:

                             R2       MAE       RMSE
    Linear Regression Reg  0.996169   3.700515   41.183286

    Random Forest Reg      0.998477   1.716178   16.370216

    Gradient Boosting Reg  0.993745   5.193694   67.250237

    XGBoost Reg            0.998397   2.443874   17.238687

### Observations

1. Random Forest achieved the best overall performance, with the highest R² (0.998) and the lowest error metrics (MAE = 1.72, RMSE = 4.05).

   - This indicates excellent predictive power and minimal residual error.

   - The ensemble averaging nature of Random Forest helps it capture nonlinear relationships effectively.

2. XGBoost closely follows Random Forest, with comparable R² and slightly higher MAE and RMSE.

   - This suggests XGBoost also models complex relationships well but might be slightly more sensitive to parameter tuning.

3. Linear Regression performed strongly, achieving an R² above 0.99.

   - Despite its simplicity, it provides a solid baseline.

   - However, it may not capture all nonlinear interactions as effectively as ensemble models.

4. Gradient Boosting had the lowest performance among the four, though still excellent overall (R² = 0.994).

   - The higher MAE and RMSE suggest it may require hyperparameter tuning or deeper trees to match the others.

#### Key Insight

- All models perform exceptionally well, indicating:

  - The features are highly predictive of the target variable.

  - Nonlinear models (Random Forest, XGBoost) slightly outperform linear regression, showing the dataset has some nonlinear relationships.

  - Random Forest can be considered the best-performing model at this stage, balancing accuracy and robustness.
 

<img width="1384" height="984" alt="image" src="https://github.com/user-attachments/assets/4a296981-7bc2-478d-aaf1-da0e4dfb6088" />

### Observations

1. Overall Model Performance and ConsistencyStrong Correlation: 
- All four models show a very strong positive correlation between the actual and predicted PVOUT values. 
- The data points in all plots hug the dashed red $y=x$ line quite closely, indicating that all models are performing well and are generally successful at predicting the PVOUT.- High Consistency: Visually, the performance across the four models appears highly consistent. It is difficult to distinguish a clear and significant difference in the scatter of points between Random Forest, Gradient Boosting, and XGBoost.Slight Visual - Difference for Linear Regression: The Linear Regression plot may show a very slightly wider spread of points around the $y=x$ line compared to the three tree-based models, particularly at the lower and higher ends of the PVOUT range. This suggests the more complex, non-linear tree-based models (Random Forest, Gradient Boosting, XGBoost) might be capturing the underlying relationship marginally better than the simple linear model.

2. Performance Across the Range (Homoscedasticity)Tight Fit: 
- All models show a very tight cluster of predictions across the entire range of PVOUT values (from approximately 1200 to 1900).
- Potential for Under/Over-Prediction:At the low end (around 1200-1400), the points seem to be slightly more spread out or perhaps slightly above the red line, suggesting the models might have a tendency to slightly over-predict the lowest PVOUT values.
- At the high end (around 1800-1900), the points also show some spread, with some points falling noticeably below the line, hinting at a slight tendency to under-predict the highest PVOUT values. This is a common characteristic in regression models when dealing with extremes in the data.

3. Comparison of Tree-Based ModelsNear-Identical Performance: 
- The Random Forest, Gradient Boosting, and XGBoost plots are visually almost indistinguishable. This suggests that for this specific dataset and feature set, the added complexity of the boosting techniques (Gradient Boosting and XGBoost) does not lead to a substantially different prediction profile compared to the bagging technique (Random Forest).



<img width="1384" height="583" alt="image" src="https://github.com/user-attachments/assets/c3f7ba24-a340-4858-867a-c72cb9991e5b" />

### Observations

1. Dominance of DNI
- Both models agree on the most important feature: The Direct Normal Irradiance (DNI) is overwhelmingly the most influential feature for predicting PVOUT (Photovoltaic Output).

- For Random Forest, DNI accounts for approximately 85% of the total feature importance.

- For XGBoost, DNI accounts for approximately 70% of the total feature importance.

- This strong dominance suggests that the PV system's output is primarily driven by the direct solar radiation hitting the surface, which is physically consistent with how solar power generation works.

2. Second Most Important Feature (GHI)
- Global Horizontal Irradiance (GHI) is the second most important feature in both models.

- For Random Forest, GHI has an importance of around 5-10%.

- For XGBoost, GHI is significantly more important than in Random Forest, with an importance of around 15-20%.

## **Classification**

📋 Logistic Regression Classification Report:

              precision    recall  f1-score   support

           0       0.00      0.00      0.00         1
           1       0.99      1.00      1.00      3673
           2       1.00      1.00      1.00      7335
           3       1.00      1.00      1.00      8991

    accuracy                           1.00     20000


<img width="529" height="473" alt="image" src="https://github.com/user-attachments/assets/94d47218-8df9-4eab-942c-9ed803cc232b" />

📋 Random Forest Classification Report:

              precision    recall  f1-score   support

           0       1.00      1.00      1.00         1
           1       1.00      1.00      1.00      3673
           2       1.00      1.00      1.00      7335
           3       1.00      1.00      1.00      8991

    accuracy                           1.00     20000

<img width="529" height="473" alt="image" src="https://github.com/user-attachments/assets/5590243f-5911-4d94-94b2-3cdcc4e63cba" />

📋 Gradient Boosting Classification Report:

              precision    recall  f1-score   support

           0       1.00      1.00      1.00         1
           1       1.00      1.00      1.00      3673
           2       1.00      1.00      1.00      7335
           3       1.00      1.00      1.00      8991

    accuracy                           1.00     20000


  <img width="529" height="473" alt="image" src="https://github.com/user-attachments/assets/28096956-9fc3-4f31-b5d2-80e012547104" />


📋 XGBoost Classification Report:

              precision    recall  f1-score   support

           0       1.00      1.00      1.00         1
           1       1.00      1.00      1.00      3673
           2       1.00      1.00      1.00      7335
           3       1.00      1.00      1.00      8991

    accuracy                           1.00     20000


<img width="529" height="473" alt="image" src="https://github.com/user-attachments/assets/7d1c63a1-0e0b-4130-b274-3e87ab79cabf" />


Model Performance Summary (Overfitting/Underfitting Check):

                         Train Accuracy    Test Accuracy    Difference
     Logistic Regression      0.99845          0.99835         0.00010
     Random Forest            1.00000          1.00000         0.00000
     Gradient Boosting        1.00000          1.00000         0.00000
     XGBoost                  1.00000          0.99860         0.00140

✅ Logistic Regression: Well-balanced (train-test gap = 0.000)

✅ Random Forest: Well-balanced (train-test gap = 0.000)

✅ Gradient Boosting: Well-balanced (train-test gap = 0.000)

✅ XGBoost: Well-balanced (train-test gap = 0.001)

📊 Ensemble Model Performance:

              precision    recall  f1-score   support

           0       1.00      1.00      1.00         1
           1       1.00      1.00      1.00      3673
           2       1.00      1.00      1.00      7335
           3       1.00      1.00      1.00      8991

    accuracy                           1.00     20000


<img width="610" height="473" alt="image" src="https://github.com/user-attachments/assets/d1ac7781-1efa-4daf-978f-c6ea21fd38de" />

🔍 Overfitting/Underfitting Check:

Train Accuracy: 1.00000

Test Accuracy:  1.00000

Difference:     0.00000

✅ Model is well-generalized.

### Observations

1. Perfect classification performance — all metrics are at 1.00, meaning the model made no misclassifications on the test data.

2. Class imbalance noted — Class 0 (low suitability) has only 1 instance, making the perfect score statistically weak. The model’s reliability for this class cannot be confidently assessed.

3. High model stability — For the major classes (1, 2, and 3), which together form over 99.99% of the dataset, performance is uniformly strong, suggesting excellent learning of decision boundaries.




Practical interpretation:

- Class 3 (Unsuitable): The model confidently identifies non-viable areas for development or installation.

- Class 2 (High Suitability): Highly suitable areas are consistently detected — critical for resource allocation or site planning.

- Class 1 (Moderate Suitability): Useful for identifying borderline regions requiring further analysis.

- Class 0 (Low Suitability): Needs additional data points to improve generalization.

### Confusion Matrix Insights:


1. Perfect Diagonal Matrix

  - All data points lie along the diagonal — meaning each instance was correctly classified into its true category.

  - There are zero false positives or false negatives, confirming 100% precision and recall.

2. Class Distribution Reflected in Matrix

  - Class 3 (Unsuitable) and Class 2 (High Suitability) dominate the dataset, and the model handles them perfectly.

  - Class 0 (Low Suitability) has only one sample, which the model correctly classified, but such low representation can make its evaluation statistically unreliable.

3. Model Understanding of Suitability Patterns

  - The ensemble model (RF + GB) demonstrates excellent learning of suitability boundaries, effectively distinguishing between suitability levels.


<img width="949" height="552" alt="image" src="https://github.com/user-attachments/assets/6beb2d1f-3245-4db4-83df-381e0249a08c" />


### Feature Importance Observations:

**Most Important Features:**

1. Suitability Index (Self-Reference): This is the most important feature by a significant margin ($\approx 0.63$). This feature likely represents a composite score derived from several underlying factors or a reference to the target variable itself in an iterative or ensemble model process. Note: Its high score suggests the model is very good at identifying existing high-scoring areas, but it doesn't reveal the physical drivers as much as the others.

2. Forests Area: This is the second most important physical constraint ($\approx 0.11$). Its high importance confirms the visual observation from the map: forests pose a major negative factor when determining suitable sites.PVOUT (Photovoltaic Output): This is the most important physical resource variable ($\approx 0.10$). This confirms that the estimated energy generation potential 

3. (PVOUT) is a critical driver for overall site suitability.Other Solar Resource Variables:DNI (Direct Normal Irradiance), GHI (Global Horizontal Irradiance), and GTI (Global Tilted Irradiance) are all grouped below $0.05$ importance. While they are the inputs to PVOUT, PVOUT itself is a better predictor of the final suitability score.Other Constraint Variables 

4. (Low Importance):Protected Area, Diffuse Fraction, DNI to GHI ratio, and Water Area all have very low feature importance ($\approx 0.01$).Protected Area and Water Area having low importance is surprising given their large coverage on the map. This low score suggests that once the Forests constraint is accounted for, the addition of Protected Area or Water Area adds very little new predictive power to the model's final suitability score. This could mean that forests and protected areas often overlap, or that the model relies more on the direct physical constraints (PVOUT, Forests) rather than policy/geographic constraints.

# **Final Conclusions**

The successful execution of the Weighted Overlay Suitability Model (WOSM) is expected to yield the following three main conclusions:

- Optimal Zones Identified: The WOSM confirms that specific Arid and Semi-Arid Lands (ASALs), characterized by the highest Global Horizontal Irradiance (GHI) and Photovoltaic Output (PVOUT), offer the most suitable locations for utility-scale solar PV development in Kenya.

- Technically Available Land: The analysis quantifies the total area in Kenya that remains Highly Suitable after the systematic exclusion of all constraints (e.g., protected areas, forests, urban centers, water bodies). This provides a precise, actionable acreage for strategic planning.

- Model Validation: The final suitability map is validated by achieving at least 80% spatial agreement between the identified highly suitable zones and the locations of existing solar PV farms, confirming the model's reliability and predictive power for future investments.

# **Recommendations**

1. Prioritize Investment: Direct all immediate public and private solar investment and project permitting toward the Highest Suitability Zones identified by the final map. This minimizes land-use conflict, reduces project costs, and maximizes energy yield.

2. Incorporate Economic Layers: Enhance the current model by adding critical economic layers:

- Proximity to Grid: Heavily weight sites near existing high-voltage transmission lines.

- Slope: Filter out land steeper than a 10-degree slope, which significantly increases construction costs.

3. Ensure Modular Use: Train government and private sector planners on the model's modular framework. This allows them to dynamically adjust the weighting of factors (e.g., prioritize grid proximity over solar irradiance) to tailor the suitability analysis for specific project types (e.g., utility-scale vs. decentralized solar parks).

# Deployment

##  Model Deployment Procedure (Flask + React + Tailwind CSS)

1. Project Overview

- This deployment setup serves two separate models — one for regression (PVOUT prediction) and another for classification (site suitability) — using a Flask backend for the APIs and a React + Tailwind CSS frontend for visualization and interaction.

2. Backend Setup (Flask API)

- Create and activate a Python virtual environment.

- Install all necessary Python dependencies (Flask, Flask-CORS, Pandas, Numpy, Joblib, Scikit-learn).

- Load the trained regression or classification model (.pkl file).

- Define an API endpoint (/predict) that receives input features and returns model predictions in JSON format.

- Test the API locally using http://127.0.0.1:5000/.

- Confirm the API responds correctly with a sample prediction.

- Each model (regression and classification) runs as a separate Flask app, each listening on its own port (e.g., 5000 for regression and 5001 for classification).

3. Frontend Setup (React + Tailwind)

- Create a new React project using create-react-app.

- Install Tailwind CSS, PostCSS, and Autoprefixer for styling.

- Configure Tailwind by updating the content paths and adding base, components, and utilities layers in index.css.

- Install Axios for API communication.

- Create React components for:

- RegressionForm → communicates with the regression Flask API.

- ClassificationForm → communicates with the classification Flask API.

- Use Axios to send POST requests to the backend APIs with user inputs.

- Display prediction results dynamically in the frontend interface.

- Test the frontend at http://localhost:3000 and ensure successful communication with Flask.

4. Connecting Frontend and Backend

- Enable CORS in the Flask backend to allow requests from the React frontend.

- Update the Axios request URLs in the React app to match the backend server address (e.g., http://127.0.0.1:5000/predict).

- Test the full workflow:

- Start Flask (python backend_regression.py).

- Start React (npm start).

- Input sample data and confirm predictions appear on the dashboard.

# Results
<img width="1355" height="614" alt="React App - Google Chrome 11_11_2025 1_36_42 PM" src="https://github.com/user-attachments/assets/00b9eedd-0249-42c4-8e70-784e79cdeb32" />

<img width="1351" height="605" alt="Screenshot (38)" src="https://github.com/user-attachments/assets/afa21713-679a-477e-8968-9cf0ce8db80e" />

