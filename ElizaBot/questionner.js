/**
 * Méthode permettant de poser des questions à l'utilisateur 
 * en gérant la dépendance des connaissances
 *
 * @method     questionner_user
 * @param      {String}  mot_clef  L'ensemble des mots clés correspondant à la question à poser 
 * @return     {string}  Le string correspondant à la question à poser 
 */
ElizaBot.prototype.questionner_user = function(mot_clef)
{
	var resultat = "Tu ne comprend pas la notion de ";

	var rep1 = this.rechercher_correspondance(mot_clef);//on recherche la reponse correspondant au mot clé que l'on nous a donné

	if(!(rep1 instanceof Reponse))
	{
		resultat = "je ne peu malheureusement pas t'aider";
	}
	else
	{
		var dep = rep1.ensemble_dependance;//on récupère ces dépendances
		
		if(Array.isArray(dep))
			resultat += dep.join(" ou de ");
		else
			resultat += dep;
	}
	resultat += "?";
	/* TODO : modifier "this.dernier_mot_clef" pour que ça coïncide
	(Que ça ait un rapport avec ce qu'on vient de lui demander)*/
	this.dernier_mot_clef;

	return resultat;  
}