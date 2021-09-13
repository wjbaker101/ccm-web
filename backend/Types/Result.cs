using System;

namespace CustomCrosshairModApi.Types
{
    public class Result
    {
        public bool HasError { get; protected init; }
        public string ErrorMessage { get; protected init; }

        protected Result()
        {
        }

        public static Result Success()
        {
            return new()
            {
                HasError = false
            };
        }

        public static Result Error(string errorMessage)
        {
            return new()
            {
                HasError = true,
                ErrorMessage = errorMessage
            };
        }
    }

    public sealed class Result<TValue> : Result
    {
        public TValue Value { get; init; }

        private new static Result Success => throw new InvalidOperationException("Should not use `.Success()` for typed results, use `.Of(...)` instead.");

        public static Result<TValue> Of(TValue value)
        {
            return new()
            {
                HasError = false,
                Value = value
            };
        }

        public new static Result<TValue> Error(string errorMessage)
        {
            return new()
            {
                HasError = true,
                ErrorMessage = errorMessage
            };
        }
    }
}