import React, { useState, useEffect } from 'react';
import { 
  Brain, Search, Shield, Eye, PenTool, Calculator, 
  TrendingUp, Layers, Settings, Key, Menu, X
} from 'lucide-react';

// Tipos básicos
interface APIConfig {
  provider: string;
  apiKey: string;
  isConfigured: boolean;
}

function App() {
  const [activeModule, setActiveModule] = useState('detector');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiConfig, setApiConfig] = useState<APIConfig>({
    provider: '',
    apiKey: '',
    isConfigured: false
  });

  // Módulos disponibles
  const modules = [
    {
      id: 'detector',
      name: 'Detector de Productos',
      icon: <Search className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Encuentra productos ganadores con IA'
    },
    {
      id: 'validator',
      name: 'Validador de Ofertas',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      description: 'Valida el potencial de cualquier oferta'
    },
    {
      id: 'spy',
      name: 'Espía Creativo',
      icon: <Eye className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Analiza creatividades ganadoras'
    },
    {
      id: 'copy',
      name: 'Generador de Copy',
      icon: <PenTool className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      description: 'Crea textos que convierten'
    },
    {
      id: 'calculator',
      name: 'Calculadora de Profit',
      icon: <Calculator className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Proyecta tus ganancias'
    },
    {
      id: 'trends',
      name: 'Predictor de Tendencias',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-red-500 to-red-600',
      description: 'Anticipa las tendencias del mercado'
    },
    {
      id: 'funnel',
      name: 'Arquitecto de Funnels',
      icon: <Layers className="w-5 h-5" />,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Diseña embudos que convierten'
    }
  ];

  // Cargar configuración guardada
  useEffect(() => {
    const saved = localStorage.getItem('marketinsight-api-config');
    if (saved) {
      setApiConfig(JSON.parse(saved));
    }
  }, []);

  // Modal de configuración API
  const APIConfigModal = () => {
    const [tempConfig, setTempConfig] = useState({
      provider: apiConfig.provider || 'gemini',
      apiKey: apiConfig.apiKey || ''
    });

    const handleSave = () => {
      const newConfig = {
        ...tempConfig,
        isConfigured: true
      };
      setApiConfig(newConfig);
      localStorage.setItem('marketinsight-api-config', JSON.stringify(newConfig));
      setShowApiModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <h3 className="text-2xl font-bold mb-6">Configuración de API</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proveedor de IA
              </label>
              <select
                value={tempConfig.provider}
                onChange={(e) => setTempConfig({...tempConfig, provider: e.target.value})}
                className="input-field"
              >
                <option value="gemini">Google Gemini (Gratis)</option>
                <option value="cohere">Cohere (Gratis)</option>
                <option value="together">Together AI (Gratis)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={tempConfig.apiKey}
                onChange={(e) => setTempConfig({...tempConfig, apiKey: e.target.value})}
                placeholder="Ingresa tu API Key"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowApiModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 btn-primary"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">
                MarketInsight Pro
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowApiModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              apiConfig.isConfigured 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">
              {apiConfig.isConfigured ? 'API Configurada' : 'Configurar API'}
            </span>
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 pt-16 lg:pt-0`}>
          <div className="h-full overflow-y-auto p-4">
            <nav className="space-y-2">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeModule === module.id
                      ? 'bg-gradient-to-r ' + module.color + ' text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {module.icon}
                  <div className="text-left">
                    <div className="font-medium">{module.name}</div>
                    {activeModule === module.id && (
                      <div className="text-xs opacity-90">{module.description}</div>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="module-card">
              <h2 className="text-2xl font-bold mb-4">
                {modules.find(m => m.id === activeModule)?.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {modules.find(m => m.id === activeModule)?.description}
              </p>
              
              {!apiConfig.isConfigured && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Configura tu API Key para comenzar a usar esta herramienta
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  Módulo en desarrollo...
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showApiModal && <APIConfigModal />}
    </div>
  );
}

export default App;
