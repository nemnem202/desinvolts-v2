# Contraintes des formulaires

## 1.Post

| Donnée                        | Obligatoire | Minimum | Maximum         | Génération automatique |
| ----------------------------- | ----------- | ------- | --------------- | ---------------------- |
| Code post                     | V           |         |                 | V                      |
| Titre                         | X           |         | 200 caractères  | V                      |
| Contenu du post               | V           | 0       | 8000 caractères | X                      |
| Date de dernière modification | V           |         |                 | V                      |

## 2.Image du post

| Donnée                 | Obligatoire | Minimum      | Maximum        | Génération automatique |
| ---------------------- | ----------- | ------------ | -------------- | ---------------------- |
| Code post              | V           |              |                | V                      |
| Description de l'image | V           | 1 caractètre | 200 caractères | X                      |
| Chemin vers l'image    | V           |              |                | V                      |

## 3.Date de concert

| Donnée                                    | Obligatoire | Minimum | Maximum         | Génération automatique |
| ----------------------------------------- | ----------- | ------- | --------------- | ---------------------- |
| Code post                                 | V           |         |                 | V                      |
| Date du concert                           | V           |         |                 | X                      |
| Lieu du concert                           | X           | 0       | 100 caractères  | X                      |
| Description du concert au format markdown | X           | 0       | 8000 caractères | X                      |

## 4.Image du concert

| Rôle                   | Nom        | Type         |
| ---------------------- | ---------- | ------------ |
| Code concert           | concert_id | numérique    |
| Description de l'image | alt        | alphabétique |
| Chemin vers l'image    | path       | alphabétique |

## 5.Contact infos

| Rôle                | Nom         | Type         |
| ------------------- | ----------- | ------------ |
| email               | email       | alphabétique |
| numéro de téléphone | phone       | alphabétique |
| url deezer          | deezer      | alphabétique |
| url spotify         | spotify     | alphabétique |
| url bandlab         | bandlab     | alphabétique |
| url apple music     | apple music | alphabétique |
| url bandlab         | deezer      | alphabétique |

## 6.Compte administrateur

| Rôle           | Nom  | Type           |
| -------------- | ---- | -------------- |
| identifiant    | id   | alphanumérique |
| password hashé | hash | alphanumérique |

## 7.Objet de présentation

| Rôle                         | Nom     | Type         |
| ---------------------------- | ------- | ------------ |
| Code d'objet de présentation | id      | numérique    |
| Contenu                      | content | alphabétique |

## 8.Image de présentation

| Rôle                         | Nom        | Type         |
| ---------------------------- | ---------- | ------------ |
| Code d'objet de présentation | concert_id | numérique    |
| Description de l'image       | alt        | alphabétique |
| Chemin vers l'image          | path       | alphabétique |
