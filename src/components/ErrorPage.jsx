const ErrorPage = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center px-4">
      <img
        src="./page-not-found.png"
        alt="illustration of a lost explorer holding lantern in the dark"
        className="max-w-[350px] object-cover md:max-w-xl lg:max-w-3xl"
      />
      <div className="mt-8 space-y-2 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-lg font-medium">please try again later.</p>
      </div>
    </section>
  );
};

export default ErrorPage;
