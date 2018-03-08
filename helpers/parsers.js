function ip(req){
    const regex = RegExp(/(\d.+\d)/, 'g');
    const ip = req.ip;
    const test = ip.match(regex);
    const parsed = test && test[0];
    return parsed;
}

function lang(req){
    return req.acceptsLanguages() && req.acceptsLanguages()[0];
}

function userAgent(req){
    const regex = /\((.+?)\)/;
    const match = req.headers['user-agent'].match(regex)
    const parsed = match && match[1];
    return parsed;
}

module.exports = {
    ip,
    lang,
    userAgent
}