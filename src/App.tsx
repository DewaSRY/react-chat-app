import { cn } from "./lib/utils";

function App() {
  return (
    <div
      className={cn(
        "my-[10vh] mx-auto py-8 px-4 w-[90vh] ",
        "bg-gray-700/80 rounded-2xl backdrop-blur-sm saturate-[180%] "
      )}
    >
      <div>hallo</div>
    </div>
  );
}

export default App;
