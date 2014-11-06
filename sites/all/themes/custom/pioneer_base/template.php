<?php


/**
 * Implements template_preprocess_html().
 *
 */
function pioneer_base_preprocess_html(&$vars) {
  $typekit_id = 'dyf2bdh';
  $typekit = "TypekitConfig = {
        kitId: '" . $typekit_id . "'
    };
    (function() {
        var tk = document.createElement('script');
        tk.src = '//use.typekit.com/' + TypekitConfig.kitId + '.js';
        tk.type = 'text/javascript';
        tk.async = 'true';
        tk.onload = tk.onreadystatechange = function() {
            var rs = this.readyState;
            if (rs && rs != 'complete' && rs != 'loaded') return;
            try { Typekit.load(TypekitConfig); } catch (e) {}
        };
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(tk, s);
    })(); 
  ";
  drupal_add_js($typekit, 'inline');
}


  /**
 * Implements hook_html_head_alter().
 */
function pioneer_base_html_head_alter(&$head_elements) {

  // Optimize mobile viewport.
  $head_elements['mobile_viewport'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1.0, user-scalable=0, maximum-scale=1',
    ),
  );

  // Force no IE9 compatibility mode
  $head_elements['compatibility_mode'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'X-UA-Copmatible',
      'content' => 'IE=edge, chrome=1',
    ),
    '#weight' => -10000,
  );

}


/**
 * Implements template_preprocess_page
 *
 */
function pioneer_base_preprocess_page(&$vars) {
  // Set section title explicitly
  if(!isset($vars['section_title'])) {
    $vars['section_title'] = FALSE;
  }

  // Convenience variables
  if (!empty($vars['page']['sidebar_first'])){
    $left = $vars['page']['sidebar_first'];
  }

  if (!empty($vars['page']['sidebar_second'])) {
    $right = $vars['page']['sidebar_second'];
  }

  // Dynamic sidebars
  if (!empty($left) && !empty($right)) {
    $vars['main_grid'] = 'medium-6 medium-push-3';
    $vars['sidebar_first_grid'] = 'medium-3 medium-pull-6';
    $vars['sidebar_sec_grid'] = 'medium-3';
  } elseif (empty($left) && !empty($right)) {
    $vars['main_grid'] = 'medium-9';
    $vars['sidebar_first_grid'] = '';
    $vars['sidebar_sec_grid'] = 'medium-3';
  } elseif (!empty($left) && empty($right)) {
    $vars['main_grid'] = 'medium-9 medium-push-3';
    $vars['sidebar_first_grid'] = 'medium-3 medium-pull-9';
    $vars['sidebar_sec_grid'] = '';
  } else {
    $vars['main_grid'] = 'medium-12';
    $vars['sidebar_first_grid'] = '';
    $vars['sidebar_sec_grid'] = '';
  }



  // Add IE 8 warning bar
  $embed = '<script type="text/javascript"> 
    var $buoop = {
      vs: {i:8,f:15,o:15,s:5.1,n:9},
      reminder: 1
    }; 
    $buoop.ol = window.onload; 
    window.onload=function(){ 
      try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
      var e = document.createElement("script"); 
      e.setAttribute("type", "text/javascript"); 
      e.setAttribute("src", "//browser-update.org/update.js"); 
      document.body.appendChild(e); 
    } 
    </script> ';
  $vars['page']['footer']['browser_update'] = array(
    '#type' => 'markup',
    '#markup' => $embed,
    '#weight' => 101,
  );
}


/**
 * Add zebra striping to the office_hours output
 */
function pioneer_base_office_hours_field_formatter_default($vars) {
  $days = $vars['days'];
  $settings = $vars['settings'];
  $daynames = $vars['daynames'];
  $open = !empty($vars['open']) ? $vars['open'] : NULL;

  switch ($settings['hoursformat']) {
    case 2: $timeformat = 'H:i';   break; // 24hr with leading zero
    case 0: $timeformat = 'G:i';   break; // 24hr without leading zero
    case 1: $timeformat = 'g:i a'; break; // 12hr ampm without leading zero
  }

  $max_label_length = 3; // This is the minimum width for day labels. It is adjusted when adding new labels.
  $HTML_hours = '';
  $HTML_current_status = '';
  foreach ($days as $day => &$info) {
    // Format the label
    $label = $daynames[$info['startday']];
    $label .= !isset($info['endday']) ? '' : $settings['separator_grouped_days'] . $daynames[$info['endday']];
    $label .= $settings['separator_day_hours'];
    $max_label_length = max($max_label_length, drupal_strlen($label));

    // Format the time
    if (!$info['times']) {
      $times = filter_xss( t($settings['closedformat']) );
    }
    else {
      $times = array();
      foreach ($info['times'] as $block_times) {
        $times[] = theme(
                    'office_hours_time_range',
                    array(
                      'times'       => $block_times,
                      'format'      => $timeformat,
                      'separator'   => $settings['separator_hours_hours'],
                    )
                  );
      }
      $times = implode($settings['separator_more_hours'], $times);
    }

    $info['output_label'] = $label;
    $info['output_times'] = $times;
  }

  // Start the loop again, since only now we have the definitive $max_label_length.
  foreach ($days as $day => &$info) {
    // Remove unwanted lines.
    switch ($settings['showclosed']) {
      case 'all':
        break;
      case 'open':
        if (!isset($info['times'])) {
          continue 2;
        }
        break;
      case 'next':
        if (!$info['current'] && !$info['next']) {
          continue 2;
        }
        break;
      case 'none':
        continue 2;
        break;
    }

    // Generate HTML for Hours.
    $HTML_hours .= '<div class="row oh-display">'
//             . '<div class="oh-display-label">'
               . '<div class="columns small-6 label-above">'
               . $info['output_label']
               . '</div>'
               . '<div class="columns small-6 oh-display-times oh-display-' . (!$info['times'] ? 'closed' : 'hours')
               . ($info['current'] ? ' oh-display-current' : '')
               . '">'
               . $info['output_times'] . $settings['separator_days']
               . '</div>'
               . '</div>';
  }

  $HTML_hours = '<div class="oh-wrapper' . ($settings['grouped'] ? ' oh-display-grouped' : '' ) . '">' .
                $HTML_hours .
                '</div>';

  // Generate HTML for CurrentStatus.
  if ($open) {
    $HTML_current_status = '<span class="oh-current-open">' . t($settings['current_status']['open_text']) . '</span>';
  }
  else {
    $HTML_current_status = '<span class="oh-current-closed">' . t($settings['current_status']['closed_text']) . '</span>';
  }

  switch ($settings['current_status']['position']) {
    case 'before':
      $HTML = $HTML_current_status . $HTML_hours;
      break;
    case 'after':
      $HTML = $HTML_hours . $HTML_current_status;
      break;
    case 'hide':
    default: // Not shown.
      $HTML = $HTML_hours;
      break;
  }

  return $HTML;
}

/**
 * Implements template_preprocess_node
 *
 */
//function pioneer_base_preprocess_node(&$variables) {
//}

/**
 * Implements hook_preprocess_block()
 */
//function pioneer_base_preprocess_block(&$variables) {
//  // Add wrapping div with global class to all block content sections.
//  $variables['content_attributes_array']['class'][] = 'block-content';
//
//  // Convenience variable for classes based on block ID
//  $block_id = $variables['block']->module . '-' . $variables['block']->delta;
//
//  // Add classes based on a specific block
//  switch ($block_id) {
//    // System Navigation block
//    case 'system-navigation':
//      // Custom class for entire block
//      $variables['classes_array'][] = 'system-nav';
//      // Custom class for block title
//      $variables['title_attributes_array']['class'][] = 'system-nav-title';
//      // Wrapping div with custom class for block content
//      $variables['content_attributes_array']['class'] = 'system-nav-content';
//      break;
//
//    // User Login block
//    case 'user-login':
//      // Hide title
//      $variables['title_attributes_array']['class'][] = 'element-invisible';
//      break;
//
//    // Example of adding Foundation classes
//    case 'block-foo': // Target the block ID
//      // Set grid column or mobile classes or anything else you want.
//      $variables['classes_array'][] = 'six columns';
//      break;
//  }
//
//  // Add template suggestions for blocks from specific modules.
//  switch($variables['elements']['#block']->module) {
//    case 'menu':
//      $variables['theme_hook_suggestions'][] = 'block__nav';
//    break;
//  }
//}

//function pioneer_base_preprocess_views_view(&$variables) {
//}

/**
 * Implements template_preprocess_panels_pane().
 *
 */
//function pioneer_base_preprocess_panels_pane(&$variables) {
//}

/**
 * Implements template_preprocess_views_views_fields().
 *
 */
//function pioneer_base_preprocess_views_view_fields(&$variables) {
//}

/**
 * Implements theme_form_element_label()
 * Use foundation tooltips
 */
//function pioneer_base_form_element_label($variables) {
//  if (!empty($variables['element']['#title'])) {
//    $variables['element']['#title'] = '<span class="secondary label">' . $variables['element']['#title'] . '</span>';
//  }
//  if (!empty($variables['element']['#description'])) {
//    $variables['element']['#description'] = ' <span data-tooltip="top" class="has-tip tip-top" data-width="250" title="' . $variables['element']['#description'] . '">' . t('More information?') . '</span>';
//  }
//  return theme_form_element_label($variables);
//}

/**
 * Implements hook_preprocess_button().
 */
//function pioneer_base_preprocess_button(&$variables) {
//  $variables['element']['#attributes']['class'][] = 'button';
//  if (isset($variables['element']['#parents'][0]) && $variables['element']['#parents'][0] == 'submit') {
//    $variables['element']['#attributes']['class'][] = 'secondary';
//  }
//}

/**
 * Implements hook_form_alter()
 * Example of using foundation sexy buttons
 */
//function pioneer_base_form_alter(&$form, &$form_state, $form_id) {
//  // Sexy submit buttons
//  if (!empty($form['actions']) && !empty($form['actions']['submit'])) {
//    $classes = (is_array($form['actions']['submit']['#attributes']['class']))
//      ? $form['actions']['submit']['#attributes']['class']
//      : array();
//    $classes = array_merge($classes, array('secondary', 'button', 'radius'));
//    $form['actions']['submit']['#attributes']['class'] = $classes;
//  }
//}

/**
 * Implements hook_form_FORM_ID_alter()
 * Example of using foundation sexy buttons on comment form
 */
//function pioneer_base_form_comment_form_alter(&$form, &$form_state) {
  // Sexy preview buttons
//  $classes = (is_array($form['actions']['preview']['#attributes']['class']))
//    ? $form['actions']['preview']['#attributes']['class']
//    : array();
//  $classes = array_merge($classes, array('secondary', 'button', 'radius'));
//  $form['actions']['preview']['#attributes']['class'] = $classes;
//}


/**
 * Implements template_preprocess_panels_pane().
 */
// function zurb_foundation_preprocess_panels_pane(&$variables) {
// }

/**
* Implements template_preprocess_views_views_fields().
*/
/* Delete me to enable
function THEMENAME_preprocess_views_view_fields(&$variables) {
 if ($variables['view']->name == 'nodequeue_1') {

   // Check if we have both an image and a summary
   if (isset($variables['fields']['field_image'])) {

     // If a combined field has been created, unset it and just show image
     if (isset($variables['fields']['nothing'])) {
       unset($variables['fields']['nothing']);
     }

   } elseif (isset($variables['fields']['title'])) {
     unset ($variables['fields']['title']);
   }

   // Always unset the separate summary if set
   if (isset($variables['fields']['field_summary'])) {
     unset($variables['fields']['field_summary']);
   }
 }
}

// */

/**
 * Implements hook_css_alter().
 */
//function pioneer_base_css_alter(&$css) {
//  // Always remove base theme CSS.
//  $theme_path = drupal_get_path('theme', 'zurb_foundation');
//
//  foreach($css as $path => $values) {
//    if(strpos($path, $theme_path) === 0) {
//      unset($css[$path]);
//    }
//  }
//}

/**
 * Implements hook_js_alter().
 */
//function pioneer_base_js_alter(&$js) {
//  // Always remove base theme JS.
//  $theme_path = drupal_get_path('theme', 'zurb_foundation');
//
//  foreach($js as $path => $values) {
//    if(strpos($path, $theme_path) === 0) {
//      unset($js[$path]);
//    }
//  }
//}
