import axios from 'axios';
import appPackage from '../../package.json'
import './src/App'

describe('App.ts', () => {
    const healthUrl = '/health';
    describe(`get ${healthUrl}`, () => {
        it('response with version number', async () => {
            // Arrange
            const expectedResponse = {
                healthy: true,
                version: appPackage.version,
            };
            // Act
            const response = await axios.get('healthUrl');

            // Assert
            expect(response.data).toEqual(expectedResponse);
        });
    });
});
