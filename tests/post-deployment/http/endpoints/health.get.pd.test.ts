import axios from 'axios';
import config from '../../env/development';
import GetHealthResponse from "../../../../src/health/GetHealthResponse";
import packageJson from "../../../../package.json";

beforeAll(() => {
    axios.defaults.baseURL = config.baseUrl;
});

describe('health', () => {
    const healthUrl = '/health';
    describe(`get ${healthUrl}`, () => {
        const expectedResponse = new GetHealthResponse(true, packageJson.version);
        const expectedStatusCode = 200;

        it(`Status: ${expectedStatusCode}. Response body: ${JSON.stringify(expectedResponse)}.`, async () => {
            // Arrange

            // Act
            const response = await axios.get(healthUrl);

            // Assert
            expect(response.data).toEqual(expectedResponse);
            expect(response.status).toEqual(expectedStatusCode);
        });
    });
});
