<?php
/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB2 directory)
 *
 * Be sure to replace all instances of 'ljsherlock_' with your project's prefix.
 * http://nacin.com/2010/05/11/in-wordpress-prefix-everything/
 *
 * @category YourThemeOrPlugin
 * @package  Demo_CMB2
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/CMB2/CMB2
 */

namespace Includes\Classes;

class CMB2
{

    public static $prefix = '_ljsherlock_meta_';

    public static function init()
    {
        if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
        	require_once dirname( __FILE__ ) . '/cmb2/init.php';
        } elseif ( file_exists( dirname( __FILE__ ) . '/CMB_2/init.php' ) ) {
        	require_once dirname( __FILE__ ) . '/CMB_2/init.php';
        }

        add_action( 'cmb2_admin_init', array( __CLASS__, 'ljsherlock_register_front_page_meta') );
        add_action( 'cmb2_admin_init', array( __CLASS__, 'ljsherlock_register_project_meta') );
        add_action( 'cmb2_admin_init', array( __CLASS__, 'myprefix_register_theme_options_metabox') );
        add_action( 'cmb2_admin_init', array( __CLASS__, 'myprefix_register_pages_meta') );

    }

    /**
        PAges

     * Hook in and add a metaboxes that only appears for the 'Project' posts
     * @return
     * @
     */
     public static function myprefix_register_pages_meta()
     {

         $cmb_pages = new_cmb2_box( array(
             'id'           => self::$prefix . 'pages_metabox',
             'title'        => esc_html__( 'Pages Meta', 'cmb2' ),
             'object_types' => array( 'page', 'post', 'work' ), // Post type
             'context'      => 'normal',
             'priority'     => 'high',
             'show_names'   => true, // Show field names on the left
         ) );

         $cmb_pages->add_field(array(
             'name' => esc_html__( 'Subtitle', 'cmb2' ),
             'id'   => self::$prefix . 'subtitle',
             'type' => 'textarea_small',
         ));
     }


    /**
        Front Page

     * Hook in and add a metaboxes that only appears for the 'Project' posts
     * @return
     * @
     */
    public static function ljsherlock_register_front_page_meta()
    {

        $cmb_frontpage = new_cmb2_box( array(
            'id'           => self::$prefix . 'front_page_metabox',
            'title'        => esc_html__( 'Front Page Meta', 'cmb2' ),
            'object_types' => array( 'page' ), // Post type
            'context'      => 'normal',
            'priority'     => 'high',
            'show_names'   => true, // Show field names on the left
            'show_on'      => array(
                'id' => array( 5 ),
            ), // Specific post IDs to display this metabox
        ) );


        $cmb_frontpage->add_field(array(
            'desc' => esc_html__( 'Captions to display on the side of the logo', 'cmb2' ),
            'id'   => self::$prefix . 'hero_caption_title',
            'type' => 'title',
        ));

        $cmb_frontpage->add_field(array(
            'name' => esc_html__( 'Hero Caption Left', 'cmb2' ),
            'id'   => self::$prefix . 'hero_caption_left',
            'type' => 'text',
        ));

        $cmb_frontpage->add_field(array(
            'name' => esc_html__( 'Hero Caption Right', 'cmb2' ),
            'id'   => self::$prefix . 'hero_caption_right',
            'type' => 'text',
        ));
    }


    /**
        Project Posts

     * Hook in and add a metaboxes that only appears for the 'Project' posts
     * @return Colours
     * @return What I did
     * @return Browser Image
     * @return Primary Image
     * @return Secondary Images
     */
    public static function ljsherlock_register_project_meta()
    {
        /**
         * Metabox to be displayed on a single page ID
         */
        $cmb_project = new_cmb2_box( array(
            'id'           => self::$prefix . 'project_metabox',
            'title'        => esc_html__( 'Projects Meta', 'cmb2' ),
            'object_types' => array( 'work' ), // Post type
            'context'      => 'normal',
            'priority'     => 'high',
            'show_names'   => true, // Show field names on the left
            // 'show_on'      => array(
            //     'id' => array( 5 ),
            //), // Specific post IDs to display this metabox
        ) );

        $colours = $cmb_project->add_field( array(
            'name' => esc_html__( 'Project Colours', 'cmb2' ),
            'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
            'id'   => self::$prefix . 'project_colours',
            'type' => 'group',
            'options' => array(
                'sortable'      => true, // beta
            ),
            'repeatable' => true,
        ) );

        $cmb_project->add_group_field($colours, array(
            'name'    => __( 'Colour Name ', 'cmb2' ),
            'id'      => 'name',
            'type'    => 'text',
        ) );

        $cmb_project->add_group_field($colours, array(
            'name'    => __( 'Colour Hex ', 'cmb2' ),
            'id'      => 'hex',
            'type'    => 'colorpicker',
        ) );

        $cmb_project->add_field( array(
            'name' => esc_html__( 'Browser Image', 'cmb2' ),
            'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
            'id'   => self::$prefix . 'browser_image',
            'type' => 'file',
        ) );

        $cmb_project->add_field( array(
            'name' => esc_html__( 'Primary Image', 'cmb2' ),
            'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
            'id'   => self::$prefix . 'primary_image',
            'type' => 'file',
        ) );

        $project_images = $cmb_project->add_field( array(
            'name' => esc_html__( 'Secondary Images', 'cmb2' ),
            'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
            'id'   => self::$prefix . 'secondary_images',
            'type' => 'group',
        ) );

        $cmb_project->add_group_field($project_images, array(
            'name' => esc_html__( 'Image', 'cmb2' ),
            // 'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
            'id'   => 'src',
            'type' => 'file',
        ) );

        $cmb_project->add_group_field($project_images, array(
            'name' => esc_html__( 'Description (for alt)', 'cmb2' ),
            // 'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
            'id'   => 'alt',
            'type' => 'text',
        ) );
    }

    /**
        Theme Options
    */
    /**
     * Hook in and register a metabox to handle a theme options page and adds a menu item.
     */
    public static function myprefix_register_theme_options_metabox()
    {
    	/**
    	 * Registers options page menu item and form.
    	 */


    	$cmb_options = new_cmb2_box( array(
    		'id'           => 'myprefix_option_metabox',
    		'title'        => esc_html__( 'Theme Options', 'myprefix' ),
    		'object_types' => array( 'options-page' ),
    		/*
    		 * The following parameters are specific to the options-page box
    		 * Several of these parameters are passed along to add_menu_page()/add_submenu_page().
    		 */
    		'option_key'      => 'myprefix_options', // The option key and admin menu page slug.
    		// 'icon_url'        => 'dashicons-palmtree', // Menu icon. Only applicable if 'parent_slug' is left empty.
    		// 'menu_title'      => esc_html__( 'Options', 'myprefix' ), // Falls back to 'title' (above).
    		// 'parent_slug'     => 'themes.php', // Make options page a submenu item of the themes menu.
    		// 'capability'      => 'manage_options', // Cap required to view options-page.
    		// 'position'        => 1, // Menu position. Only applicable if 'parent_slug' is left empty.
    		// 'admin_menu_hook' => 'network_admin_menu', // 'network_admin_menu' to add network-level options page.
    		// 'display_cb'      => false, // Override the options-page form output (CMB2_Hookup::options_page_output()).
    		// 'save_button'     => esc_html__( 'Save Theme Options', 'myprefix' ), // The text for the options-page save button. Defaults to 'Save'.
    	) );
    	/*
    	 * Options fields ids only need
    	 * to be unique within this box.
    	 * Prefix is not needed.
    	 */

         $cmb_options->add_field(array(
            //  'name' => esc_html__( 'Description', 'cmb2' ),
             'desc' => esc_html__( 'The options below are specific to this theme only.', 'cmb2' ),
             'id'   => self::$prefix . 'title',
             'type' => 'title',
         ) );

         $cmb_options->add_field( array(
     		'name'    => __( 'Theme Colour ', 'cmb2' ),
     		'id'      => self::$prefix . 'theme_colour',
     		'type'    => 'colorpicker',
     	) );

         $cmb_options->add_field(array(
             'name' => esc_html__( 'Instagram Access Token', 'cmb2' ),
             'desc' => esc_html__( 'The Instagram API requires authentication - specifically requests made on behalf of a user. Authenticated requests require an access_token. These tokens are unique to a user and should be stored securely. Access tokens may expire at any time in the future.', 'cmb2' ),
             'id'   => self::$prefix . 'instagram_at',
             'type' => 'textarea_small',
         ));

    	$cmb_options->add_field( array(
    		'name'    => __( 'Contact Email ', 'cmb2' ),
    		'id'      => self::$prefix . 'contact_email',
    		'type'    => 'text_email',
    	) );

        $cmb_options->add_field( array(
    		'name'    => __( 'Contact Telephone ', 'cmb2' ),
    		'id'      => self::$prefix . 'contact_telephone',
    		'type'    => 'text',
    	) );

        $socialIcons = $cmb_options->add_field( array(
            'name'    => __( 'Social Media Links ', 'cmb2' ),
    		'id'      => self::$prefix . 'social_media_links',
        	'type'        => 'group',
        	// 'description' => __( 'Generates reusable form entries', 'cmb2' ),
        	// 'repeatable'  => false, // use false if you want non-repeatable group
        	'options'     => array(
        		'group_title'   => __( 'Entry {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
        		'add_button'    => __( 'Add Another Icon', 'cmb2' ),
        		'remove_button' => __( 'Remove Icon', 'cmb2' ),
        		'sortable'      => true, // beta
        		// 'closed'     => true, // true to have the groups closed by default
        	),
        ) );

        $cmb_options->add_group_field($socialIcons, array(
    		'name'    => __( 'Link ', 'cmb2' ),
    		'id'      => 'link',
    		'type'    => 'text',
    	) );

        $cmb_options->add_group_field($socialIcons, array(
    		'name'    => __( 'Icon Slug ', 'cmb2' ),
    		'id'      => 'icon',
    		'type'    => 'text',
    	) );
    }

    /**
     * Wrapper function around cmb2_get_option
     * @since  0.1.0
     * @param  string $key     Options array key
     * @param  mixed  $default Optional default value
     * @return mixed           Option value
     */
    public static function myprefix_get_option( $key = '', $default = false ) {
    	if ( function_exists( 'cmb2_get_option' ) ) {
    		// Use cmb2_get_option as it passes through some key filters.
    		return cmb2_get_option( 'myprefix_options', $key, $default );
    	}
    	// Fallback to get_option if CMB2 is not loaded yet.
    	$opts = get_option( 'myprefix_options', $default );
    	$val = $default;
    	if ( 'all' == $key ) {
    		$val = $opts;
    	} elseif ( is_array( $opts ) && array_key_exists( $key, $opts ) && false !== $opts[ $key ] ) {
    		$val = $opts[ $key ];
    	}
    	return $val;
    }
}
