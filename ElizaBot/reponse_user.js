/**
*Fonction qui permet de donner des réponse lorsque l'utilisateur envoie son message
*/											
ElizaBot.prototype.donner_reponse = function()
{
	if (document.getElementById("user_input_text").value != "")
	{
		//récupere la saisie de l'utilisateur
		var saisie_utilisateur = document.getElementById("user_input_text").value;

		//recherche le ou les mots clefs faisant partie de la BDD dans la phrase saisie
		var mot_cle = this.recherche_mot_cle(saisie_utilisateur);

		if (mot_cle.length>1)
		{
			mot_cle = choisir_mot_clef(mot_cle);
		}
		//on recherche la reponse (motclef/ensembledef/ensembledependance) correspondant au mot clef
		var reponse = this.rechercher_correspondance(mot_cle);
		
		//si la reponse existe
		if (typeof reponse!="undefined") {
			/*Si le mot clef fait parti du champ lexical de l'incompréhension et a 
			donc pour definition "incompréhension" */
			if (reponse.ensemble_def == "incomprehension")
			{
				var affichage = questionner(mot_cle);
			}
			else
			{
				var affichage = reponse.ensemble_def;
			}
			this.afficher_reponse(affichage);
		}
		else
		{
			this.afficher_reponse("Je ne comprend pas");
		}
	}
}

function choisir_mot_cle(mot_cle)
{
	var affichage = "Je ne comprend pas de quoi vous vouliez parler, voulez vous parler de ";
	while(mot_cle.length>1)
	{
		for (i in mot_cle)
		{
			if (i<mot_cle.length)
			{
				affichage += mot_cle[i]+", ou de ";
			}
			else
			{
				affichage += mot_cle[i];
			}
		}
		this.afficher_reponse(affichage);
	}
	
	return mot_cle;
}
