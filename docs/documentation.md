# 📚 Documentation Technique – DAvis

## 🎨 Présentation

**DAvis** est un générateur de devis conçu pour les directeurs artistiques, qu’ils soient freelances ou en agence. L’application permet de créer facilement des devis professionnels, personnalisables et exportables en PDF, avec un accent fort sur l’accessibilité (conformité WCAG 2.1 AAA) et la performance.

---

## 🛠️ Stack technique

| Composant        | Technologie utilisée        |
|------------------|-----------------------------|
| Front-end        | HTML | CSS | Javascript       |
| Accessibilité    | HTML5, ARIA, normes WCAG AAA|
| Déploiement      | Github Pages, CI/CD (Github Pages)       |

---

## ⚙️ Installation

### Prérequis
- Un navigateur moderne (Chrome, Firefox, Edge…)

- Un éditeur de code (VS Code recommandé)

- Live Server (optionnel, pour un rechargement à chaud)

### Étapes d’installation

1. Clôner le repos
```bash
git clone https://github.com/mariapetersen/DAVIS.git
cd davis
```

2. Structure du projet 
```text
davis/ 
    ├── index.html # Page d’accueil principale
    ├── pages/ # Pages HTML secondaires (ex : about.html, contact.html) 
    ├── fonts/ # Polices personnalisées du projet (WOFF, WOFF2, etc.) 
    ├── css/ 
        └── styles.css # Feuille de styles principale 
    ├── js/  
        └── main.js # Logique JavaScript principale 
    ├── assets/ # Ressources diverses : images, icônes, SVG, etc.
```


3. Ouvrir le projet dans le navigateur

Option 1 : double-cliquer sur index.html
- Cela ouvrira l’application localement sans serveur.

Option 2 : utiliser Live Server (recommandé).
- Ouvre le dossier davis dans VS Code

- Clique droit sur index.html → "Open with Live Server"

### Remarque
Aucune base de données ni compilation n’est nécessaire

Toutes les données sont gérées côté client (dans localStorage ou objets JS)

Le projet peut être déployé tel quel sur GitHub Pages, Netlify ou tout hébergement statique

## ♿ Accessibilité (WCAG 2.2 AAA)
DAvis est développé selon les standards WCAG 2.2 niveau AAA, garantissant un accès équitable à tous les utilisateurs, y compris ceux en situation de handicap.

Principes respectés :
Perceptible : contrastes > 7:1, textes alternatifs, contenus clairs et structurés

Utilisable : navigation 100 % clavier, composants interactifs accessibles, indicateurs de focus visibles

Compréhensible : interfaces cohérentes, langage simple, prévention des erreurs renforcée

Robuste : compatibilité éprouvée avec les technologies d’assistance (NVDA, VoiceOver, etc.)

Mise en œuvre :
HTML sémantique (header, main, section, nav, figure, etc.)

Attributs ARIA conformes aux rôles et aux usages

Tests réguliers avec Lighthouse et VoiceOver

## 🚀 Déploiement continu avec GitHub Actions
Le projet DAvis utilise GitHub Actions pour automatiser l’optimisation et le déploiement sur GitHub Pages à chaque push sur la branche main.

### 📦 Objectifs du workflow CI/CD
- Optimisation maximale des ressources front-end (HTML/CSS/JS/images/fonts)

- Création d’un dossier dist/ propre et allégé

- Déploiement automatisé vers GitHub Pages

### ✅ Avantages
- Performance : ressources ultra-légères pour un chargement rapide, même sur mobile

- Accessibilité préservée : les optimisations n’affectent pas la lisibilité des contenus ni la compatibilité avec les lecteurs d’écran

- Zéro configuration serveur : entièrement statique, simple à héberger

- Automatisé : aucun effort manuel après push

