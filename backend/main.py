import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy
import google.generativeai as genai

# Load the English NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise RuntimeError("NLP model not found. Please run: python -m spacy download en_core_web_sm")

# Configure the Gemini LLM
# It will look for your API key in the environment variables
# TEMPORARY FOR LOCAL TESTING ONLY
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
llm_model = genai.GenerativeModel('gemini-2.5-flash')

app = FastAPI(title="Netra-i AI Engine", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextPayload(BaseModel):
    text: str

class ChatPayload(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "Netra-i AI Engine is online, secure, and fully operational."}

@app.post("/api/analyze")
def analyze_text(payload: TextPayload):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Empty text provided.")

    doc = nlp(payload.text)
    
    persons, locations, organizations, dates = [], [], [], []
    for ent in doc.ents:
        if ent.label_ == "PERSON" and ent.text not in persons: persons.append(ent.text)
        elif ent.label_ in ["GPE", "LOC", "FAC"] and ent.text not in locations: locations.append(ent.text)
        elif ent.label_ == "ORG" and ent.text not in organizations: organizations.append(ent.text)
        elif ent.label_ == "DATE" and ent.text not in dates: dates.append(ent.text)

    return {
        "insight_summary": f"Analyzed {len(payload.text.split())} words.",
        "entities": {
            "suspects_and_persons": persons,
            "locations_identified": locations,
            "organizations_involved": organizations,
            "dates_mentioned": dates
        }
    }

@app.post("/api/chat")
def chat_assistant(payload: ChatPayload):
    msg = payload.message.lower().strip()
    
    case_context = """
    Case #2047: Downtown Warehouse (Armed Robbery). Suspect: John Doe. Active. Evidence: CCTV footage.
    Case #3312: Sector 7 Complex (Grand Theft Auto). Missing vehicle DL-8C-1199. Active.
    Case #3390: Highland Ave (Commercial Burglary). Fingerprints recovered.
    """

    # 1. Keep UI Redirection Commands (These bypass the LLM for speed)
    if any(w in msg for w in ["map", "location", "track", "geospatial"]):
        return {"response": "[SYSTEM REDIRECT] Focus shifted to the Live Geospatial Tracking Map."}
    elif any(w in msg for w in ["evidence", "locker", "forensics"]):
        return {"response": "🔒 Secure Evidence Locker Registry:\n- EV-01: Masked CCTV footage (Case #2047)\n- EV-02: Encrypted burner phone logs (Case #3312)"}
        
    # 2. THE TRUE AI UPGRADE (Send everything else to Gemini)
    else:
        try:
            # We give Gemini a "System Prompt" so it acts like a detective AI
            prompt = f"""
            You are Netra-i, a highly advanced tactical intelligence AI assistant for police officers. 
            You are professional, slightly robotic but helpful, and concise. 
            Here is the current database of active cases: {case_context}
            
            The investigating officer just said: "{payload.message}"
            
            Respond to the officer appropriately.
            """
            
            response = llm_model.generate_content(prompt)
            reply = response.text.strip()
            
        except Exception as e:
            reply = f"Neural link disrupted. Could not reach LLM servers. Error: {str(e)}"

    return {"response": reply}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)