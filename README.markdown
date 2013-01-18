# Notifications

Visual notifications JQuery plugin.

## Demo

[Demo](http://www.inwebo.net/demo/plugin.mynotifications)

## Require

* Jquery 1.6.4+
* Le plug in (plugin.motifications.js)
* CSS
* Modern browser


Easiest way to include Jquery

    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>

## Objectifs

* Simple
* No dom dependencies

## Principe

Plugin will search trough DOM tree a *container*. If it doesn't exists, it will be programmatically append to DOM.
All notifications will be append to a *ul* *MyNotifications* node. Each *ul* *item* is a *notification*. All item's attributs are editable.

A *notification* and *myNotifications* are an objects.

### Main container

Will be the last DOM node.

    <div id="notifications"></div>

### MyNotifications

Will be *notifications* storage place.

    <ul id="list"></ul>

#### Notification

Is an *list item* node. Get a unique *id*, a css class *notification* and a css state class

    <li id="notification-2" class="notification warning">
        <h6>warning<a class="close" href="#" onclick="return false;">x</a></h6>
        <p>Notification body's</p>
    </li>

### Construct

Two ways constructor.

#### Default construct

    // Default construct
    var myplugin = new $.myNotifications();

myplugin object got *debug* enabled, main container's name is *container*, css selector
is *#*, complete css id is *#container*, notification will be show for *3000* ms.
Notification can be close by a button or a click on the item list.

#### Custom contruct

    // Custom construct
    var myplugin = new $.myNotifications({
                                          life:-1, // infinite displaying
                                          containerId: 'mainContainer' // main container
                                        });

    // Custom construct
    var myplugin = new $.myNotifications({
                                          life:2000, // Displaying for 2000 ms
                                          closeSelf: false // Won't be closed by a click
                                          closeButton:false // No close button
                                          style : {
                                              error : 'custom-error-class'
                                          }                                          
                                        });

## Github repository

Fork me i'm famous

    git clone git://github.com/inwebo/Notifications.git