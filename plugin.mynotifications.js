;(function($) {

    $.myNotifications = function(options) {

        var defaults = {
        	// Affiche dans la console de firebug le déroulement du processus
            debug: 'true',
            // Id HTML du container principal
            containerId: 'container',
            // Selecteur CSS du container principale par defaut un id
            containerSelector: '#',
            // Durée d'affichage des notifications, si négatif perpetuel
            delay: 3000,
            // Id HTML des enfants
            childsId: -1,
            // Préfixe CSS des id enfants
            childsPrefixId: 'message',
            // Type de notification par défaut
            defaultItemType: 'info',
            // Class CSS des notifications d erreurs
            classItemError:'tool-tips-error',
			// Class CSS des notifications avertissement
            classItemWarning:'tool-tips-warning',
			// Class CSS des notifications d information
			classItemInfo:'tool-tips-info',
			// Class CSS des notifications validation
			classItemOkay:'tool-tips-okay',
			// Class CSS du bouton fermeture de notification
			classItemClose:'tool-tips-close',
			// Les notifications se ferment lors d un click
			itemCloseByClick: 'true',
			// Les notification ont elles un bouton de fermeture ?
			itemCloseButton: 'true'
        }

        var plugin = this;

        plugin.settings = {}

        var init = function() {
        	
        	// Construction des attributs 
            plugin.settings = $.extend({}, defaults, options);
            
            // Permet d'obtenir le selecteur css du container principal sous la forme par défault :  #container
            plugin.settings.containerSelector = plugin.settings.containerSelector + plugin.settings.containerId;

            // #1 : On s'assure de la présence du container dans le DOM, si il n'est pas présent on l'ajoute
            if( containerIsSet() == false) {
            	buildContainer();
            }
            
            // Ajout éventuel au DOM du conainer principal
            buildContainerSelector();
        }

		var buildContainerSelector = function() {
			plugin.settings.listSelector = plugin.settings.containerSelector + ' ul';
		}

		var buildChildsAttributs = function() {
			plugin.settings.childsId++;
			plugin.settings.childsCssId    = plugin.settings.childsPrefixId + '-' + plugin.settings.childsId;
			plugin.settings.childsSelector = '#' + plugin.settings.childsCssId;
			( plugin.settings.debug == 'true' ) ? console.info( 'Childs attributs updated.' ) : null ;
		}

		var containerIsSet = function() {

			var containerId = $( plugin.settings.containerSelector );
			if( containerId.length == 0 )   {
				( plugin.settings.debug == 'true' ) ? console.info( 'Container doesn\'t exist' ) : null ;
				return false;
			}
			else {
				( plugin.settings.debug == 'true' ) ? console.info( 'Container found' ) : null ;
				return true;
			}
		}

		var buildContainer = function() {
			var container = $( '<div></div>' ).attr( 'id' , plugin.settings.containerId );
			$( 'body' ).append( container );
			var list = $( '<ul></ul>' );
			$( plugin.settings.containerSelector ).append( list );
			( plugin.settings.debug == 'true' ) ? console.info( 'Container build' + "\n" + 'id: ' + plugin.settings.containerId) : null ;
		}

		var listenerClose = function(item) {
			$( item ).click(
				function() {
					$( this ).remove();
				}
			);
		}

		plugin.msgError = function( text ) {
			plugin.msg( 'error' , text);
		}
			
		plugin.msgWarning = function( text ) {
			plugin.msg('warning' , text);
		}
		
		plugin.msgInfo = function( text ) {
			plugin.msg( 'info' , text);
		}
		
		plugin.msgOkay = function( text ) {
			plugin.msg( 'okay' , text);
		}

		plugin.msg = function ( title, text ) {
			buildChildsAttributs();
			item = $( '<li></li>' );
			(plugin.settings.debug == 'true') ? console.info('Item added to dom'+"\n"+'id : ' + plugin.settings.childsCssId + "\n" + 'type:' + title + "\n" + 'duration:'+ plugin.settings.delay + ' ms') : null ;
			item.attr( 'id' , plugin.settings.childsCssId ).hide();
			var itemHeading = '';
		    switch( title ) {
		        case 'error' :
					itemHeading = 'Error';
					item.addClass( plugin.settings.classItemError );
		            break;
		        case 'warning' :
					itemHeading = 'Warning';
					item.addClass( plugin.settings.classItemWarning );
		            break;
		        case 'info' :
					itemHeading = 'Information';
					item.addClass( plugin.settings.classItemInfo );
		            break;
		        case 'okay' :
					itemHeading = 'Okay';
					item.addClass( plugin.settings.classItemOkay );
		            break;
		        default :
		        	itemHeading = title;
		        	break;
		    }
		    
		    // #1 : Doit on ajouter un bouton fermer la notification ?
			if( plugin.settings.itemCloseByClick == 'true') {
				listenerClose( item );
			}

			var headingObject = $( $( '<h6></h6>' ) );
			item.append( headingObject.html( itemHeading ) );
			
			
			item.append( $( '<p></p>' ).html( text ) );
			$( plugin.settings.listSelector ).append(item);
			
		    // #2 : La notification doit elle se fermer automatiquement ?
			if( plugin.settings.itemCloseButton == 'true' ) {
				var closeButton = $( '<a></a>' ).attr( 'class', plugin.settings.classItemClose ).attr('href', '#').html('x');
				closeButton.click(function(){
					$(this).parent().parent().remove();
				});
				headingObject.append(closeButton);
			}
			
		    // #3 : La notification doit elle etre affichée indefiniment ?
			if(plugin.settings.delay > 0) {
				$( item ).fadeIn( 'fast', 'easeInOutCubic' ).delay( plugin.settings.delay ).fadeOut( 'fast',function(){
					$( this ).remove();
					( plugin.settings.debug == 'true') ? console.info( 'Item removed from dom' + "\n" + 'id : ' + plugin.settings.childsCssId + "\n" + 'type:' + title ) : null ;
				});				
			}
			else {
				$( item ).fadeIn( 'fast', 'easeInOutCubic' );
			}

		}
		
		// Construteur
        init();

    }

})(jQuery);
