<?php

namespace Intranet\Search;

class General
{
    public static function jsonSearch($data)
    {
        $q = sanitize_text_field($data['s']);

        $query = new \WP_Query(array(
            's' => $q,
            'orderby' => 'relevance',
            'sites' => 'all'
        ));

        $users = array();
        if (is_user_logged_in()) {
            $users = \Intranet\User\General::searchUsers($q);
        }

        return array(
            'content' => array_slice($query->posts, 0, 5),
            'users' => array_slice($users, 0, 5)
        );
    }
}