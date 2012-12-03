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
 * @version   05-2012
 * @link      git://github.com/inwebo/MyNotifications-Jquery-plugin.git
 */
;(function($) {

	$.Item = function(title, text, options ) {
		
		var defaults = {
			
			debug:true,
			
			selectors: {
				i:"#notification-"
			},
			id:-1,
			life:3000,
			closeSelf:true,
			closeButton:true,
			style: {
				error:"error",
				warning:"warning",
				info:"info",
				okay:"okay",
				custom:"custom",
				button:"close"
			}
			
		};
		
        var plugin = this;

        plugin.settings = {};

		var init = function() {
            plugin.settings			= $.extend({}, defaults, options);
            plugin.settings.name	= 'MyNotification';
            plugin.settings.version	= '12-2012';
            plugin.settings.id      = plugin.settings.selectors.i + plugin.settings.id;
            plugin.settings.selectors.button = plugin.settings.id + " a." + plugin.settings.style.button;
            plugin.title			= title ;
            plugin.text				= text ;
            plugin.cache = {
				container:$("<li></li>").attr('id', plugin.settings.id.substring(1,plugin.settings.id.length) ),
				header:$("<h6></h6>").html( plugin.title ),
				body:$("<p></p>").html( plugin.text ),
				button:$("<a></a>").attr( 'class', plugin.settings.style.button ).attr('href', '#').attr('onClick', 'return false;').html('x'),
				
			};
            
		};

		plugin.Get = function() {
			Title();
			Handler();
			plugin.cache.objet = $( plugin.cache.container ).append(
						$( plugin.cache.header ).append(
							$( plugin.cache.body )
						)
					)		
			return plugin.cache.objet;
		};

		var Title = function() {
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
				case 'okay' :
					plugin.cache.container.addClass( plugin.settings.style.okay );
					break;
				default :
					plugin.cache.container.addClass( plugin.settings.style.custom );
					break;
			}
			
			if( plugin.settings.closeButton === true ) {
				$( plugin.cache.title ).append( $( plugin.cache.button ) );
			}
		};
		
		var Handler = function( obj ) {
			
				// Self close by click
				if( plugin.settings.closeSelf === true ) {
					$( plugin.settings.id ).triggerHandler( 'click', function() {
						Remove();
					});
				}
				
				// Close by button
				if( plugin.settings.closeButton === true ) {
					$( plugin.settings.selectors.button ).triggerHandler( 'click', function() {
						Remove();
					});
				}
		};

		var Remove = function( obj ) {
			$( plugin.id ).remove();
		};

		init();
	};

    $.myNotifications = function( options ) {

		// Arguments

        var defaults = {
        	// Affiche dans la console de firebug le déroulement du processus
            debug: true,
            
            selectors : {
				// Main container
				container : "#container",
				// Notification list's selector
				list: "#notifications"
			},
            
            seed:-1,
            
            item : {
				life:5000,
				closeSelf:true,
				closeButton:true,
				style: {
					error:"error",
					warning:"warning",
					info:"info",
					okay:"okay",
					button:"close"
				}
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
            plugin.settings.name              = 'MyNotifications';
            plugin.settings.version           = '11-2012';
            plugin.settings.listItemSelector  = plugin.settings.listSelectorType + plugin.settings.listName + ' li';
            
            plugin.cache = {
				container:$( plugin.settings.selectors.container ),
				list:$(plugin.settings.selectors.list),
			};
            
            // #1 : On s'assure de la présence du container dans le DOM, si il n'est pas présent on l'ajoute            
            ( !DomReady() ) ? DomBuild() : null;
            
        };
		
	   /*
	    * Le container principal est il présent dans le DOM
	    * 
	    * @return true si il est déjà présent sinon false
	    * 
	    */		
		var DomReady = function() {
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
		var DomBuild = function() {
			$( 'body' ).append(
				$( '<div></div>' ).attr( 'id' , plugin.settings.containerName ).append(
					$( '<ul></ul>' ).attr( 'id', plugin.settings.listName )
				)
			);
			debug( 'Container ' + plugin.settings.containerSelector + ' added to dom.' + "\n" + 'List ' + plugin.settings.listSelector + ' added to dom.');
		};
	
	   /*
	    * Affiche une notification ayant comme titre title et avec comme
	    * text text
	    * 
	    * @param STRING title Un type prédéfini parmi okay | warning | error | info
	    *               peut être défini par l'utilisateur, la notifications
	    *               sera un message
	    * 
	    * @param STRING text  Le text à afficher
	    * 
	    * @return void
	    * 
	    */
		plugin.Msg = function ( title, text ) {
			plugin.settings.seed++;
			
			var item = new $.Item(title, text, plugin.settings.item);
			AddItem( item.Get() );
		    // #2 : La notification doit elle être affichée indefiniment ?
			if(plugin.settings.item.life > 0) {
				$( plugin.settings.selectors ).fadeIn( 'fast' ).delay( plugin.settings.item.life ).fadeOut( 'fast',function(){
					DelItem( notification );
					debug( 'Item removed from dom' + "\n" + 
					       'id : ' + plugin.settings.itemSelector + "\n" + 
					       'type:' + title );
				});				
			}
			else {
				$( notification ).fadeIn( 'fast' );
			}
			
			debug( 'Item added to dom' + "\n" + 'id : ' + 
					plugin.settings.itemSelector + "\n" + 
					'type:' + title + "\n" + 
					'duration:' + plugin.settings.itemDisplayDelay + ' ms'
					);
		};
	
		var AddItem = function( obj ) {
			$( plugin.settings.selectors.list ).append( obj );
			debug( 'Still : ' + plugin.settings.itemCount + ' items into DOM.' );
		};
	
	   /*
	    * Supprime item du DOM, et mets à jour le nombre total de notifications encore
	    * présentes dans le DOM
	    * 
	    * @param STRING item le selecteur d'un item à supprimer du DOM
	    * 
	    * @return void
	    * 
	    */
		var DelItem = function( obj ) {
			obj.remove();
			debug( 'Still : ' + plugin.settings.itemCount + ' items into DOM.' );
		};
		
	   /*
	    * Alias de msg('error', text)
	    */
		plugin.E = function( text ) {
			plugin.msg( 'error' , text);
		};

	   /*
	    * Alias de msg('warning', text)
	    */
		plugin.W = function( text ) {
			plugin.msg('warning' , text);
		};

	   /*
	    * Alias de msg('info', text)
	    */
		plugin.I = function( text ) {
			plugin.Msg( 'info' , text);
		};
	
	   /*
	    * Alias de msg('okay', text)
	    */
		plugin.O = function( text ) {
			plugin.Msg( 'okay' , text);
		};
	
		/*
		 * Debug nécessite le support de console.info()
		 */
    	var debug = function( text ) {
    		// Verifie que ce n'est pas internet explorer
    		if( (window['console'] !== undefined) ){
    			( plugin.settings.debug == true ) ? console.info( text ) : null ;
    		}
    	};

		// Construteur
        init();

    }

	var t = new $.myNotifications();

})(jQuery);
