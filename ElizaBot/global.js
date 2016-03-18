//fichier des fonctions et des veriables globale qui seront utilisée par tous le monde
function init(){
	alert("Bienvenue sur le programme elizabot version 1.0");
}


/*
*foction permettant de générer une reponse
*mots_cle : correspond à l'ensemble des mots clées
ensemble_def : correspond à l'ensemble des définitions correspondante
ensemble_dependance : correspond au mots clé des autres reponse dont cette reponse est dépendante
*/
function reponse(mots_cle, ensemble_def, ensemble_dependance)
{
	if(mots_cle === "undefined" && ensemble_dependance === "undefined" && ensemble_def === "undefined")
	{
		alert("Mauvaise rentrée de définition");
	}
	this.mots_cle = mots_cle;
	this.ensemble_def = ensemble_def;
	this.ensemble_dependance = ensemble_dependance;
}
/**
*Fonction permettant de créer l'éliza bot en lui même 
* l'ensemble des reponse contenue par le bot
**/
function ElizaBot(ens_rep)
{
	this.ensemble_rep = ens_rep;
}


/**
* Fonction permettant de rechercher une réponse graca a des mots clé
* mots_cle : le ou les mots clé à chercher
**/
ElizaBot.prototype.rechercher_correspondance = function(mots_cle) {
	
};

/**
* method peréttant d'ajouter une reponse a Eliza
**/
ElizaBot.prototype.ajouter_reponse = function(rep) {
	if(typeof rep === "Object")
	{
		this.ensemble_rep.push(rep);
	}
};


/**
* Permet de modifier une reponse
**/
ElizaBot.prototype.modifier_rep = function(rep) {
	
};

/**
* On cré notre objet Eliza de type ElizaBot qui contient toute les reponses
**/
var Eliza = new ElizaBot([
new reponse([1,2], [1,2], [1,2]),//déclaration objet reponse
new reponse([1,2], [1,2], [1,2]),
new reponse([1,2], [1,2], [1,2])
]);
