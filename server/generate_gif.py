import base64
import requests
import os
from moviepy.editor import ImageSequenceClip
from PIL import Image
import argparse
import sys

def call_openai_api(image_path, prompt):
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        print("Error: OPENAI_API_KEY is not set.")
        sys.exit(1)

    with open(image_path, 'rb') as image_file:
        files = {
            'image': image_file,
        }
        
        data = {
            "prompt": prompt,
            "n": 1,
        }

        headers = {
            "Authorization": f"Bearer {api_key}",
        }

        response = requests.post("https://api.openai.com/v1/images/edits", headers=headers, files=files, data=data)
        response.raise_for_status()
        return response.json()

def process_image(image_path, prompt):
    response = call_openai_api(image_path, prompt)
    
    # Save the modified image
    modified_image_base64 = response.get('data')[0].get('image')
    modified_image_bytes = base64.b64decode(modified_image_base64)
    
    # Write image to disk
    with open("modified_image.png", "wb") as image_file:
        image_file.write(modified_image_bytes)

    return "modified_image.png"

def generate_gif(image_paths, output_gif_path):
    # Generate GIF from list of image paths
    images = [Image.open(image_path) for image_path in image_paths]
    image_sequence = ImageSequenceClip([img for img in images], fps=2)
    image_sequence.write_gif(output_gif_path, fps=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--text', type=str, required=True, help='Text prompt for image modification')

    args = parser.parse_args()

    # Read the image path from stdin
    image_path = sys.stdin.read().strip()

    try:
        # Modify the image using OpenAI API
        modified_image_path = process_image(image_path, args.text)

        # Create a sequence of images (e.g., animate changes) - can repeat or modify further if needed
        image_sequence = [image_path, modified_image_path]  # Example: start with original and modified image

        # Generate GIF from the sequence of images
        generate_gif(image_sequence, "output.gif")

        print("GIF generated successfully as output.gif")

    except Exception as e:
        print(f"Error generating GIF: {e}")
