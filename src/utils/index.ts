/**
 * 异步加载script
 *
 * @param {String} url script url
 */
export function loadScript(url: string) {
    return new Promise(resolve => {
        const script = document.createElement('script')

        script.setAttribute('type', 'text/javascript')
        script.setAttribute('src', url)
        script.onload = async res => {
            resolve(res)
        }

        document.body.appendChild(script)
    })
}

/**
 * 生产随机字符串
 *
 * @param {Number} size 随机字符串长度
 */
export function randomHash(size: number) {
    const seed = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ]

    let hashStr = ''

    for (let i = 0; i < size; i++) {
        const num = Math.round(Math.random() * (seed.length - 1))
        hashStr += seed[num]
    }

    return hashStr
}

/**
 * 格式化播放时间(HH:mm:ss)
 *
 * @param {Number} second 秒
 */
export function timeFormat(second: number) {
    second = Math.round(second)
    const h = Math.floor(second / 3600)
    const m = Math.floor((second % 3600) / 60)
    const s = second % 60 || 0

    let timeStr = h > 0 ? `${h}:` : ''
    timeStr += m > 0 ? `${m}:` : '0:'
    timeStr += s > 9 ? s : `0${s}`

    return timeStr
}

/**
 * 获得终端设备类型
 *
 */
export function getDevice() {
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isApp = /(?:touchtv)/.test(ua)
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    // const isChrome = /(?:Chrome|CriOS)/.test(ua)
    const isTablet =
        /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPC = !isPhone && !isAndroid && !isSymbian && !isTablet
    return {
        isTablet,
        isPhone,
        isAndroid,
        isPC,
        isApp
    }
}
