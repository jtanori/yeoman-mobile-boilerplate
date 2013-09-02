/* global Backbone, define, aspect, console, _, $ */
define(
    [
        'views/Index',
        'Footer',
        'models/User',
        'models/ShoppingCart',
        'exceptions/Redirect'
    ],
    function (Index, Footer, User, ShoppingCartModel, Redirect) {
        'use strict';

        var Router = new(Backbone.Router.extend({
            currentView: null,
            currentDialog: null,
            user: null,
            footer: null,
            routes: {
                'access': 'access',
                'home': 'defaultAction',
                '': 'defaultAction'
            },
            /**
             * Overridden because of aspects.
             *
             * @overridden
             */
            _bindRoutes: function () {
                if (!this.routes) {
                    return;
                }

                // Added only this method call to orginal _bindRoutes.
                // The reason of that is to decorated original route handlers.
                this.addAspectsToRoutes();

                var routes = [];
                for (var route in this.routes) {
                    routes.unshift([route, this.routes[route]]);
                }
                for (var i = 0, l = routes.length; i < l; i++) {
                    this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
                }
            },

            addAspectsToRoutes: function () {
                /*Use aspect to decorate views
            i.e: view requires some data to be present before proceeding with the route
            */
                //All pages
                var pages = [
                    'defaultAction'
                ];

                var loggedIn = _.without(pages, 'access');
                // Checked in is intended to be used as an intermediary checkin after logged in but before
                // serving the secured content
                var checkedIn = _.without(pages, 'access');
                var noFooter = _.difference(pages, checkedIn);

                console.log('no footer', noFooter);

                //TODO: Implement user status (login) checkout
                /**
                 * For usage:
                 * @see js/libs/aspect.js
                 */
                var beforeAll = function () {
                    if (this.currentView instanceof Backbone.View) {
                        console.log('close current view', this.currentView);
                        this.currentView.close();
                        this.currentView = null;
                    }
                }.bind(this);
                //TODO: Rename to something more meaningful
                var beforeLogin = function () {
                    //Do user check (login)
                    var user = this.getUser();
                    console.log('user is authenticated', user.isAuthenticated());
                    //TODO: User a real user
                    if (!user.isAuthenticated()) {
                        throw new Redirect('access');
                    }

                    return true;

                }.bind(this);

                //Only checked in user allowed
                var beforeCheckin = function () {
                    var user = this.getUser();
                    //Venue Check
                    if (!user.isInVenue()) {
                        console.log('not in venue');
                        throw new Redirect('checkin');
                    }

                    return true;

                }.bind(this);
                //Protected too
                var afterMethods = function () {
                    console.log('after methods', arguments);
                    try {
                        //Will show the footer if user is authenticated
                        var f = this.getFooter();
                        //Get the parent group for this page
                        var parentGroup = Backbone.history.fragment.split('/')[0] || "";

                        if (f instanceof Footer) {
                            console.log(f.currentGroup, 'currentGroup', parentGroup);
                            if (parentGroup && f.currentGroup !== parentGroup) {
                                f.setGroup(parentGroup);
                            } else if (parentGroup === '' && f.currentGroup !== '') {
                                f.clearGroup();
                            }
                        }
                    } catch (e) {
                        console.log(e, e.stack, "Can't set this page as current");
                    }
                }.bind(this);
                //Remove footer if the pages does not need it
                var afterNoFooterMethods = function () {
                    try {
                        var f = this.getFooter(false);
                        console.log('footer instance', f);
                    } catch (e) {
                        console.log(e, 'error on footer');
                    }
                }.bind(this);
                //Remove current page before all controllers
                aspect.add(this, pages, beforeAll);
                //Check if user is logged in for these methods
                aspect.add(this, loggedIn, beforeLogin);
                //Check if user is in a venue
                aspect.add(this, checkedIn, beforeCheckin);
                //Set footer for those pages needed
                aspect.add(this, checkedIn, afterMethods, 'after');
                //Remove footer on those pages needed
                aspect.add(this, noFooter, afterNoFooterMethods, 'after');
            },
            //Creates the footer and returns its instance
            getFooter: function (createit) {
                var footer;

                //If creation param is undefined  we assume we want to create it (if it does not exists yet)
                if (createit === undefined) {
                    createit = true;
                }
                //Footer will work only for logged in users
                if (this.user.isAuthenticated()) {
                    console.log('user is authenticated in get footer');
                    if (this.footer) {
                        console.log('this footer', this.footer);
                        footer = this.footer;
                    } else if (createit) { //If it is set to be created
                        console.log('will create user');
                        footer = this.footer = new Footer();
                        footer.$el.appendTo($('body'));
                    }
                } else if (this.footer) {
                    this.footer.close();
                    footer = this.footer = null;
                }

                return footer;
            },
            //Return current user model
            getUser: function () {
                var user = this.user;

                if (!this.user) {
                    this.user = user = new User();
                }

                return user;
            },
            //Get shopping cart
            getCart: function () {
                var data = [];
                var user = this.getUser();
                //TODO: Create proper after-login hook to move
                //      cart data to proper user
                //Cart will be available only to logged in users
                //if(user.isAuthenticated()){
                if (_.isNull(this.cart) || !(this.cart instanceof ShoppingCartModel)) {
                    this.cart = new ShoppingCartModel({
                        'userName': user.get('username')
                    });
                    //Fetch local data
                    //TODO: Seamsly integrate with fetch/sync methods
                    this.cart.fetchFromLocal();
                }
                //}

                return this.cart;
            },

            //Initialize but don't start the router
            initialize: function () {
                //Bind scroll refresh event
                //Backbone.on('page.scroll.refresh', this.scrollRefresh, this);
                //Proper cleanup of cart
                Backbone.on('session.logout', function () {
                    this.cart.clear();
                    this.cart = null;
                    Backbone.history.navigate('access', {
                        trigger: true,
                        replace: false
                    });
                }, this);
                //Create "stateless" token/user
                var user = this.getUser();
                //cache
                this.$body = $('body');

                //Setup location whatcher
                var posSuccess = function () {
                    console.log('position changed', arguments);
                    Backbone.trigger('change:position', arguments);
                }.bind(this);

                var posError = function () {
                    console.log('position changed error', arguments);
                    Backbone.trigger('position:error', arguments);
                }.bind(this);

                navigator.geolocation.watchPosition(
                    posSuccess,
                    posError, {
                        maximumAge: 3000,
                        enableHighAccuracy: true
                    }
                );
            },

            start: function () {
                console.log(Backbone.History.started);
                Backbone.history.start();
            },

            //Le home
            defaultAction: function () {
                this.currentView = new Index();
            },
            /**
             * Access screen
             * Displays access options (Login/Register/Facebook Connect)
             */
            access: function (method) {
                var user = this.getUser();
                var referrer = window.referrer || false;
                var dest = 'home';

                if (user.isAuthenticated()) {
                    try {
                        if (app) {
                            dest = referrer.previous;
                        }

                        Backbone.history.navigate(dest, {
                            trigger: true
                        });
                    } catch (e) {
                        console.log('No referrer, redirecting to home');
                    }

                    return;
                }

                var view = this.currentView = new AccessView({
                    model: user
                }); //Auto renders
            }
        }))();

        return Router;
    }
);