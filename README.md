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
 
    
