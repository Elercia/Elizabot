/*Fonction recherche mot clé et gérage de la casse*/
function rechercher_mot_cle(saisie_utilisateur)
{
	var retour = [];
	var temp;
	
	saisie_utilisateur = saisie_utilisateur.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," "); //On enlève les signes de ponctuation pour ne pas bloquer un mot clé	
	temp = saisie_utilisateur.toLowerCase(); //On met l'ensemble de la phrase en miniscule pour être en concordance avec la base
	
	//Mise en forme de la chaîne de caractère en tableau / mots
	
	
    
	return saisie_utilisateur;
}
