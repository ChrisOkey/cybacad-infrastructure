import { Icon } from "./Icon";

export const LessonContent = ({
  lessonTitle,
  onAICoachRequest,
}: {
  lessonTitle: string;
  onAICoachRequest: (title: string) => void;
}) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{lessonTitle}</h2>
    <p className="text-gray-300 mb-4">This lab requires you to modify the code below to solve the challenge.</p>
    <div className="aspect-video w-full max-w-xl bg-gray-950 rounded-lg flex items-center justify-center border border-gray-700/50 my-4">
      <Icon name="Play" className="w-8 h-8 text-teal-400/80" />
      <p className="ml-3 text-gray-400">Lecture Video: XSS Prevention Techniques</p>
    </div>
    <button
      onClick={() => onAICoachRequest(lessonTitle)}
      className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold text-teal-400/80 transition-colors mt-4 flex items-center justify-center"
    >
      <Icon name="Lightbulb" className="w-4 h-4 mr-2" /> AI Coach Hint
    </button>
  </div>
);
