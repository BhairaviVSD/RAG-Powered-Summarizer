import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import torch
from huggingface_hub import login

# Add Hugging Face Token
login(token='')

app = Flask(__name__)
CORS(app)

# Model selection
model_name = "sshleifer/distilbart-cnn-12-6"  # Smaller, efficient model for summarization
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Use a pipeline as a high-level helper
pipe = pipeline("summarization", model=model_name, device=0 if device == "cuda" else -1)

# Load model and tokenizer directly (for more control)
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": f"Summarization API is running with model {model_name}!"})

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    user_text = data.get("text", "")

    if not user_text:
        return jsonify({"error": "No text provided"}), 400

    try:
        # Use pipeline for quick summarization
        summary = pipe(user_text, max_length=250, min_length=50, do_sample=True)

        # Alternatively, you can use the model directly for more control (if needed)
        # tokenizer and model approach
        inputs = tokenizer(user_text, return_tensors="pt", max_length=1024, truncation=True)
        inputs = {key: value.to(device) for key, value in inputs.items()}
        summary_ids = model.generate(inputs["input_ids"], max_new_tokens=250, min_new_tokens=50, do_sample=True)
        summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        # When using pipeline, the output is a list of dicts, we need to extract the summary_text
        if isinstance(summary, list):
            summary_text = summary[0]['summary_text']

        return jsonify({"summary": summary_text})

    except Exception as e:
        print(f"Error during summarization: {e}")  # Log error to backend
        return jsonify({"error": "An error occurred during summarization. Please try again."}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))  # Use port 5001 by default
    app.run(host="0.0.0.0", port=port, debug=True)
