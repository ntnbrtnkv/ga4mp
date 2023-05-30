const { log } = require('./helpers');
const req = require('https');

export const sendRequest = (endpoint, payload, mode = 'browser', opts = {}) => {
    const qs = new URLSearchParams(
        JSON.parse(JSON.stringify(payload))
    ).toString()
    if (mode === 'browser') {
        navigator?.sendBeacon([endpoint, qs].join('?'))
    } else {
        const options = {
            headers: {
                'User-Agent': opts.user_agent 
            },
            timeout: 500,
        }
        const url = [endpoint, qs].join('?');
        log('Sending request', url);
        const request = req
            .get(url, options, (resp) => {
                let data = ''
                resp.on('data', (chunk) => {
                    data += chunk
                })
                resp.on('end', () => {
                    // TO-DO Handle Server Side Responses                    
                })
            })
            .on('error', (err) => {
                log('Error: ' + err.message)
            })
        request.on('timeout', () => {
            request.destroy()
        })
    }
}
