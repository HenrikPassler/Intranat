<?php

namespace Intranet\SearchWp;

class General
{
    public function __construct()
    {
        add_filter('searchwp_and_logic', '__return_true');
        add_filter('searchwp_keyword_stem_locale', '__return_true');
        add_filter('searchwp_common_words', array($this, 'commonWords'));
        add_filter('searchwp_custom_stemmer', array($this, 'stem'));

        // Disable search query logging by default (the logging will be handled specificly by the Search class)
        add_filter('searchwp_log_search', '__return_false', 5);

        // Sync term synonyms
        add_action('update_option_swp_termsyn_settings', array($this, 'copyTermsynSettings'), 10, 3);

        /*
        add_action('wp_ajax_search_autocomplete', array($this, 'ajaxSearch'));
        add_action('wp_ajax_nopriv_search_autocomplete', array($this, 'ajaxSearch'));
        */
    }

    /**
     * Syncs term synonyms across all blogs
     * @param  mixed  $old    Old option value
     * @param  mixed  $new    New option value
     * @param  string $option Option key
     * @return void
     */
    public function copyTermsynSettings($old, $new, $option)
    {
        $sites = \Intranet\Helper\Multisite::getSitesList(true, true);
        $sites = array_filter($sites, function ($item) {
            return $item != get_current_blog_id();
        });

        remove_action('update_option_swp_termsyn_settings', array($this, 'copyTermsynSettings'));

        foreach ($sites as $site) {
            switch_to_blog($site);
            update_option($option, $new);
            restore_current_blog();
        }

        add_action('update_option_swp_termsyn_settings', array($this, 'copyTermsynSettings'), 10, 3);

        return;
    }

    public static function jsonSearch($data)
    {
        global $wp_query;
        $wp_query->set('s', sanitize_text_field($data['s']));

        add_filter('searchwp_log_search', '__return_false');

        $search = new \Intranet\SearchWp\Search('ajax');

        return $search->results;
    }

    /**
     * Do the stem
     * @param  string $unstemmed Unstemmed word
     * @return string            Stemmed word
     */
    public function stem($unstemmed)
    {
        // Make sure that we can stem the word
        if (ctype_alpha($unstemmed) !== false) {
            $stemmer = new \Intranet\SearchWp\Stemmer\Swedish();
            $stemmed = $stemmer->stem($unstemmed);
            unset($stemmer);

            return sanitize_text_field($stemmed);
        }

        return $unstemmed;
    }

    /**
     * Common swedish words
     * Source: http://www.ranks.nl/stopwords/swedish
     * @param  array $words  Original words
     * @return array         Modified words
     */
    public function commonWords($words)
    {
        $words = array(
            'aderton', 'adertonde', 'adjö', 'aldrig', 'alla', 'allas', 'allt', 'alltid', 'alltså', 'andra', 'andras', 'annan', 'annat', 'artonde', 'artonn', 'att', 'av',
            'bakom', 'bara', 'behöva', 'behövas', 'behövde', 'behövt', 'beslut', 'beslutat', 'beslutit', 'bland', 'blev', 'bli', 'blir', 'blivit', 'bort', 'borta', 'bra', 'bäst', 'bättre', 'båda', 'bådas',
            'dag', 'dagar', 'dagarna', 'dagen', 'de', 'del', 'delen', 'dem', 'den', 'deras', 'dess', 'det', 'detta', 'dig', 'din', 'dina', 'dit', 'ditt', 'dock', 'du', 'där', 'därför', 'då',
            'efter', 'eftersom', 'elfte', 'eller', 'elva', 'en', 'enkel', 'enkelt', 'enkla', 'enligt', 'er', 'era', 'ert', 'ett', 'ettusen',
            'fanns', 'fem', 'femte', 'femtio', 'femtionde', 'femton', 'femtonde',
            'fick', 'fin', 'finnas', 'finns', 'fjorton', 'fjortonde', 'fjärde', 'fler', 'flera', 'flesta', 'fram', 'framför', 'från', 'fyra', 'fyrtio', 'fyrtionde', 'få', 'får', 'fått', 'följande', 'för', 'före', 'förlåt', 'förra', 'första',
            'genast', 'genom', 'gick', 'gjorde', 'gjort', 'god', 'goda', 'godare', 'godast', 'gott', 'gälla', 'gäller', 'gällt', 'gärna', 'gå', 'går', 'gått', 'gör', 'göra',
            'ha', 'hade', 'haft', 'han', 'hans', 'har', 'heller', 'hellre', 'helst', 'helt', 'henne', 'hennes', 'hit', 'hon', 'honom', 'hundra', 'hundraen', 'hundraett', 'hur', 'här', 'hög', 'höger', 'högre', 'högst',
            'i', 'ibland', 'idag', 'igen', 'igår', 'imorgon', 'in', 'inför', 'inga', 'ingen', 'ingenting', 'inget', 'innan', 'inne', 'inom', 'inte', 'inuti',
            'ja', 'jag', 'jämfört',
            'kan', 'kanske', 'knappast', 'kom', 'komma', 'kommer', 'kommit', 'kr', 'kunde', 'kunna', 'kunnat', 'kvar',
            'legat', 'ligga', 'ligger', 'lika', 'likställd', 'likställda', 'lilla', 'lite', 'liten', 'litet', 'länge', 'längre', 'längst', 'lätt', 'lättare', 'lättast', 'långsam', 'långsammare', 'långsammast', 'långsamt', 'långt',
            'man', 'med', 'mellan', 'men', 'mer', 'mera', 'mest', 'mig', 'min', 'mina', 'mindre', 'minst', 'mitt', 'mittemot', 'mot', 'mycket', 'många', 'måste', 'möjlig', 'möjligen', 'möjligt', 'möjligtvis',
            'ned', 'nederst', 'nedersta', 'nedre', 'nej', 'ner', 'ni', 'nio', 'nionde', 'nittio', 'nittionde', 'nitton', 'nittonde', 'nog', 'noll', 'nr', 'nu', 'nummer', 'när', 'nästa', 'någon', 'någonting', 'något', 'några', 'nödvändig', 'nödvändiga', 'nödvändigt', 'nödvändigtvis',
            'och', 'också', 'ofta', 'oftast', 'olika', 'olikt', 'om', 'oss',
            'på',
            'rakt', 'redan', 'rätt',
            'sade', 'sagt', 'samma', 'sedan', 'senare', 'senast', 'sent', 'sex', 'sextio', 'sextionde', 'sexton', 'sextonde', 'sig', 'sin', 'sina', 'sist', 'sista', 'siste', 'sitt', 'sju', 'sjunde', 'sjuttio', 'sjuttionde', 'sjutton', 'sjuttonde', 'sjätte', 'ska', 'skall', 'skulle', 'slutligen', 'små', 'smått', 'snart', 'som', 'stor', 'stora', 'stort', 'större', 'störst', 'säga', 'säger', 'sämre', 'sämst', 'så',
            'tack', 'tidig', 'tidigare', 'tidigast', 'tidigt', 'till', 'tills', 'tillsammans', 'tio', 'tionde', 'tjugo', 'tjugoen', 'tjugoett', 'tjugonde', 'tjugotre', 'tjugotvå', 'tjungo', 'tolfte', 'tolv', 'tre', 'tredje', 'trettio', 'trettionde', 'tretton', 'trettonde', 'två', 'tvåhundra',
            'under', 'upp', 'ur', 'ursäkt', 'ut', 'utan', 'utanför', 'ute',
            'vad', 'var', 'vara', 'varför', 'varifrån', 'varit', 'varken', 'varsågod', 'vart', 'vem', 'vems', 'verkligen', 'vi', 'vid', 'vidare', 'viktig', 'viktigare', 'viktigast', 'viktigt', 'vilka', 'vilken', 'vilket', 'vill', 'vänster', 'vänstra', 'värre', 'vår', 'våra', 'vårt',
            'än', 'ännu', 'även', 'åtminstone', 'åtta', 'åttio', 'åttionde', 'åttonde',
            'över', 'övermorgon', 'överst', 'övre'
        );

        return $words;
    }
}
