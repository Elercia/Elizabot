//fichier permettant à l'utilisateur de modifier la base de donnée à l'aide de fichier de configuration

ElizaBot.prototype.modifier_bdd = function(argv) {
	var lignes = argv.split("\n");//on insole chaque reponse
	var decoupe;
	for(var a in lignes)//pour toute les lignes
	{
		lignes_decoupe = a.split("#");//on isole les partie des différentes réponses
	}
	alert(lignes_decoupe);
	/*
	for(var partie in lignes_decoupe)//pour toute les partis dans toute les defs
	{
		alert(partie);//cela correspond aux mots clé, 	/!\ au []
	}
	*/
};