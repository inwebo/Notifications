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

    /**
     *
     * @param id string
     * @param options {}
     * @constructor
     */
    $.Notifications = function( id , options ) {

        /**
         *
         * @type {{debug: boolean, container: (*|HTMLElement), forceDomDelete: boolean}}
         */
        var defaults = {
            /**
             * Show info into console ?
             */
            debug:true,
            /**
             * Main container
             */
            container:$('<div></div>'),
            /**
             * If true only hide notification, else remove from DOM
             */
            forceDomDelete:false,
            style: {
                container:null,
                list:null
            }
        };

        var plugin = this;

        plugin.settings = {};

        var init = function() {
            plugin.settings = $.extend( {}, defaults, options );
            plugin.id               = id;
            plugin.settings.name    = 'Notifications';
            plugin.settings.version = '12-2013';
            plugin.cache = {
                container:plugin.settings.container.attr('id',plugin.id),
                list:$('<ul></ul>')
            };

            // Pas de container
            if( !($(document.body).has('#'+id).length > 0) ) {
                $('body').append( plugin.cache.container );
            }
            // update cache
            else {
                plugin.cache.container = $('#'+id);
            }

            // Pas de liste
            if( !($('#'+id).has('ul').length > 0 ) ) {
                $(plugin.cache.container).append( plugin.cache.list );
            }
            // update cache
            else {
                plugin.cache.list = $('#'+id).find('ul');
            }

            if( plugin.settings.style.container !== null ) {
                plugin.cache.container.addClass( plugin.settings.style.container );
            }
            if( plugin.settings.style.list !== null ) {
                plugin.cache.list.addClass( plugin.settings.style.list );
            }

        };

        /**
         * Total notifications in list
         * @returns {int}
         */
        plugin.length = function() {
            return plugin.cache.list.find('li').length;
        }

        var debug = function( text ) {
            // Verifie que ce n'est pas internet explorer
            if( (window['console'] !== undefined && plugin.settings.debug) ){
                console.info( text );
            }
        };

        /**
         * Add one notification to the list
         * @param obj New list item notification
         */
        var push = function(obj){
            $( plugin.cache.list ).append( obj.To$ );
        };

        /**
         * Add notification with data-type attribut equal 'info'
         * @param title string Title notification
         * @param content string Content notification
         * @param options obj Notification configuration
         */
        plugin.info = function(title,content,options){
            var options = $.extend( {}, options );
            options.type = 'info';
            push( new Notification(title,content,options) );
        };

        /**
         * Add notification with data-type attribut equal 'warning'
         * @param title string Title notification
         * @param content string Content notification
         * @param options obj Notification configuration
         */
        plugin.warning = function(title,content,options){
            var options = $.extend( {}, options );
            options.type = 'warning';
            push( new Notification(title,content,options) );
        };

        /**
         * Add notification with data-type attribut equal 'valid'
         * @param title string Title notification
         * @param content string Content notification
         * @param options obj Notification configuration
         */
        plugin.valid = function(title,content,options){
            var options = $.extend( {}, options );
            options.type = 'valid';
            push( new Notification(title,content,options) );
        };

        /**
         * Add notification with data-type attribut equal 'error'
         * @param title string Title notification
         * @param content string Content notification
         * @param options obj Notification configuration
         */
        plugin.error = function(title,content,options){
            var options = $.extend( {}, options );
            options.type = 'error';
            push( new Notification(title,content,options) );
        };

        /**
         * Add notification with data-type attribut equal 'options.type'
         * @param title string Title notification
         * @param content string Content notification
         * @param options obj Notification configuration
         */
        plugin.custom = function(title,content,options){
            var options = $.extend( {}, options );
            push( new Notification(title,content,options) );
        };

        /**
         *
         * @param title string Title notification
         * @param content string Content notification
         * @param options obj Notification configuration
         * @constructor
         */
        var Notification = function(title, content, options) {

            /**
             * Default configuration
             * @type {{life: number, closeSelf: boolean, closeButton: boolean, type: string}}
             */
            var defaults = {
                /*
                    Notification's life in milliseconds
                    less than 0 perpetual
                 */
                life:-1,
                /*
                    Will notification close by a click on it
                 */
                closeSelf:true,
                /*
                    Will notification has a close button
                 */
                closeButton:true,
                /*
                    Close button html content
                 */
                closeButtonContent:'x',
                /*
                    Notification data-type attribut
                 */
                type:'custom',
                style:null
            };

            var plugin = this;

            plugin.settings = {};

            var init = function() {
                plugin.title = title;
                plugin.content = content;
                plugin.settings = $.extend( {}, defaults, options );
                plugin.cache = {
                    container : $("<li></li>").attr('data-type', plugin.settings.type),
                    header    : $("<h6></h6>").html( plugin.title ),
                    content   : $("<p></p>").html( plugin.content ),
                    button    : $("<a></a>").attr('href', '#').attr('onClick', 'return false;').html(plugin.settings.closeButtonContent)
                };
                if( plugin.settings.style !== null ) {
                    plugin.cache.container.addClass(plugin.settings.style);
                }
                addListener();
                return plugin;
            };

            /**
             * Merge cache dom.
             */
            plugin.To$ = function() {
                return $( plugin.cache.container ).append(
                        $( plugin.cache.header )
                    ).append(
                        $( plugin.cache.content )
                    );
            };

            /**
             * Add listeners to the notification
             */
            var addListener = function(){

                // Close by button
                if( plugin.settings.closeButton ) {
                    $( plugin.cache.header ).append( $( plugin.cache.button ).bind( 'click', function() {
                        plugin.remove();
                    }) );
                }

                //Close click
                if( plugin.settings.closeSelf ) {

                    $( plugin.cache.container ).bind( 'click',  function() {
                        plugin.remove();
                    } );
                }

                // Auto fade
                if(plugin.settings.life > 0) {
                    $( plugin.cache.container ).delay( plugin.settings.life ).fadeOut( 'fast', function(){
                        plugin.remove();
                    });
                }
            };

            /**
             * Unbind listeners & remove notification item from DOM
             */
            plugin.remove = function() {
                $(plugin.cache.container).unbind();
                $(plugin.cache.container).remove()
            }

            init();
        };

        init();

    }

})(jQuery);
