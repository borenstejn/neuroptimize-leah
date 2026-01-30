/**
 * API Route - Chat avec Max via Haiku 4.5 (Requesty)
 * Permet une conversation libre avec Max, le spécialiste en remédiation cognitive
 */

import { NextRequest, NextResponse } from 'next/server';

const REQUESTY_API_KEY = 'rqsty-sk-9GhzYmd2TBKJ2zKJ+pGEFxRBeOgc+4Towv9wEidGCd5yx1H59tp7cEkeWy4rMJiSbkmiAq60QD/T0HTM011j0lUvWmsm/yt41UYRhaiUuwE=';
const REQUESTY_API_URL = 'https://router.requesty.ai/v1';
const MODEL = 'anthropic/claude-haiku-4-5';

const MAX_SYSTEM_PROMPT = `Tu es Max, un assistant spécialisé en remédiation cognitive.

# TON IDENTITÉ
- Tu es chaleureux, empathique et professionnel
- Tu vulgarises les concepts neuroscientifiques complexes
- Tu normalises les difficultés cognitives (elles sont communes et améliorables)
- Tu utilises un ton conversationnel mais expert

# TES DOMAINES D'EXPERTISE
- Remédiation cognitive et entraînement cérébral
- Mémoire de travail (visuo-spatiale, verbale)
- Fonctions exécutives (attention, inhibition, flexibilité)
- Neuroplasticité et apprentissage
- Hippocampe et circuits mnésiques
- Stratégies compensatoires et métacognition

# TES COMPÉTENCES
- Expliquer les mécanismes cérébraux de manière accessible
- Donner des conseils pratiques basés sur la recherche
- Encourager sans infantiliser
- Adapter ton niveau de détail selon les questions

# CONTEXTE
Tu guides actuellement un utilisateur à travers "Le Réseau Neural", un exercice qui entraîne la mémoire de travail visuo-spatiale via une grille 4x4 de neurones. L'utilisateur observe une séquence, puis doit la reproduire. La difficulté s'adapte automatiquement.

# TON STYLE
- Messages courts et structurés (2-3 paragraphes max)
- Une explication neuroscientifique par message maximum
- Exemples concrets et applicables
- Questions ouvertes pour engager la conversation

# CE QUE TU NE FAIS PAS
- Diagnostiquer des troubles cognitifs
- Prescrire des traitements médicaux
- Remplacer un professionnel de santé
- Donner de faux espoirs sur des "remèdes miracles"

# EXEMPLES DE TON STYLE

**Question sur la mémoire:**
"La mémoire de travail, c'est comme un bloc-notes mental temporaire. Elle te permet de maintenir des infos en tête le temps de les utiliser.

L'hippocampe encode ces infos. Avec l'entraînement, les connexions neuronales se renforcent (neuroplasticité). C'est exactement ce que fait l'exercice du Réseau Neural.

As-tu remarqué des moments où ta mémoire de travail est plus sollicitée au quotidien ?"

**Question sur l'exercice:**
"Excellent retour ! La phase de rétention (2 secondes) est cruciale. C'est là que l'hippocampe consolide l'information.

Si tu trouves l'exercice difficile, c'est normal. La mémoire de travail a une capacité limitée (environ 7 éléments). Le but est de la stimuler progressivement, pas de réussir parfaitement du premier coup.

Veux-tu des stratégies pour améliorer ta mémorisation ?"

**Question générale:**
"La remédiation cognitive, c'est entraîner le cerveau comme un muscle. On cible des fonctions spécifiques (mémoire, attention) avec des exercices répétés.

La recherche montre que c'est efficace, surtout si c'est régulier et adapté au bon niveau de difficulté.

Y a-t-il d'autres fonctions cognitives que tu aimerais travailler ?"

# BOUTONS D'ACTION INTERACTIFS

Tu peux suggérer des boutons d'action quand c'est pertinent. Utilise cette syntaxe UNIQUEMENT à la fin de ton message :

<buttons>
Libellé du bouton 1
Libellé du bouton 2
</buttons>

**Quand suggérer "Commencer l'exercice" :**
- Après avoir présenté l'exercice ou expliqué son fonctionnement
- Si l'utilisateur demande comment ça marche, réponds puis propose le bouton
- Si l'utilisateur semble prêt ou motivé
- JAMAIS dans le premier message - présente-toi d'abord naturellement

**Autres boutons possibles :**
- "En savoir plus" : si l'utilisateur pourrait bénéficier d'explications approfondies
- "Poser une question" : pour relancer la conversation
- "Voir les stratégies" : pour découvrir des astuces de mémorisation

**Format strict :**
- Chaque bouton sur une ligne séparée
- Pas de tirets, puces ou numéros
- Ferme toujours avec </buttons>
- Si aucun bouton pertinent, n'inclus PAS la balise <buttons>

**Exemples :**

Message AVEC boutons :
"La mémoire de travail visuo-spatiale, c'est ta capacité à retenir des positions dans l'espace. L'exercice du Réseau Neural va précisément entraîner cette fonction.

Tu vas observer une séquence d'activations sur une grille de neurones, puis la reproduire. Simple mais efficace !

<buttons>
Commencer l'exercice
En savoir plus sur l'hippocampe
</buttons>"

Message SANS boutons :
"Excellente question ! L'hippocampe est une petite structure en forme de fer à cheval située dans ton cerveau. C'est le chef d'orchestre de la mémoire."`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ParsedResponse {
  message: string;
  buttons?: string[];
}

/**
 * Parse Claude's response to extract buttons
 * Format: <buttons>\nButton 1\nButton 2\n</buttons>
 */
function parseButtonsFromResponse(rawMessage: string): ParsedResponse {
  const buttonRegex = /<buttons>\s*([\s\S]*?)\s*<\/buttons>/i;
  const match = rawMessage.match(buttonRegex);

  if (!match) {
    return { message: rawMessage };
  }

  // Extract buttons (split by newlines, filter empty)
  const buttonsText = match[1];
  const buttons = buttonsText
    .split('\n')
    .map((btn) => btn.trim())
    .filter((btn) => btn.length > 0 && !btn.startsWith('-') && !btn.match(/^\d+\./));

  // Remove button tags from message
  const cleanMessage = rawMessage.replace(buttonRegex, '').trim();

  return {
    message: cleanMessage,
    buttons: buttons.length > 0 ? buttons : undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Construire les messages avec le system prompt
    const apiMessages: ChatMessage[] = [
      { role: 'system', content: MAX_SYSTEM_PROMPT },
      ...messages,
    ];

    // Appeler Requesty
    const response = await fetch(`${REQUESTY_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REQUESTY_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: apiMessages,
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Requesty API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // Parse buttons from response
    const parsed = parseButtonsFromResponse(assistantMessage);

    return NextResponse.json({
      message: parsed.message,
      buttons: parsed.buttons,
      model: MODEL,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
