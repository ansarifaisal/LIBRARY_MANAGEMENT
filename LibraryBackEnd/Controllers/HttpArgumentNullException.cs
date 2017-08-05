using System;
using System.Runtime.Serialization;

namespace LibraryBackEnd.Controllers
{
    [Serializable]
    internal class HttpArgumentNullException : Exception
    {
        public HttpArgumentNullException()
        {
        }

        public HttpArgumentNullException(string message) : base(message)
        {
        }

        public HttpArgumentNullException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected HttpArgumentNullException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}