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

Y a-t-il d'autres fonctions cognitives que tu aimerais travailler ?"`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
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

    return NextResponse.json({
      message: assistantMessage,
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
