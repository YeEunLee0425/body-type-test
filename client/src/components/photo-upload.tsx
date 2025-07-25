import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Trash2, Brain, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface PhotoUploadProps {
  gender: string;
  answers: number[];
  onComplete: (resultId: string) => void;
}

export default function PhotoUpload({ gender, answers, onComplete }: PhotoUploadProps) {
  const [uploadedPhotos, setUploadedPhotos] = useState<(File | null)[]>([null, null, null]);
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest('POST', '/api/analyze-body-type', formData);
      return response.json();
    },
    onSuccess: (data) => {
      onComplete(data.id);
    },
    onError: (error) => {
      toast({
        title: "분석 실패",
        description: "분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (photoIndex: number, file: File) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos[photoIndex] = file;
    setUploadedPhotos(newPhotos);
  };

  const handleRemovePhoto = (photoIndex: number) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos[photoIndex] = null;
    setUploadedPhotos(newPhotos);
  };

  const handleAnalysis = () => {
    const formData = new FormData();
    formData.append('gender', gender);
    formData.append('answers', JSON.stringify(answers));
    
    uploadedPhotos.forEach((photo, index) => {
      if (photo) {
        formData.append('photos', photo);
      }
    });

    analysisMutation.mutate(formData);
  };

  const handleSkipPhotos = () => {
    const formData = new FormData();
    formData.append('gender', gender);
    formData.append('answers', JSON.stringify(answers));
    
    analysisMutation.mutate(formData);
  };

  const hasPhotos = uploadedPhotos.some(photo => photo !== null);

  const photoLabels = [
    { title: "첫 번째 사진", subtitle: "상체 정면", icon: Camera },
    { title: "두 번째 사진", subtitle: "손 전체", icon: Camera },
    { title: "세 번째 사진 (선택)", subtitle: "전신 또는 옆면", icon: Camera }
  ];

  if (analysisMutation.isPending) {
    return (
      <CardContent className="p-8 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-main to-mint-main rounded-full mx-auto mb-6 flex items-center justify-center">
            <Loader2 className="text-white animate-spin" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-dark-custom mb-4">AI가 분석 중입니다</h2>
          <p className="text-gray-custom mb-6">잠시만 기다려주세요. 최적의 체형 분석을 위해 데이터를 처리하고 있습니다.</p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-pink-main to-mint-main h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-gray-500">분석 완료까지 약 10-15초 소요됩니다</p>
          </div>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-dark-custom mb-4">사진을 업로드해주세요</h2>
        <p className="text-gray-custom">상체 또는 손 사진 2-3장을 업로드하시면 더 정확한 분석이 가능합니다</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {photoLabels.map((label, index) => {
          const photo = uploadedPhotos[index];
          
          return (
            <div
              key={index}
              className="photo-upload-area border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-pink-main transition-colors cursor-pointer"
            >
              {photo ? (
                <div>
                  <img 
                    src={URL.createObjectURL(photo)} 
                    alt={`업로드된 이미지 ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <Button
                    onClick={() => handleRemovePhoto(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} className="mr-1" />
                    삭제
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(index, file);
                    }}
                    className="hidden"
                    id={`file-${index}`}
                  />
                  <label htmlFor={`file-${index}`} className="cursor-pointer">
                    <label.icon className="text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-custom">{label.title}</p>
                    <p className="text-sm text-gray-400">{label.subtitle}</p>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center space-y-4">
        {hasPhotos ? (
          <Button
            onClick={handleAnalysis}
            className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Brain className="mr-2" size={20} />
            AI 분석 시작하기
          </Button>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={handleSkipPhotos}
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Brain className="mr-2" size={20} />
              사진 없이 분석하기
            </Button>
            <p className="text-sm text-gray-500">사진을 업로드하면 더 정확한 분석이 가능합니다</p>
          </div>
        )}
        
        {hasPhotos && (
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={handleSkipPhotos}
              variant="outline"
              className="px-6 py-2 rounded-full font-medium text-gray-600 hover:text-gray-800"
            >
              사진 없이 분석하기
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  );
}
