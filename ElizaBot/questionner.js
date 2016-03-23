
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

	var rep1 = this.rechercher_correspondance(mot_clef);//on recherche la reponse correspondnat au mot clé que l'on nous a donné
	alert(typeof rep1);
	if(!(rep1 instanceof Reponse))
	{
		resultat = "je n'ai malheureusement pas de question à te poser";
	}
	var dep = rep1.ensemble_dependance;//on recupere ces dépendances

	var rep2 = this.rechercher_correspondance(dep[0]);//on recherche une reponse par rapport aux dépendances.
	if(!(rep2 instanceof Reponse))
	{
		resultat = "je n'ai malheureusement pas de question à te poser";
	}
	resultat += rep2.mots_cle[0];
	alert(resultat);
	return resultat;  
}