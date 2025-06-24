# AutoBudget – Analyse et catégorisation automatique des dépenses

> Projet réalisé dans le cadre de la formation CDA (Concepteur Développeur d'Applications) à O'clock

---

## 📋 Sommaire

- [🧾 Présentation](#-présentation)
- [📦 Technologies utilisées](#-technologies-utilisées)
- [⚙️ Installation](#️-installation)
- [🧪 Tests](#-tests)
- [🐳 Docker](#-docker)
- [⚙️ Intégration Continue (CI)](#-intégration-continue)

---

## 📜 Présentation

**AutoBudget** est une application front-end permettant :

* d’analyser des mouvements bancaires,
* de catégoriser automatiquement les transactions (Revenus, Logement, Transport, etc.),
* d’analyser des mouvements bancaires,
* de catégoriser automatiquement les transactions (Revenus, Logement, Transport, etc.),
* de prévoir ses dépenses récurrentes 
* de calculer son épargne mensuelle


Le projet a été conçu pour appliquer les bonnes pratiques de développement moderne :
**tests unitaires & e2e**, **intégration continue**, **build automatisé**, et **démarche DevOps**.

---

## 📦 Technologies utilisées

* **TypeScript** (React / Vite)
* **Vitest** pour les tests unitaires
* **Cypress** pour les tests end-to-end
* **GitHub Actions** pour le CI
* **Docker** (en option pour exécuter localement dans un environnement isolé)

---

## ⚙️ Installation

Cloner le projet :

```bash
git clone https://github.com/KellyMilot/AutoBudget-Kelly-Milot.git
cd AutoBudget-Kelly/projet/frontend
npm ci
```

---

## 🧪 Tests

* Lancer les **tests unitaires** avec couverture :

```bash
npm run coverage
```

* Lancer les **tests end-to-end** (nécessite que le frontend tourne sur [http://localhost:5173]) :

```bash
cd ../end2end
npx cypress run
```

---

## 🐳 Docker

Un fichier `docker-compose.yml` permet de lancer facilement l’application avec tous ses services :

```bash
docker compose up --build
```

Cela facilite la reproductibilité de l’environnement de développement et le lancement local.

---

## ⚙️ Intégration Continue (CI)

Un pipeline GitHub Actions est déclenché automatiquement à chaque push sur la branche `master`. Il effectue :

* l’installation des dépendances,
* l’exécution des tests unitaires,
* la génération de la couverture de tests,
* la création du build de production.

Cela garantit la stabilité du projet et la qualité du code avant mise en production.

Fichier CI : `.github/workflows/deploy.yml`

