import React, { useState } from 'react';
import { Database, Upload, BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';
import { DataAnalysisResult } from '../types';

const DataAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DataAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const analyzeData = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulated AI analysis
    setTimeout(() => {
      const mockResult: DataAnalysisResult = {
        summary: `${selectedFile.name} dosyası analiz edildi. 1,247 satır veri bulundu. Ana bulgular: Satış trendlerinde %15 artış, müşteri memnuniyetinde iyileşme gözlemlendi.`,
        trends: [
          'Son 3 ayda satışlarda istikrarlı artış trendi',
          'Pazartesi günleri en yüksek aktivite gösteriliyor',
          'Müşteri yaş gruplarında 25-35 yaş aralığı dominant',
          'Mobil kullanım oranı %68 seviyesinde'
        ],
        recommendations: [
          'Pazartesi günlerine özel kampanyalar düzenlenebilir',
          '25-35 yaş grubuna yönelik ürün geliştirme yapılmalı',
          'Mobil deneyim daha da iyileştirilebilir',
          'Hafta sonu aktivitelerini artırmak için stratejiler geliştirilmeli'
        ]
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const mockChartData = [
    { name: 'Ocak', value: 400 },
    { name: 'Şubat', value: 300 },
    { name: 'Mart', value: 600 },
    { name: 'Nisan', value: 800 },
    { name: 'Mayıs', value: 500 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Veri Analizi</h3>
          <p className="text-gray-600">CSV ve Excel dosyalarınızı analiz edin, trendleri keşfedin</p>
        </div>
      </div>

      {!analysisResult ? (
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Veri Dosyası Yükleyin
            </h4>
            <p className="text-gray-600 mb-4">
              CSV veya Excel dosyanızı sürükleyip bırakın veya seçin
            </p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Dosya Seç</span>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Maksimum dosya boyutu: 10MB • Desteklenen formatlar: CSV, XLSX, XLS
            </p>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">{selectedFile.name}</p>
                    <p className="text-sm text-purple-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={analyzeData}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Analiz Ediliyor...</span>
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4" />
                      <span>Analiz Et</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Sample Data Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Örnek Veri ile Test Edin</h4>
            <p className="text-gray-600 text-sm mb-3">
              Kendi verileriniz yoksa örnek satış verisi ile analiz özelliklerini test edebilirsiniz.
            </p>
            <button
              onClick={() => {
                // Create a mock file for demonstration
                const mockFile = new File([''], 'ornek-satis-verisi.csv', { type: 'text/csv' });
                setSelectedFile(mockFile);
              }}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Örnek Veri Kullan →
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analysis Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h4 className="text-lg font-semibold text-gray-900">Analiz Özeti</h4>
            </div>
            <p className="text-gray-700">{analysisResult.summary}</p>
          </div>

          {/* Mock Visualization */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Veri Görselleştirmesi</span>
            </h4>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Grafik ve Çizelgeler</p>
              <p className="text-sm text-gray-500 mt-1">
                Verileriniz çeşitli grafik türlerinde görselleştirilir
              </p>
              <div className="mt-4 grid grid-cols-5 gap-2 max-w-md mx-auto">
                {mockChartData.map((item, index) => (
                  <div key={index} className="bg-purple-500 rounded text-white text-xs p-2">
                    <div className="text-center">
                      <div className="font-semibold">{item.value}</div>
                      <div className="text-purple-200">{item.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trends */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Tespit Edilen Trendler</span>
            </h4>
            <div className="space-y-3">
              {analysisResult.trends.map((trend, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{trend}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-500" />
              <span>Öneriler</span>
            </h4>
            <div className="space-y-3">
              {analysisResult.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Database className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800 text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setAnalysisResult(null);
                setSelectedFile(null);
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Yeni Analiz
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Raporu İndir</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalysis;