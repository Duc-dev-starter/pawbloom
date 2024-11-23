export default interface IApiRequest {
    url: string;
    payload?: any;
    headers: object;
    isLoading?: boolean;
}