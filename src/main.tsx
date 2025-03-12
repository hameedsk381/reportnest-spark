import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TrueFocus from './components/TrueFocus/TrueFocus.tsx';

const root = createRoot(document.getElementById("root")!);

// Show loading indicator while app is initializing
root.render(
    <div className="min-h-screen flex flex-col items-center justify-center">
    <main className="w-full flex justify-center">
      <TrueFocus 
        sentence="Open Vaartha"
        manualMode={false}
        blurAmount={2}
        borderColor="green"
        animationDuration={1}
        pauseBetweenAnimations={1}
      />
    </main>
  </div>
);

// Render the actual app after a short delay to ensure loading indicator is visible
setTimeout(() => {
  root.render(<App />);
}, 3500);
