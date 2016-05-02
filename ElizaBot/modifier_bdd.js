//fichier permettant à l'utilisateur de modifier la base de donnée à l'aide de fichier de configuration

/**
 * { Fonction permettant de modifier la bdd grâce à un fichier de configuration}
 *
 * @method     modifier_bdd
 * @param      {string}  argv    { le contenue du fichier chargé }
 */
ElizaBot.prototype.modifier_bdd = function(argv) {
	this.ensemble_rep = [];
	var tmp = JSON.parse(argv);
	for(var i in tmp)
	{
		this.ajouter_reponse(new Reponse(tmp[i].mots_cle, tmp[i].ensemble_def, tmp[i].ensemble_dependance));
	}
	//this.ensemble_rep = JSON.parse(argv);
};

/**
 * { Permet de télécharger le fichier de configuration }
 *
 * @method     exporter_bdd
 */
ElizaBot.prototype.exporter_bdd = function()
{
	var result;
	result = JSON.stringify(this.ensemble_rep);
	//Création d'un objet LIEN
    var bu = document.getElementById('down');
    bu.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(result));


    //Simulation d'un click
    bu.click();
}

/**
 * { Permet à l'utilisateur d'ajouter des réponses ou de les modifier visuellement }
 *
 * @method     maintenance_bdd
 */
ElizaBot.prototype.maintenance_bdd = function() {
	var d = document.getElementById("div_def_submit_voir");
	var div = document.getElementById("div_def");
	var affiche = "Afficher définitions", cacher = "Cacher définitions";
	if(d.value == affiche)
	{
		d.value = cacher;
		var text_cle, text_def, text_dep, a, supprimer;
		var div2;
		for(var i = 8; i< this.ensemble_rep.length ; i++)
		{
			div2 = document.createElement("div");
			div2.setAttribute("class", "div_def_para");
			div2.setAttribute("name", ""+i);

			a = this.ensemble_rep[i];

			text_cle = document.createElement("input");
			text_cle.setAttribute("type", "text");
			text_cle.setAttribute("name", ""+i);
			text_cle.setAttribute("id", "div_def_cle");
			text_cle.setAttribute("value", a.mots_cle);
			text_cle.setAttribute("onkeyup", "Eliza.modifier_reponse(this.name, this)");

			text_def = document.createElement("input");
			text_cle.setAttribute("type", "text");
			text_def.setAttribute("name", ""+i);
			text_def.setAttribute("id", "div_def_def");
			text_def.setAttribute("value", a.ensemble_def);
			text_def.setAttribute("onkeyup", "Eliza.modifier_reponse(this.name, this)");

			text_dep = document.createElement("input");
			text_dep.setAttribute("type", "text");
			text_dep.setAttribute("name", ""+i);
			text_dep.setAttribute("id", "div_def_dep");
			text_dep.setAttribute("value", a.ensemble_dependance);
			text_dep.setAttribute("onkeyup", "Eliza.modifier_reponse(this.name, this)");

			supprimer = document.createElement("input");
			supprimer.setAttribute("type", "submit");
			supprimer.setAttribute("id", "div_def_supprimer");
			supprimer.setAttribute("value", "Supprimer");
			supprimer.setAttribute("name", ""+i);
			supprimer.setAttribute("onclick", "Eliza.supprimer_def(this.name)");

			div2.appendChild(text_cle);
			div2.appendChild(text_def);
			div2.appendChild(text_dep);
			div2.appendChild(supprimer);
			div.appendChild(div2);
		}
		var bout = document.createElement("input");
		bout.setAttribute("type", "submit");
		bout.setAttribute("value", "Nouvelle définition");
		bout.setAttribute("onclick", "Eliza.ajouter_reponse(new Reponse('','',''))");
		div.appendChild(bout);
	}
	else if(d.value = cacher)
	{
		//on clear le div
		d.value = affiche;
		div.innerHTML = "";
	}
};

ElizaBot.prototype.supprimer_def = function(argv){
	this.ensemble_rep.splice(Number(argv), 1);
	var actu = document.getElementById("div_def_submit_voir");
	actu.click();
	actu.click();
};
