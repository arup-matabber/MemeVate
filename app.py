from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from PIL import Image, ImageDraw, ImageFont
import io
import base64

app = Flask(__name__)
CORS(app)

# Load meme text generation pipeline
meme_generator = pipeline("text-generation", model="gpt-2")

def generate_meme_image(text):
    # Load a sample meme template
    img = Image.open("meme_template.jpg")
    draw = ImageDraw.Draw(img)
    
    # Define text and positioning
    font = ImageFont.truetype("arial.ttf", 24)
    text_position = (50, 50)
    draw.text(text_position, text, fill="white", font=font)
    
    # Convert to base64
    buffered = io.BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

@app.route('/generate_meme', methods=['POST'])
def generate_meme():
    data = request.json
    prompt = data['prompt']
    
    # Generate meme text
    meme_text = meme_generator(prompt, max_length=30)[0]['generated_text']
    
    # Generate meme image with the text
    meme_image = generate_meme_image(meme_text)
    
    return jsonify({"meme_image": meme_image})

if __name__ == '__main__':
    app.run(debug=True)
