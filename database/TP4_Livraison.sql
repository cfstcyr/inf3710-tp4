-- SCHEMA CREATION ==================================================

DROP SCHEMA IF EXISTS TP4_Livraison CASCADE;
CREATE SCHEMA TP4_Livraison;

CREATE TABLE IF NOT EXISTS TP4_Livraison.Client (
    idClient SERIAL NOT NULL,
    nomClient VARCHAR(255) NOT NULL,
    prenomClient VARCHAR(255) NOT NULL,
    adresseCourrielClient VARCHAR(255) NOT NULL,
    rueClient VARCHAR(255) NOT NULL,
    villeClient VARCHAR(255) NOT NULL,
    codePostalClient VARCHAR(255) NOT NULL,

    PRIMARY KEY (idClient)
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Telephone (
    numeroTelephone VARCHAR(20) NOT NULL,
    idClient SERIAL NOT NULL,
    
    PRIMARY KEY (numeroTelephone, idClient),
    FOREIGN KEY (idClient) REFERENCES TP4_Livraison.Client ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Fournisseur (
    idfournisseur SERIAL NOT NULL PRIMARY KEY,
    nomFournisseur VARCHAR(255),
    adresseFournisseur VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.PlanRepas (
    idplanrepas SERIAL NOT NULL PRIMARY KEY,
    categorie VARCHAR(255) NOT NULL,
    frequence INT NOT NULL,
    nbrpersonnes INT NOT NULL,
    nbrcalories INT NOT NULL,
    prix DECIMAL(7, 2) NOT NULL,
    idfournisseur SERIAL NOT NULL,

    FOREIGN KEY (idfournisseur) REFERENCES TP4_Livraison.Fournisseur ON UPDATE CASCADE ON DELETE CASCADE,
    
    CONSTRAINT frequence CHECK (frequence > 0),
    CONSTRAINT nbrpersonnes CHECK (nbrpersonnes > 0),
    CONSTRAINT nbrcalories CHECK (nbrcalories > 0),
    CONSTRAINT prix CHECK (prix > 0)
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Abonner (
    idClient SERIAL NOT NULL,
    idPlan SERIAL NOT NULL,
    duree INT NOT NULL,

    PRIMARY KEY (idClient, idPlan),
    FOREIGN KEY (idClient) REFERENCES TP4_Livraison.Client ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idPlan) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Famille (
    idplanrepas SERIAL NOT NULL PRIMARY KEY,

    FOREIGN KEY (idplanrepas) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Rapide (
    idplanrepas SERIAL NOT NULL PRIMARY KEY,
    tempsDePreparation INT NOT NULL,

    FOREIGN KEY (idplanrepas) REFERENCES TP4_Livraison.Famille ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Facile (
    idplanrepas SERIAL NOT NULL PRIMARY KEY,
    nbIngredients INT NOT NULL,

    FOREIGN KEY (idplanrepas) REFERENCES TP4_Livraison.Famille ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Vegetarien (
    idplanrepas SERIAL NOT NULL PRIMARY KEY,
    typeDeRepas VARCHAR(255) NOT NULL,

    FOREIGN KEY (idplanrepas) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Pescetarien (
    idplanrepas SERIAL NOT NULL PRIMARY KEY,
    typePoisson VARCHAR(255) NOT NULL,

    FOREIGN KEY (idplanrepas) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.KitRepas (
    idKitRepas SERIAL NOT NULL PRIMARY KEY,
    "description" VARCHAR(255) NOT NULL,
    idplanrepas SERIAL NOT NULL, 

    FOREIGN KEY (idplanrepas) REFERENCES TP4_Livraison.PlanRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Image (
    idImage SERIAL NOT NULL PRIMARY KEY,
    donnes VARCHAR(2048) NOT NULL,
    idKitRepas SERIAL NOT NULL,

    FOREIGN KEY (idKitRepas) REFERENCES TP4_Livraison.KitRepas ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Ingredient (
    idIngredient SERIAL NOT NULL PRIMARY KEY,
    nomIngredient VARCHAR(255) NOT NULL,
    paysIngredient VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Contenir (
    idKitRepas SERIAL NOT NULL,
    idIngredient SERIAL NOT NULL,
    
    PRIMARY KEY (idKitRepas, idIngredient),
    FOREIGN KEY (idKitRepas) REFERENCES TP4_Livraison.KitRepas ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idIngredient) REFERENCES TP4_Livraison.Ingredient ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TP4_Livraison.Etape (
    idKitRepas SERIAL NOT NULL,
    numeroEtape VARCHAR(255),
    descriptionEtape VARCHAR(255) NOT NULL,
    dureeEtape SMALLINT NOT NULL,
    idKitRepasPartieDe SERIAL,
    
    PRIMARY KEY (idKitRepas, numeroEtape),
    FOREIGN KEY (idKitRepas) REFERENCES TP4_Livraison.KitRepas ON UPDATE CASCADE ON DELETE CASCADE
);


-- POPULATE ==================================================

--                                       id  nom         prenom      courriel                rue                     ville           codepostal
INSERT INTO TP4_Livraison.Client VALUES (1, 'St-Cyr',   'Charles',  'charles@email.com',    'Rue Edouard-Monpetit', 'Montréal',     'A1A 1A1');
INSERT INTO TP4_Livraison.Client VALUES (2, 'Brosseau', 'Mathilde', 'mathilde@email.com',   'Rue de Marseille',     'Montréal',     'B2B 2B2');
INSERT INTO TP4_Livraison.Client VALUES (3, 'Noël',     'Père',     'papa@noel.com',       'Rue Principale',       'Pôle Nord',    'H0H 0H0');
INSERT INTO TP4_Livraison.Client VALUES (5, 'Dupuis',   'Isabelle', 'isabelle@email.com',   'Rue de Marseille',     'Montréal',     'B2B 2B2');

--                                           numero           client
INSERT INTO TP4_Livraison.Telephone VALUES ('(000) 111-2222', 1);
INSERT INTO TP4_Livraison.Telephone VALUES ('(333) 444-5555', 2);
INSERT INTO TP4_Livraison.Telephone VALUES ('(605) 313-4000', 3);

--                                            id  nom                    adresse
INSERT INTO TP4_Livraison.Fournisseur VALUES (1, 'IGA Nourriture Inc',  'Rue de IGA');
INSERT INTO TP4_Livraison.Fournisseur VALUES (2, 'RICARDO',             'Rue de Richard');
INSERT INTO TP4_Livraison.Fournisseur VALUES (3, 'QC Transport',        'Rue du Québec');
INSERT INTO TP4_Livraison.Fournisseur VALUES (4, 'Benjamin',            'Rue de Marseille Montréal B2B 2B2');
INSERT INTO TP4_Livraison.Fournisseur VALUES (5, NULL,                  'Rue qui existe pas');
INSERT INTO TP4_Livraison.Fournisseur VALUES (6, 'AB Transport',        'Rue C');
INSERT INTO TP4_Livraison.Fournisseur VALUES (7, 'Big money guy',       'Rue Boogie');

--                                          id  categorie    fréquence  personnes   calories    prix    fournisseur
INSERT INTO TP4_Livraison.PlanRepas VALUES (1, 'Végétarien', 2,         2,          150,        22.00,  1);
INSERT INTO TP4_Livraison.PlanRepas VALUES (2, 'Indien',     1,         4,          400,        44.50,  1);
INSERT INTO TP4_Livraison.PlanRepas VALUES (3, 'Mijoteuse',  1,         4,          350,        52.50,  2);
INSERT INTO TP4_Livraison.PlanRepas VALUES (4, 'Noël',       2,         2,          350,        26.25,  2);
INSERT INTO TP4_Livraison.PlanRepas VALUES (5, 'Cétogène',   3,         3,          80,         17.75,  2);
INSERT INTO TP4_Livraison.PlanRepas VALUES (6, 'Fanceyoyy',  8,         80,         12000,      15000,  7);
INSERT INTO TP4_Livraison.PlanRepas VALUES (7, 'Moneymoney', 5,         12,         22000,      9000,   7);
INSERT INTO TP4_Livraison.PlanRepas VALUES (8, 'Cétogène',   1,         8,          1110,       12500,  1);

--                                        id  
INSERT INTO TP4_Livraison.Famille VALUES (5);
INSERT INTO TP4_Livraison.Famille VALUES (8);

--                                        client    plan   duree
INSERT INTO TP4_Livraison.Abonner VALUES (1,        2,     4);
INSERT INTO TP4_Livraison.Abonner VALUES (1,        1,     4);
INSERT INTO TP4_Livraison.Abonner VALUES (1,        4,     4);
INSERT INTO TP4_Livraison.Abonner VALUES (2,        1,     2);
INSERT INTO TP4_Livraison.Abonner VALUES (2,        5,     15);
INSERT INTO TP4_Livraison.Abonner VALUES (3,        4,     51); -- juste 51 semaines parce qu'à Noël il mange des biscuits

--                                         id  nom                                          planrepas
INSERT INTO TP4_Livraison.KitRepas VALUES (1, 'Tofu général tao',                           1); 
INSERT INTO TP4_Livraison.KitRepas VALUES (2, 'Tacos végé au fromage fondant',              1);
INSERT INTO TP4_Livraison.KitRepas VALUES (3, 'Poulet au beurre',                           2);
INSERT INTO TP4_Livraison.KitRepas VALUES (4, 'Brochette de porc Yakiton',                  3);
INSERT INTO TP4_Livraison.KitRepas VALUES (5, 'Bavette au beurre à léchalotte française',   4);
INSERT INTO TP4_Livraison.KitRepas VALUES (6, 'Filets de turbot meunière',                  4);

--                                      id  data                                                                            kitrepas
INSERT INTO TP4_Livraison.Image VALUES (1, 'https://images.ricardocuisine.com/services/recipes/5675.jpg',                   1);
INSERT INTO TP4_Livraison.Image VALUES (2, 'https://images.ricardocuisine.com/services/recipes/8049.jpg',                   2);
INSERT INTO TP4_Livraison.Image VALUES (3, 'https://images.ricardocuisine.com/services/recipes/8504154235512b996db487.jpg', 3);
INSERT INTO TP4_Livraison.Image VALUES (4, 'https://images.ricardocuisine.com/services/recipes/5788.jpg',                   4);
INSERT INTO TP4_Livraison.Image VALUES (5, 'https://images.ricardocuisine.com/services/recipes/8914.jpg',                   5);
INSERT INTO TP4_Livraison.Image VALUES (6, 'https://images.ricardocuisine.com/services/recipes/8286-portrait.jpg',          6);

--                                          id  nom                              pays
INSERT INTO TP4_Livraison.Ingredient VALUES(1, 'Tofu ferme',                    'Chine');
INSERT INTO TP4_Livraison.Ingredient VALUES(2, 'Gingembre',                     'Chine');
INSERT INTO TP4_Livraison.Ingredient VALUES(3, 'Gousse dail',                   'Inde');
INSERT INTO TP4_Livraison.Ingredient VALUES(4, 'Poivrons verts',                'Canada');
INSERT INTO TP4_Livraison.Ingredient VALUES(5, 'Tortillas',                     'Mexique');
INSERT INTO TP4_Livraison.Ingredient VALUES(6, 'Cheddar doux',                  'États-Unis');
INSERT INTO TP4_Livraison.Ingredient VALUES(7, 'Crème sure',                    'Espagne');
INSERT INTO TP4_Livraison.Ingredient VALUES(8, 'Jalapeño',                      'Mexique');
INSERT INTO TP4_Livraison.Ingredient VALUES(9, 'Quartiers de lime',             'Colombie');
INSERT INTO TP4_Livraison.Ingredient VALUES(10, 'Haut de cuisses de poulet',    'États-Unis');
INSERT INTO TP4_Livraison.Ingredient VALUES(11, 'Marinade au yogourt épicé',    'Canada');
INSERT INTO TP4_Livraison.Ingredient VALUES(12, 'Sauce au beurre',              'Inde');
INSERT INTO TP4_Livraison.Ingredient VALUES(13, 'Filet de porc',                'Canada');
INSERT INTO TP4_Livraison.Ingredient VALUES(14, 'Oignons verts',                'Chine');
INSERT INTO TP4_Livraison.Ingredient VALUES(15, 'Tranches de flanc de porc',    'Espagne');
INSERT INTO TP4_Livraison.Ingredient VALUES(16, 'Graines de sésame',            'Japon');
INSERT INTO TP4_Livraison.Ingredient VALUES(17, 'Échalote française',           'Canada');
INSERT INTO TP4_Livraison.Ingredient VALUES(18, 'Bavette de boeuf',             'États-Unis');
INSERT INTO TP4_Livraison.Ingredient VALUES(19, 'Beurre',                       'Canada');
INSERT INTO TP4_Livraison.Ingredient VALUES(20, 'Filets de turbot',             'Chine');
INSERT INTO TP4_Livraison.Ingredient VALUES(21, 'Farine tout usage',            'Allemagne');
INSERT INTO TP4_Livraison.Ingredient VALUES(22, 'Citron',                       'Colombie');

--                                        kitrepas  ingredient
INSERT INTO TP4_Livraison.Contenir VALUES(1,        1);
INSERT INTO TP4_Livraison.Contenir VALUES(1,        2);
INSERT INTO TP4_Livraison.Contenir VALUES(1,        3);
INSERT INTO TP4_Livraison.Contenir VALUES(2,        4);
INSERT INTO TP4_Livraison.Contenir VALUES(2,        5);
INSERT INTO TP4_Livraison.Contenir VALUES(2,        6);
INSERT INTO TP4_Livraison.Contenir VALUES(2,        7);
INSERT INTO TP4_Livraison.Contenir VALUES(2,        8);
INSERT INTO TP4_Livraison.Contenir VALUES(2,        9);
INSERT INTO TP4_Livraison.Contenir VALUES(3,        10);
INSERT INTO TP4_Livraison.Contenir VALUES(3,        11);
INSERT INTO TP4_Livraison.Contenir VALUES(3,        12);
INSERT INTO TP4_Livraison.Contenir VALUES(4,        13);
INSERT INTO TP4_Livraison.Contenir VALUES(4,        14);
INSERT INTO TP4_Livraison.Contenir VALUES(4,        15);
INSERT INTO TP4_Livraison.Contenir VALUES(4,        16);
INSERT INTO TP4_Livraison.Contenir VALUES(4,        9);
INSERT INTO TP4_Livraison.Contenir VALUES(5,        17);
INSERT INTO TP4_Livraison.Contenir VALUES(5,        18);
INSERT INTO TP4_Livraison.Contenir VALUES(5,        19);
INSERT INTO TP4_Livraison.Contenir VALUES(6,        19);
INSERT INTO TP4_Livraison.Contenir VALUES(6,        21);
INSERT INTO TP4_Livraison.Contenir VALUES(6,        20);
INSERT INTO TP4_Livraison.Contenir VALUES(6,        22);