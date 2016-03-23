//																																													
ElizaBot.prototype.donner_reponse = function()
{
	if (document.getElementById("user_input_text").value != "")
	{
		var saisie_utilisateur = document.getElementById("user_input_text").value;
		var mot_clef = rechercher_mot_cle(saisie_utilisateur);
		var laReponse = this.rechercher_correspondance(mot_clef);
		if (typeof reponse!="undefined") {
			var reponse = laReponse.ensemble_def;
			this.afficher_reponse(reponse);
		}
		else
		{
			this.afficher_reponse("Je ne comprend pas");
		}
	}
}