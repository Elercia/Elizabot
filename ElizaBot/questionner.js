/**
 * Méthode permettant de poser des questions à l'utilisateur 
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
		if(typeof dep[0] === "Array")
			resultat = dep[0].join(" ");
		else
			resultat += dep.join(" ");
	}
	/* TODO : modifier "this.dernier_mot_clef" pour que ça coïncide
	(Que ça ait un rapport avec ce qu'on vien de lui demander)
	*/
	return resultat;  
}