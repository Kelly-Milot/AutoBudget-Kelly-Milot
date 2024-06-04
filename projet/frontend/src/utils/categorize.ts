const LOGEMENT_MIN = 350;
const LOGEMENT_MAX = 1300;
const LOGEMENT_WORDS = ['loyer', 'credit', 'logement', 'remboursement'];

const REVENUS_MIN = 1300;

const ALIMENTATION_WORDS = ['alim', 'producteur', 'carrefour', 'auchan', 'leclerc', 'intermarche', 'lidl', 'aldi', 'casino', 'super u', 'franprix', 'monoprix'];


export const cleanLabel = (label: string): string => {
  // Remove accents and convert to lowercase
  label = label.toLowerCase();
  label = label.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  return label;
}

export const isWordInLabel = (label: string, words: string[]): boolean => {
  if ( !label ) return false;
  const cleanedLabel = cleanLabel(label);

  let found = false;
  for (const word of words) {
    if (label.includes(word) || cleanedLabel.includes(word)) {
      found = true;
      break;
    }
  }
  return !!found;
}


export const isLogement = (amount: number, label: string=''): boolean => {
  // Si le mouvement est négatif, et que le libellé contient "Logement/Loyer/Crédit/Remboursement" ou que le montant est compris entre 350€ à 1300€, alors la catégorie sera "Logement"

  amount = amount * -1;

  if ( amount <= LOGEMENT_MIN || LOGEMENT_MAX <= amount ) return false;
  if ( !label ) return false;

  return isWordInLabel(label, LOGEMENT_WORDS);
}

export const isRevenus = (amount: number): boolean => {
  // Si le mouvement est positif et supérieur à 1300€, alors la catégorie sera "Revenus"
  return amount > REVENUS_MIN;
}

export const isAlimentation = (amount: number, label: string=''): boolean => {
  // Si le mouvement est négatif, et que le libellé contient "Alim/Producteur" ou un nom de chaîne de supermarché, alors la catégorie sera "Alimentation"
  if ( amount >= 0 ) return false;
  return isWordInLabel(label, ALIMENTATION_WORDS);
}


export const getCategory = (amount: number, label: string=''): string => {
  if ( isLogement(amount, label) ) return 'Logement';
  if ( isRevenus(amount) ) return 'Revenus';
  if ( isAlimentation(amount, label) ) return 'Alimentation';
  return 'Non implémenté 😉';
}