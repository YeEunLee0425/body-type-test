const highlights = [
  "곡선미를 살리는 핏 & 허리를 강조하는 스타일이 가장 잘 어울려요!",
  "몸을 부드럽게 감싸면서 자연스럽게 핏되는 실루엣이 매력을 극대화해요.",
  "우아하고 여성스러운 스타일을 연출하면 더욱 세련된 분위기를 만들 수 있어요.",
  "살짝 흐르는 부드러운 소재가 체형을 자연스럽고 매력적으로 보여줘요.",
];

const improvements = [
  "너무 루즈하거나 박시한 스타일은 체형을 부해 보이게 할 수 있어요.",
  "딱 떨어지는 직선실루엣(스트레이트 핏, 박시한 블레이저 등)은 웨이브 타입과 조화가 덜할 수 있어요.",
  "너무 핏되지 않은 살짝 슬림한 사이즈는 피해주세요.",
];

const stylingGuide = {
  top: [
    "허리를 강조하는 핏의 상의가 잘 어울려요.",
    "브이넥, 스퀘어넥, 보트넥이 균형 잡힌 실루엣을 연출해줘요.",
    "부드럽게 흐르는 블라우스나 니트가 아름답게 보여줘요.",
    "프릴·레이스 같은 여성스러운 디테일도 찰떡이에요.",
  ],
  bottom: [
    "A라인·플레어·머메이드 스커트가 잘 어울려요.",
    "하이웨이스트 팬츠로 다리가 길어 보이게 해보세요.",
    "살짝 슬림한 슬랙스보다는 부드러운 라인의 팬츠를 추천해요.",
  ],
  items: [
    "랩 원피스 & 허리라인이 강조된 드레스",
    "부드러운 실루엣의 블라우스 & 니트",
    "A라인 스커트 & 플레어 스커트",
  ],
};


import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, Check, AlertTriangle, AlertCircle, Palette, Star, Share, RotateCcw } from "lucide-react";
import { bodyTypeData } from "@/lib/body-type-data";
import { Mars, Venus } from "lucide-react"

const themes = {
  male: {
    gradient: "from-blue-main to-teal-main",
    icon: <Mars size={48} className="text-blue-main" />,
    textColor: "text-blue-main",
  },
  female: {
    gradient: "from-pink-main to-mint-main",
    icon: <Venus size={48} className="text-pink-main" />,
    textColor: "text-pink-main",
  },
} as const;
type Gender = keyof typeof themes;

interface ResultsDisplayProps {
  result: {
    id: string;
    gender: string;
    result: {
      type: string;
      primary: string;
      secondary?: string;
      confidence: number;
      scores: {
        straight: number;
        wave: number;
        natural: number;
      };
    };
  };
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { result: analysisResult, gender } = result;
  const primaryType = analysisResult.primary as keyof typeof bodyTypeData;
  const typeData = bodyTypeData[primaryType];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '내 체형 타입 테스트 결과',
          text: `나의 체형 타입은 ${analysisResult.type}입니다!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('공유 취소됨');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
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
        <div className="space-y-8">
          {/* Main Result Card */}
          <Card className="rounded-3xl shadow-lg p-8 text-center border-0">
            <CardContent className="p-0">
              <div className="mb-6">
                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full ${typeData.gradient}`}>
                  <div className="font-bold text-5xl">{primaryType.charAt(0).toUpperCase()}</div>
                </div>
                <h2 className="text-3xl font-bold text-dark-custom mb-6">
                  당신의 체형 타입:{" "}
                  <span className="text-4xl bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                    {typeData.name.toUpperCase()}
                  </span>
                </h2>
                <p className="text-lg text-gray-custom leading-relaxed">
                  {typeData.description
                    .split(". ")
                    .slice(0, 2)
                    .join(". ") + "…"
                  }
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  타입 순도: {analysisResult.confidence}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Characteristics Summary */}
          <Card className="rounded-3xl shadow-lg p-8 border-0">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-dark-custom mb-6 flex items-center">
                <CheckCircle className="text-pink-main mr-3" size={24} />
                신체 특징 요약
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {typeData.characteristics.map((characteristic, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="text-mint-main mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-custom">{characteristic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


          {/* 요약 아래 */}
          <section className="text-left mt-8 space-y-12">
          {/* ✅ 강조할 부분 */}
            <div>
              <h3 className="text-2xl font-bold flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-500" size={24} />
                <span>강조할 부분</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-gray-50 rounded-2xl p-4 shadow-sm"
                  >
                    <Check className="text-green-500" size={20} />
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ⚠️ 보완할 부분 */}
            <div>
              <h3 className="text-2xl font-bold flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-yellow-500" size={24} />
                <span>보완할 부분</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {improvements.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-gray-50 rounded-2xl p-4 shadow-sm"
                  >
                    <AlertCircle className="text-yellow-500" size={20} />
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 🎨 스타일링 가이드 */}
            <div>
              <h3 className="text-2xl font-bold flex items-center space-x-2 mb-4">
                <Palette className="text-sage-main" size={24} />
                <span>스타일링 가이드</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 상의 */}
                <div>
                  <p className="font-semibold mb-2">상의</p>
                  <ul className="space-y-1">
                    {stylingGuide.top.map((t, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="text-sage-main mt-1" size={16} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* 하의 */}
                <div>
                  <p className="font-semibold mb-2">하의</p>
                  <ul className="space-y-1">
                    {stylingGuide.bottom.map((t, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="text-sage-main mt-1" size={16} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* 추천 아이템 */}
                <div>
                  <p className="font-semibold mb-2">추천 아이템</p>
                  <ul className="space-y-1">
                    {stylingGuide.items.map((t, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="text-sage-main mt-1" size={16} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </section>



          {/* Styling Recommendations */}
          <Card className="rounded-3xl shadow-lg p-8 border-0">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-dark-custom mb-6 flex items-center">
                <Palette className="text-mint-main mr-3" size={24} />
                스타일링 추천
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-dark-custom mb-4 flex items-center">
                    <div className="w-2 h-2 bg-pink-main rounded-full mr-2"></div>
                    상의 스타일
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-custom">
                    {typeData.styling.tops.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="text-pink-main" size={12} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-mint-50 to-mint-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-dark-custom mb-4 flex items-center">
                    <div className="w-2 h-2 bg-mint-main rounded-full mr-2"></div>
                    하의 스타일
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-custom">
                    {typeData.styling.bottoms.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="text-mint-main" size={12} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-dark-custom mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-main rounded-full mr-2"></div>
                    액세서리
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-custom">
                    {typeData.styling.accessories.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="text-blue-main" size={12} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Celebrity Matches */}
          <Card className="rounded-3xl shadow-lg p-8 border-0">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-dark-custom mb-6 flex items-center">
                <Star className="text-yellow-accent mr-3" size={24} />
                닮은꼴 연예인
              </h3>
              <ul className="list-disc list-inside space-y-2 text-left mt-4">
                {typeData.celebrities[gender as 'male' | 'female']
                  .slice(0,5)
                  .map((name, i) => <li key={i}>{name}</li>)}
              </ul>
            </CardContent>
          </Card>


          {/* Styling Examples */}
          {/*
          <Card className="rounded-3xl shadow-lg p-8 border-0">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-dark-custom mb-6 flex items-center">
                <Palette className="text-sage-main mr-3" size={24} />
                스타일링 예시
              </h3>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold">스타일링 가이드</h2>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  {typeData.stylingTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                    alt="스타일링 예시 1" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                    alt="스타일링 예시 2" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1544957992-20514f595d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                    alt="스타일링 예시 3" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                    alt="스타일링 예시 4" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test">
              <Button variant="outline" className="px-8 py-3 rounded-full font-medium">
                <RotateCcw className="mr-2" size={16} />
                다시 테스트하기
              </Button>
            </Link>
            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              <Share className="mr-2" size={16} />
              결과 공유하기
            </Button>
          </div>
        </div>
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
