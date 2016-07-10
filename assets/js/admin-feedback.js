(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Modals;

Modals = {
	init: function() {
		this.initModalWidgetType();
	},

	initModalWidgetType: function() {
		var modalProperties = {
			getDefaultSettings: function() {
				var settings = DialogsManager.getWidgetType( 'options' ).prototype.getDefaultSettings.apply( this, arguments );

				return _.extend( settings, {
					position: {
						my: 'center',
						at: 'center'
					},
					contentWidth: 'auto',
					contentHeight: 'auto',
					closeButton: true
				} );
			},
			buildWidget: function() {
				DialogsManager.getWidgetType( 'options' ).prototype.buildWidget.apply( this, arguments );

				if ( ! this.getSettings( 'closeButton' ) ) {
					return;
				}

				var $closeButton = this.addElement( 'closeButton', '<div><i class="fa fa-times"></i></div>' );

				this.getElements( 'widgetContent' ).prepend( $closeButton );
			},
			attachEvents: function() {
				if ( this.getSettings( 'closeButton' ) ) {
					this.getElements( 'closeButton' ).on( 'click', this.hide );
				}
			},
			onReady: function() {
				DialogsManager.getWidgetType( 'options' ).prototype.onReady.apply( this, arguments );

				var elements = this.getElements(),
					settings = this.getSettings();

				if ( 'auto' !== settings.contentWidth ) {
					elements.message.width( settings.contentWidth );
				}

				if ( 'auto' !== settings.contentHeight ) {
					elements.message.height( settings.contentHeight );
				}
			}
		};

		DialogsManager.addWidgetType( 'elementor-modal', DialogsManager.getWidgetType( 'options' ).extend( 'elementor-modal', modalProperties ) );
	}
};

module.exports = Modals;

},{}],2:[function(require,module,exports){
/* global jQuery, ElementorAdminFeedbackArgs */
( function( $ ) {
	'use strict';

	var ElementorAdminDialogApp = {

		elementorModals: require( 'elementor-utils/modals' ),

		dialogsManager: new DialogsManager.Instance(),

		cacheElements: function() {
			this.cache = {
				$deactivateLink: $( '#the-list' ).find( '[data-slug="elementor"] span.deactivate a' ),
				$dialogHeader: $( '#elementor-deactivate-feedback-dialog-header' ),
				$dialogForm: $( '#elementor-deactivate-feedback-dialog-form' )
			};
		},

		bindEvents: function() {
			var self = this;

			self.cache.$deactivateLink.on( 'click', function( event ) {
				event.preventDefault();

				self.getModal().show();
			} );
		},

		initModal: function() {
			var self = this,
				modal;

			self.getModal = function() {
				if ( ! modal ) {
					modal = self.dialogsManager.createWidget( 'elementor-modal', {
						id: 'elementor-deactivate-feedback-modal',
						headerMessage: self.cache.$dialogHeader,
						message: self.cache.$dialogForm,
						hideOnButtonClick: false,
						onReady: function() {
							DialogsManager.getWidgetType( 'elementor-modal' ).prototype.onReady.apply( this, arguments );

							this.addButton( {
								name: 'deactivate',
								text: ElementorAdminFeedbackArgs.i18n.deactivate,
								callback: _.bind( self.sendFeedback, self )
							} );

							this.addButton( {
								name: 'cancel',
								text: ElementorAdminFeedbackArgs.i18n.cancel,
								callback: function() {
									self.getModal().hide();
								}
							} );
						}
					} );
				}

				return modal;
			};
		},

		sendFeedback: function() {
			var self = this;

			self.getModal().getElements( 'deactivate' ).text( '' ).addClass( 'elementor-loading' );

			$.post( ajaxurl, self.cache.$dialogForm.serialize(), function( data ) {
				location.href = self.cache.$deactivateLink.attr( 'href' );
			} );
		},

		init: function() {
			this.elementorModals.init();
			this.initModal();
			this.cacheElements();
			this.bindEvents();
		}
	};

	$( function() {
		ElementorAdminDialogApp.init();
	} );

}( jQuery ) );

},{"elementor-utils/modals":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvYWRtaW4vanMvZGV2L3V0aWxzL21vZGFscy5qcyIsImFzc2V0cy9qcy9kZXYvYWRtaW4tZmVlZGJhY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTW9kYWxzO1xuXG5Nb2RhbHMgPSB7XG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuaW5pdE1vZGFsV2lkZ2V0VHlwZSgpO1xuXHR9LFxuXG5cdGluaXRNb2RhbFdpZGdldFR5cGU6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBtb2RhbFByb3BlcnRpZXMgPSB7XG5cdFx0XHRnZXREZWZhdWx0U2V0dGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc2V0dGluZ3MgPSBEaWFsb2dzTWFuYWdlci5nZXRXaWRnZXRUeXBlKCAnb3B0aW9ucycgKS5wcm90b3R5cGUuZ2V0RGVmYXVsdFNldHRpbmdzLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblxuXHRcdFx0XHRyZXR1cm4gXy5leHRlbmQoIHNldHRpbmdzLCB7XG5cdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdG15OiAnY2VudGVyJyxcblx0XHRcdFx0XHRcdGF0OiAnY2VudGVyJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y29udGVudFdpZHRoOiAnYXV0bycsXG5cdFx0XHRcdFx0Y29udGVudEhlaWdodDogJ2F1dG8nLFxuXHRcdFx0XHRcdGNsb3NlQnV0dG9uOiB0cnVlXG5cdFx0XHRcdH0gKTtcblx0XHRcdH0sXG5cdFx0XHRidWlsZFdpZGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdERpYWxvZ3NNYW5hZ2VyLmdldFdpZGdldFR5cGUoICdvcHRpb25zJyApLnByb3RvdHlwZS5idWlsZFdpZGdldC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cblx0XHRcdFx0aWYgKCAhIHRoaXMuZ2V0U2V0dGluZ3MoICdjbG9zZUJ1dHRvbicgKSApIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgJGNsb3NlQnV0dG9uID0gdGhpcy5hZGRFbGVtZW50KCAnY2xvc2VCdXR0b24nLCAnPGRpdj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvZGl2PicgKTtcblxuXHRcdFx0XHR0aGlzLmdldEVsZW1lbnRzKCAnd2lkZ2V0Q29udGVudCcgKS5wcmVwZW5kKCAkY2xvc2VCdXR0b24gKTtcblx0XHRcdH0sXG5cdFx0XHRhdHRhY2hFdmVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMuZ2V0U2V0dGluZ3MoICdjbG9zZUJ1dHRvbicgKSApIHtcblx0XHRcdFx0XHR0aGlzLmdldEVsZW1lbnRzKCAnY2xvc2VCdXR0b24nICkub24oICdjbGljaycsIHRoaXMuaGlkZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0b25SZWFkeTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdERpYWxvZ3NNYW5hZ2VyLmdldFdpZGdldFR5cGUoICdvcHRpb25zJyApLnByb3RvdHlwZS5vblJlYWR5LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblxuXHRcdFx0XHR2YXIgZWxlbWVudHMgPSB0aGlzLmdldEVsZW1lbnRzKCksXG5cdFx0XHRcdFx0c2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XG5cblx0XHRcdFx0aWYgKCAnYXV0bycgIT09IHNldHRpbmdzLmNvbnRlbnRXaWR0aCApIHtcblx0XHRcdFx0XHRlbGVtZW50cy5tZXNzYWdlLndpZHRoKCBzZXR0aW5ncy5jb250ZW50V2lkdGggKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggJ2F1dG8nICE9PSBzZXR0aW5ncy5jb250ZW50SGVpZ2h0ICkge1xuXHRcdFx0XHRcdGVsZW1lbnRzLm1lc3NhZ2UuaGVpZ2h0KCBzZXR0aW5ncy5jb250ZW50SGVpZ2h0ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0RGlhbG9nc01hbmFnZXIuYWRkV2lkZ2V0VHlwZSggJ2VsZW1lbnRvci1tb2RhbCcsIERpYWxvZ3NNYW5hZ2VyLmdldFdpZGdldFR5cGUoICdvcHRpb25zJyApLmV4dGVuZCggJ2VsZW1lbnRvci1tb2RhbCcsIG1vZGFsUHJvcGVydGllcyApICk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxzO1xuIiwiLyogZ2xvYmFsIGpRdWVyeSwgRWxlbWVudG9yQWRtaW5GZWVkYmFja0FyZ3MgKi9cbiggZnVuY3Rpb24oICQgKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgRWxlbWVudG9yQWRtaW5EaWFsb2dBcHAgPSB7XG5cblx0XHRlbGVtZW50b3JNb2RhbHM6IHJlcXVpcmUoICdlbGVtZW50b3ItdXRpbHMvbW9kYWxzJyApLFxuXG5cdFx0ZGlhbG9nc01hbmFnZXI6IG5ldyBEaWFsb2dzTWFuYWdlci5JbnN0YW5jZSgpLFxuXG5cdFx0Y2FjaGVFbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNhY2hlID0ge1xuXHRcdFx0XHQkZGVhY3RpdmF0ZUxpbms6ICQoICcjdGhlLWxpc3QnICkuZmluZCggJ1tkYXRhLXNsdWc9XCJlbGVtZW50b3JcIl0gc3Bhbi5kZWFjdGl2YXRlIGEnICksXG5cdFx0XHRcdCRkaWFsb2dIZWFkZXI6ICQoICcjZWxlbWVudG9yLWRlYWN0aXZhdGUtZmVlZGJhY2stZGlhbG9nLWhlYWRlcicgKSxcblx0XHRcdFx0JGRpYWxvZ0Zvcm06ICQoICcjZWxlbWVudG9yLWRlYWN0aXZhdGUtZmVlZGJhY2stZGlhbG9nLWZvcm0nIClcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRzZWxmLmNhY2hlLiRkZWFjdGl2YXRlTGluay5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdHNlbGYuZ2V0TW9kYWwoKS5zaG93KCk7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdGluaXRNb2RhbDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdG1vZGFsO1xuXG5cdFx0XHRzZWxmLmdldE1vZGFsID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggISBtb2RhbCApIHtcblx0XHRcdFx0XHRtb2RhbCA9IHNlbGYuZGlhbG9nc01hbmFnZXIuY3JlYXRlV2lkZ2V0KCAnZWxlbWVudG9yLW1vZGFsJywge1xuXHRcdFx0XHRcdFx0aWQ6ICdlbGVtZW50b3ItZGVhY3RpdmF0ZS1mZWVkYmFjay1tb2RhbCcsXG5cdFx0XHRcdFx0XHRoZWFkZXJNZXNzYWdlOiBzZWxmLmNhY2hlLiRkaWFsb2dIZWFkZXIsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBzZWxmLmNhY2hlLiRkaWFsb2dGb3JtLFxuXHRcdFx0XHRcdFx0aGlkZU9uQnV0dG9uQ2xpY2s6IGZhbHNlLFxuXHRcdFx0XHRcdFx0b25SZWFkeTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdERpYWxvZ3NNYW5hZ2VyLmdldFdpZGdldFR5cGUoICdlbGVtZW50b3ItbW9kYWwnICkucHJvdG90eXBlLm9uUmVhZHkuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuYWRkQnV0dG9uKCB7XG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogJ2RlYWN0aXZhdGUnLFxuXHRcdFx0XHRcdFx0XHRcdHRleHQ6IEVsZW1lbnRvckFkbWluRmVlZGJhY2tBcmdzLmkxOG4uZGVhY3RpdmF0ZSxcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogXy5iaW5kKCBzZWxmLnNlbmRGZWVkYmFjaywgc2VsZiApXG5cdFx0XHRcdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLmFkZEJ1dHRvbigge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdjYW5jZWwnLFxuXHRcdFx0XHRcdFx0XHRcdHRleHQ6IEVsZW1lbnRvckFkbWluRmVlZGJhY2tBcmdzLmkxOG4uY2FuY2VsLFxuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbGYuZ2V0TW9kYWwoKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1vZGFsO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0c2VuZEZlZWRiYWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0c2VsZi5nZXRNb2RhbCgpLmdldEVsZW1lbnRzKCAnZGVhY3RpdmF0ZScgKS50ZXh0KCAnJyApLmFkZENsYXNzKCAnZWxlbWVudG9yLWxvYWRpbmcnICk7XG5cblx0XHRcdCQucG9zdCggYWpheHVybCwgc2VsZi5jYWNoZS4kZGlhbG9nRm9ybS5zZXJpYWxpemUoKSwgZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSBzZWxmLmNhY2hlLiRkZWFjdGl2YXRlTGluay5hdHRyKCAnaHJlZicgKTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmVsZW1lbnRvck1vZGFscy5pbml0KCk7XG5cdFx0XHR0aGlzLmluaXRNb2RhbCgpO1xuXHRcdFx0dGhpcy5jYWNoZUVsZW1lbnRzKCk7XG5cdFx0XHR0aGlzLmJpbmRFdmVudHMoKTtcblx0XHR9XG5cdH07XG5cblx0JCggZnVuY3Rpb24oKSB7XG5cdFx0RWxlbWVudG9yQWRtaW5EaWFsb2dBcHAuaW5pdCgpO1xuXHR9ICk7XG5cbn0oIGpRdWVyeSApICk7XG4iXX0=
