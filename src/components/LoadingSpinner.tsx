const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-8'>
      <div
        className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-vitals-primary border-t-transparent'
        role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <p className='text-muted-foreground'>Analyzing page...</p>
    </div>
  );
};

export default LoadingSpinner;
