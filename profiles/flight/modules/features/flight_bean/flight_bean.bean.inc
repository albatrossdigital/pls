<?php
/**
 * @file
 * flight_bean.bean.inc
 */

/**
 * Implements hook_bean_admin_ui_types().
 */
function flight_bean_bean_admin_ui_types() {
  $export = array();

  $bean_type = new stdClass();
  $bean_type->disabled = FALSE; /* Edit this to true to make a default bean_type disabled initially */
  $bean_type->api_version = 5;
  $bean_type->name = 'block';
  $bean_type->label = 'Block';
  $bean_type->options = '';
  $bean_type->description = 'General block';
  $export['block'] = $bean_type;

  $bean_type = new stdClass();
  $bean_type->disabled = FALSE; /* Edit this to true to make a default bean_type disabled initially */
  $bean_type->api_version = 5;
  $bean_type->name = 'button';
  $bean_type->label = 'Button';
  $bean_type->options = '';
  $bean_type->description = 'Has a link field that can be formatted as a button';
  $export['button'] = $bean_type;

  return $export;
}
