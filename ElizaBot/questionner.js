
/**
 * Fonction permettant de poser des questions à l'utilisateur 
 * en gérant la dépendance des connaissances
 *
 * @method     questionner_user
 * @param      {Array}  mot_clef  L'ensemble des mots clés correspondant à la question à poser 
 * @return     {string}  Le string correspondant à la question à poser 
 */
ElizaBot.prototype.questionner_user = function(mot_clef)
{
	var resultat = "Connaît tu la notion de ";

	var rep = this.rechercher_correspondance(mot_clef[0]);//on recherche la reponse correspondnat au mot clé que l'on nous a donné
	var dep = rep.ensemble_dependance;//on recupere ces dépendances

	rep = this.rechercher_correspondance(dep[0]);//on recherche une reponse par rapport aux dépendances.

	resultat+= rep.mots_cle[0];

	return resultat;  
}