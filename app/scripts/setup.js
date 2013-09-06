/* global _, Backbone, define, console */
define(['exceptions/Redirect', 'i18n!nls/app'],
    function(Redirect, i18n){
        'use strict';
        //Add jade to the global scope
        window.i18n = i18n;
        //Add basic feature detection
        var capabilities= {
            //Storage
            hasWebSql: !!window.openDatabase,
            hasSessionStorage: !!window.sessionStorage,
            hasLocalStorage: (function () {
                if (!!window.localStorage) {
                    try {
                        window.localStorage.testEntry = 'test';
                        return true;
                    } catch (e) {
                        console.warn('No local storage');
                        return false;
                    }
                }
                return false;
            } ()),

            //Device
            isAndroid: (navigator.userAgent.toLowerCase().indexOf('android') > -1),
            isRetina: (window.devicePixelRatio >= 2),
            isMobile: (function(a){ if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){return true;}else{return false;} })(navigator.userAgent||navigator.vendor||window.opera),
            isTablet: (/iPad|Android/i.test(navigator.userAgent)) || ( /tablet/i.test(navigator.userAgent) && (!/RX-34/i.test(navigator.userAgent)) || (/FOLIO/i.test(navigator.userAgent))),
            isIpad: (navigator.userAgent.match(/iPad/i) !== null) || (/iPad/i.test(navigator.userAgent) || /iPhone OS 3_1_2/i.test(navigator.userAgent) || /iPhone OS 3_2_2/i.test(navigator.userAgent)),//Detects ipad on web and also on UIWebView
            isAndroidTablet: (navigator.userAgent.toLowerCase().indexOf('android') > -1) && (navigator.userAgent.toLowerCase().indexOf('mobile') > -1)
        };

        _.extend(window, capabilities);

        //Use #{ } as template delimiters, helps match Jade delimiters
        _.templateSettings = {
            interpolate : /\#\{(.+?)\}/g
        };

        //Extend view to proper close
        Backbone.View.prototype.close = function(){
            this.unbind();
            if (this.onClose){
                this.onClose();
            }
            this.remove();
        };

        //Extend models to accept validations
        _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
        //Configure validation plugin
        Backbone.Validation.configure({
            labelFormatter: 'label'
        });

        //History override
        var originalLoadUrl = Backbone.History.prototype.loadUrl;
        Backbone.History.prototype.loadUrl = function (hash) {
            hash = hash || window.location.hash;
            //Save history referers for future usage
            window.referrer = window.referrer || {};
            window.referrer.previous = window.referrer.current;
            window.referrer.current  = hash;

            try {
                return originalLoadUrl.apply(this, arguments);

            } catch (e) {
                if (e instanceof Redirect) {
                    Backbone.history.navigate(e.url, {trigger: true});
                }
                else {
                    Backbone.history.navigate('error', {trigger: true});
                    console.error(e, e.message, e.stack);
                }
            }
        };

        //TODO: Fix scope
        Array.prototype.list = function(){
            var limit = this.length;
            var orphans = arguments.length - limit;
            var scope = orphans > 0  && typeof(arguments[arguments.length-1]) !== 'string' ? arguments[arguments.length-1] : window;

            while(limit--){scope[arguments[limit]] = this[limit];}

            if(scope !== window) {orphans--;}

            if(orphans > 0){
                orphans += this.length;
                while(orphans-- > this.length) {scope[arguments[orphans]] = null;}
            }
        };
    }
);