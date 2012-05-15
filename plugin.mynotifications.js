;(function($) {

    $.myNotifications = function( options ) {

		// Arguments
		

        var defaults = {
        	// Affiche dans la console de firebug le déroulement du processus
            debug: true,
            // Nom du container principal
            containerName: 'container',
            // Selecteur type 
            containerSelectorType: '#',
            // Selecteur CSS
            containerSelector:'',
            // Nom de la liste 
            listName: 'notifications',
            // Selecteur type 
            listSelectorType: '#',
            // Selecteur CSS
            listSelector:'',
            // Durée d'affichage des notifications en ms
            // Un entier négatif donne un affichage perpetuel
            itemDisplayDelay : 3000,
            // Nombre ajouts de notifications total dans la liste
            itemNumber: -1,
            // Préfixe des notifications
            itemName: 'notifications-',
            // Selecteur type 
            itemSelectorType: '#',
            // Selecteur CSS
            itemSelector:'',
            // Nombre de notifications présentes dans le DOM
            itemCount:0,
            // Les notifications se ferment elles lors d'un clic ?
            itemCloseByClick: true,
            // Les notifications se ferment elles avec un boutton ?
            itemCloseByButton: true,
            // Class CSS des notifications d erreurs
            itemClassError:'my-notifications-error',
			// Class CSS des notifications avertissement
            itemClassWarning:'my-notifications-warning',
			// Class CSS des notifications d information
			itemClassInfo:'my-notifications-info',
			// Class CSS des notifications validation
			itemClassOkay:'my-notifications-okay',
			// Class CSS du bouton fermeture de notification
			itemClassClose:'my-notifications-close'
            
        }

        var plugin = this;

        plugin.settings = {}


		/*
		 * Constructeur de l'objet
		 */
        var init = function() {
        	
        	// Construction des attributs 
            plugin.settings                   = $.extend({}, defaults, options);
            plugin.settings.containerSelector = plugin.settings.containerSelectorType + plugin.settings.containerName;
            plugin.settings.listSelector      = plugin.settings.listSelectorType + plugin.settings.listName;
            plugin.settings.listItemSelector  = plugin.settings.listSelectorType + plugin.settings.listName + ' li';
            
            // #1 : On s'assure de la présence du container dans le DOM, si il n'est pas présent on l'ajoute            
            ( !containerIsSet() ) ? buildContainer() : null;
            
            // #2 : Ajout eventuel d'un listener sur le click des items
            if( plugin.settings.itemCloseByClick == true ) {
	            $( plugin.settings.listItemSelector ).live( 'click', function(){
	            	removeDom( $( this ) );
	            });
            }
            
            // #3 : Ajout eventuel d'un listener sur le click d'un bouton fermer
            if( plugin.settings.itemCloseByButton == true ) {
	            var buttonCloseSelector = '.' + plugin.settings.itemClassClose;
	            
	            $( buttonCloseSelector ).live('click', function(){
	            	removeDom( $( this ).parent().parent() );
	            });
            }
        }
	
	   /*
	    *  Le container principal est il présent dans le DOM
	    * 
	    * @return true si il est déjà présent sinon false
	    * 
	    */
		var containerIsSet = function() {
			var containerId = $( plugin.settings.containerSelector );
			if( containerId.length == 0 )   {
				( plugin.settings.debug == true ) ? console.info( 'Container ' + plugin.settings.containerSelector + ' doesn\'t exist' ) : null ;
				return false;
			}
			else {
				( plugin.settings.debug == true ) ? console.info( 'Container ' + plugin.settings.containerSelector + ' found' ) : null ;
				return true;
			}
		}
	
	   /*
	    * Le container principal n'est pas présent, on l'ajoute au DOM
	    * Cela sera le dernier noeud enfant du noeud body
	    * 
	    * @return void
	    * 
	    */
		var buildContainer = function() {
			var container = $( '<div></div>' ).attr( 'id' , plugin.settings.containerName );
			$( 'body' ).append( container );
			var list = $( '<ul></ul>' ).attr( 'id', plugin.settings.listName );
			$( plugin.settings.containerSelector ).append( list );
			( plugin.settings.debug == true ) ? console.info( 'Container ' + plugin.settings.containerSelector + ' ready' ) : null ;
			( plugin.settings.debug == true ) ? console.info( 'List ' + plugin.settings.listSelector + ' ready' ) : null ;
		}
	
	   /*
	    * Construction des attributs indispensable pour chaques notifications
	    * 
	    * @return void
	    * 
	    */
		var buildItemAttributs = function() {
			plugin.settings.itemNumber++;
			plugin.settings.itemCount++;
			plugin.settings.itemSelector = '#' + plugin.settings.itemName + plugin.settings.itemNumber;
			( plugin.settings.debug == true ) ? console.info( 'Item current selector ' + plugin.settings.itemSelector ) : null ;
			( plugin.settings.debug == true ) ? console.info( 'Item count ' + plugin.settings.itemCount ) : null ;
		}
	
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
		plugin.msg = function ( title, text ) {
			buildItemAttributs();
			
			item = $( '<li></li>' );
			
			( plugin.settings.debug == true ) ? console.info( 'Item added to dom'+"\n"+'id : ' + plugin.settings.itemSelector + "\n" + 'type:' + title + "\n" + 'duration:'+ plugin.settings.itemDisplayDelay + ' ms') : null ;
			
			var itemTempName = plugin.settings.itemName + plugin.settings.itemNumber;
			var itemHeading  = '';
			
			item.attr( 'id' , itemTempName ).hide();
			
		    switch( title ) {
		        case 'error' :
					itemHeading = 'Error';
					item.addClass( plugin.settings.itemClassError );
		            break;
		        case 'warning' :
					itemHeading = 'Warning';
					item.addClass( plugin.settings.itemClassWarning );
		            break;
		        case 'info' :
					itemHeading = 'Information';
					item.addClass( plugin.settings.itemClassInfo );
		            break;
		        case 'okay' :
					itemHeading = 'Okay';
					item.addClass( plugin.settings.itemClassOkay );
		            break;
		        default :
		        	itemHeading = title;
		        	break;
		    }
		    
			var headingObject = $( $( '<h6></h6>' ) );
			item.append( headingObject.html( itemHeading ) );
			
			
			item.append( $( '<p></p>' ).html( text ) );
			$( plugin.settings.listSelector ).append( item );
			
		    // #1 : Doit on ajouter un bouton fermer la notification ?
			if( plugin.settings.itemCloseByButton == true ) {
				var closeButton = $( '<a></a>' ).attr( 'class', plugin.settings.itemClassClose ).attr('href', '#').attr('onClick', 'return false;').html('x');
				headingObject.append( closeButton );
			}
			
		    // #2 : La notification doit elle être affichée indefiniment ?
			if(plugin.settings.itemDisplayDelay > 0) {
				$( item ).fadeIn( 'fast', 'easeInOutCubic' ).delay( plugin.settings.itemDisplayDelay ).fadeOut( 'fast',function(){
					removeDom( item );
					( plugin.settings.debug == true) ? console.info( 'Item removed from dom' + "\n" + 'id : ' + plugin.settings.itemSelector + "\n" + 'type:' + title ) : null ;
				});				
			}
			else {
				$( item ).fadeIn( 'fast', 'easeInOutCubic' );
			}

		}
	
	   /*
	    * Supprime item du DOM, et mets à jour le nombre total de notifications encore
	    * présentes dans le DOM
	    * 
	    * @param STRING item le selecteur d'un item à supprimer du DOM
	    * 
	    * @return void
	    * 
	    */
		var removeDom = function( item ) {
			plugin.settings.itemCount--;
			$( item ).remove();
			( plugin.settings.debug == true) ? console.info( 'Still : ' + plugin.settings.itemCount + ' items into DOM.' ) : null ;
		}
	
		var addListener = function( item ) {

		}
	
		var removeListener = function( item ) {
			
		}
	
	   /*
	    * Alias de msg('error', text)
	    */
		plugin.msgError = function( text ) {
			plugin.msg( 'error' , text);
		}
	
	   /*
	    * Alias de msg('warning', text)
	    */
		plugin.msgWarning = function( text ) {
			plugin.msg('warning' , text);
		}

	   /*
	    * Alias de msg('info', text)
	    */
		plugin.msgInfo = function( text ) {
			plugin.msg( 'info' , text);
		}
		
	   /*
	    * Alias de msg('okay', text)
	    */
		plugin.msgOkay = function( text ) {
			plugin.msg( 'okay' , text);
		}
		
		// Construteur
        init();

    }

})(jQuery);
