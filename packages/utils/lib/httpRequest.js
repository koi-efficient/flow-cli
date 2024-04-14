import https from "node:https";

/**
 * Wrap a function to make an HTTP GET request, returning a Promise
 * @param {string} url httpUrl
 * @returns
 */
export default function httpRequest(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                let data = "";

                // receive response data
                res.on("data", (chunk) => {
                    data += chunk;
                });

                // end of response
                res.on("end", () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        resolve(data);
                    }
                });
            })
            .on("error", (err) => {
                console.log("error", err);
                reject(err);
            });
    });
}
