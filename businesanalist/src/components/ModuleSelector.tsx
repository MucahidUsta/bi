import React from 'react';
import { FileText, GitBranch, Database, Lightbulb, CheckSquare, Calendar } from 'lucide-react';

interface ModuleSelectorProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ activeModule, onModuleChange }) => {
  const modules = [
    {
      id: 'requirements',
      name: 'Gereksinim Analizi',
      icon: FileText,
      description: 'Kullanıcı hikayeleri ve gereksinim dokümanları'
    },
    {
      id: 'process',
      name: 'Süreç Analizi',
      icon: GitBranch,
      description: 'İş süreçlerini optimize edin'
    },
    {
      id: 'data',
      name: 'Veri Analizi',
      icon: Database,
      description: 'Trendleri keşfedin ve raporlar oluşturun'
    },
    {
      id: 'solutions',
      name: 'Çözüm Önerileri',
      icon: Lightbulb,
      description: 'Akıllı çözüm tavsiyeleri'
    },
    {
      id: 'testing',
      name: 'Test Senaryoları',
      icon: CheckSquare,
      description: 'Kapsamlı test planları'
    },
    {
      id: 'planning',
      name: 'Proje Planlama',
      icon: Calendar,
      description: 'Risk analizi ve planlama'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">İş Analizi Modülleri</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              activeModule === module.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                activeModule === module.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <module.icon className="w-4 h-4" />
              </div>
              <h4 className={`font-medium ${
                activeModule === module.id ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {module.name}
              </h4>
            </div>
            <p className={`text-sm ${
              activeModule === module.id ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {module.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleSelector;