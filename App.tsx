import React, { useState, useCallback } from 'react';
import type { FarmData, AIResponse, Recommendation } from './types';
import { Screen } from './types';
import HomeScreen from './screens/HomeScreen';
import WizardScreen from './screens/WizardScreen';
import ResultsScreen from './screens/ResultsScreen';
import PlanScreen from './screens/PlanScreen';
import AgriBot from './components/AgriBot';
import LanguageSelector from './components/LanguageSelector';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Recommendation | null>(null);

  const handleStart = useCallback(() => {
    setCurrentScreen(Screen.Wizard);
  }, []);

  const handlePlanGenerated = useCallback((data: FarmData, response: AIResponse) => {
    setFarmData(data);
    setAiResponse(response);
    setCurrentScreen(Screen.Results);
  }, []);

  const handleViewPlan = useCallback((recommendation: Recommendation) => {
    setSelectedPlan(recommendation);
    setCurrentScreen(Screen.Plan);
  }, []);

  const handleBackToResults = useCallback(() => {
    setCurrentScreen(Screen.Results);
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setFarmData(null);
    setAiResponse(null);
    setSelectedPlan(null);
    setCurrentScreen(Screen.Home);
  }, []);


  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Home:
        return <HomeScreen onStart={handleStart} />;
      case Screen.Wizard:
        return <WizardScreen onPlanGenerated={handlePlanGenerated} />;
      case Screen.Results:
        return aiResponse && farmData ? (
          <ResultsScreen 
            response={aiResponse} 
            farmData={farmData} 
            onViewPlan={handleViewPlan} 
            onBack={handleBackToHome}
          />
        ) : null;
      case Screen.Plan:
        return selectedPlan && farmData ? (
          <PlanScreen 
            recommendation={selectedPlan} 
            farmData={farmData} 
            onBack={handleBackToResults} 
          />
        ) : null;
      default:
        return <HomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative">
      <LanguageSelector />
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {renderScreen()}
      </main>
      {currentScreen !== Screen.Home && <AgriBot />}
    </div>
  );
};

export default App;
