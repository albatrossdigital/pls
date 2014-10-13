
CKEDITOR.plugins.add( 'widgetfoundation', {
    requires: 'widget',

    icons: 'widgetfoundationLeftCol,widgetfoundationRightCol,widgetfoundationTwoCol,widgetfoundationThreeCol,widgetfoundationThreeCol,widgetfoundationAccordion',

    defaults : {
        name: 'accordion',
        count: 3,
        activePanel: 1,
        multiExpand: false
    },

    init: function( editor ) {
        
        // Configurable settings
        var allowedFull = editor.config.widgetFoundation_allowedFull != undefined ? editor.config.widgetFoundation_allowedFull :
            'div(!row,two-col-left,two-col-right,accordion,two-col,three-col){width};' +
            'div(!columns,small-12,medium-3,medium-9,col-sidebar,col-main,col-1,col-2,col-3)';
        var allowedWidget = editor.config.widgetFoundation_allowedWidget != undefined ? editor.config.widgetFoundation_allowedFull :
            'p br ul ol li strong em img[!src,alt,width,height]';
        var allowedText = editor.config.widgetFoundation_allowedText != undefined ? editor.config.widgetFoundation_allowedFull :
            'p br ul ol li strong em';


        //allowedWidget = 'img[!src,alt,width,height]';
        //allowedText = allowedWidget;

        var showButtons = editor.config.widgetFoundationShowButtons != undefined ? editor.config.widgetFoundationShowButtons : true;

        // Define the widgets
        editor.widgets.add( 'widgetfoundationLeftCol', {

            button: showButtons ? 'Add left column box' : undefined,

            template:
                '<div class="row two-col-left">' +
                    '<div class="columns small-12 medium-3 col-sidebar"><img src="http://placehold.it/300x250&text=Medium" /></div>' +
                    '<div class="columns small-12 medium-9 col-main"><p>Content</p></div>' +
                '</div>',

            editables: {
                col1: {
                    selector: '.col-sidebar',
                    allowedContent: allowedWidget
                },
                col2: {
                    selector: '.col-main',
                    allowedContent: allowedText
                }
            },

            allowedContent: allowedFull,

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'two-col-right-left' );
            }
            
        } );

        editor.widgets.add( 'widgetfoundationRightCol', {

            button: showButtons ? 'Add right column box' : undefined,

            template:
                '<div class="row two-col-right">' +
                    '<div class="columns small-12 medium-9 col-main"><p>Content</p></div>' +
                    '<div class="columns small-12 medium-3 col-sidebar"><img src="http://placehold.it/300x250&text=Medium" /></div>' +
                '</div>',

            editables: {
                col1: {
                    selector: '.col-sidebar',
                    allowedContent: allowedWidget
                },
                col2: {
                    selector: '.col-main',
                    allowedContent: allowedText
                }
            },

            allowedContent: allowedFull,

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'two-col-right' );
            }

        } );

        editor.widgets.add( 'widgetfoundationTwoCol', {

            button: showButtons ? 'Add two column box' : undefined,

            template:
                '<div class="row two-col">' +
                    '<div class="columns small-12 medium-6 col-1">Content</div>' +
                    '<div class="columns small-12 medium-6 col-2">Content</div>' +
                '</div>',

            editables: {
                col1: {
                    selector: '.col-1',
                    allowedContent: allowedWidget
                },
                col2: {
                    selector: '.col-2',
                    allowedContent: allowedWidget
                }
            },

            allowedContent: allowedFull,

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'two-col' );
            }

        } );

        editor.widgets.add( 'widgetfoundationThreeCol', {

            button: showButtons ? 'Add three column box' : undefined,

            template:
                '<div class="row three-col">' +
                    '<div class="columns small-12 medium-4 col-1"><img src="http://placehold.it/300x250&text=Medium" /><p>Text below</p></div>' +
                    '<div class="columns small-12 medium-4 col-2"><img src="http://placehold.it/300x250&text=Medium" /><p>Text below</p></div>' +
                    '<div class="columns small-12 medium-4 col-3"><img src="http://placehold.it/300x250&text=Medium" /><p>Text below</p></div>' +
                '</div>',

            editables: {
                col1: {
                    selector: '.col-1',
                    allowedContent: allowedWidget
                },
                col2: {
                    selector: '.col-2',
                    allowedContent: allowedWidget
                },
                col3: {
                    selector: '.col-3',
                    allowedContent: allowedWidget
                }
            },

            allowedContent: allowedFull,

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'three-col' );
            }

        } );

        CKEDITOR.dialog.add( 'widgetfoundationAccordion', this.path + 'dialogs/widgetfoundationAccordion.js' );
        editor.widgets.add( 'widgetfoundationAccordion', {

            button: showButtons ? 'Add accordion box' : undefined,

            template:
                '<dl class="accordion" data-accordion><div class="col-1"></div></dl>',
     

            allowedContent: allowedFull,

            dialog: 'widgetfoundationAccordion',

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'accordion' );
            },

            /*init: function() {
                var width = this.element.getStyle( 'width' );
                if ( width )
                    this.setData( 'width', width );
                if ( this.element.hasClass( 'align-left' ) )
                    this.setData( 'align', 'left' );
                if ( this.element.hasClass( 'align-right' ) )
                    this.setData( 'align', 'right' );
                if ( this.element.hasClass( 'align-center' ) )
                    this.setData( 'align', 'center' );
            },*/

            data: function() {

 
                var name = this.data.name != undefined ? this.data.name : 'accordion';
                var count = this.data.count != undefined ? this.data.count : 0;
                //@todo: var prevCount = this.data.prevCount != undefined ? this.data.prevCount : 

                // Add rows
                if (this.data.prevCount == undefined || this.data.prevCount < count) {
                    for (var i=this.data.prevCount != undefined ? this.data.prevCount : 1; i<=count; i++) {
                        var active = this.data.activePanel == i ? ' active' : '';
                        var template = 
                            '<dd class="accordion-navigation">' +
                                '<a href="#'+ name+i +'"><div class="accordion-header-'+i+'">Heading '+i+'</div></a>' +
                                '<div id="panel'+ name+i +'" class="content content-'+i+active+'">' +
                                  '' +
                                '</div>'
                            '</dd>'
                        var newPanel = CKEDITOR.dom.element.createFromHtml( template );
                        this.element.append(newPanel);
                    }

                    // For some reason, the initEditable call needs to come in a separate for loop
                    // the html code added wasn't in the DOM yet
                    for (var i=this.data.prevCount != undefined ? this.data.prevCount : 1; i<=count; i++) {
                        this.initEditable( 'heading'+i, {
                            selector: '.accordion-header-'+i
                        } );
                        this.initEditable( 'content'+i, {
                            selector: '.content-'+i
                        } ); 
                    }
                }

                // Remove rows
                if (this.data.prevCount != undefined && this.data.prevCount > count) {
                    // @todo
                }
                

                this.data.prevCount = i;
            }
        } );

        // Append the widget's styles when in the CKEditor edit page,
        // added for better user experience.
        // Assign or append the widget's styles depending on the existing setup.
        if (typeof editor.config.contentsCss == 'object') {
            editor.config.contentsCss.push(CKEDITOR.getUrl(this.path + 'contents.css'));
        }

        else {
            editor.config.contentsCss = [editor.config.contentsCss, CKEDITOR.getUrl(this.path + 'contents.css')];
        }

    }


} );