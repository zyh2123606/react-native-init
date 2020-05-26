const brandPrimary = '#345CFF'
const brandPrimaryTap = '#345CFF'

export default {
    color_link: brandPrimary,                 // 链接
    // 全局/品牌色
    brand_primary: brandPrimary,
    brand_primary_tap: brandPrimaryTap,
    border_radius_base: 2,
    h_spacing_lg:0,
    // button
    button_height: 45,
    button_font_size: 16,

    primary_button_fill: brandPrimary,
    primary_button_fill_tap: brandPrimary + 99,

    ghost_button_color: brandPrimary,    // 同时应用于背景、文字颜色、边框色
    ghost_button_fill_tap: `${brandPrimary}99`, // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW

    input_color_icon_tap: brandPrimary,
    // tabs
    tabs_color: brandPrimary,
    color_text_placeholder: '#bbbbbb',

    // segmented_control
    segmented_control_color: brandPrimary,  // 同时应用于背景、文字颜色、边框色
    segmented_control_height: 27,
    segmented_control_fill_tap: `${brandPrimary}10`,
}