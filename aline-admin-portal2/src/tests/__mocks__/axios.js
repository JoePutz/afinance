const axios = jest.createMockFromModule('axios')

const throwUnMockedError = () => {
    throw new Error(`This endpoint has been mocked, but hasn't been given a manual response`);
};

axios.post.mockImplementation(throwUnMockedError)
axios.create.mockImplementation(jest.fn(()=>axios))
axios.request.mockImplementation(throwUnMockedError);
axios.get.mockImplementation(throwUnMockedError);
axios.delete.mockImplementation(throwUnMockedError);
axios.head.mockImplementation(throwUnMockedError);
axios.options.mockImplementation(throwUnMockedError);
axios.post.mockImplementation(throwUnMockedError);
axios.put.mockImplementation(throwUnMockedError);
axios.patch.mockImplementation(throwUnMockedError);

export default axios;
