#!/usr/bin/env python3
"""
Génération d'avatar Max avec Gemini 3 Pro Image via Vertex AI
Usage: python generate_avatar.py
"""

import os
from pathlib import Path

# Configuration
PROJECT_ID = "mon-projet-veo3-483016"
CREDENTIALS_PATH = os.path.expanduser("~/.config/gcloud/veo3-key.json")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_PATH

# Prompts pour différentes versions de l'avatar
AVATAR_PROMPTS = [
    # Version 1 : Hexagone neural minimaliste
    """Create a minimalist logo mark for an AI neuro-coach named 'Max'.

DESIGN:
- Shape: Clean hexagon with subtle neural network pattern inside
- Style: Flat design, modern tech aesthetic
- Colors: Electric Indigo (#4F46E5) as main color, white accents
- Lines: Thin, precise geometric lines suggesting neural connections
- Feel: Professional, intelligent, trustworthy

TECHNICAL:
- Vector-style clean edges
- Centered composition
- White or transparent background
- No text, just the symbol
- Square format, suitable for avatar use

Think: Anthropic logo meets brain network, minimal and elegant.""",

    # Version 2 : Réseau neuronal abstrait
    """Create a modern abstract logo for an AI brain coach called 'Max'.

DESIGN:
- Concept: Interconnected nodes forming a subtle brain shape
- Style: Abstract, geometric, tech-forward
- Colors: Deep indigo (#4F46E5) with violet (#8B5CF6) gradient accents
- Pattern: 5-7 connected dots/nodes with elegant connecting lines
- Feel: Smart, innovative, approachable

TECHNICAL:
- Clean vector aesthetic
- Soft rounded nodes
- White background
- Suitable as app icon or avatar
- Square format

Think: Neural network visualization, simplified and beautiful.""",

    # Version 3 : Cercle avec ondes cérébrales
    """Design a circular logo mark for 'Max', an AI cognitive performance coach.

DESIGN:
- Shape: Perfect circle with internal wave/pulse pattern
- Concept: Brain waves or signal pulses suggesting mental activity
- Style: Modern, clean, scientific but friendly
- Colors: Indigo (#4F46E5) main, lighter indigo for waves
- Pattern: 2-3 flowing wave lines inside the circle

TECHNICAL:
- Minimalist design
- Smooth curves
- White background
- Works at small sizes (32px)
- Square format for avatar

Think: Headspace meets neuroscience, calm but active.""",

    # Version 4 : Lettre M stylisée
    """Create a stylized 'M' monogram logo for an AI neuro-coach named Max.

DESIGN:
- Letter: Stylized 'M' with neural/tech twist
- Style: Geometric, modern, memorable
- Colors: Electric indigo (#4F46E5) solid
- Details: Subtle circuit or neural pattern integrated into the letter
- Feel: Bold, intelligent, professional

TECHNICAL:
- Clean geometric construction
- Strong, recognizable silhouette
- White background
- Works as favicon or avatar
- Square format

Think: Meta logo meets neural network, clean and iconic."""
]


def generate_avatar(prompt: str, output_path: str, version: int) -> bool:
    """Génère un avatar avec Gemini 3 Pro Image"""
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("❌ Erreur: google-genai non installé")
        print("   Installer avec: pip install google-genai")
        return False

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"\n🎨 Version {version}: Génération en cours...")
    print(f"   Prompt: {prompt[:80]}...")

    # Client Vertex AI
    client = genai.Client(
        vertexai=True,
        project=PROJECT_ID,
        location="global"
    )

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[
                types.Content(
                    role="user",
                    parts=[
                        types.Part(text=prompt)
                    ]
                )
            ],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                temperature=0.8  # Un peu de créativité
            )
        )

        # Extraire l'image
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                with open(output_path, "wb") as f:
                    f.write(part.inline_data.data)
                size_kb = output_path.stat().st_size / 1024
                print(f"   ✅ Sauvegardé: {output_path} ({size_kb:.1f} KB)")
                return True
            elif hasattr(part, 'text') and part.text:
                print(f"   💭 Réponse texte: {part.text[:100]}...")

        print(f"   ❌ Aucune image générée pour la version {version}")
        return False

    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return False


def main():
    output_dir = Path("/Users/jeromeborenstejn/personnel/Code/neuroptimize-leah/assets/avatars")
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("🧠 Génération des avatars Max - Neuroptimize")
    print("=" * 60)
    print(f"📁 Dossier de sortie: {output_dir}")

    results = []

    for i, prompt in enumerate(AVATAR_PROMPTS, 1):
        output_path = output_dir / f"max_avatar_v{i}.png"
        success = generate_avatar(prompt, str(output_path), i)
        results.append((i, success, output_path))

    print("\n" + "=" * 60)
    print("📊 Résumé:")
    print("=" * 60)

    for version, success, path in results:
        status = "✅" if success else "❌"
        print(f"   {status} Version {version}: {path.name}")

    successful = sum(1 for _, s, _ in results if s)
    print(f"\n🎯 {successful}/{len(results)} avatars générés avec succès")

    if successful > 0:
        print(f"\n👀 Ouvre le dossier pour voir les résultats:")
        print(f"   open {output_dir}")


if __name__ == "__main__":
    main()
