-- 4.1 Affichez les numéros (numéroclient) et les noms (nomclient) des clients 
-- qui ont commandé un repas avec un prix compris entre 20 dollars et 40 dollars

SELECT c.idClient, c.nomClient
FROM TP4_Livraison.Client c
INNER JOIN TP4_Livraison.Abonner abo 
    ON c.idClient = abo.idClient
INNER JOIN TP4_Livraison.PlanRepas plan 
    ON abo.idPlan = plan.idPlanRepas
WHERE plan.prix >= 20 AND plan.prix <= 40

-- 4.2 Afficher les numéros des plans repas (numéroplan) qui ne proviennent pas  
-- du fournisseur au nom de 'QC Transport'

SELECT plan.idPlanRepas
FROM TP4_Livraison.Client c
FULL OUTER JOIN TP4_Livraison.Abonner abo
    ON c.idClient = abo.idClient
FULL OUTER JOIN TP4_Livraison.PlanRepas plan
    on plan.idPlanRepas = abo.idPlan
FULL OUTER JOIN TP4_Livraison.Fournisseur fourn 
    ON plan.idFournisseur = fourn.idFournisseur
WHERE fourn.nomFournisseur <> 'QC Transport'

-- 4.3 Affichez la liste des numéros des plans Famille (numéroplan) dont la 
-- catégorie du plan repas correspond à 'cétogène'.

SELECT DISTINCT idPlanRepas
FROM Famille   -- vérifier s'il faudrait pas faire un join sur planrepas
WHERE categorie = 'cétogène'

-- 4.4 Affichez le nombre de fournisseurs n’ayant pas de nom dans leur 
-- dossier (la valeur de nomfournisseur est NULL).

SELECT COUNT(*)
FROM Fournisseur
WHERE nomFournisseur = NULL 

-- 4.5 Affichez les noms des fournisseurs (nomfournisseur) ayant fait des 
-- livraisons de plans repas dont le montant est supérieur aux livraisons 
-- faites par le fournisseur dont le nom est 'AB Transport

SELECT nomFournisseur
FROM Fournisseur fourn
INNER JOIN PlanRepas plan
    ON fourn.idFournisseur = plan.idFournisseur
WHERE SUM(plan.prix) > (
    SELECT SUM(plan.prix) 
    FROM Fournisseur fourn
    INNER JOIN PlanRepas plan
        ON fourn.idFournisseur = plan.idFournisseur
    WHERE nomFournisseur <> 'AB Transport'
)

-- 4.6 Affichez les adresses (adressefournisseur) et le montant total des 
-- prix des livraisons de plans repas des fournisseurs ayant les deux plus 
-- larges montants de livraison sur la plateforme.

SELECT fourn.adresseFournisseur, SUM(plan.prix) as totalLivraisons
FROM PlanRepas plan
INNER JOIN Fournisseur fourn
    ON plan.idFournisseur = fourn.idFournisseur
ORDER BY totalLivraisons DESC
LIMIT 2

-- 4.7 Affichez le nombre de kit repas qui n’ont jamais été réservés chez les fournisseurs.


