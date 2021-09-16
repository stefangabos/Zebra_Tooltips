/**
 *  Zebra_Tooltips
 *
 *  Zebra_Tooltips is a lightweight (around 5KB minified, 1.9KB gzipped) jQuery tooltips plugin for creating simple but
 *  smart and visually attractive tooltips, featuring nice transitions, 4 themes, and offering a wide range of configuration
 *  options.
 *
 *  Besides the default behavior of tooltips showing when user hovers the element, tooltips may also be shown and hidden
 *  programmatically. When shown programmatically, the tooltips feature a "close" button and clicking it will be the only
 *  way of closing tooltips opened this way. This is useful for drawing users' attention to specific areas of a page
 *  (like error messages after validating a form).
 *
 *  Tooltips can be aligned left, center or right, relative to the parent element, as well as above or below the parent
 *  element. The library detects the browser window's edges and will make sure that the tooltips are always in the viewport.
 *
 *  The tooltips are created using NO IMAGES and falls back gracefully for browsers that don't support all the fancy stuff;
 *  also, tooltips can be attached to any element not just anchor tags!
 *
 *  Works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 6+
 *
 *  Read more {@link https://github.com/stefangabos/Zebra_Tooltips/ here}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    2.1.1 (last revision: July 19, 2020)
 *  @copyright  (c) 2012 - 2020 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_Tooltips
 */
(function($) {

    'use strict';

    $.Zebra_Tooltips = function(elements, options) {

        // so you can tell the version number even if all you have is the minified source
        this.version = '2.1.1';

        var defaults = {

                animation_speed:    250,            //  The speed (in milliseconds) of the animation used to show/hide tooltips.
                                                    //
                                                    //  Default is 250

                animation_offset:   20,             //  The number of pixels the tooltips should use to "slide" into position.
                                                    //
                                                    //  Set to 0 for no sliding.
                                                    //
                                                    //  Default is 20

                close_on_click:     true,           //  By default, if the users clicks when over a tooltip, the tooltip will
                                                    //  close (if the tooltip was not open using the API, that is)
                                                    //
                                                    //  Set this property to FALSE to prevent this behavior.
                                                    //
                                                    //  Default is TRUE

                content:            false,          //  The content of the tooltip.
                                                    //
                                                    //  By default, the content of the tooltip is taken from the "title"
                                                    //  attribute of the element the tooltip is attached to and has priority
                                                    //  over this property (meaning that if the "title" attribute is set,
                                                    //  the value of this property is ignored).
                                                    //
                                                    //  Use this property to set the content of the tooltip when you can't
                                                    //  or don't want to use the "title" attribute.
                                                    //
                                                    //  Default is FALSE

                hide_delay:         100,            //  The delay (in milliseconds) after which to hide the tooltip once the
                                                    //  mouse moves away from the trigger element or the tooltip.
                                                    //
                                                    //  Default is 100

                keep_visible:       true,           //  Should tooltips remain visible also when the mouse cursor is over
                                                    //  the tooltips or should the tooltips be visible strictly when the mouse
                                                    //  cursor is over the parent elements.
                                                    //
                                                    //  Default is TRUE

                max_width:          250,            //  Maximum width of the tooltip's content;
                                                    //
                                                    //  Default is 250

                opacity:            '.95',          //  The tooltip's opacity.
                                                    //
                                                    //  Must be a value between 0 (completely transparent) and 1 (completely
                                                    //  opaque)
                                                    //
                                                    //  Default is .85

                position:           'center',       //  The tooltip's position, relative to the trigger element.
                                                    //
                                                    //  Can be 'center', 'left' or 'right'.
                                                    //
                                                    //  Default is 'center'

                prerender:          false,          //  If set to TRUE, tooltips will be created on document load, rather than
                                                    //  only when needed.
                                                    //
                                                    //  Default is FALSE

                show_delay:         100,            //  The delay (in milliseconds) after which to show the tooltip once the
                                                    //  mouse is over the trigger element.
                                                    //
                                                    //  Default is 100

                vertical_alignment: 'above',        //  By default, tooltips are shown above the elements they are attached to
                                                    //  and are shown below only if there isn't enough space above.
                                                    //
                                                    //  Set the value of this property to "below" if you want to reverse the
                                                    //  default behavior so that tooltips will be shown below the elements
                                                    //  they are attached to and will be shown above only there isn't enough
                                                    //  space below.
                                                    //
                                                    //  Possible values are "above" and "below".
                                                    //
                                                    //  Default is "above"

                vertical_offset:    0,              //  How close (in pixels) should the tip of the tooltip be relative to
                                                    //  the parent element.
                                                    //
                                                    //  Default is 0

                onBeforeHide:       null,           //  Event fired before a tooltip is hidden.
                                                    //
                                                    //  The callback function receives as arguments the element the
                                                    //  tooltip is attached to, and the tooltip element.
                                                    //
                                                    //  If the callback function returns boolean FALSE, the tooltip will
                                                    //  not be hidden.

                onHide:             null,           //  Event fired after a tooltip is hidden.
                                                    //
                                                    //  The callback function receives as arguments the element the
                                                    //  tooltip is attached to, and the tooltip element.

                onBeforeShow:       null,           //  Event fired before a tooltip is shown.
                                                    //
                                                    //  The callback function receives as arguments the element the
                                                    //  tooltip is attached to, and the tooltip element.
                                                    //
                                                    //  If the callback function returns boolean FALSE, the tooltip will
                                                    //  not be shown.

                onShow:             null            //  Event fired after a tooltip is shown.
                                                    //
                                                    //  The callback function receives as arguments the element the
                                                    //  tooltip is attached to, and the tooltip element.

            },

            // to avoid confusions, we use "plugin" to reference the current instance of the object
            plugin = this,

            // private variables used throughout the script
            window_width, window_height, horizontal_scroll, vertical_scroll,

            /**
             *  Constructor method
             *
             *  @return void
             *
             *  @access private
             */
            _init = function() {

                // the plugin's final properties are the merged default and user-provided options (if any)
                // iterate through the elements we need to attach the plugin to
                elements.each(function() {

                    var

                        // reference to the jQuery version of the element
                        $element = $(this),

                        // the element's title attribute (if any)
                        title = $element.attr('title'),

                        // get any options given as data attributes
                        data_attributes = $element.data(),

                        data, tooltip_settings = {};

                    // iterate through the element's data attributes (if any)
                    for (data in data_attributes)

                        // if data attribute's name starts with "ztt_"
                        if (data.indexOf('ztt_') === 0) {

                            // remove the "ztt_" prefix
                            data = data.replace(/^ztt\_/, '');

                            // if such a property exists
                            if (undefined !== defaults[data])

                                // update the property's value
                                tooltip_settings[data] = data_attributes['ztt_' + data];

                        }

                    // the current tooltip's settings are the default ones merged with the ones set when initializing
                    // the plugin and merged with any data attributes set for the parent element
                    tooltip_settings = $.extend(defaults, options, tooltip_settings);

                    // if the element's title attribute is set, that has the highest priority for content
                    if (title) tooltip_settings.content = $element.attr('title');

                    // if tooltip has any content
                    if (undefined !== tooltip_settings.content && tooltip_settings.content.trim() !== '') {

                        // handlers for some of the element's events
                        $element.bind({

                            // when mouse cursor enters the parent element
                            'mouseenter': function() {

                                // clear the "title" attribute (if present) to prevent browser's default behavior
                                if (title) $(this).attr('title', '');

                                // show the attached tooltip
                                _show($element);

                            },
                            // when the parent element receives focus
                            'focusin': function() {

                                // clear the "title" attribute (if present) to prevent browser's default behavior
                                if (title) $(this).attr('title', '');

                                // show the attached tooltip
                                _show($element);

                            },

                            // when mouse cursor leaves the parent element
                            'mouseleave': function() {

                                // hide the attached tooltip
                                _hide($element);

                                // if "title" attribute was present, set it back to its original state
                                if (title) $(this).attr('title', title);

                            }
                            // when the parent element loses focus
                            'focusout': function() {

                                // hide the attached tooltip
                                _hide($element);

                                // if "title" attribute was present, set it back to its original state
                                if (title) $(this).attr('title', title);

                            },

                        });

                        // initialize and cache tooltip data
                        $element.data('Zebra_Tooltip', $.extend({
                            tooltip:            null,
                            show_timeout:       null,
                            hide_timeout:       null,
                            sticky:             false,
                            destroy:            false,
                            muted:              false
                        }, tooltip_settings));

                        // if tooltips are to be pre-generated, generate them now
                        if (tooltip_settings.prerender) _create_tooltip($element);

                    }

                });

            },

            /**
             *  Generates a tooltip's HTML code and inserts it into the DOM.
             *  It returns an object containing references to the tooltip's components.
             *
             *  If the tooltip already exists, the method will simply return the object with references to the tooltip's
             *  components.
             *
             *  @param  jQuery  $element    The jQuery version of a DOM element to which to attach the tooltip to.
             *
             *  @return object              Returns an object containing references to the tooltip's components.
             *
             *  @access private
             */
            _create_tooltip = function($element) {

                // get a reference to the tooltip and its components, if available
                var tooltip_settings = $element.data('Zebra_Tooltip'),
                    tooltip, message, arrow_container, arrow, tooltip_width, tooltip_height, arrow_width, arrow_height,
                    tmp_width, tmp_height, browser_window = $(window), element_position, tooltip_left, tooltip_top, arrow_left;

                // if tooltip's HTML was not yet created
                if (!tooltip_settings.tooltip) {

                    // create the tooltip's main container
                    tooltip = $('<div>', {

                        class: 'Zebra_Tooltip',

                        css: {
                            opacity:    0,
                            display:    'block'
                        }

                    });

                    // create the tooltip's message container
                    message = $('<div>', {

                        class: 'Zebra_Tooltip_Message',

                        css: {
                            maxWidth:   tooltip_settings.max_width
                        }

                    // add the content of the tooltip
                    // using either the message given as argument when instantiating the object,
                    // or the message contained in the "title" attribute of the parent element
                    }).html(tooltip_settings.content)

                        // append the element to the main container
                        .appendTo(tooltip);

                    // create the tooltip's arrow container
                    arrow_container = $('<div>', {

                        class:  'Zebra_Tooltip_Arrow'

                    // append the element to the main container
                    }).appendTo(tooltip);

                    // the actual arrow will consist of 2 divs
                    // a larger one for emulating the border...
                    arrow = $('<div>').addClass('Zebra_Tooltip_Arrow_Border').appendTo(arrow_container);

                    // ...and another one for emulating the tooltip's background
                    $('<div>').appendTo(arrow_container);

                    // if tooltip is to be kept visible when mouse cursor is over the tooltip
                    if (tooltip_settings.keep_visible) {

                        // when mouse leaves the tooltip's surface or the tooltip is clicked
                        tooltip.bind('mouseleave' + (tooltip_settings.close_on_click ? ' click' : ''), function() {

                            // hide the tooltip
                            _hide($element);

                        });

                        // when mouse enters the tooltip's surface
                        tooltip.bind('mouseenter', function() {

                            // keep the tooltip visible
                            _show($element);

                        });

                    }

                    // inject the tooltip into the DOM
                    // (so that we can get its dimensions)
                    tooltip.appendTo('body');

                    // if the "close" button needs to be shown
                    // we need to add a class to extend the padding on the right side of the tooltip in order to accommodate the button's presence
                    if (tooltip_settings.sticky) message.addClass('Zebra_Tooltip_Has_Close');

                    // get tooltip's width and height
                    tooltip_width = tooltip.outerWidth();
                    tooltip_height = tooltip.outerHeight();

                    // get arrow's width and height
                    arrow_width = arrow.outerWidth();
                    arrow_height = arrow.outerHeight();

                    // in IE9, after hard-coding the width (see below), the box's actual width changes with a few pixels,
                    // but enough to sometimes trigger the wrapping of the text; this results in the "message" element having
                    // a greater actual height than the one we're just about to hard-coded and this, in turn, results in the
                    // arrow not being visible; therefore, save the values now
                    tmp_width = message.outerWidth();
                    tmp_height = message.outerHeight();

                    // group all data together
                    tooltip_settings = {
                        tooltip:            tooltip,
                        tooltip_width:      tooltip_width,
                        tooltip_height:     tooltip_height + (arrow_height / 2),
                        message:            message,
                        arrow_container:    arrow_container,
                        arrow_width:        arrow_width,
                        arrow_height:       arrow_height,
                        arrow:              arrow
                    };

                    // hard-code the tooltip's width and height so it doesn't gets broken due to word wrapping when the
                    // tooltip is too close to the edges of the browser's window
                    tooltip.css({
                        width:  tooltip_settings.tooltip_width,
                        height: tooltip_settings.tooltip_height
                    });

                    // adjust, if needed, the values representing the tooltip's width/height
                    tooltip_settings.tooltip_width = tooltip_settings.tooltip_width + (message.outerWidth() - tmp_width);
                    tooltip_settings.tooltip_height = tooltip_settings.tooltip_height + (message.outerHeight() - tmp_height);

                    // adjust, if needed, the tooltip's width/height, and hide it for now
                    tooltip.css({
                        width:      tooltip_settings.tooltip_width,
                        height:     tooltip_settings.tooltip_height,
                        display:    'none'
                    });

                    // merge new tooltip data with tooltip data created when instantiating the library
                    tooltip_settings = $.extend($element.data('Zebra_Tooltip'), tooltip_settings);

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_settings);

                }

                // if tooltip was triggered programmatically and the "close" button was not yet added
                if (tooltip_settings.sticky && !tooltip_settings.close) {

                    // create the "close" button
                    $('<a>', {

                        class:  'Zebra_Tooltip_Close',
                        href:   'javascript:void(0)'

                    // when the button is clicked
                    }).html('&times;').on('click', function(e) {

                        e.preventDefault();

                        // get a reference to the attached tooltip and its components
                        var tooltip_settings = $element.data('Zebra_Tooltip');

                        // set this flag to FALSE so we can hide the tooltip
                        tooltip_settings.sticky = false;

                        // cache updated tooltip data
                        $element.data('Zebra_Tooltip', tooltip_settings);

                        // hide the tooltip
                        _hide($element);

                    // add the "close" button to the tooltip
                    }).appendTo(tooltip_settings.message);

                    // make sure we only create the "close" button once
                    tooltip_settings.close = true;

                    // update tooltip data
                    tooltip_settings = $.extend($element.data('Zebra_Tooltip'), tooltip_settings);

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_settings);

                }

                // get the browser window's width
                window_width = browser_window.width();

                // get the browser window's height
                window_height = browser_window.height();

                // get the element's position, relative to the document
                element_position = $element.offset();

                // cache element's position and size
                $.extend(tooltip_settings, {

                    element_left:   element_position.left,
                    element_top:    element_position.top,
                    element_width:  $element.outerWidth(),
                    element_height: $element.outerHeight()

                });

                // get the browser window's horizontal and vertical scroll offsets
                vertical_scroll = browser_window.scrollTop();
                horizontal_scroll = browser_window.scrollLeft();

                // compute tooltip's and the arrow's positions
                tooltip_left = tooltip_settings.position === 'left' ? tooltip_settings.element_left - tooltip_settings.tooltip_width + tooltip_settings.arrow_width :
                    (tooltip_settings.position === 'right' ? tooltip_settings.element_left + tooltip_settings.element_width - tooltip_settings.arrow_width :
                        (tooltip_settings.element_left + (tooltip_settings.element_width - tooltip_settings.tooltip_width) / 2));

                tooltip_top = tooltip_settings.element_top - tooltip_settings.tooltip_height;

                arrow_left = tooltip_settings.position === 'left' ? tooltip_settings.tooltip_width - tooltip_settings.arrow_width - (tooltip_settings.arrow_width / 2) :
                    (tooltip_settings.position === 'right' ? (tooltip_settings.arrow_width / 2) :
                        ((tooltip_settings.tooltip_width - tooltip_settings.arrow_width) / 2));

                // if tooltip's right side is outside te visible part of the browser's window
                if (tooltip_left + tooltip_settings.tooltip_width > window_width + horizontal_scroll) {

                    // adjust the arrow's position
                    arrow_left -= (window_width + horizontal_scroll) - (tooltip_left + tooltip_settings.tooltip_width) - 6;

                    // adjust the tooltip's position
                    tooltip_left = (window_width + horizontal_scroll) - tooltip_settings.tooltip_width - 6;

                    // if after the adjustment, the arrow still needs to be adjusted
                    if (arrow_left + tooltip_settings.arrow_width > tooltip_settings.tooltip_width - 6)

                        // adjust the arrow's position
                        arrow_left = tooltip_settings.tooltip_width - 6 - tooltip_settings.arrow_width;

                    // if there is no space to show the arrow, hide it
                    if (tooltip_left + arrow_left + (tooltip_settings.arrow_width / 2) < tooltip_settings.element_left) arrow_left = -10000;

                }

                // if tooltip's left side is outside te visible part of the browser's window
                if (tooltip_left < horizontal_scroll) {

                    // adjust the arrow's position
                    arrow_left -= horizontal_scroll - tooltip_left;

                    // adjust the tooltip's position
                    tooltip_left = horizontal_scroll + 2;

                    // if after the adjustment, the arrow still needs to be adjusted
                    if (arrow_left < 0)

                        // adjust the arrow's position
                        arrow_left = (tooltip_settings.arrow_width / 2);

                    // if there is no space to show the arrow, hide it
                    if (tooltip_left + arrow_left + (tooltip_settings.arrow_width / 2) > tooltip_settings.element_left + tooltip_settings.element_width) arrow_left = -10000;

                }

                // by default, we assume the tooltip is centered above the element and therefore the arrow is at bottom of the tooltip
                // (we remove everything that might have been set on a previous iteration)
                tooltip_settings.message.css('margin-top', '');

                // in this case, the arrow need to point downwards rather than upwards
                // and be placed beneath the body of the tooltip and not above
                tooltip_settings.arrow_container.removeClass('Zebra_Tooltip_Arrow_Top').addClass('Zebra_Tooltip_Arrow_Bottom');

                // if
                if (

                    // top of the tooltip is outside the visible part of the browser's window OR
                    tooltip_top < vertical_scroll ||

                    // tooltips are to be shown from below the element, and there is enough space below the element to show the tooltip
                    (tooltip_settings.vertical_alignment === 'below' && tooltip_settings.element_top + tooltip_settings.element_height + tooltip_settings.vertical_offset + tooltip_settings.tooltip_height + tooltip_settings.animation_offset < window_height + vertical_scroll)

                ) {

                    // place the tooltip beneath the element, rather than above, also account for the offset
                    tooltip_top = tooltip_settings.element_top + tooltip_settings.element_height - tooltip_settings.vertical_offset;

                    // the tooltip will slide upwards, rather than downwards
                    tooltip_settings.animation_offset = Math.abs(tooltip_settings.animation_offset);

                    // the body of the tooltip needs to be vertically aligned at the bottom
                    tooltip_settings.message.css('margin-top', (tooltip_settings.arrow_height / 2));

                    // in this case, the arrow need to point upwards rather than downwards
                    // and be placed above the body of the tooltip and not beneath
                    tooltip_settings.arrow_container.removeClass('Zebra_Tooltip_Arrow_Bottom').addClass('Zebra_Tooltip_Arrow_Top');

                // if top of the tooltip is inside the visible part of the browser's window
                } else {

                    // the tooltip will slide downwards
                    tooltip_settings.animation_offset = -Math.abs(tooltip_settings.animation_offset);

                    // account for the offset
                    tooltip_top += tooltip_settings.vertical_offset;

                }

                // set the arrow's horizontal position within the tooltip
                tooltip_settings.arrow_container.css('left', arrow_left);

                // set the tooltip's final position
                tooltip_settings.tooltip.css({
                    left:   tooltip_left,
                    top:    tooltip_top
                });

                // update tooltip data
                $.extend(tooltip_settings, {

                    tooltip_left:   tooltip_left,
                    tooltip_top:    tooltip_top,
                    arrow_left:     arrow_left

                });

                // update tooltip data
                tooltip_settings = $.extend($element.data('Zebra_Tooltip'), tooltip_settings);

                // cache updated tooltip data
                $element.data('Zebra_Tooltip', tooltip_settings);

                // return an object with tooltip data
                return tooltip_settings;

            },

            /**
             *  Shows the tooltip attached to the element given as argument.
             *
             *  @param  jQuery  $element    The jQuery version of a DOM element for which to show the attached plugin
             *
             *  @return void
             *
             *  @access private
             */
            _show = function($element) {

                // get a reference to the attached tooltip and its components
                var tooltip_settings = $element.data('Zebra_Tooltip');

                // if there is already a timeout for showing the tooltip, cancel it
                clearTimeout(tooltip_settings.show_timeout);

                // if tooltip is not "muted" (case in which can only be shown using the API)
                if (!tooltip_settings.muted) {

                    // clear the timeout for hiding the tooltip (if any)
                    clearTimeout(tooltip_settings.hide_timeout);

                    // show the tooltip, using the specified delay (if any)
                    tooltip_settings.show_timeout = setTimeout(function() {

                        // if not already created, create the tooltip
                        tooltip_settings = _create_tooltip($element);

                        // if a callback function exists to be run before showing a tooltip
                        if (tooltip_settings.onBeforeShow && typeof tooltip_settings.onBeforeShow === 'function')

                            // execute the callback function
                            // don't go further if the callback function returned boolean FALSE
                            if (tooltip_settings.onBeforeShow($element, tooltip_settings.tooltip) === false) return;

                        // if tooltip is not already being animated
                        if (tooltip_settings.tooltip.css('display') !== 'block')

                            // set the tooltip's top so we can "slide" it in
                            tooltip_settings.tooltip.css({
                                top:    tooltip_settings.tooltip_top + tooltip_settings.animation_offset
                            });

                        // set the tooltip's "display" property to "block"
                        tooltip_settings.tooltip.css('display', 'block');

                        // if the tooltip was in the midst of an animation, stop that
                        tooltip_settings.tooltip.stop();

                        // animate the tooltip
                        tooltip_settings.tooltip.animate({

                            top:        tooltip_settings.tooltip_top,
                            opacity:    tooltip_settings.opacity

                        // using the specified speed
                        }, tooltip_settings.animation_speed, function() {

                            // if a callback function exists to be run after showing a tooltip
                            if (tooltip_settings.onShow && typeof tooltip_settings.onShow === 'function')

                                // execute the callback function
                                tooltip_settings.onShow($element, tooltip_settings.tooltip);

                        });

                    // the delay after which to show the plugin
                    }, tooltip_settings.show_delay);

                }

            },

            /**
             *  Hides the tooltip attached to the element given as argument.
             *
             *  @param  jQuery  $element    The jQuery version of a DOM element for which to hide the attached plugin
             *
             *  @return void
             *
             *  @access private
             */
            _hide = function($element) {

                // get information about the tooltip attached to the element given as argument
                var tooltip_settings = $element.data('Zebra_Tooltip');

                // if there is already a timeout for hiding the tooltip, cancel it
                clearTimeout(tooltip_settings.hide_timeout);

                // if tooltip is not sticky (when it can only be closed by the user)
                if (!tooltip_settings.sticky) {

                    // clear the timeout for showing the tooltip (if any)
                    clearTimeout(tooltip_settings.show_timeout);

                    // hide the tooltip, using the specified delay (if any)
                    tooltip_settings.hide_timeout = setTimeout(function() {

                        // if there is a tooltip attached to the element
                        // (as one can call the hide() method method prior of the tooltip being ever shown)
                        if (tooltip_settings.tooltip) {

                            // if a callback function exists to be run before hiding a tooltip
                            if (tooltip_settings.onBeforeHide && typeof tooltip_settings.onBeforeHide === 'function')

                                // execute the callback function
                                // don't go further if the callback function returned boolean FALSE
                                if (tooltip_settings.onBeforeHide($element, tooltip_settings.tooltip) === false) return;

                            // set this flag to FALSE so that the script knows that it has to add the "close" button again
                            // if the tooltip is shown using the API
                            tooltip_settings.close = false;

                            // if tooltip needs to be destroyed once it fades out
                            if (tooltip_settings.destroy)

                                // set this flag now so that the tooltip is not shown again if the user quickly hovers
                                // the element while if fades out
                                tooltip_settings.muted = true;

                            // cache updated tooltip data
                            $element.data('Zebra_Tooltip', tooltip_settings);

                            // remove the "close" button
                            $('a.Zebra_Tooltip_Close', tooltip_settings.tooltip).remove();

                            // if the tooltip was in the midst of an animation, stop that
                            tooltip_settings.tooltip.stop();

                            // animate the tooltip
                            tooltip_settings.tooltip.animate({

                                opacity:    0,
                                top:        tooltip_settings.tooltip_top + tooltip_settings.animation_offset

                            // using the specified speed
                            }, tooltip_settings.animation_speed, function() {

                                // set the tooltip's "display" property to "none"
                                $(this).css('display', 'none');

                                // if a callback function exists to be run after hiding a tooltip
                                if (tooltip_settings.onHide && typeof tooltip_settings.onHide === 'function')

                                    // execute the callback function
                                    tooltip_settings.onHide($element, tooltip_settings.tooltip);

                            });

                        }

                    // the delay after which to hide the plugin
                    }, tooltip_settings.hide_delay);

                }

            };

        /**
         *  Hides the tooltips attached to the element(s) given as argument.
         *
         *  @param  jQuery  elements    A jQuery selector of element(s) for which to hide the attached tooltips.
         *
         *  @param  boolean destroy     If set to TRUE, once hidden, the tooltip will be "muted" and will *not* be
         *                              shown again when the user hovers the parent element with the mouse.
         *
         *                              In this case, the tooltip can be shown again only by calling the {@link show()}
         *                              method.
         *
         *                              Default is FALSE
         *
         *  @return void
         */
        plugin.hide = function(elements, destroy) {

            // iterate through the elements given as argument
            elements.each(function() {

                var

                    // the current element
                    $element = $(this),

                    // get a reference to the attached tooltip and its components
                    tooltip_settings = $element.data('Zebra_Tooltip');

                // if there is a tooltip attached
                if (tooltip_settings) {

                    // set this flag to FALSE so we can hide the tooltip
                    tooltip_settings.sticky = false;

                    // set a flag if tooltip needs to be "muted" after hiding it
                    if (destroy) tooltip_settings.destroy = true;

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_settings);

                    // show the tooltip
                    _hide($element);

                }

            });

        };

        /**
         *  Shows the tooltips attached to the element(s) given as argument.
         *
         *  When showing a tooltip using this method, the tooltip can only be closed by the user clicking on the "close"
         *  icon on the tooltip (which is automatically added when using this method) or by calling the {@link hide()}
         *  method.
         *
         *  @param  jQuery  elements    A jQuery selector of element(s) for which to show the attached tooltips.
         *
         *  @param  boolean destroy     If set to TRUE, once the user clicks the "close" button, the tooltip will be
         *                              "muted" and will *not* be shown when the user hovers the parent element with
         *                              the mouse.
         *
         *                              In this case, the tooltip can be shown again only by calling this method.
         *
         *                              If set to FALSE, the tooltip will be shown whenever the user hovers the parent
         *                              element with the mouse, only it will not have the "close" button anymore.
         *
         *                              Default is FALSE.
         *
         *  @return void
         */
        plugin.show = function(elements, destroy) {

            // iterate through the elements given as argument
            elements.each(function() {

                var

                    // the current element
                    $element = $(this),

                    // get a reference to the attached tooltip and its components
                    tooltip_settings = $element.data('Zebra_Tooltip');

                // if there is a tooltip attached
                if (tooltip_settings) {

                    // when shown using the API, the tooltip can be hidden only by clicking on the "close" button
                    tooltip_settings.sticky = true;

                    // set this to FALSE so we can show the tooltip
                    tooltip_settings.muted = false;

                    // set a flag if tooltip needs to "muted" after hiding
                    if (destroy) tooltip_settings.destroy = true;

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_settings);

                    // show the tooltip
                    _show($element);

                }

            });

        };

        // fire it up!
        _init();

    };

})($);
