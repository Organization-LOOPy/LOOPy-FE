const LoadingSpinner = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
