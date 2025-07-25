import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GenderSelectionProps {
  onGenderSelect: (gender: 'male' | 'female') => void;
}

export default function GenderSelection({ onGenderSelect }: GenderSelectionProps) {
  return (
    <CardContent className="p-8 text-center">
      <h2 className="text-2xl font-bold text-dark-custom mb-8">성별을 선택해주세요</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Button
          onClick={() => onGenderSelect('female')}
          variant="outline"
          className="gender-option bg-gradient-to-br from-pink-100 to-pink-50 hover:from-pink-200 hover:to-pink-100 border-2 border-transparent hover:border-pink-main rounded-2xl p-8 h-auto transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-pink-main rounded-full mb-4 flex items-center justify-center">
              <div className="text-white text-3xl">♀</div>
            </div>
            <span className="text-xl font-semibold text-dark-custom">여성</span>
          </div>
        </Button>
        
        <Button
          onClick={() => onGenderSelect('male')}
          variant="outline"
          className="gender-option bg-gradient-to-br from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 border-2 border-transparent hover:border-blue-main rounded-2xl p-8 h-auto transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-main rounded-full mb-4 flex items-center justify-center">
              <div className="text-white text-3xl">♂</div>
            </div>
            <span className="text-xl font-semibold text-dark-custom">남성</span>
          </div>
        </Button>
      </div>
    </CardContent>
  );
}
