/**
 * @method     donner_exemple
 * @param      {String}  mot_clef  { Les mots clés correspondant aux mots clé à donner }
 * @return     {string}  { Réponse incomplete }
 */
ElizaBot.prototype.donner_exemple = function(mot_clef)
{
	var ex = Eliza.rechercher_correspondance(mot_clef).exemple;
	var img = document.createElement("img");
	img.setAttribute("alt", "Un magnifique exemeple");
	img.setAttribute("src", "exemple/" + ex);
	img.setAttribute("id", "div_exemple_img");

	var div_ex = document.getElementById('div_exemple');
	div_ex.innerHTML = "";
	div_ex.appendChild(img);

	return "Tu peut regarder cet éxemple pour mieux comprendre cette définition";
}