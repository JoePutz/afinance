import {cleanup} from '@testing-library/react';
import axiosMock from 'axios';
import UserAPI from '../utils/API/UserAPI';

jest.mock('axios');

afterEach(cleanup)

describe('UserAPI Login method should', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('return response body if status is 200', async () => {
        const res = {
            status: 200,
            headers: {
                authorization: 'Bearer 123456'
            }
        }

        axiosMock.post.mockResolvedValue(res)
        const testRes =await UserAPI.login({username:'admin', password: 'password'});
        expect(testRes).toEqual(res);
    })
    it('return error with message of invalid credentials if status is 403', async () => {

        axiosMock.post.mockRejectedValue(
            {
                response:{
                    status: 403,
                }
            })

        const expected = new Error('Invalid Credentials');
        const testRes = await UserAPI.login({username:'admin', password: 'admin'});

        expect(testRes).toEqual(expected)

    })

    it('return error with default error message if status an error status code', async () => {
        axiosMock.post.mockRejectedValue(
            {
                response:{
                    status: 500,
                }
            })


        const expected = new Error('Oops! We\'re checking what the problem is.');
        const testRes = await UserAPI.login({username:'admin', password: 'admin'});

        expect(testRes).toEqual(expected)
    })

})
