import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quizQuestions = [
  {
    question: "목의 길이는 어떤가요?",
    options: ["상대적으로 짧은 편", "보통 길이", "긴 편"]
  },
  {
    question: "어깨 라인의 특징은?",
    options: ["둥글고 부드러운 어깨", "직각에 가까운 어깨", "자연스럽고 균형잡힌 어깨"]
  },
  {
    question: "상체의 전체적인 느낌은?",
    options: ["탄탄하고 볼륨감 있음", "가늘고 여린 느낌", "자연스럽고 건강한 느낌"]
  },
  {
    question: "쇄골 라인은 어떻게 보이나요?",
    options: ["뚜렷하지 않음", "선명하고 얇게 보임", "적당히 보임"]
  },
  {
    question: "허리 위치는?",
    options: ["비교적 높은 편", "낮은 편", "보통"]
  },
  {
    question: "엉덩이 모양은?",
    options: ["평평한 편", "둥글고 곡선적", "자연스러운 형태"]
  },
  {
    question: "다리의 특징은?",
    options: ["무릎 위부터 날렵함", "전체적으로 부드러운 곡선", "길고 자연스러움"]
  },
  {
    question: "손목과 발목은?",
    options: ["가늘고 얇음", "매우 가늘고 섬세함", "보통이거나 약간 굵음"]
  },
  {
    question: "피부의 질감은?",
    options: ["탄력있고 두꺼운 느낌", "부드럽고 얇은 느낌", "매트하고 자연스러움"]
  },
  {
    question: "전체적인 체형의 느낌은?",
    options: ["견고하고 안정적", "부드럽고 여성스러움", "자연스럽고 활동적"]
  },
  {
    question: "근육의 발달 정도는?",
    options: ["쉽게 근육이 붙고 탄탄함", "근육보다 체지방이 많음", "적당한 근육량"]
  },
  {
    question: "체중 증가 시 살이 찌는 부위는?",
    options: ["상체 중심으로", "하체 중심으로", "전체적으로 고르게"]
  },
  {
    question: "관절의 크기는?",
    options: ["작고 섬세함", "매우 작고 얇음", "크고 굵음"]
  },
  {
    question: "얼굴형의 특징은?",
    options: ["각진 턱라인", "둥글고 부드러운 라인", "자연스러운 타원형"]
  },
  {
    question: "머리카락의 특성은?",
    options: ["굵고 볼륨감 있음", "가늘고 부드러움", "자연스러운 웨이브"]
  },
  {
    question: "손의 크기와 모양은?",
    options: ["작고 두꺼운 손", "작고 가는 손", "큰 편의 손"]
  },
  {
    question: "발의 특징은?",
    options: ["작고 높은 발등", "작고 얇은 발", "큰 편의 발"]
  },
  {
    question: "목선의 특징은?",
    options: ["굵고 짧음", "가늘고 긺", "보통 굵기"]
  },
  {
    question: "전체적인 골격의 느낌은?",
    options: ["작고 견고함", "작고 섬세함", "크고 자연스러움"]
  },
  {
    question: "옷을 입었을 때 가장 어울리는 스타일은?",
    options: ["정돈되고 심플한 스타일", "여성스럽고 부드러운 스타일", "캐주얼하고 자연스러운 스타일"]
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
        <h3 className="text-xl font-semibold text-dark-custom mb-6">
          {quizQuestions[currentQuestion].question}
        </h3>
        
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
          className="bg-gradient-to-r from-pink-main to-mint-main text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
        >
          {currentQuestion === quizQuestions.length - 1 ? '사진 업로드' : '다음'}
          <ChevronRight className="ml-2" size={16} />
        </Button>
      </div>
    </CardContent>
  );
}
