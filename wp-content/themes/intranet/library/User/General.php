<?php

namespace Intranet\User;

class General
{
    public function __construct()
    {
        add_action('admin_init', array($this, 'protectWpAdmin'));
    }

    public function protectWpAdmin()
    {
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return;
        }

        if (!current_user_can('edit_posts')) {
            wp_redirect(home_url());
        }
    }

    /**
     * Search users
     * @param  string $keyword Search keyword
     * @return array           Matching users
     */
    public static function searchUsers($keyword)
    {
        $userSearch = new \WP_User_Query(array(
            'search' => '*' . $keyword . '*',
        ));

        $userMetaSearch = new \WP_User_Query(array(
            'meta_query' => array(
                'relation' => 'OR',
                array(
                    'key' => 'first_name',
                    'value' => $keyword,
                    'compare' => 'LIKE'
                ),
                array(
                    'key' => 'last_name',
                    'value' => $keyword,
                    'compare' => 'LIKE'
                ),
                array(
                    'key' => 'user_responsibilities',
                    'value' => $keyword,
                    'compare' => 'LIKE'
                ),
                array(
                    'key' => 'user_skills',
                    'value' => $keyword,
                    'compare' => 'LIKE'
                )
            )
        ));

        $users = array();
        foreach ($userSearch->get_results() as $user) {
            $users[$user->ID] = $user->data;
            $users[$user->ID]->name = municipio_intranet_get_user_full_name($user->ID);
            $users[$user->ID]->profileUrl = municipio_intranet_get_user_profile_url($user->ID);
        }

        foreach ($userMetaSearch->get_results() as $user) {
            if (array_key_exists($user->ID, $users)) {
                continue;
            }

            $users[$user->ID] = $user->data;
        }

        return $users;
    }

    public static function greet()
    {
        // General greetings
        $greetings = array(

            // All day greetings
            'day' => array(
                __('Hi %s', 'municipio-intranet'),
                __('Hello %s', 'municipio-intranet'),
                __('How is it going %s?', 'municipio-intranet'),
                __('Good to see you, %s', 'municipio-intranet'),
                __('Howdy %s', 'municipio-intranet')
            ),

            // Morning greetings
            'morning' => array(
                __('Morning! A good day is on it\'s way, %s', 'municipio-intranet'),
                __('Good morning %s', 'municipio-intranet'),
                __('What a lovely morning, %s', 'municipio-intranet'),
                __('Wakey-wakey, rise and shine %s!', 'municipio-intranet'),
                __('Have a great day %s', 'municipio-intranet'),
                __('%s you up already?', 'municipio-intranet')
            ),

            // Afternoon greetings
            'afternoon' => array(
                __('Good afternoon %s', 'municipio-intranet'),
                __('Greetings, %s', 'municipio-intranet'),
                __('Keep going strong %s!', 'municipio-intranet'),
                __('Have a great day %s', 'municipio-intranet')
            ),

            // Eavning greetings
            'eavning' => array(
                __('It\'s getting late, %s', 'municipio-intranet'),
                __('Good eavning %s', 'municipio-intranet')
            ),

            // Night greetings
            'night' => array(
                __('Good night %s', 'municipio-intranet'),
                __('Still going strong, %s?', 'municipio-intranet')
            ),

        );

        $greetingKey = array('day');
        $time = current_time('H:i');

        if ($time >= '00:00' && $time <= '04:59') {
            $greetingKey = aray('day', 'night');
        } elseif ($time >= '05:00' && $time <= '08:59') {
            $greetingKey = array('morning');
        } elseif ($time >= '12:30' && $time <= '17:59') {
            $greetingKey = array('day', 'afternoon');
        } elseif ($time >= '18:00' && $time <= '21:59') {
            $greetingKey = array('day', 'eavning');
        } elseif ($time >= '22:00' && $time <= '23:59') {
            $greetingKey = array('day', 'night');
        }

        // Pick a random greeting from the greeting key
        $greetingKey = $greetingKey[array_rand($greetingKey, 1)];
        $greeting = $greetings[$greetingKey][array_rand($greetings[$greetingKey], 1)];

        // Special occations
        // New year
        if (date('m-d') == '12-31' || date('m-d') == '01-01') {
            $greeting = _('Happy new year %s', 'municipio-intranet');
        }

        // Christmas
        if (date('m-d') == '12-24') {
            $greeting = _('Merry christmas %s', 'municipio-intranet');
        }

        return sprintf($greeting, get_user_meta(get_current_user_id(), 'first_name', true));
    }
}
