# Entités

## 1.Post

| Rôle                                       | Nom     | Type         |
| ------------------------------------------ | ------- | ------------ |
| Code post                                  | id      | numérique    |
| Titre                                      | title   | alphabétique |
| Contenu du post au format markdown         | content | alphabétique |
| Date de création/ de dernière modification | \_date  | Date         |

## 2.Image du post

| Rôle                   | Nom        | Type         |
| ---------------------- | ---------- | ------------ |
| Code post              | concert_id | numérique    |
| Description de l'image | alt        | alphabétique |
| Chemin vers l'image    | path       | alphabétique |

## 3.Date de concert

| Rôle                                      | Nom         | Type         |
| ----------------------------------------- | ----------- | ------------ |
| Code concert                              | id          | numérique    |
| Date du concert                           | date        | Date         |
| Lieu du concert                           | place       | alphabétique |
| Description du concert au format markdown | description | alphabétique |

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
