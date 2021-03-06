
/**
 * Fonction permettant de donner une réponse à l'utilisateur en fonction des mots clés récupérés
 *
 * @method     donner_reponse
 */
ElizaBot.prototype.donner_reponse = function()
{
	//récupere la saisie de l'utilisateur
	var saisie_utilisateur = document.getElementById("user_input_text").value;
	saisie_utilisateur=saisie_utilisateur.trim();
	//Si la saisie ne ressemble pas à une commande
	if (saisie_utilisateur[0] != "/")
	{
		//S'il y a bien quelque chose d'écrit
		if (saisie_utilisateur != "")
		{
			this.derniers_messages.push(saisie_utilisateur);

			//recherche le ou les mots clefs faisant partie de la BDD dans la phrase saisie
			var mot_cle = this.recherche_mot_cle(saisie_utilisateur);
			//Si les nouveaux mots cles sont identiques à ceux de la demande précédente 
			if ((saisie_utilisateur == this.derniers_messages[this.derniers_messages.length-2]) && (this.derniers_messages.length!=0))
			{
				mot_cle = ["sameinput"];
			}
			
			//Traitement des mots reçus pour n'avoir que les mots cles les plus long ex : "graphe/ graphe connexe"
			for (i in mot_cle)
			{
				for (j in mot_cle)
				{
					if ((String(mot_cle[j]).search(mot_cle[i]) != -1) && mot_cle[i] != mot_cle[j])
					{
						mot_cle.splice(i,1);
					}
				}
			}

			//Garde en mémoire si l'utilisateur n'a pas compris
			var incomprehension = false;
			//On garde la trace d'où est le mot cle qui signifie que l'utilisateur n'a pas compris ou qu'il veut un exemple
			var trace;
			//On retient en mémoire si l'utilisateur veut un exemple
			var exemple = false;

			for (i in mot_cle)
			{
				var correspondance = this.rechercher_correspondance(mot_cle[i]);
				if (String(correspondance.ensemble_def)=="incomprehension")
				{
					incomprehension = true;
					trace=i;
				}
				if (String(correspondance.ensemble_def)=="exemple")
				{
					exemple = true;
					trace=i;
				}

			}

			//S'il y a plus d'un mot clé, on demandera à l'utilisateur de quel notion il veut parler
			if ((mot_cle.length>1) && (incomprehension==false) && (exemple == false))
			{
				this.choisir_mot_cle(mot_cle);
			}
			else //Sinon on trouve la réponse pour lui envoyer
			{
				var affichage; //Le message qui sera affiché au final
				//Si on a repéré que l'utilisateur n'a pas compris
				if (incomprehension == true)
				{
					if (mot_cle.length>1)
					{
						mot_cle.splice(trace, 1);
						affichage = this.questionner_user(mot_cle);
					}
					else
					{
						affichage = this.questionner_user(this.derniers_mots_cles[this.derniers_mots_cles.length-1]);
					}
					this.afficher_reponse(affichage); //On affiche la question
				}
				//Si on a repéré que l'utilisateur veut un exemple
				else if (exemple == true)
				{
					//s'il demande un exemple, on lui donne un exemple du dernier mot clef utilisé
					if (mot_cle.length>1)
					{
						mot_cle.splice(trace, 1);
						affichage = this.donner_exemple(mot_cle);
					}
					else
					{
						affichage = this.donner_exemple(this.derniers_mots_cles[this.derniers_mots_cles.length-1]);
					}
					this.afficher_reponse(affichage); //on affiche l'exemple
				}
				else 
				{
					var reponse = this.rechercher_correspondance(mot_cle);
					if (typeof reponse!="undefined")
					{
						if (mot_cle != "sameinput")
						{

							this.derniers_mots_cles.push(mot_cle);
						}
						affichage = reponse.ensemble_def; //On récupère la définition de la réponse
						this.afficher_reponse(affichage); //on affiche la définition
					}
					else
					{
						this.pasTrouve();
					}
				}
			}
			
		}
	}
	// Si (saisie_utilisateur[0] == "/")
	else
	{
		if (saisie_utilisateur.endsWith("admin")) //Afficher l'interface administrateur
		{
			admin(true);
			this.afficher("# INFO # L'interface administrateur a bien été dévoilée");

		}
		else if (saisie_utilisateur.endsWith("adminoff")) //Cacher l'interface administrateur
		{
			admin(false);
			this.afficher("# INFO # L'interface administrateur à été cachée");
		}
		else if (saisie_utilisateur.indexOf("setname")!= -1) //Changer de pseudo
		{
			var pseudo = saisie_utilisateur.substr(9).trim() //On prendre le pseudo à partir du 9eme caractère

			if(pseudo.length < 1) //Si l'utilisateur n'a pas renseigné de pseudo
	        {
	            this.afficher("# INFO # Vous devez renseigner votre pseudo");
	        }
	        else if(pseudo.length > 20) //Si l'utilisateur a mit un pseudo de plus de 20 caractères
	        {
	        	this.afficher("# INFO # Veuillez choisir un pseudo de moins de 20 caractères");
	        }
	        else //Si le pseudo respecte les conditions
	        {
	            this.afficher("# INFO # Votre nom a bien été modifié");
				modifier_nom(pseudo);
				console.log(pseudo);
	        }	
		}
		else
		{
			this.afficher("# INFO # La commande n'a paxs été reconnue");
		}
		document.getElementById("user_input_text").value = "";
	}
}
/**
 * Fonction qui va demander à l'utilisateur de quel mot il veut parler
 * 
 * @param {Array} mot_cle { Le tableau des mots cles trouvés }
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
 * Est appelée si la fonction donner_reponse n'a pas trouvé de réponse
 *
 * @method     pasTrouve
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
