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
		//S'il y a plus d'un mot cle, on demandera à l'utilisateur de quel notion il veut parler
		if (mot_cle.length>1)
		{
			this.choisir_mot_cle(mot_cle);
		}
		//Sinon on trouve la réponse pour lui envoyer
		else
		{
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
				this.pasTrouve();
			}
		}
		
	}
}
/**
 * Fonction qui va demander à l'utilisateur de quel mot il veut parler
 * @param {Array} mot_cle Le tableau des mots cles trouvés
 */
ElizaBot.prototype.choisir_mot_cle = function(mot_cle)
{
 	var affichage = "Je ne comprend pas de quoi vous vouliez parler, voulez vous parler de ";
	//On parcourt tous les mot clef
	for (i in mot_cle)
	{
		//Si ce n'est pas le dernier mot
		if (i<mot_cle.length-1)
		{
			affichage += mot_cle[i]+", ou de ";
		}
		else if (i==mot_cle.length-1)
		{
			affichage += mot_cle[i]+"?";
		}
	}
	this.afficher_reponse(affichage);
}

ElizaBot.prototype.pasTrouve = function(mot_cle)
{
	if (Math.random()<0.25)
	{
		this.afficher_reponse("Je ne comprend pas");
	}
	else if (Math.random()<0.5)
	{
		this.afficher_reponse("Vous pouvez détailler?");
	}
	else if (Math.random()<0.75)
	{
		this.afficher_reponse("Pardon?");
	}
	else
	{
		this.afficher_reponse("Dis m'en plus");
	}
}