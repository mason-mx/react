// refer to https://www.w3schools.com/charsets/ref_utf_basic_latin.asp
const unitDisMap = {G:71, M:77, k:107, m:109, u:181, n:110, p:112};
const unitDic = {
    A: {m:1e-3, u:1e-6, n:1e-9, p:1e-12},
    Hz: {T:1e12, G:1e9, M:1e6, k:1e3}
};

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

// improved in COHESION-2590
export const normaliseTextWidth = (val, rightDigits) => {
    var output = '';

    rightDigits = (rightDigits || 3);
    if(val === Infinity || val === -Infinity)
    {
        var inf = "∞";
        // check for negative value
        var sign = val < 0 ? '-' : '';
        output = sign + inf;
    } else {
        var rightSideText = "";
        for (var i = 0; i < rightDigits; i++)
        {
            rightSideText +='0';
        }
        // convert absolute value to string
        var strValue = String(val.toFixed(rightDigits));
        var splitVal = strValue.split('.');
        // get digits on the left of '.'
        var leftSide = splitVal[0];
        var rightSide = splitVal[1] || rightSideText;
        output = leftSide + '.' + rightSide;
    }
    return output;
}

export const engineeringNotation = (number, dp, unit) => {
    // refer to https://en.wikipedia.org/wiki/Engineering_notation
    var space = ' ';
    var absValue = Math.abs(number);

    if((absValue < 1000 && absValue >= 1) || (number === 0)) {
        return (number.toFixed(dp)) + space + unit;
    }

    if(absValue < 1e-9) {
        // Less than 1e-9
        return (number / 1e-9).toFixed(dp) + ' n' + unit;
    }

    var unitMap = unitDic[unit];

    for(var prefix in unitMap) {
        if(unitMap.hasOwnProperty(prefix)) {
            if(absValue >= unitMap[prefix]) {
                return (number / unitMap[prefix]).toFixed(dp) + space + String.fromCharCode(unitDisMap[prefix]) + unit;
            }
        }
    }
    return (number.toFixed(dp)) + space + unit;
}

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