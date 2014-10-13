<?php
/**
 * @file
 * flight_input_formats.features.ckeditor_profile.inc
 */

/**
 * Implements hook_ckeditor_profile_defaults().
 */
function flight_input_formats_ckeditor_profile_defaults() {
  $data = array(
    'CKEditor Global Profile' => array(
      'name' => 'CKEditor Global Profile',
      'settings' => array(
        'skin' => 'moono',
        'ckeditor_path' => '%l/ckeditor',
        'ckeditor_local_path' => '',
        'ckeditor_plugins_path' => '%m/plugins',
        'ckeditor_plugins_local_path' => '',
        'ckfinder_path' => '%m/ckfinder',
        'ckfinder_local_path' => '',
        'ckeditor_aggregate' => 'f',
        'toolbar_wizard' => 't',
        'loadPlugins' => array(),
      ),
      'input_formats' => array(),
    ),
    'Flight' => array(
      'name' => 'Flight',
      'settings' => array(
        'ss' => 2,
        'toolbar' => '[
    [\'Source\',\'Maximize\'],
    [\'Cut\',\'Copy\',\'PasteText\',\'RemoveFormat\'],
    [\'Format\',\'Bold\',\'Italic\'],
    [\'Anchor\',\'Link\'],
    [\'BulletedList\',\'NumberedList\'],
    [\'Table\',\'DrupalBreak\',\'Image\',\'WidgetFoundation\']
]',
        'expand' => 't',
        'default' => 't',
        'show_toggle' => 'f',
        'uicolor' => 'custom',
        'uicolor_user' => '#D3D3D3',
        'width' => '100%',
        'lang' => 'en',
        'auto_lang' => 't',
        'language_direction' => 'default',
        'allowed_content' => 't',
        'extraAllowedContent' => 'p a div span h2 h3 h4 h5 h6 section article iframe object embed strong b i em cite pre blockquote small sub sup code ul ol li dl dt dd table tbody th tr td img caption mediawrapper br[href,src,target,width,height,colspan,span,alt,name,title,class,id,data-reveal,data-reveal-id,data-clearing,data-options,data-slug,data-tab,data-accordion,data-equalizer,data-equalizer,data-dropdown,data-dropdown-content,data-interchange,data-alert]{text-align,float}(*);',
        'enter_mode' => 'p',
        'shift_enter_mode' => 'br',
        'font_format' => 'p;div;h2;h3;h4;h5;h6',
        'custom_formatting' => 't',
        'formatting' => array(
          'custom_formatting_options' => array(
            'indent' => 'indent',
            'breakAfterClose' => 'breakAfterClose',
            'breakBeforeOpen' => 0,
            'breakAfterOpen' => 0,
            'breakBeforeClose' => 0,
            'pre_indent' => 0,
          ),
        ),
        'css_mode' => 'self',
        'css_path' => '%tcss/ckeditor.css',
        'css_style' => 'theme',
        'styles_path' => '',
        'filebrowser' => 'ckfinder',
        'filebrowser_image' => '',
        'filebrowser_flash' => '',
        'UserFilesPath' => '%b%f/',
        'UserFilesAbsolutePath' => '%d%b%f/',
        'forcePasteAsPlainText' => 'f',
        'html_entities' => 'f',
        'scayt_autoStartup' => 't',
        'theme_config_js' => 't',
        'js_conf' => '',
        'loadPlugins' => array(
          'ckeditor_link' => array(
            'name' => 'drupal_path',
            'desc' => 'CKEditor Link - A plugin to easily create links to Drupal internal paths',
            'path' => '%base_path%profiles/flight/modules/contrib/ckeditor_link/plugins/link/',
            'buttons' => FALSE,
          ),
          'counter' => array(
            'name' => 'counter',
            'desc' => 'Plugin to count symbols, symbols without blanks and words',
            'path' => '%plugin_dir%counter/',
            'buttons' => FALSE,
            'default' => 'f',
          ),
          'drupalbreaks' => array(
            'name' => 'drupalbreaks',
            'desc' => 'Plugin for inserting Drupal teaser and page breaks.',
            'path' => '%plugin_dir%drupalbreaks/',
            'buttons' => array(
              'DrupalBreak' => array(
                'label' => 'DrupalBreak',
                'icon' => 'images/drupalbreak.png',
              ),
            ),
            'default' => 't',
          ),
          'media' => array(
            'name' => 'media',
            'desc' => 'Plugin for inserting images from Drupal media module',
            'path' => '%plugin_dir%media/',
            'buttons' => array(
              'Media' => array(
                'label' => 'Media',
                'icon' => 'images/icon.gif',
              ),
            ),
            'default' => 'f',
          ),
          'mediaBrowser' => array(
            'name' => 'mediaBrowser',
            'desc' => 'Media Browser for File Upload/Browsing',
            'path' => '%base_path%sites/proposal.local/modules/ckeditor_media/plugins/mediaBrowser/',
            'buttons' => FALSE,
          ),
        ),
      ),
      'input_formats' => array(
        'filtered_html' => 'Rich Text',
        'full_html' => 'Unfiltered Rich Text',
      ),
    ),
  );
  return $data;
}
