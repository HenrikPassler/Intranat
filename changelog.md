Changelog
---------

The changelog aims to describe higher level changes for each version of the intranet. Multiple minor changes and/or adjusments not worth mentioning may also have been made.

Version 0.3.3 (2016-11-23)
==========================
- Search ordering
- "Current intranet" string is now switched to the name of the current intranet in search depth
- Quicklink to administration unit intranet if available
- Follow/unfollow buttons in intranet selector
- Rearranged profile settings
- Clickable logo in mobile version (take me home)
- Fetch private posts in wp-editor link tool
- Allow "missing profile details" modal to be closed (will be opened again every 5th page view)
- Changed search weighting hopefully improves search results relevance
- Posttype single pages navigation (used in combination with page for post type) is now working better
- Search query optimization
- Improved logics for table of contents

Version 0.3.2 (2016-11-09)
==========================
- New attachment revisions and media replace function
- Author sorting
- Fixed 404 page
- Filter empty titles in table of contents
- Gutter for the "forced subscriptions" list in left sidebar
- Allow protocol-relative urls in acf url field
- Make all Modularity iframes protorol-relative

Version 0.3.1 (2016-11-02)
==========================
- Updated translations
- Hide user greet if not logged in
- Mobile optimizations
- Allow ElasticSearch to index attachments
- Remove manage subscriptions page, use "all intranets" page insterad
- Add information text to the "all intranets" page
- Add follow buttons to the "all intranets" page
- Search button alignment in Chrome
- Show breadcrumbs on main_blog (portalen)
- Profile ui updated (stripe removed)
- Check if sso is available before trying to sso login
- Add option to logout even if signed in with sso
- Tighter rows in "my links" and "my systems"
- User results in search without profile images now gets nicer placeholder

Version 0.3.0 (2016-10-28)
===========================
- ElasticSearch (!)
- Translation updates
- Autosubscribe to user's primary network on user creation
- Improved header ui
- Improved news feed ui
- Improved user search result ui
- Changed UI for the "my links" and "my systems" boxes
- Removed hero area
- Load ReadSpeaker settings from the main site (portalen) for all sites in network
- Load Google Analytics settings from the main site (portalen) ffor all sites in network
- Fixes issue preventing users from selecting multiple administration units in the setup guide
- Sort "my links" by link title
- Quicklink to users "main" administration unit intranet

Version 0.2.16 + 0.2.17 (2016-10-19)
====================================
- Added walkthrough steps
- Updated translations
- Forced subscriptions streamers
- All users can be picked as page author
- Multiple phone numbers in modularity contacts module
- Files module with column support
- ReadSpeaker plugin installed
- Updated site header layout
- Renames "intranet news" module to "news"
- Nicer looking user cards in search
- "Your" links and systems renamed to "My" links and systems

Version 0.2.14 + 0.2.15 (2016-10-13)
====================================
- Updated news feed ui
- Fixed visual editor plugins issue (some plugins did not load)
- Fixed user systems bug (systems did not load)
- Function for checking if user is using a local ip address (ip series specified in config file)
- Fixes profile image issue
- Remove WordPress theme/plugin editor

Version 0.2.13 (2016-10-06)
===========================
- Changes "subscribe" to "follow"
- Makes it possible to close network selector by clicking outside it
- Added missing translations
- Adds loading incidator when following/unfollowing a intranet
- Option to add modules to "edit profile" page
- Adds option to add modules to user edit page
- Adds loading indicator when adding a user link
- Adds inline table support to the content editor (MCE Table Buttons)
- Breadcrums on edit profile page

Version 0.2.12 (2016-09-30)
====================
- Fixes a ton of minor bugs (functions and interface)
- Removes unused code
- Fix table of contents (A-Ö) switch_to_blog issue
- Adds link item icon before each and every intranet in the "select intranet" dropdown
- Private modules
- Post module: Option to set the "title" column label in expandable list table
- Search notices
- Adds ACF UX Collapse plugin
- Add option to attach response email to the feedback function
- Limit feedback responses to one per 5 days and user (cookie)
- WP Editor style formats from Hbg Styleguide
- Updated lix calculator (now calculates headline ratio and more-tag existance)

Version 0.2.11 (2016-09-22)
===========================
- Get vising address from active directory if possible
- Remove leading zero from birthday date on profile
- Adds comments support for the news post type
- Modules on custom templates and pages
- Include modules in search result
- Restrict content to administration units
- Sort target groups alphabetically
- Single page template for incidents
- Fixes issue with profile image display
- Search statistics fixes
- Adds support for global or local target groups
- Deactivated user color scheme selection (default to purple theme)
- Search autocomplete via wp-api

Version 0.2.10 (2016-09-08)
===========================
- Facebook login on profile settings (to fetch profile information from in a later stage)
- Profile settings field for birthday
- Profile setting to make birthday secret
- Profile settings field for hometown
- Birthday notice on user's profile if birthday's not secret
- Add asterix to required fields in profile settings
- Navigation caching (Municipio theme)
- Fixed php warnings and errors
- Truncate long news stories
- Check if SearchWP is installed, throw Exception if not
- Simple caching activated
- Login reminder via JS instead of PHP

Version 0.2.9 (2016-09-02)
==========================
- This release includes a ton o minor bug fixes and performance optimizations
- Attachment (document) revisions plugin created and installed
- Modularity Google Apps addon created and installed (for not only calendar support)


Version 0.2.8 (2016-08-24)
==========================
- Show confirmation notice when profile settings are saved
- Show confirmation notice when subscriptions are saved
- Added icons for each profile settings section
- Added icons for each topbar user menu link
- Show unavailable user systems as "disabled"
- Load favicon from main blog theme settings for all sites in network
- Load logo from main blog theme settings for all sites in network
- Show notice when there's no news to display
- Hide vising address from profile page if not given
- Updated translations
- Truncate news missing the more tag
- Changed edit button style for modules "user systems" and "user links"
- "Incident" post type and module
- Walktrough mode
- Fixes table of contents issue

Version 0.2.7 (2016-08-19)
==========================
- "Workplace" changed into "Visiting address". Fields for specifying "visiting address" added to edit profile
- Intranet specific site options moved to the "Options -> General" section
- Added intranet option to set a intranet as hidden (only visible to administrators and editors of the intranet)
- Adds "Modularity Guides" plugin
- Updated ui for topbar (logo, search and topnav)
- Updated ui for network/intranet selector

Version 0.2.6 (2016-08-17)
==========================
- Lots of bug fixes
- Phone number validation and formation
- New user profile layout
- Wordplace/office field displayed in profile
- Social media icons for user profile
- Added mobile optimizied main menu
- "Forgot password" modal with instructions how to reset password (instructions added via admin)
- Depreacted function wp_get_sites() changed to get_sites()
- Incidate number of search results in each search tab (users, subscriptions, all, current)

Version 0.2.5 (2016-07-08)
==========================
- Fixes some search autocomplete issues
- Adds search autocomplete keyboard navigation
- Adds profile image to users in search autocomplete
- Disable user search if logged out
- Do not show restricted content in search if user do not have permission
- Search input gets clearer search button when focusing input
- New layout for search tabs (search depth level)
- Show user matches right sidebar box in search

Version 0.2.4 (2016-07-06)
==========================
- Require Active Directory Integration (AD1) plugin
- Adds "edit" and "remove" actions to the user systems admin
- Added shortcode "explain" to Municipio-theme for inserting questionmarks with tooltips in post_content
- Adds metabox to pages for setting custom table of contents title
- Split user edit page into sections
- User can now add skills to profile (search implementation needed)
- User can now add responsibilities to profile (search implementation needed)
- Updated translations
- Use network site title as "logotype"
- User profile compleation guide if missing profile information
- Search autocomplete
- Show forced user systems in the systems module
- Linking images in the image module

Version 0.2.3 (2016-06-29)
==========================
- Adds Broken Link Detector plugin
- Do not show search pagination of there's only one page
- Add left sidebar menu to search result page
- Search level depending on is_main_site
- Perform search when switching search level/depth tabs
- Gravity Forms css
- Table of content filtering
- And a funny surprise!

Version 0.2.1 (2016-06-17)
==========================
- Fixes issue with special charachters in the "table of contents" list
- Require Modularity Dictionary extension (hard to understand words list)-
- Option to set a private page as blog page
- Google Plus support added to social media feed module
- Set default color scheme to purple
- Logged in user can choose personal color theme in settings
- Sort news based on news ranking algorithm

Version 0.2.0 (2016-06-09)
==========================

**BREAKING UPDATE:** This update will need a new database table structure for the "user system" functionality. To fix the issue remove the currently used table from the database and a new one will be created automatically. Also make sure to run the following sql query to remove old data. ```DELETE FROM intranet_usermeta WHERE meta_key = 'user_systems'```

- Adds backend (admin) settings for "my systems" link list
- Adds frontend user administration for the "my systems" link list
- Adds filter for internal user systems (only show internal systems when visiting from specified IP addresses)
- Adds table of contents page (/table-of-contents)
- Adds administration interface for administration units
- Adds file archive module
- Filter internally only systems from beeing displayed outside specified IP patterns
- Adds content scheduling plugin

Version 0.1.4 (2016-06-02)
==========================
- Fixes issue where "intranet news" module showed the "front page" as a news item
- Added Swedish translation
- Label that shows which network a news item is fetched from
- User search
- Adds Swedish keyword stemmer for Search WP
- Fixes inconsistency with the top search field among different browsers
- Made the top bar header responsive
- Fixes issue where network search did not work for logged out users
- Better listing of sites in network (no post object needed to create the page)
- General improvements to UI responsiveness

Version 0.1.3 (2016-05-31)
==========================
- Adds user links module for users to add their own links to
- Target user groups with modules
- Target content to specific user groups
- Add editor button for targeting post content to specific user groups
- Alarms/malfunction plugin
- Adds Search WP with multisite search modifications
- Adds option to search all, subscribed or current site (subscribed by default)

Version 0.1.2 (2016-05-27)
==========================
- Adds display options to the "intranet news" module
- Link the "page manager" user to the user profile (if logged in)
- Redirect user to referer on logout
- Target groups manager for network admins
- Metabox for settings tagrget group restrictions per post
- Restrict content to target groups if set (not working across all plugins since there's no good hook to make it general)
- Option to pin news to top ("Intranet news" module and news)
- Display date published for news
- Users who cant edit_posts will no longer be able to visit wp_admin and will no longer see the adminbar

Version 0.1.1 (2016-05-25)
==========================
- Fixes broken "session timeout" login modal
- Fixes issue where multiple "network sites" pages were created on the main site
- Adds a news feature
- Adds "about me" field to edit profile
- Adds "manage subscriptions" function
- Handle private pages/posts with WP Core visibility setting
- Site default settings improved
- Include the "Customer Feedback" plugin (https://github.com/helsingborg-stad/Customer-feedback) via composer
- Rename the "author" metabox in admin (for pages) to "Page manager" and make it visible by default
- Ask for first name and last name when registering a new user via network admin

Version 0.1.0 (2016-05-20)
==========================
First beta-release
