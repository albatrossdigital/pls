<?php
/**
 * @file
 * flight_bean.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function flight_bean_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer beans'.
  $permissions['administer beans'] = array(
    'name' => 'administer beans',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'create any block bean'.
  $permissions['create any block bean'] = array(
    'name' => 'create any block bean',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'create any button bean'.
  $permissions['create any button bean'] = array(
    'name' => 'create any button bean',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'delete any block bean'.
  $permissions['delete any block bean'] = array(
    'name' => 'delete any block bean',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'delete any button bean'.
  $permissions['delete any button bean'] = array(
    'name' => 'delete any button bean',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'edit any block bean'.
  $permissions['edit any block bean'] = array(
    'name' => 'edit any block bean',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'edit any button bean'.
  $permissions['edit any button bean'] = array(
    'name' => 'edit any button bean',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'view any block bean'.
  $permissions['view any block bean'] = array(
    'name' => 'view any block bean',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'view any button bean'.
  $permissions['view any button bean'] = array(
    'name' => 'view any button bean',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'bean',
  );

  // Exported permission: 'view bean revisions'.
  $permissions['view bean revisions'] = array(
    'name' => 'view bean revisions',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bean',
  );

  return $permissions;
}
