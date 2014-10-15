<?php

/**
 * Common mappings for the Drupal 6 node migrations.
 */
/*abstract class ExampleNodeMigration extends DrupalNode6Migration {
  public function __construct(array $arguments) {
    parent::__construct($arguments);

    $this->addFieldMapping('field_legacy_nid', 'nid')
         ->description('We have a common field to save the D6 nid');
  }
}*/

/**
 * Image-specific mappings and handling.
 */
class PioneerLibraryMigration extends DrupalNode6Migration {
  public function __construct(array $arguments) {
    parent::__construct($arguments);

    $this->addFieldMapping('field_library_director', 'field_library_director');
    $this->addFieldMapping('field_library_county', 'field_county');
    $this->addFieldMapping('field_library_phone', 'field_phone');
    $this->addFieldMapping('field_library_fax', 'field_fax');
    $this->addFieldMapping('field_library_type', 'field_librarytype');
    $this->addFieldMapping('field_library_area', 'field_areaserved');
    $this->addFieldMapping('field_library_population', 'field_population');
    $this->addFieldMapping('field_library_handicapped', 'field_handicappedaccessible');
    $this->addFieldMapping('field_library_meetingroom', 'field_meetingroom');
    $this->addFieldMapping('field_library_meetingroom_space', 'meetingroom_space');
    $this->addFieldMapping('field_library_friendsgroup', 'field_friendsgroup');
    $this->addFieldMapping('field_library_wireless', 'field_has_wireless');
    $this->addFieldMapping('field_library_map', 'field_mapurl');

  }

  /**
   * Implementation of Migration::prepareRow().
   *
   * Here we pull in additional data from a non-core, non-CCK table.
   *
   * @param $row
   */
  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }

    // Get the hour data
    $query = Database::getConnection('default', $this->sourceConnection)
             ->select('content_type_openhours', 'h')
             ->fields('h', array('field_monday_value', 'field_tuesday_value', 'field_wednesday_value', 'field_thursday_value', 'field_friday_value', 'field_saturday_value', 'field_sunday_value', 'field_summer_value', 'field_otherhours_value'));
    $query->leftjoin('term_node', 'n1', 'n1.nid = h.nid');
    $query->leftjoin('term_node', 'n2', 'n2.tid = n1.tid');
    $query->condition('n2.nid', $row->nid);
    $hours = $query->execute()->fetchObject();
    $row->hours = $hours;

    // Combine director
    $row->field_library_director = $row->field_director_fname . ' ' . $row->field_director_lname;

    // Deal with bool fields
    $seating = explode('/', $row->field_meetingroom);
    $row->field_meetingroom = $this->tobool($row->field_meetingroom);
    $row->meetingroom_space = (int)trim($seating[1]);
    $row->field_population = (int)$row->field_population;
    $row->field_handicappedaccessible = $this->tobool($row->field_handicappedaccessible);
    $row->field_friendsgroup = $this->tobool($row->field_friendsgroup);
    $row->field_has_wireless = $this->tobool($row->field_has_wireless);


    $row->title = str_replace('Library Information: ', '', $row->field_lib_name);

  }

  public function prepare($entity, stdClass $row){
    // Hours
    $days = array('field_sunday_value', 'field_monday_value', 'field_tuesday_value', 'field_wednesday_value', 'field_thursday_value', 'field_friday_value', 'field_saturday_value');
    $hours = array();
    foreach ($days as $key => $day) {
      $data = $row->hours->{$day};
      if (strpos($data, '&') !== FALSE) {
        $data = explode('&', $data);
        $this->item($hours, day, $data[0]);
        $this->item($hours, $day, $data[1]);
      }
      else {
        $this->item($hours, $key, $data);
      }
    }  

    $entity->field_library_hours[LANGUAGE_NONE] = $hours;
    //$entity->field_library_hours_summer[LANGUAGE_NONE] 

    // Evergreen id
    foreach ($this->library_evergreen() as $key => $value) {
      if (strpos($value, $enity->title) !== FALSE) {
        $entity->field_library_id[LANGUAGE_NONE][0]['value'] = $key;
      }
    }

    // Address
    $entity->field_library_address[LANGUAGE_NONE][0] = array(
      'thoroughfare' => $row->field_street1,
      'premise' => $row->field_street2,
      'locality' => $row->field_city,
      'administrative_area' => 'NY',
      'postal_code' => $row->field_zip,
      'country' => 'US'
    );

    // Other fields
    $entity->field_library_website[LANGUAGE_NONE][0]['url'] = $row->field_libwebsite;
    $entity->field_library_email[LANGUAGE_NONE][0]['email'] = $row->field_email;


    
    dpm($row);
    dpm($entity); 
  }

  public function item(&$hours, $day, $data) {
    if (strpos($data, 'closed') === FALSE) {
      $data = explode('-', $data);
      $hours[] = array(
        'day' => $day,
        'starthours' => $this->ampm($data[0]) . '00',
        'endhours' => $this->ampm($data[1]) . '00',
      );
    }
  }

  public function tobool($data) {
    return strpos($data, 'No') === FALSE ? 1 : 0;
  }

  public function ampm($data) {
    $data = (int)trim($data);
    return $data < 9 ? $data+12 : $data;
  }

  public function library_evergreen() {
    return array(
      765=>'Allens Hill Free Library',
      766=>'Arcade Free Library',
      767=>'Avon Free Library',
      768=>'Bell Memorial Library - Nunda',
      769=>'Bloomfield Public Library',
      770=>'Bristol Library',
      771=>'Caledonia Library Association',
      772=>'Clifton Springs Library',
      773=>'Clyde-Savannah Public Library',
      774=>'Cordelia A. Greene Library - Castile',
      775=>'Dansville Public Library',
      776=>'Eagle Free Library - Bliss',
      777=>'Gainesville Library - Silver Springs',
      778=>'Geneva Public Library',
      779=>'Gorham Free Library',
      780=>'Honeoye Public LIbrary',
      781=>'Lima Public Library',
      782=>'Livonia Public Library',
      783=>'Lyons Public Library',
      784=>'Macedon Public Library',
      785=>'Marion Public Library',
      786=>'Mount Morris Library',
      787=>'Naples Library',
      788=>'Newark Public Library',
      789=>'Ontario Public Library',
      790=>'Palmyra Community Library',
      791=>'Perry Public Library',
      792=>'Phelps Community Memorial Library',
      793=>'Pike Library',
      807=>'PLS Headquarters',
      794=>'Red Creek Free Library',
      795=>'Red Jacket Community Library',
      796=>'Rose Free Library',
      797=>'Sodus Community Library',
      798=>'Stevens Memorial Community Library-Attica',
      799=>'Victor Free Library',
      800=>'Wadsworth Library - Geneseo',
      801=>'Walworth-Seely Public Library',
      802=>'Warsaw Public Library',
      803=>'Williamson Free Public Library',
      804=>'Wolcott Civic Free Library',
      805=>'Wood Library Assoc. - Canandaigua',
      806=>'Wyoming Free Circulating Library Assoc.'
    );
  }
}

/*class ExampleArticleMigration extends ExampleNodeMigration {
  public function __construct(array $arguments) {
    // Add any other data we're pulling into the source row, before the parent
    // constructor.
    $this->sourceFields['lead_graphic'] = 'Lead graphic string from D6';
    $this->sourceFields['summary'] = 'Summary string from D6';

    parent::__construct($arguments);

    $this->addFieldMapping('field_image', 'field_lead_graphic')
         ->sourceMigration('Image');
    // Note that we map migrated terms by the vocabulary ID.
    $this->addFieldMapping('field_countries', '1')
         ->sourceMigration('Countries')
         ->arguments(array('source_type' => 'tid'));
    $this->addFieldMapping('field_topics', '2')
         ->sourceMigration('Topics')
         ->arguments(array('source_type' => 'tid'));
  }
}*/
