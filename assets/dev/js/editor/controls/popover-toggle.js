const ControlChooseView = require( 'elementor-controls/choose' );

export default class ControlPopoverStarterView extends ControlChooseView {
	ui() {
		const ui = ControlChooseView.prototype.ui.apply( this, arguments );

		ui.popoverToggle = '.elementor-control-popover-toggle-toggle';
		ui.resetInput = '.elementor-control-popover-toggle-reset';

		return ui;
	}

	events() {
		return _.extend( ControlChooseView.prototype.events.apply( this, arguments ), {
			'click @ui.popoverToggle': 'onPopoverToggleClick',
			'click @ui.resetInput': 'onResetInputClick',
		} );
	}

	onResetInputClick() {
		const globalData = this.model.get( 'global' );

		if ( globalData?.active ) {
			this.triggerMethod( 'value:type:change' );
		}
	}

	onInputChange( event ) {
		if ( event.currentTarget !== this.ui.popoverToggle[ 0 ] ) {
			return;
		}

		// If the control has a global value, unset the global.
		if ( this.getGlobalKey() ) {
			this.triggerMethod( 'unset:global:value' );
		} else if ( this.isGlobalActive() ) {
			this.triggerMethod( 'value:type:change' );
		}
	}

	onPopoverToggleClick() {
		if ( this.isGlobalActive() && ! this.getControlValue() && ! this.getGlobalKey() && this.getGlobalDefault() ) {
			this.triggerMethod( 'unlink:global:default' );
		}

		this.$el.next( '.elementor-controls-popover' ).toggle();
	}

	getGlobalCommand() {
		return 'globals/typography';
	}

	buildPreviewItemCSS( globalValue ) {
		const cssObject = {};

		Object.entries( globalValue ).forEach( ( [ property, value ] ) => {
			// If a control value is empty, ignore it.
			if ( ! value || '' === value.size ) {
				return;
			}

			// TODO: FIGURE OUT WHAT THE FINAL VALUE KEY FORMAT IS AND ADJUST THIS ACCORDINGLY
			if ( property.startsWith( 'typography_' ) ) {
				property = property.replace( 'typography_', '' );
			}

			if ( 'font_family' === property ) {
				elementor.helpers.enqueueFont( value, 'editor' );
			}

			if ( 'font_size' === property ) {
				// Set max size for Typography previews in the select popover so it isn't too big.
				if ( value.size > 40 ) {
					value.size = 40;
				}
				cssObject.fontSize = value.size + value.unit;
			} else {
				// Convert the snake case property names into camel case to match their corresponding CSS property names.
				if ( property.includes( '_' ) ) {
					property = property.replace( /([_][a-z])/g, ( result ) => result.toUpperCase().replace( '_', '' ) );
				}

				cssObject[ property ] = value;
			}
		} );

		return cssObject;
	}

	createGlobalItemMarkup( globalData ) {
		const $typographyPreview = jQuery( '<div>', { class: 'e-global__preview-item e-global__typography', 'data-global-id': globalData.id } );

		$typographyPreview
			.html( globalData.title )
			.css( this.buildPreviewItemCSS( globalData.value ) );

		return $typographyPreview;
	}

	getGlobalMeta() {
		return {
			commandName: this.getGlobalCommand(),
			key: this.model.get( 'name' ),
			title: elementor.translate( 'new_typography_setting' ),
			controlType: 'typography',
		};
	}

	getAddGlobalConfirmMessage() {
		const globalData = this.getGlobalMeta(),
			$message = jQuery( '<div>', { class: 'e-global__confirm-message' } ),
			$messageText = jQuery( '<div>' )
				.html( elementor.translate( 'global_typography_confirm_text' ) ),
			$inputWrapper = jQuery( '<div>', { class: 'e-global__confirm-input-wrapper' } ),
			$input = jQuery( '<input>', { type: 'text', name: 'global-name', placeholder: globalData.title } )
				.val( globalData.title );

		$inputWrapper.append( $input );

		$message.append( $messageText, $inputWrapper );

		return $message;
	}

	async getGlobalsList() {
		const result = await $e.data.get( this.getGlobalCommand() );

		return result.data;
	}

	buildGlobalsList( globalTypographies ) {
		const $globalTypographyContainer = jQuery( '<div>', { class: 'e-global__preview-items-container' } );

		Object.values( globalTypographies ).forEach( ( typography ) => {
			// Only build markup if the typography is valid.
			if ( typography ) {
				const $typographyPreview = this.createGlobalItemMarkup( typography );

				$globalTypographyContainer.append( $typographyPreview );
			}
		} );

		return $globalTypographyContainer;
	}

	onAddGlobalButtonClick() {
		this.triggerMethod( 'add:global:to:list', this.getAddGlobalConfirmMessage() );
	}
}

ControlPopoverStarterView.onPasteStyle = ( control, clipboardValue ) => {
	return ! clipboardValue || clipboardValue === control.return_value;
};
