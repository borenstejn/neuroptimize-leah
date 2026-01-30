#!/usr/bin/env python3
"""
Generate animated video from Max avatar using Google Veo via Vertex AI
Uses same credentials as gemini-image-retouche skill
"""

import os
import time
from pathlib import Path
from google import genai
from google.genai import types

# Configuration - SAME AS RETOUCHE SKILL
PROJECT_ID = "mon-projet-veo3-483016"
LOCATION = "us-central1"  # Veo requires us-central1, not global
CREDENTIALS_PATH = os.path.expanduser("~/.config/gcloud/veo3-key.json")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_PATH

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
INPUT_IMAGE = PROJECT_DIR / "assets" / "avatars" / "max_avatar_v2.png"
OUTPUT_DIR = PROJECT_DIR / "public" / "videos"
OUTPUT_FILE = OUTPUT_DIR / "max_logo_animated.mp4"

def generate_video():
    """Generate video from image using Veo"""

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Initialize client - same pattern as retouche skill
    client = genai.Client(
        vertexai=True,
        project=PROJECT_ID,
        location=LOCATION,
    )

    # Read input image
    print(f"Reading input image: {INPUT_IMAGE}")
    with open(INPUT_IMAGE, "rb") as f:
        image_bytes = f.read()

    # Create image object for Veo
    image = types.Image(
        image_bytes=image_bytes,
        mime_type="image/png"
    )

    # Prompt for animation
    prompt = """Animate this neural network brain logo with subtle, elegant movements:
- The neural connections (lines and nodes) gently pulse with light traveling along them
- Soft glowing effects emanate from the connection points
- The overall structure breathes slowly, expanding and contracting slightly
- Colors shift subtly between shades of purple and blue
- Keep the "MAX" text stable and readable
- Smooth, hypnotic, professional animation suitable for a tech company logo
- Seamless loop potential"""

    print("Generating video with Veo...")
    print(f"Prompt: {prompt[:100]}...")

    # Generate video using Veo
    operation = client.models.generate_videos(
        model="veo-2.0-generate-001",
        prompt=prompt,
        image=image,
        config=types.GenerateVideosConfig(
            aspect_ratio="16:9",
            number_of_videos=1,
            duration_seconds=5,
            person_generation="dont_allow",
        ),
    )

    print("Waiting for video generation (this can take 2-5 minutes)...")

    # Poll for completion
    while not operation.done:
        print(".", end="", flush=True)
        time.sleep(10)
        operation = client.operations.get(operation)

    print("\nVideo generation complete!")

    # Get result
    result = operation.result

    if result.generated_videos:
        video = result.generated_videos[0]

        # Download video
        print(f"Downloading video to {OUTPUT_FILE}...")
        print(f"Video object: {video}")

        # Get video from URI
        if hasattr(video, 'video') and hasattr(video.video, 'uri') and video.video.uri:
            import httpx
            print(f"Downloading from URI: {video.video.uri}")
            response = httpx.get(video.video.uri)
            video_bytes = response.content
        elif hasattr(video, 'video') and hasattr(video.video, 'video_bytes') and video.video.video_bytes:
            video_bytes = video.video.video_bytes
        else:
            # Try to get raw bytes
            print(f"Video attributes: {dir(video)}")
            if hasattr(video, 'video'):
                print(f"video.video attributes: {dir(video.video)}")
            raise ValueError("Could not extract video bytes")

        with open(OUTPUT_FILE, "wb") as f:
            f.write(video_bytes)

        print(f"Video saved to: {OUTPUT_FILE}")
        return str(OUTPUT_FILE)
    else:
        print("No video generated")
        return None


if __name__ == "__main__":
    result = generate_video()
    if result:
        print(f"\nSuccess! Video at: {result}")
    else:
        print("\nFailed to generate video")
