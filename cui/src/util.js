export const getDecimalsbyValue = (number) => {
    var decimal = number.toString().split('.')[1];
    if(decimal !== null && decimal !== undefined)
    {
        var decimalPlaces = decimal.length;
        return decimalPlaces;
    }
    return 0;
 };

export const getStepsizebyValues = (min, max, set) => {
    var decimalPlacesMin = getDecimalsbyValue(min);
    var decimalPlacesMax = getDecimalsbyValue(max);

    var decimalPlaces = Math.max(decimalPlacesMin, decimalPlacesMax);

    if(set !== null || set !== undefined)
    {
        var decimalPlacesSet = getDecimalsbyValue(set);
        decimalPlaces = Math.max(decimalPlacesMin, decimalPlacesMax, decimalPlacesSet);
    }

    var str0 = '';
    for(var i = 1; i < decimalPlaces; i++)
    {
        str0 += '0';
    }
    var str = '0.' + str0 + '1';
    return Number(str);
 };

 export const getStepsizebyDecimals = (number) => {
    var decimal = number.toString().split('.')[1];
    if(decimal !== null && decimal !== undefined)
    {
        var decimalPlaces = decimal.length;

        var str0 = '';
        for(var i = 1; i < decimalPlaces; i++)
        {
            str0 += '0';
        }
        var str = '0.' + str0 + '1';
        return Number(str);
    }
    return 1;
 };

 export const convertDecimalstoString = (number, behind) => {
    var str, str1, str2 = '', data = number.toExponential(behind).replace('.','').split(/e/i);
    str = data[0];
    var mag = Number(data[1]), len = str.length;
    if(mag < 0){
        var decimals = mag * -1;
        for(var i = 1; i < decimals; i++ )
        {
            str2 += '0';
        }
        while( len !== 0 )
        {
            str1 = str.substring(0, len);
            if(Number(str.substring(len-1, len)) > 0) break;
            len -- ;
        }
        return '0.' + str2 + str1;
    }
    return number.toString();
 };

 export const getConvertedValue = (value, unit) => {
    var result = {}
    switch(unit) {
        case 'mW':
            result['value'] = 10 * (Math.log10(value));
            result['unit'] = 'dBm';
            break;
        case 'dBm':
            result['value'] = Math.pow(10, (value/10));
            result['unit'] = 'mW';
            break;
        default:
            break;
    }
    return result;
 };