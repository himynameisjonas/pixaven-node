/**
* Module dependencies
*/

const stream = require("stream");
const client = require("./client");


/**
* Uploads an image for processing
*
* @param {String|Stream} file
* @throws {Error} invalid parameters
* @returns {Pixaven}
*/

const upload = function (file) {
    if (typeof file !== "string" && !(file instanceof stream.Stream)) {
        this.options.errorMessage = "Pixaven upload(string|stream) method requires a valid file path or a stream passed as an argument";
    }

    if (this.options.withFetch) {
        this.options.errorMessage = "Pixaven only accepts one file input method per call: upload(string|stream) or fetch(string)";
    }

    this.options.file = file;
    this.options.withUpload = true;

    return this;
};


/**
* Provides a URL of the image for processing
*
* @param {String} url
* @throws {Error} invalid parameters
* @returns {Pixaven}
*/

const fetch = function (url) {
    if (typeof url === "undefined") {
        this.options.errorMessage = "Pixaven fetch(string) method requires a valid file URL passed as an argument";
    }

    if (this.options.withUpload) {
        this.options.errorMessage = "Pixaven only accepts one file input method per call: upload(string|stream) or fetch(string)";
    }

    this.options.request.url = url;
    this.options.withFetch = true;

    return this;
};


/**
* Sets a proxy for HTTP requests
*
* @param {String} proxy
* @returns {Pixaven}
*/

const proxy = function (proxy) {
    if (typeof proxy === "string") {
        this.options.proxy = proxy;
    }

    return this;
};


/**
* Resizes an image
*
* @param {Object} data
* @returns {Pixaven}
*/

const resize = function (data) {
    if (typeof data === "object") {
        this.options.request.resize = data;
    }

    return this;
};


/**
* Scales an image
*
* @param {Object} data
* @returns {Pixaven}
*/

const scale = function (data) {
    if (typeof data === "object") {
        this.options.request.scale = data;
    }

    return this;
};


/**
* Crops an image
*
* @param {Object} data
* @returns {Pixaven}
*/

const crop = function (data) {
    if (typeof data === "object") {
        this.options.request.crop = data;
    }

    return this;
};


/**
* Applies a watermark
*
* @param {Object} data
* @returns {Pixaven}
*/

const watermark = function (data) {
    if (typeof data === "object") {
        this.options.request.watermark = data;
    }

    return this;
};


/**
* Applies an elliptical mask
*
* @param {Object} data
* @returns {Pixaven}
*/

const mask = function (data) {
    if (typeof data === "object") {
        this.options.request.mask = data;
    }

    return this;
};


/**
* Applies a filter
*
* @param {Object} data
* @returns {Pixaven}
*/

const stylize = function (data) {
    if (typeof data === "object") {
        this.options.request.stylize = data;
    }

    return this;
};


/**
* Adjusts visual parameters
*
* @param {Object} data
* @returns {Pixaven}
*/

const adjust = function (data) {
    if (typeof data === "object") {
        this.options.request.adjust = data;
    }

    return this;
};


/**
* Automaticaly enhances an image
*
* @param {Object} data
* @returns {Pixaven}
*/

const auto = function (data) {
    if (typeof data === "object") {
        this.options.request.auto = data;
    }

    return this;
};


/**
* Applies a border to an image
*
* @param {Object} data
* @returns {Pixaven}
*/

const border = function (data) {
    if (typeof data === "object") {
        this.options.request.border = data;
    }

    return this;
};


/**
* Pads an image
*
* @param {Object} data
* @returns {Pixaven}
*/

const padding = function (data) {
    if (typeof data === "object") {
        this.options.request.padding = data;
    }

    return this;
};


/**
* Stores processed image externally
*
* @param {Object} data
* @returns {Pixaven}
*/

const store = function (data) {
    if (typeof data === "object") {
        this.options.request.store = data;
    }

    return this;
};


/**
* Sets output format and encoding
*
* @param {Object} data
* @returns {Pixaven}
*/

const output = function (data) {
    if (typeof data === "object") {
        this.options.request.output = data;
    }

    return this;
};


/**
* Sets a Webhook as a response delivery method
*
* @param {Object} data
* @returns {Pixaven}
*/

const webhook = function (data) {
    if (typeof data === "object") {
        this.options.request.webhook = data;
    }

    return this;
};


/**
* Controls the Pixaven CDN behaviour
*
* @param {Object} data
* @returns {Pixaven}
*/

const cdn = function (data) {
    if (typeof data === "object") {
        this.options.request.cdn = data;
    }

    return this;
};


/**
* Sends a standard request to the API
* and returns a JSON response
*
* @param {Function} cb
* @throws {Error} invalid parameters
* @returns {Pixaven}
*/

const toJSON = function (cb) {
    if (typeof cb !== "function") {
        this.options.errorMessage = "Pixaven toJSON(fn) method requires a callback function";
    }

    if (this.options.toFile || this.options.toBuffer) {
        this.options.errorMessage = "Pixaven only accepts one response method per call: toJSON(fn), toFile(string|stream, fn) or toBuffer(fn)";
    }

    if (!this.options.withUpload && !this.options.withFetch) {
        this.options.errorMessage = "No file input has been specified: upload(string|stream) or fetch(string)";
    }

    this.options.toJSON = true;

    client.sendRequest(this.options, (err, response) => {
        cb(err, response);
    });

    return this;
};


/**
* Instructs the API to use a Binary Response
* and streams the response to disk
*
* @param {Function} cb
* @throws {Error} invalid parameters
* @returns {Pixaven}
*/

const toFile = function (file, cb) {
    if (typeof cb !== "function") {
        throw new Error("Pixaven toFile(string|stream, fn) method requires a callback function as a second parameter");
    }

    if (typeof file !== "string" && !(file instanceof stream.Stream)) {
        this.options.errorMessage = "Pixaven toFile(string|stream, fn) method requires a file path or a stream as a first parameter";
    }

    if (this.options.toJSON || this.options.toBuffer) {
        this.options.errorMessage = "Pixaven only accepts one response method per call: toJSON(fn), toFile(string|stream, fn) or toBuffer(fn)";
    }

    if (!this.options.withUpload && !this.options.withFetch) {
        this.options.errorMessage = "No file input has been specified: upload(string|stream) or fetch(string)";
    }

    if (this.options.request.webhook) {
        this.options.errorMessage = "Binary responses with toFile(string|stream, fn) method are not supported when using Webhooks";
    }

    if (this.options.request.store) {
        this.options.errorMessage = "Binary responses with toFile(string|stream, fn) method are not supported when using External Storage";
    }

    this.options.request.response = {
        mode: "binary"
    };

    this.options.toFile = true;
    this.options.outputFile = file;

    client.sendRequest(this.options, (err, response) => {
        cb(err, response);
    });

    return this;
};


/**
* Instructs the API to use a Binary Response
* and buffers the response in memory
*
* @param {Function} cb
* @throws {Error} invalid parameters
* @returns {Pixaven}
*/

const toBuffer = function (cb) {
    if (typeof cb !== "function") {
        throw new Error("Pixaven toBuffer(fn) method requires a callback function");
    }

    if (this.options.toJSON || this.options.toFile) {
        this.options.errorMessage = "Pixaven only accepts one response method per call: toJSON(fn), toFile(string|stream, fn) or toBuffer(fn)";
    }

    if (!this.options.withUpload && !this.options.withFetch) {
        this.options.errorMessage = "No file input has been specified: upload(string|stream) or fetch(string)";
    }

    if (this.options.request.webhook) {
        this.options.errorMessage = "Binary responses with toBuffer(fn) method are not supported when using Webhooks";
    }

    if (this.options.request.store) {
        this.options.errorMessage = "Binary responses with toBuffer(fn) method are not supported when using External Storage";
    }

    this.options.request.response = {
        mode: "binary"
    };

    this.options.toBuffer = true;

    client.sendRequest(this.options, (err, meta, buff) => {
        cb(err, meta, buff);
    });

    return this;
};


/**
* Populates prototype with available operations
*
* @private
*/

module.exports = (crx) => {
    [
        upload,
        fetch,
        proxy,
        resize,
        scale,
        crop,
        watermark,
        mask,
        stylize,
        adjust,
        auto,
        border,
        padding,
        store,
        output,
        webhook,
        cdn,
        toJSON,
        toFile,
        toBuffer
    ].forEach((f) => {
        crx.prototype[f.name] = f;
    });
};