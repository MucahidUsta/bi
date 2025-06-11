import React, { useState } from 'react';
import { GitBranch, ArrowRight, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { ProcessAnalysis as ProcessAnalysisType, ProcessStep } from '../types';

const ProcessAnalysis: React.FC = () => {
  const [processInput, setProcessInput] = useState('');
  const [analysis, setAnalysis] = useState<ProcessAnalysisType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeProcess = async () => {
    if (!processInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulated AI analysis
    setTimeout(() => {
      const mockAnalysis: ProcessAnalysisType = {
        processName: 'Müşteri Onboarding Süreci',
        currentSteps: [
          {
            id: '1',
            name: 'Müşteri Başvurusu',
            description: 'Müşteri online form doldurur',
            duration: '5 dakika',
            responsible: 'Müşteri',
            inputs: ['Kişisel bilgiler', 'İletişim bilgileri'],
            outputs: ['Başvuru formu'],
            issues: ['Formun çok uzun olması']
          },
          {
            id: '2',
            name: 'Manuel Doğrulama',
            description: 'Müşteri temsilcisi bilgileri kontrol eder',
            duration: '2-3 gün',
            responsible: 'Müşteri Temsilcisi',
            inputs: ['Başvuru formu'],
            outputs: ['Doğrulanmış bilgiler'],
            issues: ['Uzun bekleme süresi', 'Manuel süreç']
          },
          {
            id: '3',
            name: 'Hesap Oluşturma',
            description: 'Sistem yöneticisi hesap açar',
            duration: '1 gün',
            responsible: 'Sistem Yöneticisi',
            inputs: ['Doğrulanmış bilgiler'],
            outputs: ['Aktif hesap'],
            issues: ['Tek kişiye bağımlılık']
          }
        ],
        inefficiencies: [
          'Manuel doğrulama süreci çok uzun sürüyor',
          'Süreç tek kişiye bağımlı',
          'Müşteri geri bildirimi eksik',
          'Süreç takibi zor'
        ],
        recommendations: [
          'Otomatik doğrulama sistemi kurulmalı',
          'Self-servis hesap oluşturma imkanı sağlanmalı',
          'Süreç durumu için bildirim sistemi eklenmeli',
          'Form basitleştirilmeli'
        ],
        expectedBenefits: [
          'Süre %70 azalacak (3-4 günden 1 güne)',
          'Müşteri memnuniyeti artacak',
          'İnsan kaynağı tasarrufu sağlanacak',
          'Hata oranı azalacak'
        ]
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
          <GitBranch className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Süreç Analizi</h3>
          <p className="text-gray-600">İş süreçlerinizi analiz edin ve iyileştirme fırsatlarını keşfedin</p>
        </div>
      </div>

      {!analysis ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İş Süreci Açıklaması
            </label>
            <textarea
              value={processInput}
              onChange={(e) => setProcessInput(e.target.value)}
              placeholder="Analiz etmek istediğiniz iş sürecini detaylı olarak açıklayın. Hangi adımların olduğunu, kimler tarafından yapıldığını, ne kadar sürdüğünü ve varsa sorunları belirtin..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            onClick={analyzeProcess}
            disabled={!processInput.trim() || isAnalyzing}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Analiz Ediliyor...</span>
              </>
            ) : (
              <>
                <GitBranch className="w-4 h-4" />
                <span>Süreci Analiz Et</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Process Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">{analysis.processName}</h4>
            <p className="text-gray-600 text-sm">
              {analysis.currentSteps.length} adım tespit edildi, {analysis.inefficiencies.length} iyileştirme fırsatı belirlendi
            </p>
          </div>

          {/* Current Process Steps */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>Mevcut Süreç Adımları</span>
            </h4>
            <div className="space-y-3">
              {analysis.currentSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{step.name}</h5>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-gray-900 font-medium">{step.duration}</p>
                        <p className="text-gray-600">{step.responsible}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <h6 className="text-xs font-medium text-gray-700 mb-1">Girdiler:</h6>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {step.inputs.map((input, i) => (
                            <li key={i}>• {input}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-xs font-medium text-gray-700 mb-1">Çıktılar:</h6>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {step.outputs.map((output, i) => (
                            <li key={i}>• {output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {step.issues && step.issues.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-red-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-medium text-red-700">Tespit Edilen Sorunlar:</span>
                        </div>
                        <ul className="text-xs text-red-600 space-y-1">
                          {step.issues.map((issue, i) => (
                            <li key={i}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {index < analysis.currentSteps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inefficiencies */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Tespit Edilen Verimsizlikler</span>
            </h4>
            <div className="space-y-2">
              {analysis.inefficiencies.map((inefficiency, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{inefficiency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>İyileştirme Önerileri</span>
            </h4>
            <div className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-yellow-800 text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Benefits */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Beklenen Faydalar</span>
            </h4>
            <div className="space-y-2">
              {analysis.expectedBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setAnalysis(null)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Yeni Analiz
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Raporu İndir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessAnalysis;