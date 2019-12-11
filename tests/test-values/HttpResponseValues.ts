import appPackage from '../../package.json';

export class Response {
    static getHealth = {
        statusCode: 200,
        body: {
            version: appPackage.version,
            healthy: true,
        },
    };
}
export const HEALTH_GET_RESPONSE = {

};