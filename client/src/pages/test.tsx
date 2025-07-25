import { useState } from "react";
import { useLocation } from "wouter";
import GenderSelection from "@/components/gender-selection";
import QuizSection from "@/components/quiz-section";
import PhotoUpload from "@/components/photo-upload";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export type TestStep = 'gender' | 'quiz' | 'photos' | 'loading';

export default function Test() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<TestStep>('gender');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | ''>('');
  const [answers, setAnswers] = useState<number[]>([]);

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (quizAnswers: number[]) => {
    setAnswers(quizAnswers);
    setCurrentStep('photos');
  };

  const handleAnalysisComplete = (resultId: string) => {
    setLocation(`/results/${resultId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-main to-mint-main rounded-full flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-dark-custom">체형 타입 테스트</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Card className="rounded-3xl shadow-lg border-0">
          {currentStep === 'gender' && <GenderSelection onGenderSelect={handleGenderSelect} />}
          {currentStep === 'quiz' && <QuizSection onComplete={handleQuizComplete} />}
          {currentStep === 'photos' && (
            <PhotoUpload 
              gender={selectedGender} 
              answers={answers} 
              onComplete={handleAnalysisComplete} 
            />
          )}
        </Card>
      </main>
    </div>
  );
}
