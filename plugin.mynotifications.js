/**
 * My.Notifications
 *
 * Plugin Jquery de notification visuel d'événements. Simple et configurable
 *
 * LICENCE
 *
 * Vous êtes libre de :
 *
 * Partager : reproduire, distribuer et communiquer l'oeuvre
 * Remixer  : adapter l'oeuvre
 *
 * Selon les conditions suivantes :
 *
 * Attribution : Vous devez attribuer l'oeuvre de la manière indiquée par
 * l'auteur de l'oeuvre ou le titulaire des droits (mais pas d'une manière
 * qui suggérerait qu'ils vous soutiennent ou approuvent votre utilisation
 * de l'oeuvre).
 *
 * Pas d’Utilisation Commerciale : Vous n'avez pas le droit d'utiliser cette
 * oeuvre à des fins commerciales.
 *
 * Partage à l'Identique : Si vous modifiez, transformez ou adaptez cette
 * oeuvre, vous n'avez le droit de distribuer votre création que sous une
 * licence identique ou similaire à celle-ci.
 *
 * Remarque : A chaque réutilisation ou distribution de cette oeuvre, vous
 * devez faire apparaître clairement au public la licence selon laquelle elle
 * est mise à disposition. La meilleure manière de l'indiquer est un lien vers
 * cette page web.
 *
 * @category  Jquery
 * @package   Plugin
 * @copyright Copyright (c) 2005-2012 Inwebo (http://www.inwebo.net)
 * @author    Julien Hannotin
 * @license   http://creativecommons.org/licenses/by-nc-sa/2.0/fr/
 * @version   0112-2012
 * @link      git://github.com/inwebo/MyNotifications-Jquery-plugin.git
 */
;(function ($){
    $.Notification = function (title, text, options) {

            var defaults = {
                debug:true,
                selectors: {
                    i:"#notification-"
                },
                id:-1,
                life:-1,
                closeSelf:true,
                closeButton:true,
                style: {
                    main:"notification",
                    error:"error",
                    warning:"warning",
                    info:"info",
                    success:"success",
                    custom:"custom",
                    button:"close"
                }
            };

        var plugin = this;

        plugin.settings = {};

        var init = function() {
            plugin.settings = $.extend( {}, defaults, options );
            plugin.settings.name = 'MyItems';
            plugin.settings.version = '12-2012';
            plugin.settings.id = plugin.settings.selectors.i + plugin.settings.id;
            plugin.settings.selectors.button = plugin.settings.id + " a." + plugin.settings.style.button;
            plugin.title = title;
            plugin.text = text;
            plugin.cache = {
                container : $("<li></li>").attr( 'id', plugin.settings.id.substring( 1, plugin.settings.id.length ) ).attr('class', plugin.settings.style.main),
                header    : $("<h6></h6>").html( plugin.title ),
                body      : $("<p></p>").html( plugin.text ),
                button    : $("<a></a>").attr( 'class', plugin.settings.style.button ).attr('href', '#').attr('onClick', 'return false;').html('x')
            };
            plugin.cache.object = _Factory();
        };

        var _Factory = function() {
            _Title();
            return $( plugin.cache.container ).append(
                $( plugin.cache.header )
                ).append(
                $( plugin.cache.body )
                )
        };

        var _Title = function() {
            switch( plugin.title ) {
                case 'error' :
                    plugin.cache.container.addClass( plugin.settings.style.error );
                    break;
                case 'warning' :
                    plugin.cache.container.addClass( plugin.settings.style.warning );
                    break;
                case 'info' :
                    plugin.cache.container.addClass( plugin.settings.style.info );
                    break;
                case 'success' :
                    plugin.cache.container.addClass( plugin.settings.style.success );
                    break;
                default :
                    plugin.cache.container.addClass( plugin.settings.style.custom );
                    break;
            }

            if( plugin.settings.closeButton === true ) {
                $( plugin.cache.header ).append( $( plugin.cache.button ) );
            }
        };

        plugin.Remove = function() {
            $( plugin.settings.id ).remove();
        };

        plugin.ToString = function() {
            return plugin.cache.object[0].outerHTML;
        };

        plugin.To$ = function() {
            return plugin.cache.object;
        };

        plugin.Handler = function() {
            // Self close by click
            if( plugin.settings.closeSelf === true ) {
                $( plugin.settings.id ).bind( 'click',  function() {
                    plugin.Remove();
                } );
            }

            // Close by button
            if( plugin.settings.closeButton === true ) {
                $( plugin.settings.selectors.button ).bind( 'click', function() {
                    plugin.Remove();
                });
            }

            // Auto fade
            if(plugin.settings.life > 0) {
                $( plugin.settings.id ).delay( plugin.settings.life ).fadeOut( 'fast',function(){
                    plugin.Remove();
                });
            }
        };

        init();
    };

    $.myNotifications = function( options, notificationDefaults ) {

        // Arguments
        var defaults = {
            // Affiche dans la console de firebug le déroulement du processus
            debug: true,

            // selecteurs CSS
            selectors : {
                // Container principal
                container : "#notifications",
                // Current list
                list: "#list"
            },

            // Entier unique
            seed:-1
        };

       /*
        * Surcharge du constructeur par defaut d'une notification. Voir $.Notification
        */
        var notification = {
            debug:true,
            selectors: {
                i:"#notification-"
            },
            id:-1,
            life:-1,
            closeSelf:true,
            closeButton:true,
            style: {
                main:"notification",
                error:"error",
                warning:"warning",
                info:"info",
                success:"success",
                custom:"custom",
                button:"close"
            }

        };

        var plugin = this;

        plugin.settings = {};


       /*
        * Constructeur de l'objet
        */
        var init = function() {

            // Construction des attributs
            plugin.settings                   = $.extend({}, defaults, options);
            plugin.notification               = $.extend({}, notification, notificationDefaults);
            plugin.settings.name              = 'MyNotifications';
            plugin.settings.version           = '11-2012';
            plugin.settings.listItemSelector  = plugin.settings.listSelectorType + plugin.settings.listName + ' li';

            plugin.cache = {
                container:$( plugin.settings.selectors.container ),
                list:$(plugin.settings.selectors.list)
            };

            ( !_DomReady() ) ? _DomBuild() : null;

        };

       /*
        * Le container principal est il présent dans le DOM
        *
        * @return true si il est déjà présent sinon false
        *
        */
        var _DomReady = function() {
            if( plugin.cache.container.length === 0 )   {
                debug( 'Container ' + plugin.settings.selectors.container + ' doesn\'t exist' );
                return false;
            }
            else {
                debug( 'Container ' + plugin.settings.selectors.container + ' found' );
                return true;
            }
        };

       /*
        * Le container principal n'est pas présent, on l'ajoute au DOM
        * Cela sera le dernier noeud enfant du noeud body
        *
        * @return void
        */
        var _DomBuild = function() {
            var c = $( '<div></div>' ).attr( 'id' , plugin.settings.selectors.container.substring(1,plugin.settings.selectors.container.length) );
            var l = $(  '<ul></ul>' ).attr( 'id' , plugin.settings.selectors.list.substring(1,plugin.settings.selectors.list.length) );
            $('body').append( c.append( l ) );
            debug('Container id : '+ plugin.settings.selectors.container +' and list '+plugin.settings.selectors.list+' added to dom.');
        };

       /*
        * Ajout un objet jquery $.Notification dans la liste courante
        * Cela sera le dernier noeud enfant du noeud body
        *
        * @param obj L'objet Jquery à ajouter
        *
        * @return void
        */
        var _AddItem = function( obj ) {
            $( plugin.settings.selectors.list ).append( obj );
        };

       /*
        * Affiche une notification ayant comme titre title et avec comme
        * text text
        *
        * @param title  Un type prédéfini parmi okay | warning | error | info
        *               peut être défini par l'utilisateur, la notifications
        *               sera un message
        *
        * @param text  Le text à afficher
        *
        * @param notificationDefaults object Objet de configuration de notifications
        *                                     voir le constructeur $.Notification
        *
        * @return void
        *
	*/
        plugin.Notification = function ( title, text, notificationDefaults ) {
            plugin.settings.seed++;
            var settings = $.extend({}, plugin.notification, notificationDefaults,{id:plugin.settings.seed});
            var item = new $.Notification(title, text, settings);
            _AddItem( item.To$() );
            $( plugin.settings.selectors.list ).append( item.To$() );
            item.Handler();
        };

       /*
	* Alias de Notice('error', text)
        */
        plugin.E = function( text ) {
            plugin.Notification( 'error' , text);
        };

       /*
        * Alias de Notice('warning', text)
        */
        plugin.W = function( text ) {
            plugin.Notification('warning' , text);
        };

       /*
	* Alias de Notice('info', text)
        */
        plugin.I = function( text ) {
            plugin.Notification( 'info' , text);
        };

       /*
	* Alias de Notice('success', text)
	*/
        plugin.S = function( text ) {
            plugin.Notification( 'success' , text);
        };

       /*
	* Debug
	*/
        var debug = function( text ) {
            // Verifie que ce n'est pas internet explorer
            if( (window['console'] !== undefined) ){
                console.info( text );
            }
        };

        // Construteur
        init();

    }

})(jQuery);
