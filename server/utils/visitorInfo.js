const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

const visitorInfos = (req) => {
    // Get and parse user agent
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const userAgentData = parser.getResult();

    // Get IP Address
    const ipAddress = requestIp.getClientIp(req);
    
    // Determine if we're in local development
    const isLocalhost = ipAddress === '::1' || ipAddress === '127.0.0.1';

    // Get location data
    const geo = isLocalhost ? null : geoip.lookup(ipAddress);

    // Parse device type
    let deviceType = 'desktop'; // default
    if (userAgentData.device.type) {
        deviceType = userAgentData.device.type;
    } else if (userAgent.toLowerCase().includes('mobile')) {
        deviceType = 'mobile';
    } else if (userAgent.toLowerCase().includes('tablet')) {
        deviceType = 'tablet';
    }

    // Create visitor info object
    const visitorInfo = {
        ipAddress: isLocalhost ? 'Local Development' : (ipAddress || 'unknown'),
        device: deviceType,
        browser: `${userAgentData.browser.name || 'unknown'} ${userAgentData.browser.version || ''}`.trim(),
        operatingSystem: `${userAgentData.os.name || 'unknown'} ${userAgentData.os.version || ''}`.trim(),
        referrer: req.headers.referer || 'direct',
        location: isLocalhost ? 'Local Development' : (geo ? `${geo.city || 'Unknown City'}, ${geo.country || 'Unknown Country'}` : 'unknown')
    };

    // Log the parsed information
    console.log('Visitor Information:', {
        originalUserAgent: userAgent,
        parsedInfo: visitorInfo,
        rawParsedData: userAgentData
    });

    return visitorInfo;
};

module.exports = { visitorInfos };