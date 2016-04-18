//fichier permettant à l'utilisateur de modifier la base de donnée à l'aide de fichier de configuration

ElizaBot.prototype.modifier_bdd = function(argv) {
	var data = argv.split("</data>");//on insole chaque reponse
	var result;
	var a=0;
	for(var a in data)//pour toute les lignes
	{
		//on enleve le <data> de deubt de chaque  
		data[a] = data[a].substring(8, data[a].length); // 5 = <data> -1
		data[a] = data[a].split("</motcle>");//on split pour connaitre les mots clé
		data[a][0] = data[a][0].substring(9, data[a][0].length);
		data[a][1] = data[a][1].split("</reponse>");
		data[a][1][0] = data[a][1][0].substring(11, data[a][1][0].length);
		data[a][1][1] = data[a][1][1].substring(7, data[a][1][1].length-7);
		
		result = [];
		result.push(data[a][0]);
		result.push(data[a][1][0]);
		result.push(data[a][1][1]);

		// Si les données du fichier sont des tableaux
		if((result[0].split(",")).length > 1)
		{
			result[0] = result[0].substring(1, result[0].length-1);
			result[0] = result[0].split(",");
		}
		if((result[1].split(",")).length > 1)
		{
			result[1] = result[1].substring(1, result[1].length-1);
			result[1] = result[1].split(",");
		}
		if((result[2].split(",")).length > 1)
		{
			result[2] = result[2].substring(1, result[2].length-1);
			result[2] = result[2].split(",");
		}

		Eliza.ajouter_reponse(new Reponse(result[0], result[1], result[2]));
	}
};