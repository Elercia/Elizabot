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

	var rep1 = this.rechercher_correspondance(mot_clef);//on recherche la reponse correspondant au mot clé que l'on nous a donné

	if(!(rep1 instanceof Reponse))
	{
		resultat = "je n'ai malheureusement pas de question à te poser";
	}
	else
	{
		var dep = rep1.ensemble_dependance;//on recupere ces dépendances
		resultat += dep.join(" ");
	}
	alert(resultat);
	return resultat;  
}