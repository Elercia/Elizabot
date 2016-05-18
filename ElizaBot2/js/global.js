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
	this.derniers_mots_cles = [];
	this.derniers_messages = [];
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
			alert
			if(argv2.value.split(",").length > 1)
				this.ensemble_rep[num].changer_cle(argv2.value.split(","));
			else
				this.ensemble_rep[num].changer_cle([argv2.value]);
			
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
 * Permet d'afficher un message dans la textarea
 *
 * @method     afficher
 * @param      {string}  affichage     { le message à afficher }
 */
ElizaBot.prototype.afficher = function(affichage)
{
	document.getElementById("historique").value += "\n" + affichage;
	var textArea = document.getElementById('historique');
    textArea.scrollTop = textArea.scrollHeight;
}


/**
 * Permet d'afficher la reponse
 *
 * @method     afficher_reponse
 * @param      {string}  rep     { la reponse à afficher }
 */
ElizaBot.prototype.afficher_reponse = function(rep) {
	document.getElementById("historique").value += "\n[" + nomUser + "]" + espace1 + " : " + document.getElementById("user_input_text").value;
	document.getElementById("historique").value += "\n[SOLEN]" + espace + " : " + rep;
	document.getElementById("user_input_text").value = "";
	var textArea = document.getElementById('historique');
    textArea.scrollTop = textArea.scrollHeight;
}

var BASE = [new Reponse(["sameinput"], "Il me semble que vous vous répetez", []),
new Reponse(["comprend pas", "pas compris"], "incomprehension", []),
new Reponse(["exemple"], "exemple", []),
new Reponse(["bonjour","salut","wesh"], "comment vas tu?", []),
new Reponse(["merci","cimer","remercie"], "De rien c'est un plaisir de t'aider", []),
new Reponse(["vais bien"," vais tres bien"], "Je suis content pour toi !", []),
new Reponse(["vais mal","vais pas bien"], "Dommage pour toi", []),
new Reponse(["pute","conne","salope","petasse","con","putain","salop"], "Pas la peine d'être grossier !", []),
];

/**
 * { Objet de type ElizaBot permttant de faire fonctionner le programme }
 *
 * @type       {ElizaBot}
 */
var Eliza = new ElizaBot(BASE
);


    var nomUser; //Variable correspondant au nom de l'utilisateur
    var espace = "";//le nombre d'espace pour décaler le texte au même nombre d'espace que selui de Eliza
    var espace1 = "";        
    var nbespace;
    var nbespace1;
    
    
/**
 * .Fonction chargé au démarrage de la page Permmettant d'initialiser le nom de l'utilisateur 
 * (en fonction du localStorage)
 * 
 * .Génere un eventListener pour l'entrer d'un fichier dans la page HTML
 * 
 * .Initialise la conversation
 *
 * @method     chargement_page
 */ 
function chargement_page(){

    admin(false);
    
    //console.log("Bienvenue sur votre site d'apprentissage des Mathématiques !"); //Message d'accueil
    //console.log("Rendez-vous sur la section 'COMMENT ÇA MARCHE ?' pour comprendre le focntionnement"); //Message d'accueil
    
    var n = readCookie("usernameElizaBot");
    if(n == null)
    {
    	modifier_nom();
    }
    else
    {
    	modifier_nom(n);
    }
    var Edata = readCookie("ElizaData");

    if(Edata != null)
    {
    	if(Edata != [])
		{
			Eliza.modifier_bdd(Edata);
		}
    }
  
    
    
    //Pour ajouter des espaces à la première ligne au prénom de l'enseignant
    
	if((nomUser.length) > (5))
	{
	    document.getElementById("historique").value = "[SOLEN]" + espace + " : Bonjour";
	}
	
	else
	{
	    document.getElementById("historique").value = "[SOLEN] : Bonjour";
	}
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


/**
 * Affiche ou non le boutton des définition
 *
 * @method     admin
 * @param      {Boolean}  bool    { afficher ou non le menu déroulant pour la maintenance de la bdd}
 */
function admin(bool)
{
	document.getElementById("div_def_submit_voir").style.display = (bool)? "block": "none";
	document.getElementById("div_def").style.display = (bool)? "block": "none";
}


/**
 * Ne pas ce fier au nom
 * Elle utilise le LocalStorage pour stocker des information tel que la base de donné ou le nom de l'utilisateur
 *
 * @method     createCookie
 * @param      {String}  name    { le nom de la donné stockée }
 * @param      {String}  value   { la valeur de la donné stockée }
 * @param      {number}  days    { parameter_description }
 */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	//document.cookie = name+"="+value+expires+"; path=/";
	sessionStorage.setItem(name, value);
}

/**
 * Permet de récupérer la valeur d'une donné local stocké
 *
 * @method     readCookie
 * @param      {string}  name    { le nom de la donné local }
 * @return     {string}  { description_of_the_return_value }
 */
function readCookie(name) {
	/*var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	*/
	var data = sessionStorage.getItem(name);
	if(data)
		return data;

	return null;
}

/**
 * Supprime une donné local
 *
 * @method     eraseCookie
 * @param      {<type>}  name    { parameter_description }
 */
function eraseCookie(name) {
	createCookie(name,"",-1);
}

/**
 * Permet de modifier le nom de l'utilisateur à tous moment dans le pogramme
 *
 * @method     modifier_nom
 * @param      {(Function|string)}  value   { parameter_description }
 */
function modifier_nom(value)
{
	if(typeof value == "undefined")
	{
		var okLong = false; //Déclaration variable booléen
	    
		while(okLong === false) //Boucle tant que la variable est fausse
	    {
	        nomUser = prompt("Quel est votre nom ?"); //Demande à l'utilisateur son prénom
	        if (nomUser == null)
	        {
	        	nomUser="user";
	        }
	        if(nomUser.length < 1) //Si le prénom est vide
	        {
	            alert("Veuillez ne pas rentrez un prénom vide !"); //Message d'alerte
	            okLong = false; //Variable tjr à faux
	        }
	        else if(nomUser.length > 20) //Si le prénom est trop long
	        {
	            alert("Vous rentrez un prénom trop long !"); //Message d'alerte
	            okLong = false; //Variable tjr à faux
	        }
	        else //C'est ok
	        {
	            okLong = true //On met la variable à l'état vrai
	        }
	        nomUser = nomUser.toUpperCase(); //On met le prénom en majuscule
	    }
	}
	else
	{
		nomUser = value;
	}

	//Reinitialisation des espaces
	espace= "" ;
	espace1= "" ;
	
	createCookie("usernameElizaBot", nomUser, 7);
    if((nomUser.length) > (5)) //Si longueur nom supérieur à 5
    {
        nbespace = (nomUser.length) - (5); //On calcule différence
        for(var z = 0; z < nbespace; z++) //Boucle de longueur de la différence
        {
            espace += " "; //On ajoute des espaces
        }
    }
    else if((nomUser.length) < (5)) //Si longueur nom inférieur à 5
    {
        nbespace1 = 5 - (nomUser.length); //On calcule différence
        for(var y = 0; y < nbespace1; y++) //Boucle de longueur de la différence
        {
            espace1 += " "; //On ajoute des espaces
        }
    }
}
/*
var myEvent = window.attachEvent || window.addEventListener;

var chkevent = myEvent ? 'onbeforeunload' : 'beforeunload';

myEvent(chkevent, function() {
  	alert();
});
*/

/**
 * Fonction donnant à l'utilisateur un derniere avertissement avant la fermeture de l'onglet
 *
 * @method     onbeforeunload
 * @param      {event}  e       { evenement }
 * @return     {string}  { la phrase à afficher dans la boite de dialogue }
 */
window.onbeforeunload = function (e) {
	var e = e || window.event;

	// For IE and Firefox
	if (e) {
		createCookie("ElizaData",JSON.stringify(Eliza.ensemble_rep),"7");

		e.returnValue = 'Any string1';
		return "test";
	}else
	// For Safari
	return 'Veuillez vérifier que vous avez bien exporté votre fichier de configuration.\n'
	+'Dans le cas contraire votre configuration ne sera pas sauvegardée après la fermeture du navigateur';
};