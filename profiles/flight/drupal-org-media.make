; flight make file for d.o. usage
core = "7.x"
api = "2"

; *********************************************************************************
; * Modules
; *********************************************************************************
; @todo Take an inventory of modules downloaded by not installed by core profile

; +++++ Modules Dev/specific revisions +++++
; @todo
; * Best practice is to point to specific git commits.
; * Have a note for each of these explaining the feature (with links) that requires -dev branch

; Verified working Apr 2
; Adds media/ckeditor integration
;projects[file_entity][version] = "2.x-dev"
;projects[file_entity][type] = "module"
;projects[file_entity][subdir] = "contrib"
;projects[file_entity][download][type] = "git"
;projects[file_entity][download][revision] = "e80b223"
;projects[file_entity][download][branch] = "7.x-2.x"

; Copied from panopoly 1.10
projects[file_entity][version] = 2.x-dev
projects[file_entity][subdir] = contrib
projects[file_entity][download][type] = git
projects[file_entity][download][revision] = 20f3070
projects[file_entity][download][branch] = 7.x-2.x


; Copied from panopoly 1.10
projects[media][version] = 2.x-dev
projects[media][subdir] = contrib
projects[media][download][type] = git
projects[media][download][revision] = 6382429
projects[media][download][branch] = 7.x-2.x

; Verified working Apr 2
; Adds media/ckeditor integration
; Note we are holding on this commit because of an issue with the Edit button disappearing
; See: https://drupal.org/comment/8608583#comment-8608583
;projects[media][version] = "2.x-dev"
;projects[media][type] = "module"
;projects[media][subdir] = "contrib"
;projects[media][download][type] = "git"
;projects[media][download][revision] = "aed50be25d6655cfa85ef1b282788f67b3972301"
;projects[media][download][branch] = "7.x-2.x"

; Verified working Apr 2
; Adds media/ckeditor integration
projects[ckeditor][version] = "1.x-dev"
projects[ckeditor][subdir] = "contrib"
projects[ckeditor][download][type] = "git"
projects[ckeditor][download][revision] = "b0de25519b9501e0046972bafcb6e815fcb22530"
projects[ckeditor][download][branch] = "7.x-1.x"


; *********************************************************************************
; * Patches
; *********************************************************************************

; @todo: edit module, look at https://drupal.org/node/2125199

; Fix media-CKEditor integration
; This is from https://gist.github.com/brantwynn/8015543#file-ho-ho-ho-make
; Linked to from media issue: http://drupal.org/node/1504696
; UPDATED 8-11-14
projects[ckeditor][patch][2159403] = "http://drupal.org/files/issues/ckeditor-accomodate-latest-media-changes-81.patch"

; OBSOLETE 8-11-14
; Fix FF/IE issues with media + CKEditor
; Found as a link on https://drupal.org/comment/8312617#comment-8312617
; projects[media][patch][2164823] = "http://drupal.org/files/issues/media-browser-incompatibilities.patch"

; Fix Issue with media and CKEditor ACF
projects[media][patch][2177893] = http://drupal.org/files/issues/media-ckeditor4-media-plugin-2177893-13.patch

; OBSOLETE 8-11-14 
; Fix issue with Plugin checkboxes not showing up on CKEditor admin page
; projects[media][patch][2158741] = http://drupal.org/files/issues/ckeditor-remove-external-plugin-declarations-8-alt.patch

; Fix adding media to summaries
; Found as a link on https://drupal.org/comment/8312617#comment-8312617
projects[media][patch][1995030] = "http://drupal.org/files/issues/media-7.x-2.x-wysiwyg-summary-support-1995030-6.patch"

; From Panopoly 1.10
; ADDED 8-11-14
projects[media][patch][2192981] = http://drupal.org/files/issues/media-restore-edit-button-2192981-13.patch
projects[media][patch][2126697] = http://drupal.org/files/issues/media-wysiwyg-alt-title-handling-2126697-27.patch
projects[media][patch][2308487] = http://drupal.org/files/issues/media-alt-title-double-encoded-2308487-1.patch

; Allow us to specify file types on media admin page
; UPDATED 8-11-14
projects[ckeditor][patch][1649464] = "http://drupal.org/files/issues/ckeditor-hook_into_media_admin-1649464-8141819_0.patch"


;; NO LONGER USED MEDIA-CKEDITOR INTEGRATION
	; External plugin declarations are redundant.
	; http://drupal.org/comment/8284591#comment-8284591
	;projects[ckeditor][patch][2158741] = "http://drupal.org/files/issues/ckeditor-remove-external-plugin-declarations-1-alt.patch"

	; Fix media-CKEditor integration
	;projects[ckeditor][patch][1504696] = "http://drupal.org/files/ckeditor_1504696_58.patch"

	; Split media token handling from WYSIWYG integration javascript
	; No longer necessary: added to -dev branch
	;projects[media][patch][] = "http://drupal.org/files/media.filter-js-2.x.patch"

	; Allow us to specify which Media browser tabs should show up when CKEditor button is pushed in the CKEditor settings
	; No longer necessary: broken after 7.x-2.0-alpha3
	;projects[media][patch][1988792] = "http://drupal.org/files/media-ckeditor_integration-1988792-6.patch"

	; Split media token handling from WYSIWYG integration javascript
	; No longer necessary: added to -dev branch
	;projects[media][patch][] = "http://drupal.org/files/media.filter-js-2.x.patch"

	; This has been tested with media-2.0-dev and ckeditor-dev (Dec 13)
	;projects[ckeditor][patch][1504696] = "http://drupal.org/files/issues/ckeditor-accomodate-latest-media-changes-1504696-120.patch"
	;projects[media][patch][1504696] = "http://drupal.org/files/issues/media-add-ckeditor-support-1504696-120.patch"
	
	; Minor tweak to CKEditor admin page
  ; REMOVED 8-11-14 as it is committed
  ; projects[ckeditor][patch][2085245] = "http://drupal.org/files/ckeditor-fix-theme-path-on-admin-page.patch"
