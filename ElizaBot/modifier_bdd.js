//fichier permettant à l'utilisateur de modifier la base de donnée à l'aide de fichier de configuration
	
ElizaBot.prototype.modifier_bdd = function(argv) {
	var data = argv.split("</data>");//on insole chaque reponse
	var tmp1;
	for(var a in data)//pour toute les lignes
	{
		//on enleve le <data> de deubt de chaque  
		data[a] = data[a].substring(6, data[a].length); // 6 = <data>
		data[a] = data[a].split("</motcle>");
		data[a][0] = data[a][0].substring(8, data[a][0].length);
		data[a][1] = data[a][1].split("</reponse>");
		data[a][1][0] = data[a][1][0].substring(9, data[a][1][0].length);
		data[a][1][1] = data[a][1][1].substring(5, data[a][1][1].lenght-5);
		tmp1 = data[a];
		data[a] = [];
		data[a].push(tmp1[0]);
		data[a].push(tmp1[0][0][0]);
		data[a].push(tmp1[0][0][1]);
		alert(data[a]);
	}


};