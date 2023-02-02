import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div className="bg-dark-primary w-screen h-screen flex items-center justify-center">
      <CircularProgress className="text-white" color="inherit" />
    </div>
  );
};

export default Loading;
