from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

# Load the English NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise RuntimeError("NLP model not found. Please run: python -m spacy download en_core_web_sm")

app = FastAPI(title="Netra-i AI Engine", version="1.0")

# CRITICAL: Allow React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Your Vite React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define data structures for requests
class TextPayload(BaseModel):
    text: str

class ChatPayload(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "Netra-i AI Engine is online, secure, and fully operational."}

@app.post("/api/analyze")
def analyze_text(payload: TextPayload):
    """
    Ingests unstructured text and returns extracted intelligence entities.
    """
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Empty text provided.")

    # Process the text through the NLP pipeline
    doc = nlp(payload.text)
    
    # Extract entities and categorize them
    persons = []
    locations = []
    organizations = []
    dates = []
    
    for ent in doc.ents:
        if ent.label_ == "PERSON" and ent.text not in persons:
            persons.append(ent.text)
        elif ent.label_ in ["GPE", "LOC", "FAC"] and ent.text not in locations:
            locations.append(ent.text)
        elif ent.label_ == "ORG" and ent.text not in organizations:
            organizations.append(ent.text)
        elif ent.label_ == "DATE" and ent.text not in dates:
            dates.append(ent.text)

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
    """
    Acts as a fully-fledged, robust conversational intelligence officer for Netra-i.
    """
    msg = payload.message.lower().strip()
    
    # --- COMPREHENSIVE MOCK DATABASE ---
    active_cases = [
        "Case #2047: Downtown Warehouse (Armed Robbery)",
        "Case #3312: Sector 7 Complex (Grand Theft Auto)",
        "Case #3390: Highland Ave (Commercial Burglary)",
        "Case #4012: Cyber Cell Breach (Data Extortion)",
        "Case #5509: Metro Transit Line (Contraband Transit)"
    ]
    
    case_details = {
        "2047": "📁 [Case #2047 Intelligence File]\n- Target: Downtown Warehouse\n- Primary Suspect: John Doe\n- Status: Active / High Priority\n- Evidence: CCTV footage shows masked individual fleeing toward the financial district.",
        "3312": "📁 [Case #3312 Intelligence File]\n- Target: Sector 7 Complex\n- Description: Missing vehicle (DL-8C-1199)\n- Status: Under Investigation\n- Last Known Ping: Sector 7 perimeter grid.",
        "3390": "📁 [Case #3390 Intelligence File]\n- Target: Highland Ave\n- Offense: Commercial Burglary\n- Forensics: Latent fingerprints recovered match database record #882.",
        "4012": "📁 [Case #4012 Intelligence File]\n- Target: TechCorp Servers\n- Offense: Data Extortion & Ransomware\n- Status: Critical Threat",
        "5509": "📁 [Case #5509 Intelligence File]\n- Target: Central Metro Line\n- Offense: Contraband Logistics\n- Status: Surveillance Active"
    }

    evidence_locker = [
        "EV-01: Masked CCTV footage (Case #2047)",
        "EV-02: Recovered hard drive fragments (Case #4012)",
        "EV-03: Partial thumbprint from window frame (Case #3390)",
        "EV-04: Encrypted burner phone logs (Case #3312)"
    ]

    # --- ADVANCED INTENT & COMMAND PARSER ---
    
    # 1. Greetings & System Status
    if any(w in msg for w in ["hi", "hello", "hey", "greetings", "system online", "status"]):
        reply = "Netra-i Intelligence Matrix is fully online and synchronized. All security protocols are active, Officer. How may I assist your operation today?"
        
    # 2. Help & Command Directory
    elif any(w in msg for w in ["help", "commands", "what can you do", "options", "menu"]):
        reply = "Available Netra-i System Directives:\n1. 'List cases' - View active investigations\n2. 'Case [ID]' (e.g., 'case 2047') - Deep-dive file retrieval\n3. 'Evidence locker' - Check secure evidence items\n4. 'Open map' - Shift view to live geospatial tracking\n5. 'Analyze report' - Instructions for NLP extraction\n6. 'System diagnostics' - Check server health"

    # 3. List Cases
    elif any(w in msg for w in ["list cases", "active cases", "show cases", "cases"]):
        formatted_cases = "\n- ".join(active_cases)
        reply = f"Retrieving Active Case Files ({len(active_cases)} total):\n- {formatted_cases}"
        
    # 4. Specific Case Lookups
    elif "case" in msg:
        found = False
        reply = ""
        for case_id, details in case_details.items():
            if case_id in msg:
                reply = details
                found = True
                break
        if not found:
            reply = "Please specify a valid Case ID from active files (e.g., 'case 2047', 'case 3312', 'case 4012')."
                
    # 5. Evidence Locker
    elif any(w in msg for w in ["evidence", "locker", "forensics", "proof"]):
        formatted_evidence = "\n- ".join(evidence_locker)
        reply = f"🔒 Secure Evidence Locker Registry:\n- {formatted_evidence}"

    # 6. NLP / AI Text Extraction Guide
    elif any(w in msg for w in ["analyze", "extract", "nlp", "report", "text"]):
        reply = "🧠 AI Extraction Engine ready. Paste any raw witness statement, transcript, or field report into the dashboard text box and click 'Extract Intel via AI' to parse entities instantly."

    # 7. Navigation & System Actions (Simulated Redirection)
    elif any(w in msg for w in ["map", "location", "track", "geospatial", "radar"]):
        reply = "[SYSTEM REDIRECT] Focus shifted to the Live Geospatial Tracking Map. Nodes are updating in real time."
        
    elif any(w in msg for w in ["graph", "network", "nodes", "connections"]):
        reply = "[SYSTEM REDIRECT] Initializing Investigation Graph. Mapping criminal associations and financial ties."

    elif any(w in msg for w in ["diagnostics", "health", "system check", "ping"]):
        reply = "Diagnostics Check:\n- FastAPI Core: Online (Port 8000)\n- spaCy NLP Pipeline: Loaded (en_core_web_sm)\n- CORS Security: Active (Port 5173)\n- Database Latency: 12ms"

    # 8. Hackathon Easter Eggs / Fun Commands
    elif any(w in msg for w in ["solve", "solve case", "winner", "hackathon"]):
        reply = "🏆 Netra-i Hackathon Protocol Engaged! Combining React glassmorphic UI, Leaflet mapping, and Python NLP to secure top honors!"

    elif any(w in msg for w in ["who are you", "your name", "jarvis"]):
        reply = "I am Netra-i AI, your dedicated tactical intelligence assistant designed for high-impact crime analytics."

    # 9. Intelligent Fallback
    else:
        reply = f"Query parsed: '{payload.message}'. Direct command match not found in local security index. Type 'help' to review available system operations or check case database."

    return {"response": reply}