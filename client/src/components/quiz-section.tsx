import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quizQuestions = [
  {
    question: "거울 앞에서 목의 길이를 확인해보세요",
    description: "턱 끝에서 쇄골까지의 거리를 측정해보세요",
    options: [
      "짧음 - 주먹(세로x, 가로) 하나 크기 정도",
      "보통 - 주먹(세로x, 가로) 하나와 반 크기",
      "긺 - 주먹(세로x, 가로) 두 개 크기 이상"
    ]
  },
  {
    question: "어깨 끝점(어깨뼈 가장자리)의 모양을 관찰해보세요",
    description: "상체를 벗고 거울을 통해 어깨 라인을 확인하세요",
    options: [
      "둥근 형태 - 어깨가 완만한 곡선을 그림",
      "각진 형태 - 어깨가 직각에 가까움",
      "자연스러운 형태 - 둥글지도 각지지도 않음"
    ]
  },
  {
    question: "쇄골의 두께와 선명도를 확인해보세요",
    description: "쇄골 뼈를 살펴보세요",
    options: [
      "두껍고 뚜렷하지 않음 - 근육에 덮여 잘 보이지 않음",
      "얇고 선명함 - 뼈가 가늘고 명확히 보임",
      "적당한 두께 - 보통 정도로 보임"
    ]
  },
  {
    question: "손목의 둘레를 측정해보세요",
    description: "손목 가장 가는 부위를 살펴보세요",
    options: [
      "얇음",
      "매우 얇음",
      "두꺼움"
    ]
  },
  {
    question: "허리 위치를 확인해보세요",
    description: "팔꿈치를 옆구리에 붙였을 때 팔꿈치와 허리의 관계",
    options: [
      "팔꿈치보다 위 - 허리가 높은 위치",
      "팔꿈치보다 아래 - 허리가 낮은 위치",
      "팔꿈치와 비슷한 높이"
    ]
  },
  {
    question: "다리를 곧게 펴고 무릎뼈의 크기와 모양을 확인해보세요",
    description: "앉아서 다리를 펴고 무릎뼈 부분을 관찰하세요",
    options: [
      "작고 둥근 형태",
      "매우 작고 각진 형태",
      "크고 둥근 형태"
    ]
  },
  {
    question: "발의 크기와 모양을 확인해보세요",
    description: "발등의 높이와 전체적인 발의 크기를 확인하세요",
    options: [
      "작고 발등이 높음",
      "작고 발등이 낮음",
      "크고 발등이 보통"
    ]
  },
  {
    question: "팔 전체의 근육 발달 정도를 확인해보세요",
    description: "팔에 힘을 주지 않은 상태에서 근육의 두께를 확인",
    options: [
      "근육이 탄탄하고 두꺼움",
      "근육보다 지방이 더 많음",
      "적당한 근육량과 지방량"
    ]
  },
  {
    question: "손의 크기와 손가락 길이를 확인해보세요",
    description: "손바닥 크기와 손가락의 길이 비율을 관찰하세요",
    options: [
      "손바닥이 두껍고 손가락이 상대적으로 짧음",
      "손바닥이 얇고 손가락이 긺",
      "손바닥과 손가락이 균형적"
    ]
  },
  {
    question: "등을 벽에 대고 서서 어깨 간격을 확인해보세요",
    description: "등을 곧게 펴고 어깨 거리를 확인",
    options: [
      "어깨가 좁고 어깨뼈가 두꺼움",
      "어깨가 좁고 어깨뼈가 얇음",
      "어깨가 보통이고 혹은 넓음"
    ]
  },
  {
    question: "목 둘레를 측정해보세요",
    description: "목의 가장 가는 부분을 확인하세요",
    options: [
      "굵고 짧음",
      "가늘고 긺",
      "보통 굵기와 길이"
    ]
  },
  {
    question: "피부를 만져서 두께감을 확인해보세요",
    description: "손등 혹은 팔뚝이나 허벅지 피부를 살짝 잡아보세요",
    options: [
      "두껍고 탄력있음",
      "얇고 부드러움",
      "보통 두께, 매트한 질감"
    ]
  },
  {
    question: "체중 변화 시 가장 먼저 변화를 느끼는 부위는?",
    description: "살이 찌거나 빠질 때 가장 먼저 눈에 띄는 부위",
    options: [
      "상체(얼굴, 팔, 가슴 부위)",
      "하체(허벅지, 엉덩이, 종아리)",
      "전신에 고르게 분포"
    ]
  },
  {
    question: "발목의 두께를 확인해보세요",
    description: "발목 가장 가는 부분을 살펴보세요",
    options: [
      "발목이 보통",
      "발목이 가늠",
      "발목이 굵음"
    ]
  },
  {
    question: "옆에서 봤을 때 상체의 라인을 확인해보세요",
    description: "옆모습으로 상체의 곡선을 관찰하세요",
    options: [
      "일직선에 가까운 직선적 라인",
      "완만한 S자 곡선",
      "볼륨감 있는 곡선"
    ]
  },
  {
    question: "힘을 뺐을 때 허벅지를 확인해보세요",
    description: "힘을 빼고, 허벅지의 상태를 확인하세요.",
    options: [
      "허벅지가 탄탄함",
      "허벅지가 부드러움",
      "허벅지가 적당함"
    ]
  },
  {
    question: "팔꿈치 뼈의 크기와 모양을 확인해보세요",
    description: "팔을 구부렸을 때 팔꿈치 뼈의 크기와 모양",
    options: [
      "작고 뚜렷하지 않음",
      "매우 작고 뚜렷함",
      "크고 뚜렷함"
    ]
  },
  {
    question: "정면에서 봤을 때 골반의 폭을 확인해보세요",
    description: "허리와 골반의 너비 차이를 관찰하세요",
    options: [
      "허리와 골반의 차이가 적음",
      "허리와 골반의 차이가 큼",
      "허리와 골반이 크게 차이 없음"
    ]
  },
  {
    question: "전신을 봤을 때 가장 넓은 부위는 어디인가요?",
    description: "정면에서 봤을 때 가장 볼륨이 있는 부위",
    options: [
      "어깨 부위가 가장 넓음",
      "골반 부위가 가장 넓음",
      "어깨와 골반이 크게 차이 없음"
    ]
  },
  {
    question: "머리카락의 두께와 양을 확인해보세요",
    description: "머리카락을 한 번에 쥐어보세요",
    options: [
      "굵고 많음",
      "가늘고 적음",
      "보통 두께와 양"
    ]
  }
];

interface QuizSectionProps {
  onComplete: (answers: number[]) => void;
}

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isAnswered = answers[currentQuestion] !== -1;

  return (
    <CardContent className="p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-custom">진행률</span>
          <span className="text-sm font-medium text-gray-custom">
            {currentQuestion + 1}/20
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-dark-custom mb-3">
          {quizQuestions[currentQuestion].question}
        </h3>
        <p className="text-sm text-gray-custom mb-6 bg-blue-50 p-3 rounded-lg">
          {quizQuestions[currentQuestion].description}
        </p>
        
        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          className="space-y-4"
        >
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-pink-main transition-colors">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-custom">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestion === 0}
          className="px-6 py-3 rounded-full font-medium"
        >
          <ChevronLeft className="mr-2" size={16} />
          이전
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-40"
        >
          {currentQuestion === quizQuestions.length - 1 ? '사진 업로드' : '다음'}
          <ChevronRight className="ml-2" size={16} />
        </Button>
      </div>
    </CardContent>
  );
}
