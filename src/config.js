// URL de la page KanjiQuizz, lue depuis les fichiers `.env.*` à la racine :
// `.env.development` pointe vers le WebKanjiQuizz local, `.env.production`
// vers le domaine public. Vite n'expose au navigateur que les variables
// préfixées `VITE_`, et les remplace à la compilation.
//
// La valeur de production sert de repli : si un mode inconnu est lancé sans
// fichier `.env`, le site pointe vers le vrai produit plutôt que vers `undefined`.
export const KANJIQUIZZ_URL = import.meta.env.VITE_KANJIQUIZZ_URL || 'https://kanjiquizz.camille-lupo.fr'
