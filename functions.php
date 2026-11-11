<?php

function david_brandon_enqueue_assets() {
    wp_enqueue_style(
        'db-style',
        get_stylesheet_uri(),
        [],
        filemtime( get_stylesheet_directory() . '/style.css' )
    );

    wp_enqueue_style(
        'db-bundle',
        get_theme_file_uri( '/build/index.css' ),
        [ 'db-style' ],
        filemtime( get_theme_file_path( '/build/index.css' ) )
    );

    wp_enqueue_script(
        'db-script',
        get_theme_file_uri( '/build/index.js' ),
        [],
        filemtime( get_theme_file_path( '/build/index.js' ) ),
        true
    );
}

add_action( 'wp_enqueue_scripts', 'david_brandon_enqueue_assets' );