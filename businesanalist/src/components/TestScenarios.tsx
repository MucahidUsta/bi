import React, { useState } from 'react';
import { CheckSquare, Plus, Play, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { TestScenario } from '../types';

const TestScenarios: React.FC = () => {
  const [requirementInput, setRequirementInput] = useState('');
  const [testScenarios, setTestScenarios] = useState<TestScenario[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<{[key: string]: boolean[]}>({});

  const generateTestScenarios = async () => {
    if (!requirementInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulated AI test scenario generation
    setTimeout(() => {
      const mockScenarios: TestScenario[] = [
        {
          id: '1',
          title: 'Başarılı Kullanıcı Giriş Testi',
          description: 'Geçerli kullanıcı bilgileri ile sistem girişinin doğrulanması',
          preconditions: [
            'Test kullanıcısı sisteme kayıtlı olmalı',
            'Kullanıcı hesabı aktif durumda olmalı',
            'Giriş sayfası erişilebilir olmalı'
          ],
          steps: [
            'Giriş sayfasına git',
            'Geçerli kullanıcı adını gir',
            'Geçerli şifreyi gir',
            'Giriş butonuna tıkla',
            'Ana sayfaya yönlendirildiğini kontrol et'
          ],
          expectedResult: 'Kullanıcı başarıyla sisteme giriş yapar ve ana sayfaya yönlendirilir',
          priority: 'Yüksek'
        },
        {
          id: '2',
          title: 'Hatalı Şifre ile Giriş Testi',
          description: 'Yanlış şifre girişinde uygun hata mesajının gösterilmesi',
          preconditions: [
            'Test kullanıcısı sisteme kayıtlı olmalı',
            'Giriş sayfası erişilebilir olmalı'
          ],
          steps: [
            'Giriş sayfasına git',
            'Geçerli kullanıcı adını gir',
            'Hatalı şifre gir',
            'Giriş butonuna tıkla',
            'Hata mesajının gösterildiğini kontrol et'
          ],
          expectedResult: 'Sistem "Kullanıcı adı veya şifre hatalı" mesajı gösterir ve giriş engellenır',
          priority: 'Yüksek'
        },
        {
          id: '3',
          title: 'Boş Alan Doğrulama Testi',
          description: 'Zorunlu alanların boş bırakılması durumunda validasyon kontrolü',
          preconditions: [
            'Giriş sayfası erişilebilir olmalı'
          ],
          steps: [
            'Giriş sayfasına git',
            'Kullanıcı adı alanını boş bırak',
            'Şifre alanını boş bırak',
            'Giriş butonuna tıkla',
            'Uyarı mesajlarının gösterildiğini kontrol et'
          ],
          expectedResult: 'Her iki alan için de "Bu alan zorunludur" uyarısı gösterilir',
          priority: 'Orta'
        }
      ];

      setTestScenarios(mockScenarios);
      setIsGenerating(false);
      
      // Initialize checked steps state
      const initialCheckedState: {[key: string]: boolean[]} = {};
      mockScenarios.forEach(scenario => {
        initialCheckedState[scenario.id] = new Array(scenario.steps.length).fill(false);
      });
      setCheckedSteps(initialCheckedState);
    }, 2000);
  };

  const toggleStepCheck = (scenarioId: string, stepIndex: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [scenarioId]: prev[scenarioId]?.map((checked, index) => 
        index === stepIndex ? !checked : checked
      ) || []
    }));
  };

  const getCompletionRate = (scenarioId: string) => {
    const checks = checkedSteps[scenarioId] || [];
    const completedSteps = checks.filter(Boolean).length;
    return Math.round((completedSteps / checks.length) * 100) || 0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Kritik': return 'text-red-600 bg-red-100';
      case 'Yüksek': return 'text-orange-600 bg-orange-100';
      case 'Orta': return 'text-yellow-600 bg-yellow-100';
      case 'Düşük': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (scenarioId: string) => {
    const completionRate = getCompletionRate(scenarioId);
    if (completionRate === 100) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (completionRate > 0) return <Clock className="w-5 h-5 text-yellow-500" />;
    return <Play className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Test Senaryoları</h3>
          <p className="text-gray-600">Gereksinimleriniz için kapsamlı test senaryoları oluşturun</p>
        </div>
      </div>

      {testScenarios.length === 0 ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Edilecek Gereksinim veya Özellik
            </label>
            <textarea
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              placeholder="Test senaryosu oluşturmak istediğiniz gereksinimi veya özelliği açıklayın. Örnek: 'Kullanıcıların sisteme güvenli giriş yapabilmesi...'"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            onClick={generateTestScenarios}
            disabled={!requirementInput.trim() || isGenerating}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Test Senaryoları Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Test Senaryoları Oluştur</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>{testScenarios.length} test senaryosu</strong> oluşturuldu. 
              Her senaryoyu adım adım takip ederek testlerinizi yürütebilirsiniz.
            </p>
          </div>

          {/* Test Scenarios */}
          <div className="space-y-6">
            {testScenarios.map((scenario) => {
              const completionRate = getCompletionRate(scenario.id);
              
              return (
                <div key={scenario.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(scenario.id)}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{scenario.title}</h4>
                        <p className="text-gray-600 text-sm">{scenario.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(scenario.priority)}`}>
                        {scenario.priority}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{completionRate}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preconditions */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Ön Koşullar:</h5>
                    <ul className="space-y-1">
                      {scenario.preconditions.map((condition, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Test Steps */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-3">Test Adımları:</h5>
                    <div className="space-y-2">
                      {scenario.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                          <button
                            onClick={() => toggleStepCheck(scenario.id, index)}
                            className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${
                              checkedSteps[scenario.id]?.[index]
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-green-400'
                            }`}
                          >
                            {checkedSteps[scenario.id]?.[index] && <CheckCircle className="w-3 h-3" />}
                          </button>
                          <div className="flex-1">
                            <span className={`text-sm ${
                              checkedSteps[scenario.id]?.[index] 
                                ? 'text-green-700 line-through' 
                                : 'text-gray-700'
                            }`}>
                              {index + 1}. {step}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Result */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 mb-1">Beklenen Sonuç:</h5>
                    <p className="text-blue-800 text-sm">{scenario.expectedResult}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setTestScenarios([]);
                setRequirementInput('');
                setCheckedSteps({});
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Yeni Test Senaryoları
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Test Planı İndir
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Test Raporunu İndir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestScenarios;