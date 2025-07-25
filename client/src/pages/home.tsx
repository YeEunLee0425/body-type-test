import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Star } from "lucide-react";

export default function Home() {
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
            <div className="text-sm text-gray-custom flex items-center">
              <Users size={16} className="mr-1" />
              100만+ 참여
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <Card className="rounded-3xl shadow-lg p-8 mb-8 border-0">
            <CardContent className="p-0">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-main via-mint-main to-blue-main rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-dark-custom mb-4">AI 체형 분석 테스트</h2>
                <p className="text-lg text-gray-custom mb-6">나만의 체형 타입을 찾아 완벽한 스타일링을 시작하세요</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-pink-main rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-xl">S</div>
                  </div>
                  <h3 className="font-semibold text-dark-custom mb-2">스트레이트</h3>
                  <p className="text-sm text-gray-custom">탄탄하고 균형잡힌 체형</p>
                </div>
                <div className="bg-gradient-to-br from-mint-100 to-mint-50 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-mint-main rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-xl">W</div>
                  </div>
                  <h3 className="font-semibold text-dark-custom mb-2">웨이브</h3>
                  <p className="text-sm text-gray-custom">부드럽고 곡선적인 체형</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-blue-main rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-xl">N</div>
                  </div>
                  <h3 className="font-semibold text-dark-custom mb-2">내추럴</h3>
                  <p className="text-sm text-gray-custom">자연스럽고 건강한 체형</p>
                </div>
              </div>

              <Link href="/test">
                <Button className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  테스트 시작하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="rounded-2xl p-6 border-0 bg-gradient-to-br from-pink-50 to-white">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-pink-main rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-dark-custom mb-2">AI 정밀 분석</h3>
              <p className="text-sm text-gray-custom">최신 AI 기술로 정확한 체형 분석을 제공합니다</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl p-6 border-0 bg-gradient-to-br from-mint-50 to-white">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-mint-main rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-dark-custom mb-2">연예인 매칭</h3>
              <p className="text-sm text-gray-custom">같은 체형의 연예인과 매칭하여 스타일 참고</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl p-6 border-0 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-blue-main rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-dark-custom mb-2">맞춤 스타일링</h3>
              <p className="text-sm text-gray-custom">개인 체형에 최적화된 스타일링 가이드</p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark-custom text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">체형 타입 테스트</h4>
              <p className="text-gray-300 text-sm">AI 기술을 활용한 정확한 체형 분석으로 나만의 완벽한 스타일을 찾아보세요.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">바로가기</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-pink-main transition-colors">체형별 스타일링 가이드</a></li>
                <li><a href="#" className="hover:text-pink-main transition-colors">연예인 체형 분석</a></li>
                <li><a href="#" className="hover:text-pink-main transition-colors">패션 트렌드</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">문의</h4>
              <p className="text-gray-300 text-sm mb-2">이메일: support@bodytype.kr</p>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 체형 타입 테스트. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
