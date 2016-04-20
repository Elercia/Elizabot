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

		//Si c'est le même mot cle que précedemment
		if (((String(mot_cle) === String(this.derniers_mots_cles[this.derniers_mots_cles.length-1])) && (this.derniers_mots_cles.length!=0)))
		{
			mot_cle = ["sameinput"];
		}

		if (mot_cle.length>1) //S'il y a plus d'un mot cle, on demandera à l'utilisateur de quel notion il veut parler
		{
			this.choisir_mot_cle(mot_cle);
		}
		else //Sinon on trouve la réponse pour lui envoyer
		{
			//on recherche la reponse (motclef/ensembledef/ensembledependance) correspondant au mot clef
			var reponse = this.rechercher_correspondance(mot_cle);
			
			if (typeof reponse!="undefined")	//si la reponse existe
			{

				/*Si le mot clef fait parti du champ lexical de l'incompréhension et a 
				donc pour definition "incompréhension" */
				if (reponse.ensemble_def == "incomprehension")
				{
					//S'il n'a pas compris la notion, on va lui demander s'il connait les dépendances des notions 
					var affichage = this.questionner_user(this.derniers_mots_cles);
				}
				else if (reponse.ensemble_def == "exemple")
				{
					//s'il demande un exemple, on lui donne un exemple du dernier mot clef utilisé
					var affichage = this.donner_exemple(this.derniers_mots_cles);
				}
				else
				{
					if (mot_cle != "sameinput")
					{
						this.derniers_mots_cles.push(mot_cle);
					}
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

/**
*Est appellée si la fonction donner_reponse n'a pas trouvé de réponse
*/
ElizaBot.prototype.pasTrouve = function()
{
	// 0 < proba < 1
	proba = Math.random();
	//Choisi au hasard une réponse
	if (proba<0.25)
	{
		this.afficher_reponse("Je ne comprend pas");
	}
	else if (proba<0.5)
	{
		this.afficher_reponse("Vous pouvez détailler?");
	}
	else if (proba<0.75)
	{
		this.afficher_reponse("Pardon?");
	}
	else
	{
		this.afficher_reponse("Dis m'en plus");
	}
}

/**
*Compare deux tableaux
*@param {Array} tab1 le premier tableau à comparer
*@param {Array} tab2 le deuxième tableau à comparer
*@return {boolean} retour true si les deux tableaux sont égaux, false sinon
*/
function comparer_tableau(tab1, tab2)
{
	var retour = true;
	if (tab1.length!=tab2.length)
	{
		retour = false;
	}
	else
	{
		for (var i = 0; i<tab1.length; i++)
		{
			if (tab1[i] != tab2[i])
			{
				retour=false;
				return retour;
			}
		}
	}
	return retour;
}