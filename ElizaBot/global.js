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
 * Permet de créer la class ElizaBot
 *
 * @class
 * @param      {Array}  ens_rep  { Ensemble de reponse possible }
 */
function ElizaBot(ens_rep)
{
	this.ensemble_rep = ens_rep;
}


/**
 * Fonction permettant de rechercher une reponse grace a des mots cles
 *
 * @method     rechercher_correspondance
 * @param      {Array}    mots_cle  { Le ou les mots clé à utiliser }
 * @return     {Reponse}  {Une reponse correspondante aux mots clé }
 */
ElizaBot.prototype.rechercher_correspondance = function(mots_cle) {
	var reponse;
	for(var i in this.ensemble_rep)
	{
		for(var j in this.ensemble_rep[i].mot_cle)
		{
			if(mots_cle == this.ensemble_rep[i].mot_cle[j])
			{
				reponse += this.ensemble_rep[i];
			}
		}
	}
	return reponse;
};

/**
 * methode premettant d'ajouter une reponse a Eliza
 *
 * @method     ajouter_reponse
 * @param      {Reponse}  rep     { une reponse a ajouter }
 */
ElizaBot.prototype.ajouter_reponse = function(rep) {
	if(typeof rep === "Object")
	{
		this.ensemble_rep.push(rep);
	}
};


/**
 * Permet de modifier une reponse rep
 *
 * @method     modifier_rep
 * @param      {Reponse}  rep     { la reponse a modifier }
 */
ElizaBot.prototype.modifier_rep = function(rep) {
	
};

/**
 * Permet d'afficher la reponse
 *
 * @method     afficher_reponse
 * @param      {string}  rep     { la reponse a afficher }
 */
ElizaBot.prototype.afficher_reponse = function(rep) {
	document.getElementById("historique").value += "\n[USER]  : " + document.getElementById("user_input_text").value;
	document.getElementById("historique").value += "\n[ELIZA] : " + rep;
	document.getElementById("user_input_text").value = "";
	var textArea = document.getElementById('historique');
    textArea.scrollTop = textArea.scrollHeight;
}


/**
 * Fonction chargé au démarrage de la page
 *
 * @method     chargement_page
 */
function chargement_page(){
	document.getElementById("historique").value = "[ELIZA] : bonjour";
	document.getElementById("user_input_text").value = ""; 
}

var Eliza = new ElizaBot([
new Reponse(["clef1", "clef11"], "reponse1", "graphe"),//déclaration objet reponse
new Reponse(["clef2", "clef22"], "reponse2", ["clef1", "clef11"]),
new Reponse(["clef3", "clef33"], "reponse3", ["clef2", "clef22"])
]);
