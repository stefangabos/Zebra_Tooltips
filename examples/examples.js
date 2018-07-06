$(document).ready(function() {

    new $.Zebra_Tooltips($('.zebra_tooltips'));

    new $.Zebra_Tooltips($('.zebra_tooltips_left'), {
        position:   'left',
    });

    new $.Zebra_Tooltips($('.zebra_tooltips_right'), {
        position:   'right',
    });

    new $.Zebra_Tooltips($('.zebra_tooltips_left_below'), {
        position:           'left',
        default_position:   'below'
    });

    new $.Zebra_Tooltips($('.zebra_tooltips_right_below'), {
        position:           'right',
        default_position:   'below'
    });

    new $.Zebra_Tooltips($('.zebra_tooltips_custom_width_more'), {
        max_width:  470
    });

    new $.Zebra_Tooltips($('.zebra_tooltips_custom_width_less'), {
        max_width:  90
    });

    new $.Zebra_Tooltips($('.zebra_tooltips_html_content'));

    var tooltip = new $.Zebra_Tooltips($('.zebra_tooltips_programmatically'));
    tooltip.show($('.zebra_tooltips_programmatically'), true);

});
