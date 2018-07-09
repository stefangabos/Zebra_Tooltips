<img src="https://raw.githubusercontent.com/stefangabos/zebrajs/master/docs/images/logo.png" alt="zebrajs" align="right">

# Zebra_Tooltips &nbsp;[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Zebra_Tooltips%20-%20A%20lightweight%20and%20highly%20configurable%20jQuery%20tooltips%20plugin&url=https://github.com/stefangabos/Zebra_Tooltips&via=stefangabos&hashtags=jquery,tooltips,javascript)

*A lightweight and highly configurable jQuery tooltips plugin*

[![npm](https://img.shields.io/npm/v/zebra_tooltips.svg)](https://www.npmjs.com/package/zebra_tooltips) [![Total](https://img.shields.io/npm/dt/zebra_tooltips.svg)](https://www.npmjs.com/package/zebra_tooltips) [![Monthly](https://img.shields.io/npm/dm/zebra_tooltips.svg)](https://www.npmjs.com/package/zebra_tooltips) [![](https://data.jsdelivr.com/v1/package/npm/zebra_tooltips/badge?style=rounded)](https://www.jsdelivr.com/package/npm/zebra_tooltips) [![License](https://img.shields.io/npm/l/zebra_tooltips.svg)](https://github.com/stefangabos/Zebra_Tooltips/blob/master/LICENSE.md)

Zebra_Tooltips is a lightweight (around 6KB minified, 1.9KB gzipped) jQuery tooltips plugin for creating simple but smart and visually attractive tooltips, featuring nice transitions, 4 themes, and offering a wide range of configuration options.

Besides the default behavior of tooltips showing when user hovers the element, tooltips may also be shown and hidden programmatically. When shown programmatically, the tooltips feature a "close" button and clicking it will be the only way of closing tooltips opened this way. This is useful for drawing users' attention to specific areas of a page (like error messages after validating a form).

Tooltips can be aligned left, center or right, relative to the parent element, as well as above or below the parent element. The library detects the browser window's edges and will make sure that the tooltips are *always* in the viewport.

The tooltips are created using **NO IMAGES** and falls back gracefully for browsers that don't support all the fancy stuff.

Works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 6+

![Screenshot](https://raw.github.com/stefangabos/Zebra_Tooltips/master/examples/screenshot.png)

## Features

 - lightweight - it weights around 6KB minified and 1.9KB gzipped
 - includes 4 themes
 - features nice transitions
 - detects the edges of the browser window and makes sure that the tooltips always stay in the viewport
 - tooltips may be shown and hidden programatically
 - tooltips can be aligned left, center or right, relative to the parent element, as well as above or below the parent element
 - uses **NO IMAGES** and falls back gracefully for browsers that don't support all the fancy stuff
 - works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 6+

## Demo

See the [demos](https://stefangabos.github.io/Zebra_Tooltips/)

## Support the development of this project

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=K4MP9EBKNTF9E)

## Sponsors

Cross browser/device testing is done with

[![BrowserStack](https://github.com/stefangabos/Zebra_Dialog/raw/master/examples/browserstack.png)](https://www.browserstack.com/)

## Requirements

Zebra_Tooltips has no dependencies other than jQuery 1.7+

## Installation

Zebra_Tooltips is available as a [npm package](https://www.npmjs.com/package/zebra_tooltips). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in packages.json
npm install zebra_tooltips --save
```

Zebra_Tooltips is also available as a [Bower package](http://bower.io/). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in bower.json
bower install zebra_tooltips --save
```

## How to use

First, load jQuery from a CDN and provide a fallback to a local source like:

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>window.jQuery || document.write('<script src="path/to/jquery-3.3.1.js"><\/script>')</script>
```

Load the Zebra_Tooltips jQuery plugin

```html
<script type="text/javascript" src="path/to/zebra_tooltips.min.js"></script>
```

Alternatively, you can load Zebra_Tooltips from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_tooltips) like this:

```html
<!-- for the most recent version, not recommended in production -->
<script src="https://cdn.jsdelivr.net/npm/zebra_tooltips@latest/dist/zebra_tooltips.min.js"></script>

<!-- for a specific version -->
<script src="https://cdn.jsdelivr.net/npm/zebra_tooltips@1.3.1/dist/zebra_tooltips.min.js"></script>

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Load one the plugin's theme

```html
<link rel="stylesheet" href="path/to/zebra_tooltips.min.css">
```

...or from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_tooltips)

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/zebra_tooltips@latest/dist/css/default/zebra_tooltips.min.css">

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Now, within the DOM-ready event do

```javascript
$(document).ready(function() {

    // show tooltips for any element that has a class named "tooltips"
    // the content of the tooltip will be taken from the element's "title" attribute
    new $.Zebra_Tooltips($('.tooltips'));

});
```

## Configuration options

## Properties

> All parameters are optional.

*Note that any of the properties below may also be set via data attributes. To do this you have prefix the name of the property you want to set with `data-ztt_`.*

<table width="100%">
    <thead>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>animation_speed</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">250</td>
        <td valign="top">
            The speed (in milliseconds) of the animation used to show/hide tooltips.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>animation_offset</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">20</td>
        <td>
            The number of pixels the tooltips should use to slide into position.<br>
            Set to <code>0</code> for no sliding.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>close_on_click</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">TRUE</td>
        <td>
            By default, if the users clicks when over a tooltip, the tooltip will close (if the tooltip was not open programatically, that is).<br>
            Set this property to <code>FALSE</code> to prevent this behavior.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>content</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top">""</td>
        <td>
            The content of the tooltip.<br>
            By default, the content of the tooltip is taken from the <code>title</code> attribute of the element the tooltip is attached to and has priority over the <code>content</code> property (meaning that if the <code>title</code> attribute is set, the value of this property is ignored).<br>
            Use this property to set the content of the tooltip when you can't or don't want to use the <code>title</code> attribute.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>hide_delay</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">100</td>
        <td>
            The delay (in milliseconds) after which to hide the tooltip once the mouse moves away from the trigger element or the tooltip.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>keep_visible</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">TRUE</td>
        <td>
            Should tooltips remain visible also when the mouse cursor is over the tooltips or should the tooltips be visible strictly when the mouse cursor is over the parent elements?
        </td>
    </tr>
    <tr>
        <td valign="top"><code>max_width</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">250</td>
        <td>
            Maximum width of the tooltip's content
        </td>
    </tr>
    <tr>
        <td valign="top"><code>opacity</code></td>
        <td valign="top"><em>float</em></td>
        <td valign="top">0.85</td>
        <td>
            The tooltip's opacity.<br>
            Must be a value between <code>0</code> (completely transparent) and <code>1</code> (completely opaque)
        </td>
    </tr>
    <tr>
        <td valign="top"><code>position</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top">center</td>
        <td>
            The tooltip's position, relative to the trigger element.<br>
            Can be <code>center</code>, <code>left</code> or <code>right</code>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>prerender</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">FALSE</td>
        <td>
            If set to <code>TRUE</code>, tooltips will be created on document load, rather than only when needed.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>show_delay</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">100</td>
        <td>
            The delay (in milliseconds) after which to show the tooltip once the mouse is over the trigger element.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>vertical_alignment</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top">above</td>
        <td>
            By default, tooltips are shown above the elements they are attached to and are shown below only if there isn't enough space above.<br>
            Set the value of this property to <code>below</code> if you want to reverse the default behavior so that tooltips will be shown below the elements they are attached to and will be shown above only there isn't enough space below.<br>
            Possible values are <code>above</code> and <code>below</code>.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>vertical_offset</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">0</td>
        <td>
            How close (in pixels) should the tip of the tooltip be relative to the parent element.
        </td>
    </tr>
    </tbody>
</table>

## Events

<table width="100%">
    <thead>
    <tr>
        <th>Event</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>onBeforeHide</code></td>
        <td valign="top">
            Event fired <em>before</em> a tooltip is hidden.<br>
            The callback function receives as argument the element the tooltip is attached to, and the tooltip element.<br>
            If the callback function returns boolean <code>FALSE</code>, the tooltip will not be hidden.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onHide</code></td>
        <td>
            Event fired <em>after</em> a tooltip is hidden.<br>
            The callback function receives as argument the element the tooltip is attached to, and the tooltip element.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onBeforeShow</code></td>
        <td valign="top">
            Event fired <em>before</em> a tooltip is shown.<br>
            The callback function receives as argument the element the tooltip is attached to, and the tooltip element.<br>
            If the callback function returns boolean <code>FALSE</code>, the tooltip will not be shown.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onShow</code></td>
        <td>
            Event fired <em>after</em> a tooltip is shown.<br>
            The callback function receives as argument the element the tooltip is attached to, and the tooltip element.
        </td>
    </tr>
    </tbody>
</table>

## Methods

### `show(element, [destroy = FALSE])`

Shows the tooltip attached to the element or the elements given as argument.

When showing a tooltip using this method, the tooltip can only be closed by the user clicking on the "close" icon on the tooltip (which is automatically added when using this method) or by calling the hide() method.<br>

#### Arguments

`element` - an element or a collection of elements for which to show the attached tooltips.

`destroy` - *(optional)* - if set to `TRUE`, once the user clicks the *close* button, the tooltip will be *muted* and will **not** be shown anymore when the user hovers the parent element with the mouse.

In this case, the tooltip can be shown again only by calling this method.

If set to `FALSE`, the tooltip will be shown whenever the user hovers the parent element with the mouse, only it will not have the *close* button anymore.

Default is `FALSE`

```javascript
var element = $('#tooltip'),
    tooltip = new $.Zebra_Tooltips(element);

tooltip.show(element);
```

### `hide(element, [destroy = FALSE])`

Hides the tooltip attached to the element or the elements given as argument.

When showing a tooltip using this method, the tooltip can only be closed by the user clicking on the "close" icon on the tooltip (which is automatically added when using this method) or by calling the hide() method.<br>

#### Arguments

`element` - an element or a collection of elements for which to hide the attached tooltips.

`destroy` - *(optional)* - if set to TRUE, once hidden, the tooltip will be *muted* and will **not** be shown anymore when the user hovers the parent element with the mouse.

In this case, the tooltip can be shown again only by calling the `show()` method.

Default is FALSE

```javascript
var element = $('#tooltip'),
    tooltip = new $.Zebra_Tooltips(element);

tooltip.hide(element);
```
