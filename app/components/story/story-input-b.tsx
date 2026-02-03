import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Mic, PenLine, X, Send, Square } from "lucide-react";
import { cn } from "~/lib/utils";

type InputMode = "choice" | "text" | "audio";

interface StoryInputBProps {
  onSendText?: (text: string) => void;
  onSendAudio?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function StoryInputB({
  onSendText,
  onSendAudio,
  placeholder = "Descrivi la storia che vorresti creare...",
  disabled = false,
}: StoryInputBProps) {
  const [mode, setMode] = useState<InputMode>("choice");
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (text.trim() && onSendText) {
      onSendText(text.trim());
      setText("");
      setMode("choice");
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Mock recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (onSendAudio) {
      onSendAudio();
    }
    setMode("choice");
  };

  const handleCancel = () => {
    setText("");
    setIsRecording(false);
    setMode("choice");
  };

  if (mode === "choice") {
    return (
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Come vuoi rispondere?
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setMode("text")}
            disabled={disabled}
            className="flex-1 h-20 flex-col gap-2"
          >
            <PenLine className="size-6" />
            <span>Scrivi</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setMode("audio")}
            disabled={disabled}
            className="flex-1 h-20 flex-col gap-2"
          >
            <Mic className="size-6" />
            <span>Registra</span>
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "text") {
    return (
      <div className="p-4 space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          className="resize-none"
          autoFocus
        />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleCancel}
            disabled={disabled}
          >
            <X className="size-5 mr-2" />
            Annulla
          </Button>
          <Button
            size="lg"
            onClick={handleSend}
            disabled={disabled || !text.trim()}
            className="flex-1"
          >
            <Send className="size-5 mr-2" />
            Invia
          </Button>
        </div>
      </div>
    );
  }

  // mode === "audio"
  return (
    <div className="p-4 space-y-3">
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        {isRecording ? (
          <>
            <div className="size-20 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
              <Mic className="size-10 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground">Registrazione in corso...</p>
          </>
        ) : (
          <>
            <div className="size-20 rounded-full bg-muted flex items-center justify-center">
              <Mic className="size-10 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Premi per registrare</p>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleCancel}
          disabled={disabled}
        >
          <X className="size-5 mr-2" />
          Annulla
        </Button>
        {isRecording ? (
          <Button
            size="lg"
            variant="destructive"
            onClick={handleStopRecording}
            disabled={disabled}
            className="flex-1"
          >
            <Square className="size-5 mr-2" />
            Stop e invia
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={handleStartRecording}
            disabled={disabled}
            className="flex-1"
          >
            <Mic className="size-5 mr-2" />
            Inizia registrazione
          </Button>
        )}
      </div>
    </div>
  );
}
