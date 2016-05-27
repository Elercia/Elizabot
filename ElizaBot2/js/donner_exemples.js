/**
 * @method     donner_exemple
 * @param      {String}  mot_cle  { Les mots clés correspondant aux mots clé à donner }
 * @return     {string}  { Réponse incomplete }
 */
ElizaBot.prototype.donner_exemple = function(mot_cle)
{
	var erreur = "Je n'ai malheureusement pas d'exemple à te proposer", 
		bon = "Tu peut regarder cet exemple pour mieux comprendre cette définition", result="";

	var rep = Eliza.rechercher_correspondance(mot_cle);
	var img, div_ex, desc, src;

	if(rep != undefined)
	{
		var ex = rep.exemple;
		var erreur_msg = "Erreur lors du chargement de l'exemple.\nVeuillez verifier si vous avez bien l'image dans le dossier exemple.\nSinon veuillez contacter la personne vous ayant donné les configurations pour lui demander de completer sa configurations";
		if(ex != "undefined" || ex.length == 1)
		{
			try{
				img = document.createElement("img");
				img.setAttribute("alt", "L'exemple que vous chercher n'a pas été trouvé !");
				//img.setAttribute("src", "exemple/" + ex);
				src = ((ex.indexOf("http://") != -1) || (ex.indexOf("https://") != -1))? (ex) : ("exemple/" + ex);
				
				img.setAttribute("src", src);
				img.setAttribute("id", "div_exemple_img");
				img.onerror = function(){
					//return new Error("Erreur du chargement de l'image");
					alert(erreur_msg);
				};

				desc = document.createElement("p");
				desc.innerHTML="Exemple de : "+mot_cle;

				div_ex = document.getElementById('div_exemple');
				div_ex.innerHTML = "";
				div_ex.appendChild(img);
				var test_img = document.getElementById("div_exemple_img");
				div_ex.appendChild(desc);

				// if(!test_img.complete){
				// 	throw new Error("Erreur du chargement de l'image");// TODO
				// }
				result = bon;
				this.derniers_mots_cles.push(mot_cle);
			}catch(e){
				alert(erreur_msg);
				console.log(e.message);
				result = "Je n'ai pas pu charger l'exemple. Tu peut néanmoins continuer à discuter avec moi !";
			}
		}
		else
			result = erreur;
	}
	else
		result = erreur;
	return result;
}