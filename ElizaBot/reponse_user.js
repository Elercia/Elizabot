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
			this.choisir_mot_cle(mot_cle);
		}
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
				this.afficher_reponse("Je ne comprend pas");
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
	//Comme ça le bot ne repete pas plusieurs fois la même chose
	var tableauDejaDit = [];
	var trouve;
	//On parcourt tous les mot clef
	for (i in mot_cle)
	{
		trouve=false;
		for (j in tableauDejaDit)
		{
			//Si le motClef à déjà été cité
			if (mot_cle[i]==tableauDejaDit[j])
			{
				trouve=true;
			}
		}
		//Si ce n'est pas le dernier mot
		if ((i<mot_cle.length-1) && (trouve==false))
		{
			console.log(mot_cle.length + "i :" + i);
			affichage += mot_cle[i]+", ou de ";
			tableauDejaDit.push(mot_cle[i])
		}
		else if ((i==mot_cle.length-1) && (trouve==false))
		{
			affichage += mot_cle[i]+"?";
		}
	}

	// S'il reste un ", ou de" à la fin de l'affichage, on le supprime
	if (affichage.substring(affichage.length-8,affichage.length-1)==", ou de")
	{
		affichage=affichage.slice(0,affichage.length-8);
		affichage+= "?";
	}
	this.afficher_reponse(affichage);
}
