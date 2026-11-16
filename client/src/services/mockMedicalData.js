export const medicalDatabase = {

  // ─── RESPIRATORY ──────────────────────────────────────────────────────────
  "flu": {
    name: "Influenza (Flu)",
    keywords: ["flu", "influenza", "feverish", "body ache", "chills"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)",
    full_response: `## 🦠 Influenza (Flu)
**Influenza** is a contagious respiratory illness caused by influenza viruses.

### 🌡️ Symptoms
- High fever, chills - Severe body aches - Dry cough - Fatigue - Headache

### 🛡️ Prevention
1. **Annual flu vaccine** (most effective prevention)
2. Wash hands frequently with soap
3. Avoid close contact with sick people
4. Wear masks in crowded places

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Oseltamivir (Tamiflu) | 75mg twice daily × 5 days | Antiviral |
| Paracetamol | 500–1000mg every 6h | Fever/pain |
| Ibuprofen | 400mg every 8h | Inflammation |
| Amantadine | 100mg twice daily | Antiviral (Type A) |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Zanamivir (Relenza) | Inhaled | Antiviral |
| Peramivir (Rapivab) | IV single dose | Severe cases |

### 🔗 Official Resources
- [WHO Influenza Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal))
- [CDC Flu Info](https://www.cdc.gov/flu/)

> ⚠️ **Disclaimer**: Consult a doctor before taking any medication.`,
    severity_question: "How high is your fever and do you have difficulty breathing?"
  },

  "covid-19": {
    name: "COVID-19",
    keywords: ["covid", "covid-19", "coronavirus", "sars", "omicron", "delta"],
    whoLink: "https://www.who.int/health-topics/coronavirus",
    full_response: `## 🦠 COVID-19
**COVID-19** is a disease caused by SARS-CoV-2.

### 🌡️ Symptoms
- Fever or chills - Cough - Shortness of breath - Fatigue - Loss of taste/smell - Sore throat

### 🛡️ Prevention
1. **Vaccination** (mRNA, viral vector vaccines)
2. Wear N95/KN95 masks indoors
3. Ventilate indoor spaces
4. Wash hands; avoid touching face
5. Isolate if positive

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Nirmatrelvir/Ritonavir (Paxlovid) | 300mg/100mg twice daily × 5 days | Antiviral |
| Molnupiravir | 800mg twice daily × 5 days | Antiviral |
| Dexamethasone | 6mg daily × 10 days | Severe/hospitalized |
| Paracetamol | 500–1000mg every 6h | Fever |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Remdesivir | IV 200mg day1, 100mg days2-5 | Antiviral |
| Dexamethasone | IV 6mg daily | Inflammation |
| Tocilizumab | IV | Cytokine storm |

### 🔗 Official Resources
- [WHO COVID-19](https://www.who.int/health-topics/coronavirus)
- [CDC COVID](https://www.cdc.gov/covid/)

> ⚠️ **Disclaimer**: Seek emergency care for chest pain, confusion, or difficulty breathing.`,
    severity_question: "Do you have difficulty breathing, chest pain, or confusion?"
  },

  "malaria": {
    name: "Malaria",
    keywords: ["malaria", "plasmodium", "mosquito bite", "malarial"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/malaria",
    full_response: `## 🦟 Malaria
**Malaria** is a life-threatening disease caused by Plasmodium parasites transmitted through Anopheles mosquito bites.

### 🌡️ Symptoms
- High fever with sweating and chills (cyclical) - Headache - Nausea and vomiting - Body aches - Fatigue - Jaundice (severe)

### 🛡️ Prevention
1. Sleep under insecticide-treated mosquito nets (ITNs)
2. Indoor residual spraying (IRS)
3. Prophylactic antimalarials when traveling to endemic regions
4. Wear long-sleeved clothing at dusk/dawn
5. Remove standing water near homes

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Artemether-Lumefantrine (Coartem) | 4 tabs twice daily × 3 days | First-line treatment |
| Chloroquine | 600mg base, then 300mg | P. vivax / P. ovale |
| Primaquine | 15mg daily × 14 days | P. vivax radical cure |
| Atovaquone-Proguanil (Malarone) | 1 tab daily | Prophylaxis |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Artesunate | IV/IM | Severe malaria (first-line) |
| Quinine + Doxycycline | IV | Severe malaria (alternative) |

### 🔗 Official Resources
- [WHO Malaria](https://www.who.int/news-room/fact-sheets/detail/malaria)
- [CDC Malaria](https://www.cdc.gov/malaria/)

> ⚠️ **Disclaimer**: Severe malaria is a medical emergency. Seek immediate care.`,
    severity_question: "Do you have high fever with chills, jaundice, or altered consciousness?"
  },

  "dengue": {
    name: "Dengue Fever",
    keywords: ["dengue", "dengue fever", "bone-breaking fever", "aedes"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue",
    full_response: `## 🦟 Dengue Fever
**Dengue** is a viral infection spread by Aedes mosquitoes, prevalent in tropical/subtropical regions.

### 🌡️ Symptoms
- Sudden high fever (40°C/104°F) - Severe headache - Pain behind the eyes - Muscle/joint pain ("breakbone fever") - Rash - Mild bleeding (gums, nose)

### 🛡️ Prevention
1. Eliminate mosquito breeding sites (standing water)
2. Use mosquito repellents (DEET, picaridin)
3. Wear protective clothing
4. Dengvaxia vaccine (for previously infected individuals aged 9–45)
5. Window/door screens

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Paracetamol | 500–1000mg every 6h | Fever (safe for dengue) |
| ORS sachets | As directed | Rehydration |

> ⚠️ **AVOID** Aspirin, Ibuprofen, NSAIDs — increases bleeding risk!

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| IV Normal Saline / Ringer's Lactate | IV | Fluid replacement (severe) |
| Platelet transfusion | IV | If platelets critically low |

### 🔗 Official Resources
- [WHO Dengue](https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue)
- [CDC Dengue](https://www.cdc.gov/dengue/)

> ⚠️ **Disclaimer**: Watch for warning signs: abdominal pain, persistent vomiting, bleeding — seek emergency care.`,
    severity_question: "Do you have abdominal pain, persistent vomiting, or bleeding?"
  },

  "tuberculosis": {
    name: "Tuberculosis (TB)",
    keywords: ["tuberculosis", "tb", "consumption", "mycobacterium", "lung infection persistent cough"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
    full_response: `## 🫁 Tuberculosis (TB)
**TB** is a bacterial infection caused by *Mycobacterium tuberculosis*, primarily affecting the lungs.

### 🌡️ Symptoms
- Persistent cough (>3 weeks) - Blood in sputum - Night sweats - Fever - Weight loss - Fatigue - Chest pain

### 🛡️ Prevention
1. BCG vaccination (at birth in endemic countries)
2. Ensure good ventilation in living/working spaces
3. Complete TB treatment course (prevents resistance)
4. TB screening for high-risk groups
5. Avoid close contact with active TB cases

### 💊 Tablets / Oral Medications (DOTS Regimen)
| Medication | Dosage | Purpose |
|---|---|---|
| Isoniazid (H) | 5mg/kg/day | Core anti-TB |
| Rifampicin (R) | 10mg/kg/day | Core anti-TB |
| Pyrazinamide (Z) | 25mg/kg/day | Initial phase |
| Ethambutol (E) | 15mg/kg/day | Initial phase |

**Standard: 2HRZE / 4HR (6-month course)**

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Streptomycin | IM | MDR-TB |
| Amikacin | IV/IM | MDR-TB |

### 🔗 Official Resources
- [WHO TB](https://www.who.int/news-room/fact-sheets/detail/tuberculosis)
- [CDC TB](https://www.cdc.gov/tb/)

> ⚠️ **Disclaimer**: Never stop TB treatment early — causes drug resistance.`,
    severity_question: "Have you had a cough for more than 3 weeks or coughed up blood?"
  },

  "typhoid": {
    name: "Typhoid Fever",
    keywords: ["typhoid", "typhoid fever", "salmonella typhi", "enteric fever"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/typhoid",
    full_response: `## 🌡️ Typhoid Fever
**Typhoid** is a systemic infection caused by *Salmonella typhi*, transmitted via contaminated food/water.

### 🌡️ Symptoms
- Sustained high fever (103–104°F) - Weakness and fatigue - Stomach pain - Headache - Diarrhea or constipation - Rose-colored spots on skin - Loss of appetite

### 🛡️ Prevention
1. **Typhoid vaccination** (Vi-CPS or Ty21a oral vaccine)
2. Drink only boiled or bottled water
3. Eat thoroughly cooked food
4. Practice good hand hygiene
5. Avoid street food in endemic areas

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Azithromycin | 1g/day × 5 days | First-line (outpatient) |
| Ciprofloxacin | 500mg twice daily × 7–14 days | First-line |
| Cefixime | 20mg/kg/day × 7–14 days | Alternative |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Ceftriaxone | IV/IM 2–4g daily | Severe/hospitalized |
| Ampicillin | IV | Susceptible strains |

### 🔗 Official Resources
- [WHO Typhoid](https://www.who.int/news-room/fact-sheets/detail/typhoid)
- [CDC Typhoid](https://www.cdc.gov/typhoid-fever/)

> ⚠️ **Disclaimer**: Untreated typhoid can cause intestinal perforation.`,
    severity_question: "Do you have a sustained high fever lasting more than 3 days?"
  },

  "cholera": {
    name: "Cholera",
    keywords: ["cholera", "vibrio cholerae", "rice water stool", "watery diarrhea"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/cholera",
    full_response: `## 💧 Cholera
**Cholera** is an acute diarrheal disease caused by *Vibrio cholerae*, often spread through contaminated water.

### 🌡️ Symptoms
- Profuse watery diarrhea ("rice-water stools") - Severe dehydration - Vomiting - Muscle cramps - Rapid heart rate - Low blood pressure

### 🛡️ Prevention
1. Drink only clean, boiled, or treated water
2. Oral cholera vaccines (Shanchol, Dukoral)
3. Cook food thoroughly; wash vegetables
4. Proper sanitation and sewage disposal
5. Frequent handwashing with soap

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| ORS (Oral Rehydration Salts) | As directed continuously | Rehydration (critical) |
| Doxycycline | 300mg single dose | Antibiotic (adults) |
| Azithromycin | 1g single dose | Antibiotic |
| Ciprofloxacin | 1g single dose | Antibiotic |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Ringer's Lactate | IV rapid infusion | Severe dehydration |
| Normal Saline | IV | Fluid replacement |

### 🔗 Official Resources
- [WHO Cholera](https://www.who.int/news-room/fact-sheets/detail/cholera)

> ⚠️ **Disclaimer**: Severe cholera is a medical emergency — deaths occur within hours without rehydration.`,
    severity_question: "Are you severely dehydrated, with very dark urine or no urine at all?"
  },

  "hiv": {
    name: "HIV/AIDS",
    keywords: ["hiv", "aids", "human immunodeficiency virus", "hiv positive", "antiretroviral"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/hiv-aids",
    full_response: `## 🔴 HIV/AIDS
**HIV** (Human Immunodeficiency Virus) attacks the immune system; untreated, leads to **AIDS**.

### 🌡️ Symptoms (Acute HIV)
- Fever, chills - Rash - Night sweats - Muscle aches - Sore throat - Swollen lymph nodes

### 🛡️ Prevention
1. Use condoms consistently
2. PrEP (Pre-Exposure Prophylaxis) for high-risk individuals
3. PEP (Post-Exposure Prophylaxis) within 72 hours of exposure
4. Test regularly; know your status
5. Sterile needles only; never share
6. Prevent mother-to-child transmission (PMTCT programs)

### 💊 Tablets / Oral Medications (ART)
| Medication | Type | Purpose |
|---|---|---|
| TDF + 3TC + DTG | NRTI+INSTI combo | First-line ART |
| Bictegravir/FTC/TAF (Biktarvy) | Combo pill | First-line ART |
| Lopinavir/Ritonavir | Protease inhibitor | Alternative |
| Dolutegravir | INSTI | Core agent |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Cabotegravir + Rilpivirine | IM monthly/bimonthly | Long-acting ART |
| Lenacapavir | SC twice yearly | Heavily treatment-experienced |

### 🔗 Official Resources
- [WHO HIV/AIDS](https://www.who.int/news-room/fact-sheets/detail/hiv-aids)
- [CDC HIV](https://www.cdc.gov/hiv/)

> ⚠️ **Disclaimer**: HIV is manageable with ART; early treatment leads to near-normal life expectancy.`,
    severity_question: "Have you recently had unprotected exposure? PEP must be started within 72 hours."
  },

  "diabetes": {
    name: "Diabetes Mellitus",
    keywords: ["diabetes", "diabetic", "blood sugar", "insulin", "hyperglycemia", "type 2 diabetes", "type 1"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    full_response: `## 🩸 Diabetes Mellitus
**Diabetes** is a chronic condition where the body cannot properly regulate blood glucose.

### 🌡️ Symptoms
- Frequent urination - Excessive thirst - Unexplained weight loss - Blurred vision - Slow healing wounds - Fatigue - Tingling in hands/feet

### 🛡️ Prevention (Type 2)
1. Maintain healthy body weight (BMI 18.5–24.9)
2. Exercise 30 min/day, 5 days/week
3. Healthy diet: low sugar, high fiber
4. Regular blood sugar screening
5. Avoid smoking and excessive alcohol

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Metformin | 500–2000mg/day | Type 2, first-line |
| Glibenclamide | 2.5–20mg/day | Sulfonylurea |
| Sitagliptin (Januvia) | 100mg/day | DPP-4 inhibitor |
| Empagliflozin | 10–25mg/day | SGLT-2 inhibitor |
| Dapagliflozin | 10mg/day | SGLT-2 inhibitor |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Insulin Glargine (Lantus) | SC once daily | Basal insulin |
| Insulin Aspart (NovoLog) | SC before meals | Rapid-acting |
| Insulin NPH | SC | Intermediate-acting |
| Glucagon | IM/SC/IN | Hypoglycemia emergency |

### 🔗 Official Resources
- [WHO Diabetes](https://www.who.int/news-room/fact-sheets/detail/diabetes)
- [CDC Diabetes](https://www.cdc.gov/diabetes/)

> ⚠️ **Disclaimer**: Self-medicating insulin is dangerous. Consult your endocrinologist.`,
    severity_question: "Is your blood sugar extremely high (>300 mg/dL) or are you feeling confused/vomiting?"
  },

  "hypertension": {
    name: "Hypertension (High Blood Pressure)",
    keywords: ["hypertension", "high blood pressure", "bp high", "blood pressure elevated"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/hypertension",
    full_response: `## ❤️ Hypertension (High Blood Pressure)
**Hypertension** is persistently elevated blood pressure (≥130/80 mmHg), a leading risk factor for heart disease and stroke.

### 🌡️ Symptoms (often none — "silent killer")
- Headache (usually occipital) - Dizziness - Blurred vision - Nosebleeds - Chest pain (severe cases)

### 🛡️ Prevention
1. Reduce salt intake (<5g/day)
2. DASH diet (fruits, vegetables, low-fat dairy)
3. Exercise 30 min/day most days
4. Limit alcohol; quit smoking
5. Manage stress (yoga, meditation)
6. Monitor blood pressure regularly

### 💊 Tablets / Oral Medications
| Medication | Class | Purpose |
|---|---|---|
| Amlodipine | CCB | First-line |
| Lisinopril / Enalapril | ACE Inhibitor | First-line |
| Losartan / Valsartan | ARB | First-line (ACE intolerant) |
| Hydrochlorothiazide | Diuretic | First-line |
| Metoprolol | Beta-blocker | With heart disease |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Labetalol | IV | Hypertensive emergency |
| Nicardipine | IV | Hypertensive emergency |
| Hydralazine | IV/IM | Pre-eclampsia |

### 🔗 Official Resources
- [WHO Hypertension](https://www.who.int/news-room/fact-sheets/detail/hypertension)

> ⚠️ **Disclaimer**: Never stop BP medication without consulting your doctor.`,
    severity_question: "Is your BP above 180/120? Do you have chest pain or vision changes?"
  },

  "heart-attack": {
    name: "Myocardial Infarction (Heart Attack)",
    keywords: ["heart attack", "myocardial infarction", "cardiac arrest", "chest pain", "heart pain", "mi"],
    whoLink: "https://www.who.int/health-topics/cardiovascular-diseases",
    full_response: `## 🚨 EMERGENCY: Myocardial Infarction (Heart Attack)
**A heart attack** occurs when blood flow to part of the heart is blocked.

### 🚨 WARNING SIGNS — Call 112/911 IMMEDIATELY
- Chest pain, pressure, or squeezing - Pain radiating to left arm, jaw, neck, back - Shortness of breath - Cold sweat - Nausea - Lightheadedness

### 🛡️ Prevention
1. Control blood pressure, cholesterol, and diabetes
2. Quit smoking completely
3. Regular exercise and healthy diet
4. Aspirin therapy (as prescribed)
5. Manage stress; maintain healthy weight

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Aspirin | 325mg chew immediately | Emergency (if conscious) |
| Clopidogrel (Plavix) | 300–600mg loading | Antiplatelet |
| Atorvastatin | 40–80mg/day | Cholesterol |
| Metoprolol | As prescribed | Cardioprotective |
| Nitroglycerin | 0.4mg sublingual | Chest pain |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Heparin / Enoxaparin | IV/SC | Anticoagulation |
| Thrombolytics (tPA, Streptokinase) | IV | Clot dissolution |
| Morphine | IV | Pain relief |
| Nitroglycerin | IV | Vasodilation |

### 🔗 Official Resources
- [WHO Cardiovascular](https://www.who.int/health-topics/cardiovascular-diseases)
- [CDC Heart Disease](https://www.cdc.gov/heartdisease/)

> 🚨 **EMERGENCY**: If you suspect a heart attack, call emergency services IMMEDIATELY.`,
    severity_question: "🚨 Are you having chest pain RIGHT NOW? Call 112/911 IMMEDIATELY."
  },

  "stroke": {
    name: "Stroke",
    keywords: ["stroke", "brain stroke", "cerebral stroke", "facial drooping", "paralysis sudden"],
    whoLink: "https://www.who.int/health-topics/stroke",
    full_response: `## 🧠 Stroke — FAST Recognition

**A stroke** occurs when blood supply to the brain is interrupted. Use **FAST**:
- **F**ace drooping - **A**rm weakness - **S**peech difficulty - **T**ime to call 112/911

### 🌡️ Symptoms
- Sudden numbness/weakness in face, arm, or leg (often one side) - Sudden confusion - Speech problems - Vision problems - Severe headache with no cause - Loss of balance

### 🛡️ Prevention
1. Control blood pressure (main risk factor)
2. Manage atrial fibrillation (take anticoagulants if prescribed)
3. Quit smoking; limit alcohol
4. Exercise regularly; maintain healthy weight
5. Control diabetes and cholesterol

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| Aspirin | Ischemic stroke prevention |
| Clopidogrel | Antiplatelet |
| Warfarin / Apixaban | AF-related stroke prevention |
| Statins | Plaque reduction |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| tPA (Alteplase) | IV within 4.5h | Ischemic stroke (clot buster) |
| Heparin | IV | Anticoagulation |

### 🔗 Official Resources
- [WHO Stroke](https://www.who.int/health-topics/stroke)
- [CDC Stroke](https://www.cdc.gov/stroke/)

> 🚨 **EMERGENCY**: Stroke requires treatment within 4.5 hours for best outcome. Call 112/911 NOW.`,
    severity_question: "🚨 Is this happening NOW? Call emergency services IMMEDIATELY — time is brain!"
  },

  "pneumonia": {
    name: "Pneumonia",
    keywords: ["pneumonia", "lung infection", "pneumococcal", "chest infection"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/pneumonia",
    full_response: `## 🫁 Pneumonia
**Pneumonia** is an infection that inflames air sacs in one or both lungs.

### 🌡️ Symptoms
- Cough with phlegm - Chest pain when breathing - Fever, sweating, chills - Shortness of breath - Fatigue - Nausea/vomiting

### 🛡️ Prevention
1. **Pneumococcal vaccine** (PCV13, PPSV23)
2. **Flu vaccine** annually
3. Don't smoke; maintain good hygiene
4. Boost immunity with healthy diet

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Amoxicillin | 500mg thrice daily × 5–7 days | Bacterial (mild) |
| Azithromycin | 500mg day 1, 250mg days 2–5 | Atypical pathogens |
| Doxycycline | 100mg twice daily | Atypical |
| Levofloxacin | 750mg once daily × 5 days | CAP (adults) |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Ceftriaxone | IV/IM 1–2g | Severe CAP |
| Piperacillin-Tazobactam | IV | Hospital-acquired |
| Vancomycin | IV | MRSA pneumonia |

### 🔗 Official Resources
- [WHO Pneumonia](https://www.who.int/news-room/fact-sheets/detail/pneumonia)

> ⚠️ **Disclaimer**: Pneumonia can be life-threatening in elderly and children.`,
    severity_question: "Are you having significant difficulty breathing, low oxygen, or very high fever?"
  },

  "asthma": {
    name: "Asthma",
    keywords: ["asthma", "wheezing", "bronchospasm", "inhaler", "breathing difficulty asthma"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/asthma",
    full_response: `## 💨 Asthma
**Asthma** is a chronic condition causing airways to narrow and swell, producing extra mucus.

### 🌡️ Symptoms
- Shortness of breath - Chest tightness or pain - Wheezing - Coughing (especially at night/morning) - Trouble sleeping due to coughing

### 🛡️ Prevention / Management
1. Identify and avoid triggers (dust, pollen, smoke, pets)
2. Use air purifiers; keep home dust-free
3. Annual flu vaccination
4. Follow written Asthma Action Plan
5. Never smoke; avoid secondhand smoke

### 💊 Tablets / Oral Medications
| Medication | Type | Purpose |
|---|---|---|
| Montelukast | Leukotriene modifier | Daily controller |
| Prednisolone | Corticosteroid | Severe exacerbations |
| Theophylline | Bronchodilator | Add-on therapy |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Epinephrine | IM | Severe attack/anaphylaxis |
| Magnesium Sulfate | IV | Severe attack |
| Dupilumab (Dupixent) | SC | Severe eosinophilic asthma |

**Inhalers (primary treatment):**
- **SABA**: Salbutamol (Ventolin) — rescue inhaler
- **ICS**: Beclomethasone, Fluticasone — daily controller
- **LABA+ICS**: Formoterol+Budesonide — combo

### 🔗 Official Resources
- [WHO Asthma](https://www.who.int/news-room/fact-sheets/detail/asthma)

> ⚠️ **Disclaimer**: Always carry a rescue inhaler.`,
    severity_question: "Are you struggling to breathe, speak, or has your rescue inhaler not helped?"
  },

  "migraine": {
    name: "Migraine",
    keywords: ["migraine", "severe headache", "headache", "aura", "throbbing head"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/headache-disorders",
    full_response: `## 🧠 Migraine
A **migraine** is a neurological disorder with intense, debilitating headaches often with nausea and light sensitivity.

### 🌡️ Symptoms
- Throbbing/pulsating pain (usually one side) - Nausea/vomiting - Sensitivity to light, sound, smells - Visual aura (flashing lights) - Worsens with activity

### 🛡️ Prevention
1. Maintain regular sleep schedule
2. Stay hydrated; skip meals trigger attacks
3. Manage stress with relaxation techniques
4. Limit caffeine and alcohol
5. Identify personal triggers (certain foods, hormones)

### 💊 Tablets / Oral Medications
| Medication | Type | Purpose |
|---|---|---|
| Sumatriptan | Triptan | Acute attack |
| Rizatriptan | Triptan | Acute attack |
| Ibuprofen / Naproxen | NSAID | Mild-moderate pain |
| Topiramate | Anticonvulsant | Prevention |
| Amitriptyline | TCA | Prevention |
| Propranolol | Beta-blocker | Prevention |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Sumatriptan | SC | Acute attack |
| CGRP mAbs (Aimovig/Ajovy) | SC monthly | Prevention |
| Ketorolac | IM/IV | Emergency dept. |
| Valproate | IV | Status migrainosus |

### 🔗 Official Resources
- [WHO Headache Disorders](https://www.who.int/news-room/fact-sheets/detail/headache-disorders)

> ⚠️ **Disclaimer**: Sudden worst headache of your life requires emergency evaluation.`,
    severity_question: "Is this the worst headache of your life or did it start suddenly like a thunderclap?"
  },

  "common_cold": {
    name: "Common Cold",
    keywords: ["cold", "colds", "runny nose", "stuffy nose", "sneezing", "sore throat cold"],
    whoLink: "https://www.who.int/health-topics/respiratory-tract-infections",
    full_response: `## 🤧 Common Cold
The **common cold** is a viral upper respiratory infection, usually caused by rhinoviruses.

### 🌡️ Symptoms
- Runny or stuffy nose - Sore throat - Sneezing - Mild body aches - Low-grade fever - Mild fatigue

### 🛡️ Prevention
1. Wash hands frequently (20 seconds minimum)
2. Avoid touching eyes, nose, mouth
3. Disinfect frequently touched surfaces
4. Avoid close contact with sick people
5. Maintain good immunity (sleep, nutrition)

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| Paracetamol / Ibuprofen | Fever and pain relief |
| Pseudoephedrine | Nasal decongestant |
| Loratadine / Cetirizine | Antihistamine (runny nose) |
| Dextromethorphan | Cough suppressant |
| Guaifenesin | Expectorant |
| Zinc lozenges | Reduce duration |

### 🏠 Home Remedies
- Honey + ginger + lemon tea - Steam inhalation - Saline nasal drops - Rest and plenty of fluids

### 🔗 Official Resources
- [CDC Cold](https://www.cdc.gov/nonpharmaceutical-interventions/respiratory-infections/)

> ⚠️ **Disclaimer**: Antibiotics do NOT work for viral colds.`,
    severity_question: "Have you had a fever for more than 3 days or developed new chest pain?"
  },

  "fever": {
    name: "Fever (Pyrexia)",
    keywords: ["fever", "high temp", "temperature", "pyrexia", "febrile"],
    whoLink: "https://www.who.int/health-topics",
    full_response: `## 🌡️ Fever (Pyrexia)
A **fever** is a body temperature above 38°C (100.4°F), a natural immune response to infection.

### 🌡️ Classification
- Low-grade: 37.3–38°C - Moderate: 38–39.9°C - High: 40–41°C - Hyperpyrexia: >41°C (Emergency)

### 🛡️ Prevention
1. Vaccination against common causes
2. Good hygiene and handwashing
3. Avoid contact with sick individuals
4. Drink clean, safe water

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Paracetamol | 500–1000mg every 6h | Fever reducer (all ages) |
| Ibuprofen | 400mg every 8h | Fever + inflammation (adults) |
| Aspirin | Avoid in children | (Reye's syndrome risk) |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Paracetamol | IV | Unable to take orally |
| IV fluids | IV | Dehydration |

### 🔗 Official Resources
- [CDC Fever](https://www.cdc.gov/)

> ⚠️ **Disclaimer**: In infants <3 months — any fever requires immediate medical attention.`,
    severity_question: "Is temperature above 40°C or has it lasted more than 3 days?"
  },

  "hepatitis_b": {
    name: "Hepatitis B",
    keywords: ["hepatitis b", "hbv", "hepatitis", "liver infection", "jaundice"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-b",
    full_response: `## 🫀 Hepatitis B
**Hepatitis B** is a viral liver infection that can become chronic, leading to cirrhosis and liver cancer.

### 🌡️ Symptoms
- Jaundice (yellow eyes/skin) - Dark urine, pale stools - Fatigue - Abdominal pain - Nausea and vomiting - Joint pain

### 🛡️ Prevention
1. **Hepatitis B vaccine** (3-dose series — highly effective >95%)
2. Use condoms; avoid multiple partners
3. Never share needles, syringes, or personal items (razors)
4. Safe blood transfusions and medical practices
5. HBIG for exposed newborns

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Tenofovir (TDF) | 300mg/day | First-line antiviral |
| Entecavir | 0.5–1mg/day | First-line antiviral |
| Lamivudine | 100mg/day | Alternative |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Peginterferon alfa-2a | SC 48 weeks | Immune modulation |
| Hepatitis B Immune Globulin (HBIG) | IM | Post-exposure prophylaxis |

### 🔗 Official Resources
- [WHO Hepatitis B](https://www.who.int/news-room/fact-sheets/detail/hepatitis-b)

> ⚠️ **Disclaimer**: 90% of infected infants develop chronic HBV — vaccinate at birth.`,
    severity_question: "Do you have jaundice, severe abdominal pain, or confusion (signs of liver failure)?"
  },

  "cancer": {
    name: "Cancer (General)",
    keywords: ["cancer", "tumor", "malignancy", "oncology", "carcinoma"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/cancer",
    full_response: `## 🎗️ Cancer
**Cancer** refers to diseases where abnormal cells divide uncontrollably and invade surrounding tissue.

### 🌡️ Warning Signs (CAUTION)
- **C**hange in bowel/bladder habits - **A**  sore that doesn't heal - **U**nusual bleeding or discharge - **T**hickening or lump - **I**ndigestion or swallowing difficulty - **O**bvious change in wart/mole - **N**agging cough or hoarseness

### 🛡️ Prevention
1. No tobacco use (prevents 25–30% of cancers)
2. Healthy diet (limit processed meats, red meat)
3. Regular physical activity; healthy weight
4. HPV and Hepatitis B vaccination
5. Protect skin from UV rays
6. Regular cancer screenings (mammography, colonoscopy, Pap smear, PSA)

### 💊 Tablets / Oral Medications (examples)
| Medication | Cancer Type | Purpose |
|---|---|---|
| Tamoxifen | Breast cancer | Hormone therapy |
| Imatinib (Gleevec) | CML, GIST | Targeted therapy |
| Capecitabine | Colorectal, Breast | Oral chemotherapy |
| Erlotinib | Lung cancer | EGFR inhibitor |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Chemotherapy agents | IV | Systemic treatment |
| Pembrolizumab | IV | Immunotherapy |
| Bevacizumab | IV | Anti-angiogenesis |
| Trastuzumab | IV | HER2+ breast cancer |

### 🔗 Official Resources
- [WHO Cancer](https://www.who.int/news-room/fact-sheets/detail/cancer)
- [NCI](https://www.cancer.gov/)

> ⚠️ **Disclaimer**: Early detection saves lives. Regular screening is essential.`,
    severity_question: "Have you noticed any unexplained lumps, bleeding, or rapid weight loss?"
  },

  "depression": {
    name: "Depression",
    keywords: ["depression", "depressed", "sadness", "hopeless", "mental health", "anxiety depression", "suicidal"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/depression",
    full_response: `## 💙 Depression (Major Depressive Disorder)
**Depression** is a common and serious mood disorder affecting how you feel, think, and handle daily activities.

### 🌡️ Symptoms
- Persistent sadness, emptiness, or hopelessness - Loss of interest in activities - Changes in appetite/weight - Sleep problems - Fatigue - Difficulty concentrating - Thoughts of death or suicide

### 🛡️ Prevention / Wellbeing
1. Regular physical activity (30 min/day)
2. Strong social connections and support network
3. Regular sleep schedule
4. Mindfulness and stress management
5. Limit alcohol; no recreational drugs
6. Early treatment of anxiety or trauma

### 💊 Tablets / Oral Medications
| Medication | Class | Purpose |
|---|---|---|
| Sertraline (Zoloft) | SSRI | First-line antidepressant |
| Fluoxetine (Prozac) | SSRI | First-line antidepressant |
| Escitalopram | SSRI | First-line antidepressant |
| Venlafaxine | SNRI | Alternative |
| Bupropion | NDRI | Alternative / smoking cessation |
| Amitriptyline | TCA | Resistant depression |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Ketamine / Esketamine | IV/IN | Treatment-resistant depression |

### 🔗 Official Resources
- [WHO Depression](https://www.who.int/news-room/fact-sheets/detail/depression)
- **Crisis Line**: iCall (India) 9152987821 | International: findahelpline.com

> 🆘 **If you are having thoughts of suicide, please call a crisis helpline immediately. You are not alone.**`,
    severity_question: "Are you having thoughts of harming yourself? Please reach out to a crisis helpline."
  },

  "chickenpox": {
    name: "Chickenpox (Varicella)",
    keywords: ["chickenpox", "varicella", "chicken pox", "itchy rash blisters"],
    whoLink: "https://www.who.int/immunization/diseases/varicella/en/",
    full_response: `## 🔴 Chickenpox (Varicella)
**Chickenpox** is a highly contagious viral infection caused by *Varicella-zoster virus*.

### 🌡️ Symptoms
- Itchy, blister-like rash spreading across body - Fever - Tiredness - Headache - Loss of appetite

### 🛡️ Prevention
1. **Varicella vaccine** (2 doses — highly effective)
2. Avoid contact with infected individuals
3. Stay home until all blisters have crusted over
4. Good hand hygiene

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Acyclovir | 800mg 5× daily × 7 days | Antiviral (adults) |
| Paracetamol | As directed | Fever relief |
| Calamine lotion (topical) | As needed | Itch relief |
| Chlorphenamine | 4mg every 6h | Antihistamine |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Acyclovir | IV | Severe/immunocompromised |
| Varicella-Zoster Immune Globulin | IM | Post-exposure prophylaxis |

### 🔗 Official Resources
- [CDC Chickenpox](https://www.cdc.gov/chickenpox/)

> ⚠️ **Disclaimer**: Avoid Aspirin in children with chickenpox — risk of Reye's syndrome.`,
    severity_question: "Does the rash look infected (red, warm, swollen) or is the patient immunocompromised?"
  },

  "measles": {
    name: "Measles",
    keywords: ["measles", "rubeola", "koplik spots", "measles rash"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/measles",
    full_response: `## 🔴 Measles (Rubeola)
**Measles** is one of the world's most contagious viral diseases; preventable by vaccination.

### 🌡️ Symptoms
- High fever - Cough, runny nose, red eyes - Koplik's spots (white spots inside mouth) - Maculopapular rash starting on face, spreading downward

### 🛡️ Prevention
1. **MMR vaccine** (Measles-Mumps-Rubella) — 2 doses; 97% effective
2. Vaccination is the ONLY effective prevention
3. Isolate infected individuals immediately

### 💊 Tablets / Oral Medications
| Medication | Dosage | Purpose |
|---|---|---|
| Vitamin A | 200,000 IU × 2 days | Reduces severity/mortality |
| Paracetamol | As directed | Fever control |
| Antibiotics | If secondary infection | Bacterial complications |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| MMR Vaccine | SC | Prevention |
| IV fluids | IV | Dehydration |

### 🔗 Official Resources
- [WHO Measles](https://www.who.int/news-room/fact-sheets/detail/measles)

> ⚠️ **Disclaimer**: Measles kills ~100,000 children/year. Vaccinate your children.`,
    severity_question: "Is there difficulty breathing, severe confusion, or signs of encephalitis?"
  },

  "anxiety": {
    name: "Anxiety Disorder",
    keywords: ["anxiety", "panic attack", "panic", "anxious", "worry excessive", "gad"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
    full_response: `## 💛 Anxiety Disorder
**Anxiety disorders** are characterized by excessive fear and worry, the most common mental health condition worldwide.

### 🌡️ Symptoms
- Excessive worry difficult to control - Restlessness - Fatigue - Difficulty concentrating - Irritability - Muscle tension - Sleep problems - Panic attacks (pounding heart, sweating, shortness of breath)

### 🛡️ Prevention / Management
1. Regular exercise reduces anxiety symptoms
2. Mindfulness-based stress reduction (MBSR)
3. Limit caffeine and alcohol
4. Maintain regular sleep schedule
5. Cognitive Behavioral Therapy (CBT) — most effective

### 💊 Tablets / Oral Medications
| Medication | Class | Purpose |
|---|---|---|
| Sertraline / Escitalopram | SSRI | First-line |
| Venlafaxine | SNRI | First-line |
| Buspirone | Azapirone | GAD, non-sedating |
| Alprazolam / Lorazepam | Benzodiazepine | Short-term only |
| Propranolol | Beta-blocker | Performance anxiety |

### 🔗 Official Resources
- [WHO Anxiety](https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders)

> ⚠️ **Disclaimer**: Benzodiazepines are habit-forming; use only under strict medical supervision.`,
    severity_question: "Are you experiencing a panic attack right now — racing heart, can't breathe?"
  },

  "kidney_disease": {
    name: "Chronic Kidney Disease (CKD)",
    keywords: ["kidney disease", "ckd", "renal failure", "kidney failure", "creatinine high"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/kidney-disease",
    full_response: `## 🫘 Chronic Kidney Disease (CKD)
**CKD** is a long-term condition where kidneys are damaged and lose their filtering function gradually.

### 🌡️ Symptoms (often late)
- Fatigue and weakness - Swelling in legs/ankles - Decreased urine output - Shortness of breath - Nausea - High blood pressure - Foamy urine

### 🛡️ Prevention
1. Control blood pressure and diabetes (leading causes)
2. Stay well-hydrated
3. Avoid NSAIDs and nephrotoxic drugs
4. Quit smoking
5. Regular kidney function tests (eGFR, creatinine)

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| ACE inhibitors / ARBs | Slow progression, BP control |
| Furosemide | Fluid management |
| Sodium bicarbonate | Correct acidosis |
| Erythropoietin (oral analogs) | Anemia management |
| Phosphate binders | Hyperphosphatemia |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Erythropoietin | SC/IV | Anemia |
| IV Iron (Ferric carboxymaltose) | IV | Iron deficiency anemia |
| Hemodialysis access | — | End-stage kidney disease |

### 🔗 Official Resources
- [WHO Kidney Disease](https://www.who.int/news-room/fact-sheets/detail/kidney-disease)

> ⚠️ **Disclaimer**: CKD is irreversible; early management slows progression significantly.`,
    severity_question: "Do you have very low urine output, severe swelling, or confusion?"
  },

  "mpox": {
    name: "Mpox (Monkeypox)",
    keywords: ["mpox", "monkeypox", "monkey pox"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/monkeypox",
    full_response: `## 🐒 Mpox (Monkeypox)
**Mpox** is a viral zoonotic disease caused by monkeypox virus, with outbreaks increasing globally since 2022.

### 🌡️ Symptoms
- Fever, headache, muscle aches - Swollen lymph nodes - Rash (starts on face, spreads to body) - Painful pustular lesions on skin, mouth, genitals

### 🛡️ Prevention
1. Avoid close skin-to-skin contact with infected persons
2. **JYNNEOS vaccine** (smallpox/mpox vaccine) — recommended for high-risk groups
3. Avoid contact with wild animals in endemic areas
4. Isolate if infected until all lesions heal

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| Tecovirimat (TPOXX) | Antiviral — first-line |
| Brincidofovir | Antiviral — alternative |
| Ibuprofen / Paracetamol | Symptom relief |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| JYNNEOS Vaccine | SC | Prevention (2 doses) |
| Vaccinia Immune Globulin | IV | Severe cases |

### 🔗 Official Resources
- [WHO Mpox](https://www.who.int/news-room/fact-sheets/detail/monkeypox)

> ⚠️ **Disclaimer**: WHO declared Mpox a Public Health Emergency of International Concern (PHEIC) in 2024.`,
    severity_question: "Do you have painful lesions spreading rapidly or difficulty breathing/swallowing?"
  },
  "ebola": {
    name: "Ebola Virus Disease (EVD)",
    keywords: ["ebola", "evd", "ebola virus", "hemorrhagic fever"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease",
    full_response: `## 🔴 Ebola Virus Disease (EVD)
**Ebola** is a rare but severe, often fatal illness in humans, transmitted to people from wild animals.

### 🌡️ Symptoms
- Fever - Fatigue - Muscle pain - Headache - Sore throat - Vomiting - Diarrhea - Rash - Symptoms of impaired kidney and liver function - Internal and external bleeding

### 🛡️ Prevention
1. Avoid contact with the blood and body fluids of people who show symptoms
2. **Ervebo vaccine** (rVSV-ZEBOV) — highly effective
3. Do not handle bushmeat (wild animals hunted for food)
4. Practice good hand hygiene and use PPE in healthcare settings

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| Ebanga (Ansuvimab-zykl) | Monoclonal antibody treatment |
| Inmazeb | Combination of 3 monoclonal antibodies |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Inmazeb | IV | Antiviral treatment |
| Ebanga | IV | Antiviral treatment |
| IV Fluids | IV | Supportive care |

### 🔗 Official Resources
- [WHO Ebola](https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease)
- [CDC Ebola](https://www.cdc.gov/vhf/ebola/)

> ⚠️ **Disclaimer**: Ebola is highly contagious and has a high fatality rate. Seek immediate isolation and care.`,
    severity_question: "Do you have unexplained bleeding or have you been in contact with someone suspected of having Ebola?"
  },

  "zika": {
    name: "Zika Virus",
    keywords: ["zika", "zika virus", "microcephaly"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/zika-virus",
    full_response: `## 🦟 Zika Virus
**Zika** is a viral infection primarily transmitted by Aedes mosquitoes. It is linked to birth defects when pregnant women are infected.

### 🌡️ Symptoms
- Mild fever - Rash - Conjunctivitis (red eyes) - Muscle and joint pain - Malaise - Headache

### 🛡️ Prevention
1. Protection against mosquito bites (repellents, long clothing)
2. Use of physical barriers (screens, closed doors)
3. Elimination of mosquito breeding sites (standing water)
4. Safe sexual practices in areas with active transmission

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| Paracetamol | Relief of fever and pain |
| Fluids | Rehydration |

### 🔗 Official Resources
- [WHO Zika](https://www.who.int/news-room/fact-sheets/detail/zika-virus)
- [CDC Zika](https://www.cdc.gov/zika/)

> ⚠️ **Disclaimer**: Zika infection during pregnancy can cause microcephaly and other congenital malformations in the infant.`,
    severity_question: "Are you pregnant and have you recently traveled to an area with active Zika transmission?"
  },

  "alzheimers": {
    name: "Alzheimer's Disease",
    keywords: ["alzheimer's", "alzheimers", "dementia", "memory loss", "cognitive decline"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/dementia",
    full_response: `## 🧠 Alzheimer's Disease
**Alzheimer's** is a chronic neurodegenerative disease that usually starts slowly and worsens over time, being the cause of 60–70% of cases of dementia.

### 🌡️ Symptoms
- Memory loss affecting daily life - Difficulty performing familiar tasks - Confusion with time or place - Trouble understanding visual images - New problems with words in speaking/writing - Misplacing things - Decreased judgment - Withdrawal from work/social activities

### 🛡️ Prevention / Risk Reduction
1. Regular physical exercise
2. Healthy diet (e.g., Mediterranean)
3. Managing cardiovascular risk factors (hypertension, diabetes, obesity)
4. Avoiding tobacco and excessive alcohol
5. Lifelong learning and social engagement

### 💊 Tablets / Oral Medications
| Medication | Class | Purpose |
|---|---|---|
| Donepezil (Aricept) | Cholinesterase inhibitor | Cognitive symptoms (all stages) |
| Memantine (Namenda) | NMDA receptor antagonist | Moderate to severe stages |
| Rivastigmine | Cholinesterase inhibitor | Mild to moderate |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Lecanemab (Leqembi) | IV Infusion | Amyloid reduction (early stage) |
| Donanemab | IV Infusion | Amyloid reduction (early stage) |

### 🔗 Official Resources
- [WHO Dementia](https://www.who.int/news-room/fact-sheets/detail/dementia)
- [Alzheimer's Association](https://www.alz.org/)

> ⚠️ **Disclaimer**: Alzheimer's is a progressive disease with no known cure, but treatments can help manage symptoms.`,
    severity_question: "Is the memory loss sudden or has it been gradual? Are there signs of sudden confusion or personality change?"
  },

  "parkinsons": {
    name: "Parkinson's Disease",
    keywords: ["parkinson's", "parkinsons", "tremor", "rigidity", "bradykinesia"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/parkinson-disease",
    full_response: `## 🧠 Parkinson's Disease
**Parkinson's** is a brain disorder that leads to shaking, stiffness, and difficulty with walking, balance, and coordination.

### 🌡️ Symptoms
- Tremor (shaking) at rest - Slow movement (bradykinesia) - Muscle stiffness (rigidity) - Impaired posture and balance - Loss of automatic movements - Speech and writing changes

### 🛡️ Management
1. Regular physical activity (especially balance and stretching)
2. Occupational and physical therapy
3. Speech therapy
4. Healthy, balanced diet

### 💊 Tablets / Oral Medications
| Medication | Class | Purpose |
|---|---|---|
| Levodopa/Carbidopa | Dopamine precursor | Most effective for motor symptoms |
| Pramipexole / Ropinirole | Dopamine agonists | Mimic dopamine |
| Selegiline / Rasagiline | MAO-B inhibitors | Prevent dopamine breakdown |
| Entacapone | COMT inhibitor | Extend levodopa effect |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Apomorphine | SC Injection | Rescue for "off" episodes |
| Duopa (Levodopa/Carbidopa gel) | Intestinal pump | Advanced Parkinson's |

### 🔗 Official Resources
- [WHO Parkinson's](https://www.who.int/news-room/fact-sheets/detail/parkinson-disease)
- [Parkinson's Foundation](https://www.parkinson.org/)

> ⚠️ **Disclaimer**: Parkinson's symptoms vary widely between individuals. Early diagnosis is key for management.`,
    severity_question: "Do you have a tremor at rest, or have you noticed your movements becoming much slower?"
  },

  "leishmaniasis": {
    name: "Leishmaniasis",
    keywords: ["leishmaniasis", "kala-azar", "black fever", "sandfly bite"],
    whoLink: "https://www.who.int/news-room/fact-sheets/detail/leishmaniasis",
    full_response: `## 🦟 Leishmaniasis
**Leishmaniasis** is caused by protozoan parasites transmitted by the bite of infected female phlebotomine sandflies.

### 🌡️ Types & Symptoms
- **Visceral (Kala-azar)**: Fever, weight loss, spleen/liver enlargement, anemia (fatal if untreated)
- **Cutaneous**: Skin sores/ulcers leaving permanent scars
- **Mucocutaneous**: Destruction of mucous membranes in nose, mouth, throat

### 🛡️ Prevention
1. Use of insecticide-treated bed nets
2. Spraying houses with residual insecticides
3. Environmental management (reducing sandfly breeding sites)
4. Personal protection (repellents, long clothing)

### 💊 Tablets / Oral Medications
| Medication | Purpose |
|---|---|
| Miltefosine | Oral treatment for visceral and cutaneous |

### 💉 Injections / IV Medications
| Medication | Route | Purpose |
|---|---|---|
| Liposomal Amphotericin B | IV | First-line for visceral |
| Sodium Stibogluconate | IV/IM | Antimonial treatment |
| Paromomycin | IM | Alternative for visceral |

### 🔗 Official Resources
- [WHO Leishmaniasis](https://www.who.int/news-room/fact-sheets/detail/leishmaniasis)

> ⚠️ **Disclaimer**: Visceral leishmaniasis is fatal in over 95% of cases if left untreated.`,
    severity_question: "Do you have a persistent fever, weight loss, and noticed swelling in your abdomen?"
  },
};

export const generalResponses = {
  unknown: `I'm sorry, I couldn't find specific information on that in my offline database. However, my AI can answer virtually any medical question!\n\n**Some diseases I can answer about:**\n- Flu, COVID-19, Malaria, Dengue, TB, Typhoid\n- Cholera, HIV/AIDS, Hepatitis B, Ebola, Zika\n- Diabetes, Hypertension, Heart Attack, Stroke\n- Cancer, Alzheimer's, Parkinson's, Leishmaniasis\n- Depression, Anxiety, Pneumonia, Asthma, Mpox\n\nTry asking: *"Tell me about [disease name]"* or describe your symptoms.`,
  greeting: `## 👋 Welcome to MediChat AI!\n\nI am your **multilingual medical awareness assistant**. I can:\n\n- 🏥 Provide detailed information on **any disease** worldwide\n- 💊 List **tablets and injections** for diseases\n- 🛡️ Explain **prevention strategies**\n- 🌍 **Respond in your language** (Hindi, Tamil, Spanish, French, Arabic & more!)\n- 🔗 Link to official **WHO resources**\n- 📢 Show **current disease outbreaks** worldwide\n\n*How can I assist you today?*`,
  non_medical: `I am programmed as a **Medical Awareness Assistant**.\n\nI cannot assist with non-medical topics. Please ask me about a disease, symptom, medication, or health condition.`,
  emergency: `## 🚨 CRITICAL EMERGENCY ALERT\n\nIf you are experiencing a **medical emergency**, please:\n\n**📞 Call your local emergency services IMMEDIATELY**\n- India: **112** or **108** (Ambulance)\n- USA: **911**\n- UK: **999**\n- International: **112**\n\n**Do NOT wait — call NOW.**`
};
