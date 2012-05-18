# MyNotifications

Plugin Jquery de notification visuel d'événements.

## Démonstration

[Démonstration en ligne](http://www.inwebo.net/demo/plugin.mynotifications)

## Require

* Jquery 1.6.4+
* Le plug in (plugin.mynotifications.js)
* Eventuellement une feuille de style
* Navigateur moderne

> Si des erreurs surviennent il faut impérativement instancier l'objet avec le paramètre debug à false

Pour inclure Jquery le plus simple est d'utiliser Google Librairies et de copier/coller ces lignes dans votre header

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>

## Objectifs

* Simple d'utilisation
* Indépendant d'un balisage particulier
* Compatible navigateurs modernes

Il sert à afficher dans le navigateur des messages pour l'utilisateur. Nous avons le même fonctionnement avec nos différents OS. Ainsi que sur un réseau social très connu.

## Principe

Le plugin recherche un *container* dans le DOM de la page courante. Si il n'est pas présent il est ajouté. Les messages seront contenus 
dans une *liste non ordonnée* ajoutée automatiquement. Chaque *item* de cette liste sera une notification pour l'utilisateur, de durée d'affichage,
d'apparence configurable. Les items peuvent être supprimés lors d'un clic sur ceux ci, automatiquement ou au clic sur un bouton de fermeture.

### Container

Le container est une simple div avec un id html unique. Il sera le dernier noeud de body

    <div id="container"></div>

### Liste

Est dans le container, toutes les notifications seront ajoutées dans ce noeud.

    <ul></ul>

#### Item

Est un item de liste avec un id unique et une classe CSS.

    <li id="message-0" style="display: block;" class="my-notifications-error">
        <h6>Error<a class="my-notifications-close" href="#" onclick="return false;">x</a></h6>
        <p>Message d'erreur.</p>
    </li>

### Constructeur

L'objet MyNotifications peut s'instancier de deux manières.

L'instanciation par défauts

    // Constructeur par défauts
    var myplugin = new $.myNotifications();

Lors de l'instanciation de l'objet le *debug* est activé, le container principal se nomme *container*,
le selecteur CSS est un *#*, son id CSS complet est donc *#container*, les notifications s'affichent pour une
durée de *3000* ms. Le prefix des id CSS est *message*. les notifications se ferment lors d'un click elles et elles possédent également un bouton de fermeture.

Les class CSS par défaut des notifications est :

* Pour les erreurs : *my-notifications-error*, la forme compléte est *.my-notifications-error*
* Pour les avertissements : *my-notifications-warning*, la forme compléte est *.my-notifications-warning*
* Pour les informations : *my-notifications-info*, la forme compléte est *.my-notifications-info*
* Pour les validations : *my-notifications-okay*, la forme compléte est *.my-notifications-okay*
* Du bouton de fermeture des notifications : *my-notifications-close*, la forme compléte est *.my-notifications-close*

L'instanciation avec paramètres

    // Constructeur avec paramètres (tableau)
    var myplugin = new $.myNotifications({
                                          'delay':-1,
                                          'containerId': 'truc-a-dire'
                                        });
    									 
Même chose que l'exemple précédént mais les notifications s'affichent perpetuellement, et le *container* principal se nomme désormais *truc-a-dire*

## Plugin

### Attributs
 <table border="1" bordercolor="" style="background-color:" width="" cellpadding="3" cellspacing="3">
	<tr>
		<td>Arguments</td>
		<td>Values</td>
		<td>Description</td>
	</tr>
	<tr>
		<td rowspan="2">`debug`</td>
		<td>*True*</td>
		<td>Affiche le déroulement du process dans la console de debug.</td>
	</tr>
	<tr>
		<td>False</td>
		<td>Silencieux</td>
	</tr>
	<tr>
		<td>`Container name`</td>
		<td>string</td>
		<td>Nom du container principal</td>
	</tr>
	<tr>
		<td>`containerSelectorType`</td>
		<td>string</td>
		<td>Un selecteur CSS, `#`, `.`</td>
	</tr>
	<tr>
		<td>`containerSelector`</td>
		<td>string</td>
		<td>Selecteur CSS</td>
	</tr>
	<tr>
		<td>`listName`</td>
		<td>string</td>
		<td>Selecteur type</td>
	</tr>
	<tr>
		<td>`listSelectorType`</td>
		<td>string</td>
		<td>Un selecteur CSS, `#`, `.`</td>
	</tr>
	<tr>
		<td>`itemDisplayDelay`</td>
		<td>int</td>
		<td>Durée d'affichage des notifications en ms.Un entier négatif donne un affichage perpetuel</td>
	</tr>
	<tr>
		<td>`itemDisplayDelay`</td>
		<td>int</td>
		<td>Nombre ajouts de notifications total dans la liste</td>
	</tr>
	<tr>
		<td>`itemName`</td>
		<td>string</td>
		<td>Préfixe des notifications</td>
	</tr>
	<tr>
		<td>`itemCount`</td>
		<td>int</td>
		<td>Nombre de notifications présentes dans le DOM</td>
	</tr>
	<tr>
		<td rowspan="2">`itemCloseByClick`</td>
		<td>*True*</td>
		<td>Les notifications se ferment lors d'un click.</td>
	</tr>
	<tr>
		<td>False</td>
		<td>Les notifications ne se ferment pas lors d'un click.</td>
	</tr>
	<tr>
		<td rowspan="2">`itemCloseByButton`</td>
		<td>*True*</td>
		<td>Bouton de fermeture ajouté à chaques notifications.</td>
	</tr>
	<tr>
		<td>False</td>
		<td>Pas de bouton</td>
	</tr>
	<tr>
		<td>`itemClassError`</td>
		<td>string</td>
		<td>Class CSS des notifications d erreurs</td>
	</tr>
	<tr>
		<td>`itemClassWarning`</td>
		<td>string</td>
		<td>Class CSS des notifications avertissement</td>
	</tr>
	<tr>
		<td>`itemClassInfo`</td>
		<td>string</td>
		<td>Class CSS des notifications d information</td>
	</tr>
	<tr>
		<td>`itemClassOkay`</td>
		<td>string</td>
		<td>Class CSS des notifications validation</td>
	</tr>
	<tr>
		<td>`itemClassClose`</td>
		<td>string</td>
		<td>Class CSS du bouton fermeture de notification</td>
	</tr>
</table>
	
### Méthodes privées

* `init()` : Construit les attributs manquants de l'objet, s'assure de la présence dans le DOM
           du container
* `buildContainerSelector()` : Construit le selecteur CSS du container principal.
                             eg : #container                             
* `buildChildsAttributs()` : Mets à jour l'index des notifications. Elles conservent comme ceci un nom
                           unique
* `containerIsSet()` : Le container est il présent
* `buildContainer()` : Si le container n'est pas présent, on l'ajoute au DOM
* `listenerClose()` : Ecouteur d'évenement sur les notifications

### Méthodes publics

Le plugin posséde une méthode principale :

* `msg('title', 'text')` : title est le type de notifications info | warning | error | okay
                         Si title n'est pas un des 4 choix précédents, la notification sera de type
                         custom, ayant pour titre de fenêtre title et comme texte `text`.


#### Alias

Les méthodes suivantes sont simplement des alias de *msg()* le paramétre de *title* est déjà assigné.

* `msgError('text')`
* `msgWarning('text')`
* `msgOkay('text')`
* `msgInfo('text')`

## Dépôt Gihub

Fork me i'm famous

    git clone git://github.com/inwebo/MyNotifications-Jquery-plugin.git