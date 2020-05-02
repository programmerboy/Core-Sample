namespace Core_Sample.Helpers
{
    public class CustomResponse<T>
    {
        public CustomResponse(T resp, bool isSuccess, string message)
        {
            Response = resp;
            IsSuccess = isSuccess;
            Message = message;
        }

        public CustomResponse(T resp)
        {
            Response = resp;
            IsSuccess = true;
        }

        public CustomResponse(T resp, string message)
        {
            Response = resp;
            Message = message;
            IsSuccess = true;
        }

        public bool IsSuccess { get; }
        public string Message { get; }
        public T Response { get; }
    }
}
