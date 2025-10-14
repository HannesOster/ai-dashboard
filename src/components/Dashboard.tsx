import InputSection from "./InputSection";
import FunctionSelector from "./FunctionSelector";
import GenerateButton from "./GenerateButton";
import OutputSection from "./OutputSection";

const Dashboard = () => {
  return (
    <main className="max-w-6xl mx-auto px-8 py-8">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
        <InputSection />
        <FunctionSelector />
        <GenerateButton />
        <OutputSection />
      </div>
    </main>
  );
};

export default Dashboard;
