<?php

namespace Intranet\User;

class Registration
{
    protected $defaultRole = 'subscriber';

    public function __construct()
    {
        // Add new user to all sites
        add_action('wpmu_activate_user', array($this, 'addDefaultRole'), 10, 1);
        add_action('wpmu_new_user', array($this, 'addDefaultRole'), 10, 1);
        add_action('user_register', array($this, 'addDefaultRole'), 10, 1);

        // Add existing users to new or activated sites
        add_action('wpmu_new_blog', array($this, 'addUsersToNewBlog'));
        add_action('wpmu_activate_blog', array($this, 'activateBlogUser'), 10, 2);

        // Set default display name
        add_action('network_user_new_form', array($this, 'addNameFieldsToUserRegistration'));
        add_action('wpmu_new_user', array($this, 'saveUserRegistrationName'), 10, 1);
    }

    /**
     * Adds the firstname and lastname fields to the network user registration
     */
    public function addNameFieldsToUserRegistration()
    {
        echo '
            <table class="form-table">
                <tr class="form-field form-required">
                    <th scope="row"><label for="first_name">' . __('First name') . '</label></th>
                    <td><input type="text" class="regular-text" name="user[first_name]" id="first_name" autocapitalize="true" autocorrect="off" maxlength="60" required /></td>
                </tr>
                <tr class="form-field form-required">
                    <th scope="row"><label for="last_name">' . __('Last name') . '</label></th>
                    <td><input type="text" class="regular-text" name="user[last_name]" id="last_name" autocapitalize="true" autocorrect="off" maxlength="60" required /></td>
                </tr>
            </table>
        ';
    }

    /**
     * Save the user's firstname and lastname on network registration
     * @param  integer $userId The user's id
     * @return void
     */
    public function saveUserRegistrationName($userId)
    {
        $firstName = isset($_POST['user']['first_name']) && !empty($_POST['user']['first_name']) ? sanitize_text_field($_POST['user']['first_name']) : '';
        $lastName = isset($_POST['user']['last_name']) && !empty($_POST['user']['last_name']) ? sanitize_text_field($_POST['user']['last_name']) : '';

        update_user_meta($userId, 'first_name', $firstName);
        update_user_meta($userId, 'last_name', $lastName);

        wp_update_user(array(
            'ID' => $userId,
            'display_name' => $firstName . ' ' . $lastName
        ));
    }

    /**
     * Adds all users to the blog when
     * @param integer $blogId The newly created blog's ID
     */
    public function addUsersToNewBlog($blogId)
    {
        global $wpdb;
        $users = $wpdb->get_results("SELECT ID FROM $wpdb->users");

        foreach ($users as $user) {
            $this->addDefaultRole($user->ID, $blogId);
        }

        return true;
    }

    /**
     * Add user role when activated
     * @param  integer $blogId Blog id
     * @param  integer $userId User id
     * @return boolean
     */
    public function activateBlogUser($blogId, $userId)
    {
        return $this->addDefaultRole($userId, $blogId);
    }

    /**
     * Adds the specified userid to a specified or all blogs
     * @param integer $userId User id to add
     * @param integer $blogId Specific blog_id (leave null for all)
     */
    public function addDefaultRole($userId, $blogId = null)
    {
        // Single
        if ($blogId) {
            if (is_user_member_of_blog($userId, $blogId)) {
                return false;
            }

            add_user_to_blog($blogId, $userId, $this->defaultRole);
            return true;
        }

        // Multiple
        $sites = \Intranet\Helper\Multisite::getSitesList(true);

        foreach ($sites as $site) {
            if (is_user_member_of_blog($userId, $site['blog_id'])) {
                continue;
            }

            add_user_to_blog($site['blog_id'], $userId, $this->defaultRole);
        }

        return true;
    }
}