import '@/shared/styles/loader.css';

export const LoadingView = () => {
  return (
    <section className="min-h-screen min-w-screen grid place-items-center content-center gap-4">
      <h1>NEOKANBAN</h1>
      <div className="loader"></div>
    </section>
  );
};
