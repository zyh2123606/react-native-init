import { DynamicValue, Mode, useDynamicValue, useDarkMode } from 'react-native-dark-mode'

//暗黑模式和浅色对应的rgba值
export const Colors = {
    common_level1_base_color: new DynamicValue('rgba(30,32,41,1)', 'rgba(255,255,255,0.96)'),
    common_level2_base_color: new DynamicValue('rgba(30,32,41,0.56)', 'rgba(255,255,255,0.6)'),
    common_level3_base_color: new DynamicValue('rgba(30,32,41,0.4)', 'rgba(255,255,255,0.48)'),
    common_level4_base_color: new DynamicValue('rgba(30,32,41,0.24)', 'rgba(255,255,255,0.32)'),
    common_line_hard_color: new DynamicValue('rgba(30,32,41,0.12)', 'rgba(255,255,255,0.16)'),
    common_line_light_color: new DynamicValue('rgba(30,32,41,0.08)', 'rgba(255,255,255,0.12)'),
    common_fg_color: new DynamicValue('rgba(255,255,255,1)', 'rgba(0,0,0,1)'),
    common_fg_z1_color: new DynamicValue('rgba(250,250,250,1)', 'rgba(30,30,30,1)'),
    common_fg_press_color: new DynamicValue('rgba(237,237,238,1)', 'rgba(60,60,60,1)'),
    common_bg_color: new DynamicValue('rgba(242,244,245,1)', 'rgba(0,0,0,1)'),
    common_bg_z1_color: new DynamicValue('rgba(242,244,245,1)', 'rgba(18,18,18,1)'),
    common_blue1_color: new DynamicValue('rgba(52,92,255,1)', 'rgba(52,92,255,1)'),
    common_blue2_color: new DynamicValue('rgba(52,92,255,0.6)', 'rgba(52,92,255,0.6)'),
    common_blue3_color: new DynamicValue('rgba(52,92,255,0.2)', 'rgba(52,92,255,0.2)'),
    common_orange1_color: new DynamicValue('rgba(255,137,26,1)', 'rgba(255,137,26,1)'),
    common_orange2_color: new DynamicValue('rgba(255,137,26,0.6)', 'rgba(255,137,26,0.6)'),
    common_orange3_color: new DynamicValue('rgba(255,137,26,0.2)', 'rgba(255,137,26,0.2)'),
    common_red1_color: new DynamicValue('rgba(244,51,60,1)', 'rgba(244,51,60,1)'),
    common_red2_color: new DynamicValue('rgba(244,51,60,0.6)', 'rgba(244,51,60,0.6)'),
    common_red3_color: new DynamicValue('rgba(244,51,60,0.2)', 'rgba(244,51,60,0.2)'),
    common_green1_color: new DynamicValue('rgba(41,171,145,1)', 'rgba(41,171,145,1)'),
    common_green2_color: new DynamicValue('rgba(41,171,145,0.6)', 'rgba(41,171,145,0.6)'),
    common_green3_color: new DynamicValue('rgba(41,171,145,0.2)', 'rgba(41,171,145,0.2)'),
    common_black1_color: new DynamicValue('rgba(0,0,0,1)', 'rgba(0,0,0,1)'),
    common_black2_color: new DynamicValue('rgba(0,0,0,0.4)', 'rgba(0,0,0,0.4)'),
    common_black3_color: new DynamicValue('rgba(0,0,0,0.12)', 'rgba(0,0,0,0.12)'),
    common_white1_color: new DynamicValue('rgba(255,255,255,1)', 'rgba(255,255,255,1)'),
    common_white2_color: new DynamicValue('rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)'),
    common_white3_color: new DynamicValue('rgba(255,255,255,0.28)', 'rgba(255,255,255,0.28)'),
    common_gray1_color: new DynamicValue('rgba(142,142,147,1)', 'rgba(142,142,147,1)'),
    common_gray2_color: new DynamicValue('rgba(174,174,178,1)', 'rgba(174,174,178,1)'),
    common_gray3_color: new DynamicValue('rgba(199,199,204,1)', 'rgba(199,199,204,1)'),
    common_gray4_color: new DynamicValue('rgba(209,209,214,1)', 'rgba(209,209,214,1)'),
    common_gray5_color: new DynamicValue('rgba(229,229,233,1)', 'rgba(229,229,233,1)'),
    common_gray6_color: new DynamicValue('rgba(242,242,247,1)', 'rgba(28,28,30,1)')
}

//获取当前主题下的颜色值
const getColorScheme = (): Map<string, string> => {
    const colorScheme: Record<any, any> = useDynamicValue(Colors as any), 
        isDark = useDarkMode(), 
        colorsMap = new Map<string, string>(),
        mode: Mode = isDark ? 'dark' : 'light'
    for(let key in colorScheme){
        if(colorScheme[key]) colorsMap.set(key, colorScheme[key][mode])
    }
    return colorsMap
} 
export default getColorScheme