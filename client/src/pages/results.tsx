import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ResultsDisplay from "@/components/results-display";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Loader2 } from "lucide-react";

export default function Results() {
  const { id } = useParams();
  
  const { data: result, isLoading, error } = useQuery({
    queryKey: ['/api/body-type-result', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-main to-mint-main rounded-full flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-dark-custom">체형 타입 테스트</h1>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Card className="rounded-3xl shadow-lg p-8 text-center border-0">
            <CardContent className="p-0">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-main to-mint-main rounded-full mx-auto mb-6 flex items-center justify-center">
                <Loader2 className="text-white animate-spin" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-dark-custom mb-4">결과를 불러오는 중입니다</h2>
              <p className="text-gray-custom">잠시만 기다려주세요...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-main to-mint-main rounded-full flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-dark-custom">체형 타입 테스트</h1>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Card className="rounded-3xl shadow-lg p-8 text-center border-0">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold text-dark-custom mb-4">결과를 찾을 수 없습니다</h2>
              <p className="text-gray-custom">요청하신 결과를 찾을 수 없습니다. 테스트를 다시 진행해주세요.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return <ResultsDisplay result={result} />;
}
