# AutoBudget – Analyse et catégorisation automatique des dépenses

> Projet réalisé dans le cadre de la formation CDA (Concepteur Développeur d'Applications) à O'clock  
> Adapté et personnalisé par **Kelly Milot**

---

## 🧾 Présentation

**AutoBudget** est une application front-end permettant :

- d’analyser des mouvements bancaires,
- de catégoriser automatiquement les transactions (Revenus, Logement, Transport, etc.),
- d’afficher des graphiques dynamiques pour mieux suivre ses dépenses.

Le projet a été conçu pour appliquer les bonnes pratiques de développement moderne :  
**tests unitaires & e2e**, **intégration continue**, **build automatisé**, et **démarche DevOps**.

---

## 📦 Technologies utilisées

- **TypeScript** (React / Vite)
- **Vitest** pour les tests unitaires
- **Cypress** pour les tests end-to-end
- **GitHub Actions** pour le CI
- **Docker** (en option pour exécuter localement dans un environnement isolé)

---

## ⚙️ Installation

Cloner le projet :
```bash
git clone https://github.com/<ton-utilisateur>/AutoBudget-Kelly.git
cd AutoBudget-Kelly/projet/frontend
npm ci
