/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview Save Plugin
 */

CKEDITOR.plugins.add( 'save', {
	lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
	icons: 'save', // %REMOVE_LINE_CORE%
	hidpi: true, // %REMOVE_LINE_CORE%
	init: function( editor ) {
        console.log('editir.save');
		if ( editor.elementMode == CKEDITOR.ELEMENT_MODE_INLINE )
			return;
            
        
		var pluginName = 'save';

		// Register the command.
		//var command = 
        editor.addCommand( pluginName, CKEDITOR.plugins.save );

        // console.log(command);
		// Register the toolbar button.
		//editor.ui.addButton && 
        editor.ui.addButton( 'Save', {
			label: 'Télécharger',
			command: pluginName,
			toolbar: 'document,50'
		} );
	}
} );

CKEDITOR.plugins.save = {
	exec: function( editor ) {
        
		saveTextAsFile();
	},
	canUndo: false,
	readOnly: 1,
	modes: { wysiwyg: 1 }
};
