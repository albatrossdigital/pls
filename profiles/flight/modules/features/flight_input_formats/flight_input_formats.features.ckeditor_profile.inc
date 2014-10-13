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
        'toolbar' => '',
        'loadPlugins' => array(),
      ),
      'input_formats' => array(),
    ),
    'Flight' => array(
      'name' => 'Flight',
      'settings' => array(
        'ss' => 2,
        'default' => 't',
        'show_toggle' => 't',
        'uicolor' => 'default',
        'uicolor_user' => 'default',
        'toolbar' => '[
    [\'Cut\',\'Copy\',\'PasteText\',\'PasteFromWord\',\'RemoveFormat\'],
    [\'Undo\',\'Redo\'],
    [\'Link\',\'Unlink\',\'Anchor\'],
    [\'Format\',\'Bold\',\'Italic\',\'Underline\'],
    [\'NumberedList\',\'BulletedList\'],
    [\'Blockquote\',\'Outdent\',\'Indent\'],
    [\'Media\',\'Table\',\'HorizontalRule\',\'Templates\',\'DrupalBreak\'],
    [\'Maximize\'],
    \'/\',
    [\'-\']
]',
        'expand' => 't',
        'width' => '100%',
        'lang' => 'en',
        'auto_lang' => 't',
        'language_direction' => 'default',
        'allowed_content' => 't',
        'extraAllowedContent' => 'a div p section[align,data-reaveal-id,data-clearing,data-abide,data-section,data-section-content,data-section-title](*);',
        'enter_mode' => 'p',
        'shift_enter_mode' => 'br',
        'font_format' => 'p;div;pre;h2;h3;h4;h5;h6',
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
        'css_mode' => 'none',
        'css_path' => '',
        'css_style' => 'theme',
        'styles_path' => '',
        'filebrowser' => 'none',
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
          'autogrow' => array(
            'name' => 'autogrow',
            'desc' => 'Auto Grow plugin',
            'path' => '%editor_path%plugins/autogrow/',
            'buttons' => FALSE,
            'default' => 'f',
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
