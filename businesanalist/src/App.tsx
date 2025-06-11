import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ModuleSelector from './components/ModuleSelector';
import RequirementAnalysis from './components/RequirementAnalysis';
import ProcessAnalysis from './components/ProcessAnalysis';
import DataAnalysis from './components/DataAnalysis';
import SolutionSuggestions from './components/SolutionSuggestions';
import TestScenarios from './components/TestScenarios';
import ProjectPlanning from './components/ProjectPlanning';

function App() {
  const [activeModule, setActiveModule] = useState('requirements');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'requirements':
        return <RequirementAnalysis />;
      case 'process':
        return <ProcessAnalysis />;
      case 'data':
        return <DataAnalysis />;
      case 'solutions':
        return <SolutionSuggestions />;
      case 'testing':
        return <TestScenarios />;
      case 'planning':
        return <ProjectPlanning />;
      default:
        return <RequirementAnalysis />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ModuleSelector 
          activeModule={activeModule} 
          onModuleChange={setActiveModule} 
        />
        {renderActiveModule()}
      </div>
      
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">İş Analisti Asistanı - Yapay Zeka Destekli İş Analizi Platformu</p>
            <p className="text-sm">Tüm iş analizi süreçlerinizi tek platformda yönetin</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;