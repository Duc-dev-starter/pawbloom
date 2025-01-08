export default interface ApiRequest {
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
    headers?: object;
}