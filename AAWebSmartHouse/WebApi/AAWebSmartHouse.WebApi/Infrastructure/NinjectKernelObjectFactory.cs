namespace AAWebSmartHouse.WebApi.Infrastructure
{
    using Ninject;

    public class NinjectKernelObjectFactory
    {
        private static IKernel savedKernel;

        public static void Initialize(IKernel kernel)
        {
            savedKernel = kernel;
        }

        public static T Get<T>()
        {
            return savedKernel.Get<T>();
        }
    }
}
