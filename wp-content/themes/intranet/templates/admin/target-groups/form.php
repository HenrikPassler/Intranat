<div class="wrap" id="modularity-options">

    <h1><?php _e('Manage target groups', 'municipio-intranet'); ?></h1>

    <form method="post">
        <input type="hidden" name="manage-target-tags-action" value="save">

        <?php wp_nonce_field('manage-target-tags'); ?>

        <div id="poststuff">
            <div id="post-body" class="metabox-holder columns-<?php echo 1 == get_current_screen()->get_columns() ? '1' : '2'; ?>">

                <div id="post-body-content" style="display:none;">
                    <!-- #post-body-content -->
                </div>

                <div id="postbox-container-1" class="postbox-container">
                    <div class="postbox">
                        <h2 class="ui-sortable-handle"><?php _e('Save', 'municipio-intranet'); ?></h2>
                        <div class="inside">
                            <div id="major-publishing-actions" style="margin: -7px -12px -12px;width: calc(100% + 24px);">
                                <div id="publishing-action">
                                    <span class="spinner"></span>
                                    <input type="submit" value="<?php _e('Save', 'municipio-intranet'); ?>" class="button button-primary button-large" id="publish" name="publish">
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="postbox-container-2" class="postbox-container">
                    <div class="postbox">
                        <h2 class="hndle ui-sortable-handle" style="cursor:default;"><?php _e('Tags', 'municipio-intranet'); ?></h2>
                        <div class="inside tag-manager-tags">
                            <?php foreach (\Intranet\User\TargetGroups::getAvailableGroups(false) as $tag) : ?>
                                <div class="tag-manager-tag">
                                    <?php echo $tag->tag; ?> <?php echo \Intranet\User\AdministrationUnits::getAdministrationUnit($tag->administration_unit) ? '(' . \Intranet\User\AdministrationUnits::getAdministrationUnit($tag->administration_unit) . ')' : '(' . __('All') . ')'; ?>
                                    <input type="hidden" name="tag-manager-tags[]" value="<?php echo $tag->tag; ?>">
                                    <div class="tag-manager-actions">
                                        <button class="btn-plain tag-manager-delete-tag"><span class="dashicons dashicons-trash"></span></button>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div class="postbox">
                        <h2 class="hndle ui-sortable-handle" style="cursor:default;"><?php _e('Add tag', 'municipio-intranet'); ?></h2>
                        <div class="inside">
                            <p>
                                <input type="text" placeholder="<?php _e('Target group name', 'municipio-intranet'); ?>…" data-tag-input>
                                <select name="administration_unit" data-tag-unit-input>
                                    <option value=""><?php _e('All', 'municipio-intranet'); ?> <?php _e('administration units', 'municipio-intranet'); ?></option>
                                    <?php foreach (\Intranet\User\AdministrationUnits::getAdministrationUnits() as $unit) : ?>
                                    <option value="<?php echo $unit->id; ?>"><?php echo $unit->name; ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <button class="button button-primary" data-action="tag-manager-add-tag"><?php _e('Add', 'municipio-intranet'); ?></button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
