//																																													
ElizaBot.prototype.donner_reponse = function()
{
	var saisie_utilisateur = document.getElementById("user_input_text").value;
	var mot_clef = rechercher_mot_cle(saisie_utilisateur);
	laReponse = ElizaBot.prototype.rechercher_correspondance(mot_clef);
	var reponse = laReponse.ensemble_def;
	ElizaBot.prototype.afficher_reponse(reponse);
}