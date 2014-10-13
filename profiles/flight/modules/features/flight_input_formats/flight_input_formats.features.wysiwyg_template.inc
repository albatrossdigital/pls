<?php
/**
 * @file
 * flight_input_formats.features.wysiwyg_template.inc
 */

/**
 * Implements hook_wysiwyg_template_default_templates().
 */
function flight_input_formats_wysiwyg_template_default_templates() {
  $templates = array();
  $templates['accordion'] = array(
    'title' => 'Accordion',
    'description' => 'Creates a collapsible accordion',
    'fid' => 0,
    'body' => '<div class="section-container accordion" data-section="accordion"><section class="active"><p class="title" data-section-title=""><a href="#">Section 1</a></p>

		<div class="content" data-section-content=""><p>Content of section 1.</p>
		</div>
	</section>

	<section><p class="title" data-section-title=""><a href="#">Section 2</a></p>

		<div class="content" data-section-content=""><p>Content of section 2.</p>
		</div>
	</section>

	<section><p class="title" data-section-title=""><a href="#">Section 3</a></p>

		<div class="content" data-section-content=""><p>Content of section 3.</p>
		</div>
	</section>

	<section><p class="title" data-section-title=""><a href="#">Section 4</a></p>

		<div class="content" data-section-content=""><p>Content of section 4.</p>
		</div>
	</section>

	<section><p class="title" data-section-title=""><a href="#">Section 5</a></p>

		<div class="content" data-section-content=""><p>Content of section 5.</p>
		</div>
	</section>
</div>
',
    'name' => 'accordion',
  );
  $templates['pull_out_quote'] = array(
    'title' => 'Pull-out Quote',
    'description' => 'Pull-out quotes display quotes or excerpts in large text.',
    'fid' => 0,
    'body' => '<div class="quote"><p>Quote text</p>

	<div class="quote-byline">— Jane Doe</div>
</div>
',
    'name' => 'pull_out_quote',
  );
  return $templates;
}
