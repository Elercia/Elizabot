/**
*Fonction qui permet de donner des réponse lorsque l'utilisateur envoie son message
*/											
ElizaBot.prototype.donner_reponse = function()
{
	if (document.getElementById("user_input_text").value != "")
	{
		var saisie_utilisateur = document.getElementById("user_input_text").value;
		var mot_clef = rechercher_mot_cle(saisie_utilisateur);
		var reponse = this.rechercher_correspondance(mot_clef);
		if (typeof reponse!="undefined") {
			if (reponse.ensemble_def == "incomprehension") //
			{
				var affichage = questionner(mot_clef);
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