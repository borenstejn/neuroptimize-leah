# Design Guidelines - POC Neuroptimize

> Charte graphique "Code-First" pour une esthétique "Neuro-Tech"

## 1. L'Ambiance (Vibe)

| Aspect | Direction |
|--------|-----------|
| **Style** | "Clean SaaS" / "Scientific Modern" |
| **Inspiration** | Linear (minimalisme tech) + Headspace (douceur), version Business |
| **Formes** | Arrondies mais structurées |
| **Effets** | Ombres douces et diffuses, backdrop-blur subtil |

**À éviter :**
- Style "spa/wellness" trop doux
- Couleurs vives criardes
- Ombres noires dures
- Look "projet étudiant"

---

## 2. Palette de Couleurs

### Tokens Tailwind

```typescript
// tailwind.config.ts
const colors = {
  // Fond
  background: '#F8FAFC',      // slate-50 - gris très pâle, reposant

  // Primaire (Max & Actions)
  primary: {
    DEFAULT: '#4F46E5',       // indigo-600
    hover: '#4338CA',         // indigo-700
    light: '#6366F1',         // indigo-500
  },

  // Texte
  text: {
    primary: '#0F172A',       // slate-900 - presque noir
    secondary: '#64748B',     // slate-500 - labels
    muted: '#94A3B8',         // slate-400
  },

  // UI
  border: '#E2E8F0',          // slate-200
  card: '#FFFFFF',

  // Accent (respiration)
  accent: {
    from: '#6366F1',          // indigo-500
    to: '#8B5CF6',            // violet-500
  },

  // Succès
  success: '#10B981',         // emerald-500
}
```

### Usage

| Élément | Couleur | Class Tailwind |
|---------|---------|----------------|
| Fond app | `#F8FAFC` | `bg-slate-50` |
| Bulle Max | `#FFFFFF` | `bg-white` |
| Bulle User | `#4F46E5` | `bg-indigo-600` |
| Texte principal | `#0F172A` | `text-slate-900` |
| Texte secondaire | `#64748B` | `text-slate-500` |
| Bordures | `#E2E8F0` | `border-slate-200` |
| Boutons primaires | `#4F46E5` | `bg-indigo-600` |
| Cercle respiration | Gradient | `from-indigo-500 to-violet-500` |

---

## 3. Typographie

| Élément | Font | Weight | Extras |
|---------|------|--------|--------|
| **Font principale** | Inter | - | Default Next.js |
| **Titres** | Inter | Semi-bold (600) | `tracking-tight` |
| **Corps** | Inter | Regular (400) | - |
| **Labels** | Inter | Medium (500) | `text-sm` |

### Classes Tailwind

```html
<!-- Titre principal -->
<h1 class="text-2xl font-semibold tracking-tight text-slate-900">

<!-- Sous-titre -->
<h2 class="text-lg font-medium text-slate-700">

<!-- Corps de texte -->
<p class="text-base text-slate-600">

<!-- Label/Caption -->
<span class="text-sm text-slate-500">
```

---

## 4. Composants UI

### A. Avatar Max

```tsx
// Carré arrondi, fond indigo, icône blanche
<div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
  <BrainCircuit className="w-6 h-6 text-white" />
</div>
```

- Forme : `rounded-xl` (carré arrondi)
- Fond : `bg-indigo-600`
- Icône : `BrainCircuit` de Lucide, blanche
- Pulse subtil quand Max "parle" (optionnel)

### B. Bulle Max (Coach)

```tsx
<div className="flex gap-3 items-start">
  {/* Avatar */}
  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
    <BrainCircuit className="w-6 h-6 text-white" />
  </div>

  {/* Bulle */}
  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm max-w-[80%]">
    <p className="text-slate-800">Message de Max</p>
  </div>
</div>
```

- Fond : `bg-white`
- Bordure : `border border-slate-100`
- Ombre : `shadow-sm`
- Coins : `rounded-2xl rounded-tl-md` (pointe en haut à gauche)

### C. Bulle User

```tsx
<div className="flex justify-end">
  <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
    <p>Message utilisateur</p>
  </div>
</div>
```

- Fond : `bg-indigo-600`
- Texte : `text-white`
- Coins : `rounded-2xl rounded-tr-md` (pointe en haut à droite)
- Pas de bordure ni ombre

### D. Quick Reply Buttons

```tsx
<div className="flex flex-wrap gap-2">
  <button className="px-4 py-2 rounded-full border border-slate-200 bg-white
                     text-slate-700 hover:bg-slate-50 hover:border-indigo-300
                     transition-colors text-sm font-medium">
    🧠 Je suis dispersé
  </button>
</div>
```

- Style : Outline (bordure visible, fond transparent/blanc)
- Forme : `rounded-full` (pilule)
- Hover : `hover:bg-slate-50 hover:border-indigo-300`

### E. Input Chat

```tsx
<div className="flex gap-2 p-4 border-t border-slate-100 bg-white">
  <input
    className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
               placeholder:text-slate-400"
    placeholder="Écris ton message..."
  />
  <button className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center
                     hover:bg-indigo-700 transition-colors">
    <Send className="w-5 h-5" />
  </button>
</div>
```

- Input : `rounded-full`, fond `bg-slate-50`
- Focus : Ring indigo
- Bouton envoi : Cercle indigo

### F. Widget Respiration (Glassmorphism)

```tsx
<div className="fixed inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4">

    {/* Cercle de respiration */}
    <div className="flex justify-center mb-8">
      <motion.div
        animate={{ scale: [1, 2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 opacity-80"
      />
    </div>

    {/* Instruction */}
    <p className="text-center text-xl font-medium text-slate-800 mb-2">
      Inspire...
    </p>

    {/* Timer */}
    <p className="text-center text-slate-500">
      Respiration 1/18 • 2:45 restantes
    </p>

    {/* Boutons */}
    <div className="flex gap-3 mt-6 justify-center">
      <button className="px-6 py-2 rounded-full border border-slate-200 text-slate-600">
        Pause
      </button>
      <button className="px-6 py-2 rounded-full bg-slate-100 text-slate-700">
        Arrêter
      </button>
    </div>
  </div>
</div>
```

- Overlay : `bg-slate-900/20 backdrop-blur-sm`
- Card : `bg-white/90 backdrop-blur-md rounded-3xl`
- Cercle : Gradient `from-indigo-500 to-violet-500`

---

## 5. Espacements & Layout

### Container Chat

```tsx
<div className="flex flex-col h-screen bg-slate-50">
  {/* Header */}
  <header className="px-4 py-3 bg-white border-b border-slate-100">
    ...
  </header>

  {/* Messages */}
  <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
    ...
  </main>

  {/* Input */}
  <footer className="px-4 py-3 bg-white border-t border-slate-100">
    ...
  </footer>
</div>
```

### Espacements standards

| Usage | Class |
|-------|-------|
| Gap entre messages | `space-y-4` |
| Padding conteneurs | `p-4` |
| Gap dans flex | `gap-2` ou `gap-3` |
| Margin sections | `mb-6` ou `mt-8` |

---

## 6. Animations

### Transition standard

```css
transition-colors duration-200
transition-all duration-300
```

### Entrée de message (Framer Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Message */}
</motion.div>
```

### Cercle respiration

```tsx
<motion.div
  animate={{ scale: [1, 2.5, 1] }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

---

## 7. Responsive

### Breakpoints prioritaires

1. **Mobile first** (default) - C'est le plus important pour la démo
2. **Tablet** (`md:`) - Nice to have
3. **Desktop** (`lg:`) - Nice to have

### Règles

- Max width messages : `max-w-[80%]` (mobile) ou `max-w-md` (desktop)
- Widget respiration : Plein écran mobile, card centrée desktop
- Quick replies : `flex-wrap` pour s'adapter

---

## 8. globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 248 250 252;        /* slate-50 */
    --foreground: 15 23 42;           /* slate-900 */
    --primary: 79 70 229;             /* indigo-600 */
    --primary-foreground: 255 255 255;
    --muted: 100 116 139;             /* slate-500 */
    --border: 226 232 240;            /* slate-200 */
  }

  body {
    @apply bg-slate-50 text-slate-900 antialiased;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/90 backdrop-blur-md;
  }
}
```

---

## 9. Checklist Design

Avant de montrer la démo, vérifier :

- [ ] Fond app = slate-50 (pas blanc pur)
- [ ] Bulles Max = blanc avec ombre légère
- [ ] Bulles User = indigo-600
- [ ] Avatar Max = BrainCircuit en indigo
- [ ] Quick replies = style outline pill
- [ ] Input = rounded-full
- [ ] Widget respiration = effet glass
- [ ] Cercle = gradient indigo → violet
- [ ] Pas de couleurs "spa green"
- [ ] Fonctionne sur mobile
