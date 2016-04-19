/**
*fonction permettant de generer une reponse
@method     reponse
@param      {Array}  mots_cle             { ensemble de mots clé de la reponse }
@param      {String}  ensemble_def         { ensemble de définitions pour expliquer la reponse }
@param      {Array}  ensemble_dependance  { ensemble de dependance de connaissance de la reponse }
*/
function Reponse(mots_cle, ensemble_def, ensemble_dependance)
{
	if(mots_cle === "undefined"  && ensemble_def === "undefined" && ensemble_dependance === "undefined")
	{
		alert("Mauvaise rentrée de définition");
	}
	this.mots_cle = mots_cle;
	this.ensemble_def = ensemble_def;
	this.ensemble_dependance = ensemble_dependance;
}

/**
 * { Methode permettant de changer un mots d'un reponse }
 *
 * @method     changer_cle
 * @param      {string}  argv    { le nouveau mot cle }
 */
Reponse.prototype.changer_cle = function(argv) {
	this.mots_cle = argv;
};

/**
 * { Methode permettant de changer des définitions }
 *
 * @method     changer_def
 * @param      {string}  argv    { la(les) nouvelle def }
 */
Reponse.prototype.changer_def = function(argv) {
	this.ensemble_def = argv;
};

/**
 * { Methode permettant de changer des dépendances }
 *
 * @method     changer_dep
 * @param      {String}  argv    { la (les) nouvelles dep }
 */
Reponse.prototype.changer_dep = function(argv) {
	this.ensemble_dependance = argv;
};


/**
 * Permet de créer la class ElizaBot
 *
 * @class
 * @param      {Array}  ens_rep  { Ensemble de reponse possible }
 */
function ElizaBot(ens_rep)
{
	this.ensemble_rep = ens_rep;
	this.dernier_mot_cle = "";
}


/**
 * Fonction permettant de rechercher une reponse grace a des mots cles
 *
 * @method     rechercher_correspondance
 * @param      {Array}    mots_cle  { Le ou les mots clé à utiliser }
 * @return     {Reponse}  {Une reponse correspondante aux mots clé }
 */
ElizaBot.prototype.rechercher_correspondance = function(mots_cle)
{
	for(var i in this.ensemble_rep)
	{
		for(var j in this.ensemble_rep[i].mots_cle)
		{
			if(mots_cle == this.ensemble_rep[i].mots_cle[j])
			{
				return this.ensemble_rep[i];
			}
		}
	}
};

/**
 * methode premettant d'ajouter une reponse a Eliza
 *
 * @method     ajouter_reponse
 * @param      {Reponse}  rep     { une reponse a ajouter }
 */
ElizaBot.prototype.ajouter_reponse = function(rep) {
	this.ensemble_rep.push(rep);
	var actu = document.getElementById("div_def_submit_voir");
	actu.click();
	actu.click();
};


/**
 * Fonction permettant de modifier une reponse en fonction de son index et d'un input html
 *
 * @method     modifier_reponse
 * @param      {string}  argv1   { l'index en string }
 * @param      {HTML input}  argv2   { le imput type text que l'on a modifié }
 */
ElizaBot.prototype.modifier_reponse = function(argv1, argv2) {
	if(typeof argv1 == "string")
	{
		var num = Number(argv1);
		if(argv2.id == "div_def_cle")
		{
			if(argv2.value.split(",").length > 1)
				this.ensemble_rep[num].changer_cle(argv2.value.split(","));
			else
				this.ensemble_rep[num].changer_cle(argv2.value);
		}
		else if(argv2.id == "div_def_def")
		{
			if(argv2.value.split(",").length > 1)
				this.ensemble_rep[num].changer_def(argv2.value.split(","));
			else
				this.ensemble_rep[num].changer_def(argv2.value);
		}
		else if(argv2.id == "div_def_dep")
		{
			if(argv2.value.split(",").length > 1)
				this.ensemble_rep[num].changer_dep(argv2.value.split(","));
			else
				this.ensemble_rep[num].changer_dep(argv2.value);
		}
		//this.ensemble_rep[num]=;
	}
};

/**
 * Permet d'afficher la reponse
 *
 * @method     afficher_reponse
 * @param      {string}  rep     { la reponse a afficher }
 */
ElizaBot.prototype.afficher_reponse = function(rep) {
	document.getElementById("historique").value += "\n[USER]  : " + document.getElementById("user_input_text").value;
	document.getElementById("historique").value += "\n[SOLEN] : " + rep;
	document.getElementById("user_input_text").value = "";
	var textArea = document.getElementById('historique');
    textArea.scrollTop = textArea.scrollHeight;
}


var Eliza = new ElizaBot([
new Reponse(["cle1", "cle11"], "reponse1", "graphe"),// déclaration objet reponse
new Reponse(["cle2", "cle22"], "reponse2", ["cle1", "cle11"]),
new Reponse(["cle3", "cle33"], "reponse3", ["cle2", "cle22"]),
new Reponse(["sameinput"], "Il me semble que vous vous répetez", []),
]);

/**
 * Fonction chargé au démarrage de la page
 *
 * @method     chargement_page
 */
function chargement_page(){
	document.getElementById("historique").value = "[SOLEN] : Bonjour";
	document.getElementById("user_input_text").value = "";

	//fonction initialisation export bdd
	var f = document.getElementById("file_user_export");
	f.onchange = function(){
		var file = f.files[0];
		fr = new FileReader();
		fr.onprogress = function(){
			console.log("Chargement du fichier de configuration");
		};

		fr.onerror = function(){
			console.log("Erreur du chargement du fichier de configuration");
		};

		fr.onload = function(){
			console.log("Chargement du fichier éxecuté");
			Eliza.modifier_bdd(fr.result);
		};

		fr.readAsText(file);
	};
}
